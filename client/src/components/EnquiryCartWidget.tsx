import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Send, Trash2, User, Phone, MapPin, Building2, Mail } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useLeadTracker } from '../context/LeadTrackerContext';
import { theme } from '../theme';
import { apiClient } from '../services/apiClient';

export const EnquiryCartWidget: React.FC = () => {
  const { state, isCartOpen, setIsCartOpen, removeFromEnquiry, updatePartialLead, logCTAEvent, clearEnquiryCart } = useLeadTracker();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingQuick, setIsProcessingQuick] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync local component state with context's partial lead
  const [formData, setFormData] = useState({
    name: state.partialLead.name || '',
    phone: state.partialLead.phone || '',
    email: state.partialLead.email || '',
    city: state.partialLead.city || '',
    businessDetails: state.partialLead.businessDetails || '',
  });

  // Keep Context in sync without hitting the backend to save API limits (Vercel Free Tier)
  useEffect(() => {
    updatePartialLead(formData);
  }, [formData, updatePartialLead]);

  // ONLY hit the backend for partial saves when the user explicitly closes the cart drawer
  useEffect(() => {
    if (!isCartOpen) {
      if (formData.name || formData.phone || formData.email || formData.businessDetails || formData.city) {
        apiClient('/leads/partial', {
          method: 'POST',
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            city: formData.city,
            businessDetails: formData.businessDetails,
            utm: state.utm,
            device: state.deviceInfo,
            sessionId: state.sessionId,
            behavior: {
              isReturningVisitor: state.isReturningVisitor,
              eventLog: state.eventLog,
            },
            enquiryItems: state.enquiryCart,
          }),
        }).catch(() => {
          // ignore error for partials
        });
      }
    }
  }, [isCartOpen]); // Intentionally ONLY listening to isCartOpen to prevent API floods

  const itemCount = state.enquiryCart.length;

  // Don't render the FAB if there are no items and it's not open
  if (itemCount === 0 && !isCartOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please provide your Full Name and Phone Number so our team can assist you better via WhatsApp.");
      return;
    }

    // SYNCHRONOUSLY open the popup before any await to prevent browser blockers
    const whatsappWindow = window.open('about:blank', '_blank');

    setIsSubmitting(true);
    const submitEvent = { label: 'Submit Lead (Enquiry Cart)', timestamp: new Date().toISOString(), path: window.location.pathname }
    logCTAEvent('Submit Lead (Enquiry Cart)');

    // 1. Send data to admin dashboard CRM
    try {
      await apiClient('/leads', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          businessDetails: formData.businessDetails,
          utm: state.utm,
          device: state.deviceInfo,
          sessionId: state.sessionId,
          behavior: {
            isReturningVisitor: state.isReturningVisitor,
            eventLog: [...state.eventLog, submitEvent],
          },
          enquiryItems: state.enquiryCart,
        }),
      });
    } catch (error) {
      console.error('Failed to save lead to CRM:', error);
      // We still want to redirect them to WhatsApp even if CRM fails
    }

    const cartText = state.enquiryCart.map(item => `- ${item.title} (${item.type})`).join('\n');
    let message = `Hi Bowling Planet,\nI am interested in the following:\n${cartText}\n\nMy Details:\nName: ${formData.name}\nPhone: ${formData.phone}`;
    if (formData.email) message += `\nEmail: ${formData.email}`;
    if (formData.city) message += `\nCity: ${formData.city}`;
    if (formData.businessDetails) message += `\nSpace Details: ${formData.businessDetails}`;
    message += `\n\nPlease get back to me.`;

    // 2. Redirect to WhatsApp
    const encodedMessage = encodeURIComponent(message);

    setTimeout(() => {
      setIsSubmitting(false);
      if (whatsappWindow) {
        whatsappWindow.location.href = `https://api.whatsapp.com/send?phone=919512545959&text=${encodedMessage}`;
      } else {
        window.location.href = `https://api.whatsapp.com/send?phone=919512545959&text=${encodedMessage}`;
      }
      setIsCartOpen(false);
      clearEnquiryCart();
    }, 1000);
  };

  const handleQuickWhatsApp = async () => {
    // SYNCHRONOUSLY open the popup before any await to prevent browser blockers
    const whatsappWindow = window.open('about:blank', '_blank');

    setIsProcessingQuick(true);
    const submitEvent = { label: 'Quick WhatsApp Clicked (Enquiry Cart)', timestamp: new Date().toISOString(), path: window.location.pathname }
    logCTAEvent('Quick WhatsApp Clicked (Enquiry Cart)');
    // 1. Save an anonymous/quick lead to CRM
    try {
      await apiClient('/leads', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Quick WhatsApp (No Name)',
          phone: 'Not Provided',
          utm: state.utm,
          device: state.deviceInfo,
          sessionId: state.sessionId,
          behavior: {
            isReturningVisitor: state.isReturningVisitor,
            eventLog: [...state.eventLog, submitEvent],
          },
          enquiryItems: state.enquiryCart,
        }),
      });
    } catch (error) {
      console.error('Failed to save quick lead to CRM:', error);
    }

    // 2. Redirect to WhatsApp
    const cartText = state.enquiryCart.map(item => `- ${item.title} (${item.type})`).join('\n');
    const message = `Hi Bowling Planet,\nI am interested in the following:\n${cartText}\n\nPlease get back to me.`;
    const encodedMessage = encodeURIComponent(message);
    
    setTimeout(() => {
      setIsProcessingQuick(false);
      if (whatsappWindow) {
        whatsappWindow.location.href = `https://api.whatsapp.com/send?phone=919512545959&text=${encodedMessage}`;
      } else {
        window.location.href = `https://api.whatsapp.com/send?phone=919512545959&text=${encodedMessage}`;
      }
      setIsCartOpen(false);
      clearEnquiryCart();
    }, 800);
  };

  const handleSaveForLater = async () => {
    if (!formData.email && !formData.phone) {
      alert("Please enter at least an email or phone number so we can securely save your cart for later.");
      return;
    }
    
    const submitEvent = { label: 'Save Cart For Later Clicked', timestamp: new Date().toISOString(), path: window.location.pathname }
    logCTAEvent('Save Cart For Later Clicked');
    setSaveSuccess(true);
    
    try {
      await apiClient('/leads/partial', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name || 'Saved Cart Lead',
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          businessDetails: formData.businessDetails,
          utm: state.utm,
          device: state.deviceInfo,
          sessionId: state.sessionId,
          behavior: {
            isReturningVisitor: state.isReturningVisitor,
            eventLog: [...state.eventLog, submitEvent],
          },
          enquiryItems: state.enquiryCart,
        }),
      });
    } catch (error) {
      console.error('Failed to save cart for later:', error);
    }

    setTimeout(() => {
      setSaveSuccess(false);
      setIsCartOpen(false);
    }, 3000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        className="floating-widget"
        onClick={() => setIsCartOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: theme.colors.teal,
          color: theme.colors.surface,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(95, 193, 209, 0.3)',
          cursor: 'pointer',
          zIndex: 1000,
          border: 'none',
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isCartOpen ? 'scale(0)' : 'scale(1)',
        }}
      >
        <ShoppingBag size={24} />
        {itemCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            backgroundColor: theme.colors.purple,
            color: 'white',
            fontSize: '12px',
            fontWeight: 700,
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px solid ${theme.colors.surface}`
          }}>
            {itemCount}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 1001,
            animation: 'fadeIn 0.3s ease'
          }}
        />
      )}

      {/* Slide-out Drawer */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        maxWidth: '480px',
        backgroundColor: theme.colors.surface2,
        borderLeft: `1px solid ${theme.colors.border}`,
        boxShadow: '-8px 0 32px rgba(0,0,0,0.5)',
        zIndex: 1002,
        transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: `1px solid ${theme.colors.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: theme.colors.surface
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: theme.colors.text1 }}>Your Enquiry</h2>
            <p style={{ margin: 0, fontSize: '13px', color: theme.colors.teal, marginTop: '4px' }}>
              {itemCount} {itemCount === 1 ? 'item' : 'items'} selected
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'none', border: 'none', color: theme.colors.text2, cursor: 'pointer',
              padding: '8px', borderRadius: '50%', backgroundColor: theme.colors.surface2
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>

          {/* Top Quick WhatsApp Button */}
          {itemCount > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <button
                type="button"
                onClick={handleQuickWhatsApp}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: '#25D366', // WhatsApp Official Green
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
                  transition: 'transform 0.2s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'none')}
              >
                Skip Details & Direct WhatsApp
                <Send size={18} />
              </button>
            </div>
          )}

          {/* Cart Items */}
          {itemCount === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: theme.colors.text2 }}>
              <ShoppingBag size={48} opacity={0.2} style={{ margin: '0 auto 16px' }} />
              <p>Your enquiry list is empty.</p>
              <p style={{ fontSize: '14px', marginTop: '8px' }}>Browse our products and add them here.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {state.enquiryCart.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '12px'
                }}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: theme.colors.text1 }}>{item.title}</div>
                    <div style={{ fontSize: '12px', color: theme.colors.text2, textTransform: 'capitalize', marginTop: '4px' }}>
                      {item.type}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromEnquiry(item.id)}
                    style={{ background: 'none', border: 'none', color: theme.colors.adminDanger, cursor: 'pointer', padding: '8px' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  padding: '12px',
                  backgroundColor: 'transparent',
                  border: `1px dashed ${theme.colors.teal}`,
                  color: theme.colors.teal,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '8px',
                }}
              >
                + Browse More Items
              </button>
            </div>
          )}

          {/* Form */}
          {itemCount > 0 && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px', padding: '20px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: `1px solid ${theme.colors.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: `1px solid ${theme.colors.border}`, paddingBottom: '8px' }}>
                <h3 style={{ fontSize: '16px', color: theme.colors.text1, margin: 0 }}>
                  Contact Details
                </h3>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: theme.colors.text2, fontSize: '13px' }}>
                  <User size={14} /> Full Name *
                </div>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: `1px solid ${theme.colors.border}`, backgroundColor: theme.colors.surface, color: theme.colors.text1, fontSize: '15px' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: theme.colors.text2, fontSize: '13px' }}>
                  <Phone size={14} /> Phone Number *
                </div>
                <div style={{
                  borderRadius: '8px', border: `1px solid ${theme.colors.border}`, backgroundColor: theme.colors.surface, padding: '4px 16px'
                }}>
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    value={formData.phone}
                    onChange={val => setFormData({ ...formData, phone: val || '' })}
                    style={{ width: '100%', outline: 'none', color: theme.colors.text1, fontSize: '15px' }}
                    className="custom-phone-input"
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: theme.colors.text2, fontSize: '13px' }}>
                  <Mail size={14} /> Email Address (Optional)
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: `1px solid ${theme.colors.border}`, backgroundColor: theme.colors.surface, color: theme.colors.text1, fontSize: '15px' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: theme.colors.text2, fontSize: '13px' }}>
                  <MapPin size={14} /> City / Location
                </div>
                <input
                  type="text"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Mumbai, India"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: `1px solid ${theme.colors.border}`, backgroundColor: theme.colors.surface, color: theme.colors.text1, fontSize: '15px' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: theme.colors.text2, fontSize: '13px' }}>
                  <Building2 size={14} /> Space Details / Requirements
                </div>
                <textarea
                  value={formData.businessDetails}
                  onChange={e => setFormData({ ...formData, businessDetails: e.target.value })}
                  placeholder="E.g. I have a 5,000 sq ft space and want to open a gaming zone."
                  rows={3}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: `1px solid ${theme.colors.border}`, backgroundColor: theme.colors.surface, color: theme.colors.text1, fontSize: '15px', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.phone}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: theme.colors.teal,
                    color: theme.colors.surface,
                    fontWeight: 700,
                    fontSize: '16px',
                    border: 'none',
                    cursor: isSubmitting || !formData.name || !formData.phone ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting || !formData.name || !formData.phone ? 0.7 : 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'opacity 0.2s ease',
                    boxShadow: '0 4px 12px rgba(95, 193, 209, 0.2)',
                  }}
                >
                  {isSubmitting ? 'Processing...' : 'Submit to WhatsApp'}
                  {!isSubmitting && <Send size={18} />}
                </button>
                
                <div style={{ textAlign: 'center', color: theme.colors.text2, fontSize: '13px', margin: '4px 0' }}>— OR —</div>

                <button
                  type="button"
                  onClick={handleQuickWhatsApp}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: '#25D366', // WhatsApp Official Green
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '16px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'none')}
                >
                  Skip Details & Direct WhatsApp
                  <Send size={18} />
                </button>

                <div style={{ textAlign: 'center', color: theme.colors.text2, fontSize: '13px', margin: '4px 0' }}>— OR —</div>

                <button
                  type="button"
                  onClick={handleSaveForLater}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'transparent',
                    color: theme.colors.text1,
                    fontWeight: 600,
                    fontSize: '15px',
                    border: `1px solid ${theme.colors.border}`,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {saveSuccess ? 'Cart Saved!' : 'Save Cart for Later'}
                </button>
              </div>

              <p style={{ textAlign: 'center', fontSize: '12px', color: theme.colors.text2, marginTop: '8px' }}>
                Our team will receive your selected items and details instantly.
              </p>
            </form>
          )}



        </div>
      </div>

      {/* Processing Overlay */}
      {(isSubmitting || isProcessingQuick) && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(6px)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.colors.surface,
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: `4px solid rgba(255,255,255,0.2)`,
            borderTopColor: '#fff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '20px'
          }} />
          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: '#fff' }}>Connecting to WhatsApp...</h3>
          <p style={{ margin: '8px 0 0', fontSize: '15px', color: 'rgba(255,255,255,0.7)' }}>Please wait a moment</p>
        </div>
      )}

      {/* Global Style for PhoneInput to override its default white text color issue in dark mode */}
      <style>{`
        .custom-phone-input input {
          background: transparent;
          border: none;
          color: ${theme.colors.text1};
          font-family: inherit;
          font-size: 15px;
          outline: none;
          padding: 8px 0;
        }
        .custom-phone-input .PhoneInputCountry {
          margin-right: 12px;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};
