import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { isMobile, osName, browserName } from 'react-device-detect';

export interface EnquiryItem {
  id: string;
  type: 'product' | 'franchise' | 'project' | 'general' | 'roi-report' | 'service';
  title: string;
  metadata?: Record<string, any>;
}

export interface UTMParams {
  source?: string;
  medium?: string;
  campaign?: string;
}

export interface CTAEvent {
  label: string;
  timestamp: string;
  path: string;
}

export interface PartialLeadForm {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  businessDetails?: string;
}

export interface DeviceInfo {
  isMobile: boolean;
  os: string;
  browser: string;
}

interface LeadTrackerState {
  isReturningVisitor: boolean;
  utm: UTMParams;
  enquiryCart: EnquiryItem[];
  eventLog: CTAEvent[];
  partialLead: PartialLeadForm;
  deviceInfo: DeviceInfo;
  sessionId: string;
}

interface LeadTrackerContextType {
  state: LeadTrackerState;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToEnquiry: (item: EnquiryItem) => void;
  removeFromEnquiry: (id: string) => void;
  logCTAEvent: (label: string) => void;
  updatePartialLead: (data: Partial<PartialLeadForm>) => void;
  clearEnquiryCart: () => void;
  clearTrackingData: () => void;
}

const initialState: LeadTrackerState = {
  isReturningVisitor: false,
  utm: {},
  enquiryCart: [],
  eventLog: [],
  partialLead: {},
  deviceInfo: {
    isMobile,
    os: osName,
    browser: browserName,
  },
  // SECURITY: crypto.randomUUID() is preferred, but we need a fallback for older browsers or HTTP
  sessionId: (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') 
    ? crypto.randomUUID() 
    : 'sess_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
};

const LeadTrackerContext = createContext<LeadTrackerContextType | undefined>(undefined);

export const LeadTrackerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<LeadTrackerState>(() => {
    try {
      const saved = localStorage.getItem('bp_lead_tracker');
      if (saved) {
        const parsed = JSON.parse(saved);
        // SECURITY: Validate the restored object's shape before merging into state.
        // A browser extension or XSS payload could write a crafted value to localStorage
        // and use it to inject a malicious sessionId or pollute the event log.
        // We validate the minimum required fields; any malformed data is discarded.
        const isValidShape =
          typeof parsed === 'object' &&
          parsed !== null &&
          !Array.isArray(parsed) &&
          // sessionId must be a valid UUID v4 (or the sess_ fallback format) — not an arbitrary string
          (typeof parsed.sessionId === 'string' &&
            (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(parsed.sessionId) ||
              /^sess_[a-z0-9]{10,30}$/i.test(parsed.sessionId)));

        if (!isValidShape) {
          // Data is corrupted or tampered — clear it and start fresh
          localStorage.removeItem('bp_lead_tracker');
          return initialState;
        }

        // Merge against initialState so any new fields added to the schema have safe defaults
        return { ...initialState, ...parsed, isReturningVisitor: true };
      }
    } catch (e) {
      console.error('Failed to parse lead tracker state from local storage', e);
    }
    return initialState;
  });

  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // PERFORMANCE: Debounce localStorage writes — prevents synchronous blocking on every state change
  // which causes measurable CLS/INP jank on mobile CPUs when eventLog grows large.
  const persistTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (persistTimer.current) clearTimeout(persistTimer.current);
    persistTimer.current = setTimeout(() => {
      localStorage.setItem('bp_lead_tracker', JSON.stringify(state));
    }, 800);
    return () => {
      if (persistTimer.current) clearTimeout(persistTimer.current);
    };
  }, [state]);


  // Capture UTM parameters from URL on initial load or route change
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const utmSource = searchParams.get('utm_source');
    const utmMedium = searchParams.get('utm_medium');
    const utmCampaign = searchParams.get('utm_campaign');

    if (utmSource || utmMedium || utmCampaign) {
      setState((prev) => ({
        ...prev,
        utm: {
          source: utmSource || prev.utm.source,
          medium: utmMedium || prev.utm.medium,
          campaign: utmCampaign || prev.utm.campaign,
        },
      }));
    }
  }, [location.search]);

  const addToEnquiry = React.useCallback((item: EnquiryItem) => {
    const isExisting = state.enquiryCart.some((i) => i.id === item.id);
    const wasAdded = !isExisting;

    setState((prev) => {
      if (isExisting) {
        return {
          ...prev,
          enquiryCart: prev.enquiryCart.filter((i) => i.id !== item.id),
        };
      } else {
        if (prev.enquiryCart.some((i) => i.id === item.id)) return prev;
        return {
          ...prev,
          enquiryCart: [...prev.enquiryCart, item],
        };
      }
    });

    if (wasAdded) {
      setIsCartOpen(true);

      // We cannot call logCTAEvent here easily if they are both useCallbacks without deps, 
      // but logCTAEvent uses setState(prev), so it's fine to just define it above or inline.
      setState((prev) => ({
        ...prev,
        eventLog: [
          ...prev.eventLog,
          { label: `Added to Enquiry: ${item.title} (${item.type})`, timestamp: new Date().toISOString(), path: window.location.pathname },
        ].slice(-100),
      }));
    } else {
      setState((prev) => ({
        ...prev,
        eventLog: [
          ...prev.eventLog,
          { label: `Removed from Enquiry: ${item.title} (${item.type})`, timestamp: new Date().toISOString(), path: window.location.pathname },
        ].slice(-100),
      }));
    }
  }, [state.enquiryCart]);

  const removeFromEnquiry = React.useCallback((id: string) => {
    setState((prev) => {
      const itemToRemove = prev.enquiryCart.find(item => item.id === id);
      const newCart = prev.enquiryCart.filter((item) => item.id !== id);
      
      let newEventLog = prev.eventLog;
      if (itemToRemove) {
        newEventLog = [
          ...prev.eventLog,
          { label: `Removed from Enquiry: ${itemToRemove.title} (${itemToRemove.type})`, timestamp: new Date().toISOString(), path: window.location.pathname },
        ].slice(-100);
      }

      return {
        ...prev,
        enquiryCart: newCart,
        eventLog: newEventLog,
      };
    });
  }, []);

  const logCTAEvent = React.useCallback((label: string) => {
    setState((prev) => ({
      ...prev,
      eventLog: [
        ...prev.eventLog,
        { label, timestamp: new Date().toISOString(), path: window.location.pathname },
      ].slice(-100),
    }));
  }, []);

  const updatePartialLead = React.useCallback((data: Partial<PartialLeadForm>) => {
    setState((prev) => {
      // Only update if something actually changed to prevent unnecessary re-renders
      const hasChanges = Object.keys(data).some(key => prev.partialLead[key as keyof PartialLeadForm] !== data[key as keyof PartialLeadForm]);
      if (!hasChanges) return prev;
      
      return {
        ...prev,
        partialLead: { ...prev.partialLead, ...data },
      };
    });
  }, []);

  const clearTrackingData = React.useCallback(() => {
    setState(initialState);
    localStorage.removeItem('bp_lead_tracker');
  }, []);

  const clearEnquiryCart = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      enquiryCart: [],
    }));
  }, []);

  return (
    <LeadTrackerContext.Provider
      value={{
        state,
        isCartOpen,
        setIsCartOpen,
        addToEnquiry,
        removeFromEnquiry,
        logCTAEvent,
        updatePartialLead,
        clearEnquiryCart,
        clearTrackingData,
      }}
    >
      {children}
    </LeadTrackerContext.Provider>
  );
};

export const useLeadTracker = () => {
  const context = useContext(LeadTrackerContext);
  if (context === undefined) {
    throw new Error('useLeadTracker must be used within a LeadTrackerProvider');
  }
  return context;
};
