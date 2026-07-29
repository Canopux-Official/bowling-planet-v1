import React, { createContext, useContext } from 'react';
import { globalSettingsApi, type GlobalSettingsData } from '../services/globalSettingsApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';

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
  const queryClient = useQueryClient();

  const { data, isLoading: loading, error } = useQuery({
    queryKey: ['global-settings'],
    queryFn: async () => {
      const res = await globalSettingsApi.getSettings();
      if (res.success && res.data) {
        return res.data;
      }
      throw new Error('Failed to load global settings');
    },
    staleTime: 10 * 60 * 1000, // 10 minutes cache
  });

  const refreshSettings = async () => {
    await queryClient.invalidateQueries({ queryKey: ['global-settings'] });
  };

  return (
    <GlobalSettingsContext.Provider 
      value={{ 
        settings: data || null, 
        loading, 
        error: error ? error.message : null, 
        refreshSettings 
      }}
    >
      {children}
    </GlobalSettingsContext.Provider>
  );
};

export const useGlobalSettings = () => useContext(GlobalSettingsContext);
