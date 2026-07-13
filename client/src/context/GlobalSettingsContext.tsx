import React, { createContext, useContext, useEffect, useState } from 'react';
import { globalSettingsApi, type GlobalSettingsData } from '../services/globalSettingsApi';

interface GlobalSettingsContextProps {
  settings: GlobalSettingsData | null;
  loading: boolean;
  error: string | null;
  refreshSettings: () => Promise<void>;
}

const GlobalSettingsContext = createContext<GlobalSettingsContextProps>({
  settings: null,
  loading: true,
  error: null,
  refreshSettings: async () => {},
});

export const GlobalSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<GlobalSettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await globalSettingsApi.getSettings();
      if (res.success && res.data) {
        setSettings(res.data);
      } else {
        setError('Failed to load global settings');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred fetching global settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <GlobalSettingsContext.Provider value={{ settings, loading, error, refreshSettings: fetchSettings }}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};

export const useGlobalSettings = () => useContext(GlobalSettingsContext);
