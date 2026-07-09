import React from 'react';
import { theme } from '../../../../../theme';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CmsProductsView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <button 
          onClick={() => navigate('/admin/cms')}
          style={{ 
            background: 'none', border: '1px solid ' + theme.colors.adminBorder, 
            borderRadius: '8px', padding: '8px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: theme.colors.adminText
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: theme.colors.adminText, margin: 0 }}>Manage Products</h1>
          <p style={{ color: theme.colors.adminTextMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Add, edit, or remove base products and items.</p>
        </div>
      </div>

      <div style={{ 
        backgroundColor: theme.colors.adminSurface, 
        borderRadius: '12px', 
        border: `1px solid ${theme.colors.adminBorder}`,
        padding: '32px',
        textAlign: 'center',
        color: theme.colors.adminTextMuted
      }}>
        Products Editor Component will go here.
      </div>
    </div>
  );
};
