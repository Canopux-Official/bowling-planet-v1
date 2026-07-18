import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check } from 'lucide-react';

import { isMobile, osName, browserName } from 'react-device-detect';

export interface EnquiryItem {
  id: string;
  type: 'product' | 'franchise' | 'project' | 'general' | 'roi-report';
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
        // If they have saved data, they are a returning visitor for this session
        return { ...parsed, isReturningVisitor: true };
      }
    } catch (e) {
      console.error('Failed to parse lead tracker state from local storage', e);
    }
    return initialState;
  });

  const location = useLocation();
  const [animationData, setAnimationData] = useState<{ item: EnquiryItem | null; id: number }>({ item: null, id: 0 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  // Cleanup animation timer on unmount to prevent state updates on unmounted component
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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
      const newId = Date.now();
      setAnimationData({ item, id: newId });
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setAnimationData((prev) => (prev.id === newId ? { item: null, id: 0 } : prev));
        setIsCartOpen(true);
      }, 2500);

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

      <AnimatePresence>
        {animationData.item && (
          <motion.div
            key={animationData.id}
            initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-30%' }}
            animate={{
              opacity: 1,
              scale: 1,
              x: '-50%',
              y: '-50%',
            }}
            exit={{
              opacity: 0,
              scale: 0.4,
              x: '40vw',
              y: '45vh',
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
              mass: 1,
            }}
            className="fixed top-1/2 left-1/2 z-[9999] pointer-events-none flex flex-col items-center justify-center bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.2)] border border-bp-blue/20 overflow-hidden min-w-[280px]"
          >
            {/* Background animated gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-bp-blue/10 to-transparent opacity-50" />
            
            <div className="relative w-20 h-20 bg-gradient-to-br from-bp-blue to-blue-400 rounded-2xl flex items-center justify-center mb-4 text-white shadow-xl shadow-bp-blue/30 transform rotate-[-5deg]">
              <ShoppingBag size={40} />
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute -bottom-3 -right-3 bg-gradient-to-br from-green-400 to-green-600 rounded-full p-1.5 shadow-lg shadow-green-500/30 border-2 border-white"
              >
                <Check size={20} strokeWidth={4} />
              </motion.div>
            </div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center"
            >
              Added to Enquiry!
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm font-medium text-gray-500 mt-2 max-w-[240px] text-center truncate"
            >
              {animationData.item.title}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
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
