// src/components/admin/.../Toast/ToastContext.tsx
import React, { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';
import { theme } from '../../../theme';


type ToastType = 'success' | 'error';
interface ToastItem { id: number; type: ToastType; message: string; }

interface ToastContextValue {
  showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={stackStyle}>
        {toasts.map((t) => (
          <div key={t.id} style={{ ...toastStyle, borderColor: t.type === 'success' ? '#22c55e' : '#ff4d4d' }}>
            {t.type === 'success'
              ? <CheckCircle2 size={18} color="#22c55e" />
              : <XCircle size={18} color="#ff4d4d" />}
            <span style={{ flex: 1, fontSize: '14px' }}>{t.message}</span>
            <button onClick={() => dismiss(t.id)} style={closeBtnStyle}><X size={14} /></button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const stackStyle: React.CSSProperties = {
  position: 'fixed', top: '20px', right: '20px', zIndex: 2000,
  display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '360px',
};
const toastStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px',
  backgroundColor: theme.colors.adminSurface, border: '1px solid',
  borderRadius: '8px', color: theme.colors.adminText, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
};
const closeBtnStyle: React.CSSProperties = {
  background: 'none', border: 'none', color: theme.colors.adminTextMuted, cursor: 'pointer', padding: '2px',
};