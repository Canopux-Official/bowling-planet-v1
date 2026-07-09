import React, { useState } from 'react';
import { theme } from '../../../theme';

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  role: 'SuperAdmin' | 'Admin';
  lightMode?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ 
  value, onChange, placeholder = '••••••••', label = 'Password', role, lightMode = false 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const activeColor = role === 'SuperAdmin' ? theme.colors.teal : theme.colors.green;
  const activeColorRgba = role === 'SuperAdmin' ? 'rgba(95,193,209,0.2)' : 'rgba(74,222,128,0.2)';

  const inputStyle = {
    width: '100%',
    background: lightMode ? '#ffffff' : 'rgba(0,0,0,0.4)',
    border: `1px solid ${isFocused ? activeColor : (lightMode ? '#e5e7eb' : 'rgba(255,255,255,0.08)')}`,
    borderRadius: 12,
    padding: '16px 20px',
    paddingRight: 48,
    color: lightMode ? '#111827' : theme.colors.text1,
    fontSize: 15,
    fontFamily: theme.typography.fontBody,
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: isFocused ? `0 0 0 3px ${activeColorRgba}` : (lightMode ? 'inset 0 1px 2px rgba(0,0,0,0.05)' : 'inset 0 2px 4px rgba(0,0,0,0.5)'),
  };

  const labelStyle = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: lightMode ? '#374151' : theme.colors.text2,
    marginBottom: 10,
  };

  return (
    <div style={{ marginBottom: 20, position: 'relative' }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          required
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={inputStyle}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: lightMode ? '#6b7280' : theme.colors.text2,
            cursor: 'pointer',
            padding: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.7,
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );
};
