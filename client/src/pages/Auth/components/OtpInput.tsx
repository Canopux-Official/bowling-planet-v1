import React, { useRef, useEffect } from 'react';
import { theme } from '../../../theme';

interface OtpInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
  role: 'SuperAdmin' | 'Admin';
  lightMode?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({ length = 6, value, onChange, role, lightMode = false }) => {
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus the first input on mount
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  }, []);

  const handleOtpDigit = (index: number, digitValue: string) => {
    if (!/^[0-9]?$/.test(digitValue)) return;
    const next = [...value];
    next[index] = digitValue;
    onChange(next);
    if (digitValue && index < length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    const next = [...value];
    for (let i = 0; i < length; i++) next[i] = text[i] || '';
    onChange(next);
    const lastFilled = Math.min(text.length, length - 1);
    otpRefs.current[lastFilled]?.focus();
  };

  const isSuperAdmin = role === 'SuperAdmin';
  const activeColorRgb = isSuperAdmin ? '95,193,209' : '74,222,128';

  return (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 28 }} onPaste={handleOtpPaste}>
      {value.map((digit, i) => (
        <input
          key={i}
          ref={el => { otpRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={e => handleOtpDigit(i, e.target.value)}
          onKeyDown={e => handleOtpKeyDown(i, e)}
          style={{
            width: 52,
            height: 60,
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 700,
            fontFamily: theme.typography.fontDisplay,
            background: digit ? (lightMode ? `rgba(${activeColorRgb},0.15)` : `rgba(${activeColorRgb},0.08)`) : (lightMode ? '#ffffff' : 'rgba(0,0,0,0.4)'),
            border: `1.5px solid ${digit ? `rgba(${activeColorRgb},0.5)` : (lightMode ? '#e5e7eb' : 'rgba(255,255,255,0.1)')}`,
            borderRadius: 12,
            color: lightMode ? '#111827' : theme.colors.text1,
            outline: 'none',
            transition: 'all 0.2s ease',
            boxShadow: digit ? `0 0 14px rgba(${activeColorRgb},0.2)` : (lightMode ? 'inset 0 1px 2px rgba(0,0,0,0.05)' : 'inset 0 2px 4px rgba(0,0,0,0.4)'),
            caretColor: isSuperAdmin ? theme.colors.teal : theme.colors.green,
          }}
        />
      ))}
    </div>
  );
};
