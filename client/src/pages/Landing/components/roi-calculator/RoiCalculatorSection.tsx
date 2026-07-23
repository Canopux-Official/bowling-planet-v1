import { type FC, useState, useEffect } from 'react'

import RoiConfigForm from './RoiConfigForm'
import { useRoiMatch, type RoiInputs } from '../../../../hooks/useRoiMatch'
import { useReveal } from '../../../../hooks/useReveal'
import { useLeadTracker } from '../../../../context/LeadTrackerContext'
import { theme } from '../../../../theme'
import RoiResultsDisplay from './RoiResultDisplay'
import { apiClient } from '../../../../services/apiClient'

interface CalculatorState {
    inputs: RoiInputs
    tier: number
    showResults: boolean
}

interface RoiCalculatorSectionProps {
    compact?: boolean
    /** Franchise sidebar: fill sticky column; scroll internally only after report opens */
    panel?: boolean
}

const RoiCalculatorSection: FC<RoiCalculatorSectionProps> = ({ compact = false, panel = false }) => {
    const ref = useReveal()
    const { state, logCTAEvent } = useLeadTracker()

    const [calc, setCalc] = useState<CalculatorState>({
        inputs: {
            budgetLakhs: 50,
            sizeSqft: 3000,
            games: 12,
            attractions: 1,
        },
        tier: 2,
        showResults: false,
    })

    // Lead unlock state tracking
    const [isUnlocked, setIsUnlocked] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [mobile, setMobile] = useState<string>('')

    // Check localStorage on mount to see if user already submitted details before
    useEffect(() => {
        const savedUserId = localStorage.getItem('userId')
        if (savedUserId) {
            setIsUnlocked(true)
        }
    }, [])

    const { matched, matchScorePct } = useRoiMatch(calc.inputs)

    const handleInputChange = (next: Partial<RoiInputs>) => {
        setCalc((prev) => ({
            ...prev,
            inputs: { ...prev.inputs, ...next },
        }))
    }

    const handleTierChange = (tier: number) => {
        setCalc((prev) => ({ ...prev, tier }))
    }

    const submitRoiReport = async (includeContact: boolean) => {
        const locationTier = calc.tier === 1 ? 'Metro'
            : calc.tier === 2 ? 'State Capital'
                : calc.tier === 3 ? 'Emerging'
                    : calc.tier === 4 ? 'Growing'
                        : 'Small';

        const roiEnquiryItem = {
            id: `roi-${matched.key}-tier${calc.tier}-${Date.now()}`, // Unique ID for each calculation
            type: 'roi-report',
            title: `ROI Report — ${matched.name} Format (${locationTier} City)`,
            metadata: {
                format: matched.key,
                tier: calc.tier,
                budget: calc.inputs.budgetLakhs,
                sizeSqft: calc.inputs.sizeSqft,
                games: calc.inputs.games,
                attractions: calc.inputs.attractions,
            }
        };

        const submitEvent = { label: `Calculated ROI Report: ${matched.name} (Tier ${calc.tier})`, timestamp: new Date().toISOString(), path: window.location.pathname }
        logCTAEvent(submitEvent.label);

        try {
            await apiClient('/leads', {
                method: 'POST',
                body: JSON.stringify({
                    ...(includeContact && {
                        name: 'ROI Calculator User',
                        phone: mobile,
                        email: email,
                    }),
                    utm: state.utm,
                    device: state.deviceInfo,
                    sessionId: state.sessionId,
                    behavior: {
                        isReturningVisitor: state.isReturningVisitor,
                        eventLog: [...state.eventLog, submitEvent],
                    },
                    enquiryItems: [...state.enquiryCart, roiEnquiryItem],
                }),
            });
            console.log('ROI calculation saved to backend journey.');
        } catch (error) {
            console.error('Failed to save ROI lead to CRM:', error);
        }
    }

    const handleCalculate = async () => {
        setCalc((prev) => ({ ...prev, showResults: true }))
        if (isUnlocked) {
            // Already unlocked, send calculation to backend silently
            await submitRoiReport(false)
        }
    }

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !mobile) return

        await submitRoiReport(true)

        // Generate fake userId for front-end persistence bypass if needed
        if (!localStorage.getItem('userId')) {
            const mockUserId = `usr_${Math.random().toString(36).substr(2, 9)}`
            localStorage.setItem('userId', mockUserId)
        }

        setIsUnlocked(true)
    }

    return (
        <section
            id="roi-calculator"
            className={panel ? 'roi-panel h-full' : undefined}
            style={{
                background: '#0A0A0F',
                padding: panel ? '16px 14px 20px' : compact ? '40px 20px' : '120px 28px',
                position: 'relative',
                overflow: panel ? 'auto' : 'hidden',
                height: panel ? '100%' : undefined,
                maxHeight: panel ? '100%' : undefined,
            }}
        >
            {/* Glow orbs */}
            {!panel ? (
                <>
                    <div className="orb orb-purple" style={{ width: 600, height: 600, top: '10%', right: '-5%' }} />
                    <div className="orb orb-teal" style={{ width: 500, height: 500, bottom: '-10%', left: '-8%' }} />
                    <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} />
                </>
            ) : (
                <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }} />
            )}

            {!compact && !panel ? <div className="divider-purple" style={{ marginBottom: 80 }} /> : null}

            <div
                ref={ref}
                className="reveal"
                style={{
                    maxWidth: panel ? '100%' : 1320,
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* ── Title ──────────────────────────────────────── */}
                <div style={{ textAlign: panel ? 'left' : 'center', marginBottom: panel || compact ? 16 : 80 }}>
                    <p
                        style={{
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: '#5FC1D1',
                            marginBottom: 6,
                        }}
                    >
                        ROI Calculator
                    </p>
                    <h2
                        className="font-display text-metallic"
                        style={{
                            fontWeight: 800,
                            fontSize: panel
                                ? 'clamp(1.15rem, 2vw, 1.4rem)'
                                : compact
                                  ? 'clamp(1.35rem, 2.8vw, 1.85rem)'
                                  : 'clamp(3rem, 6vw, 5rem)',
                            letterSpacing: '-0.04em',
                            lineHeight: 1.15,
                        }}
                    >
                        Know Your ROI.
                    </h2>
                    {!panel ? (
                        <div className="text-gradient-brand" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 600, marginTop: 16 }}>
                            Transparent projections for your franchise model.
                        </div>
                    ) : (
                        <p style={{ fontSize: 12, color: '#86868B', marginTop: 6, lineHeight: 1.45 }}>
                            Set your model — report unlocks below.
                        </p>
                    )}
                </div>

                {/* ── Content Layout ────────────────────────────── */}
                {!calc.showResults ? (
                    <div style={{ maxWidth: panel ? '100%' : 800, margin: panel ? 0 : '0 auto' }}>
                        <RoiConfigForm
                            inputs={calc.inputs}
                            tier={calc.tier}
                            onChange={handleInputChange}
                            onTierChange={handleTierChange}
                            matchedName={matched.name}
                            matchColor={matched.color}
                            matchScorePct={matchScorePct}
                            onSubmit={handleCalculate}
                        />
                    </div>
                ) : (
                    <div style={{ position: 'relative' }}>
                        
                        {/* ── BLURRED OR REGULAR RESULTS PANEL ── */}
                        <div 
                            style={{ 
                                display: 'grid', 
                                gridTemplateColumns: panel ? '1fr' : 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', 
                                gap: panel ? 16 : 40, 
                                alignItems: 'start',
                                filter: isUnlocked ? 'none' : 'blur(8px)',
                                pointerEvents: isUnlocked ? 'auto' : 'none',
                                userSelect: isUnlocked ? 'auto' : 'none',
                                transition: 'filter 0.4s ease'
                            }}
                        >
                            {/* Left: Input card (collapsed but editable) */}
                            <div>
                                <div
                                    style={{
                                        background: `linear-gradient(135deg, ${matched.color}08, rgba(255,255,255,0.01))`,
                                        border: `1px solid ${matched.color}15`,
                                        borderRadius: 16,
                                        padding: panel ? '14px' : '20px',
                                        position: panel ? 'relative' : 'sticky',
                                        top: panel ? undefined : 100,
                                    }}
                                >
                                    <h4 className="font-display" style={{ fontSize: 14, fontWeight: 700, color: matched.color, marginBottom: 16 }}>
                                        Your Selection
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        <div>
                                            <p style={{ fontSize: 11, color: theme.colors.text2, fontFamily: theme.typography.fontBody, marginBottom: 4 }}>
                                                Format
                                            </p>
                                            <p style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text1 }}>{matched.name}</p>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: 11, color: theme.colors.text2, fontFamily: theme.typography.fontBody, marginBottom: 4 }}>
                                                Tier
                                            </p>
                                            <p style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text1 }}>Tier {calc.tier}</p>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: 11, color: theme.colors.text2, fontFamily: theme.typography.fontBody, marginBottom: 4 }}>
                                                Budget
                                            </p>
                                            <p style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text1 }}>
                                                {calc.inputs.budgetLakhs >= 100 ? (calc.inputs.budgetLakhs / 100).toFixed(2) + ' Cr' : calc.inputs.budgetLakhs.toFixed(0) + ' L'}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setCalc((prev) => ({ ...prev, showResults: false }))}
                                        style={{
                                            width: '100%',
                                            marginTop: 16,
                                            padding: '10px 12px',
                                            background: 'transparent',
                                            border: `1px solid ${matched.color}40`,
                                            borderRadius: 8,
                                            color: matched.color,
                                            fontFamily: theme.typography.fontBody,
                                            fontSize: 12,
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            const target = e.currentTarget as HTMLElement;
                                            target.style.background = `${matched.color}12`;
                                            target.style.borderColor = `${matched.color}60`;
                                        }}
                                        onMouseLeave={(e) => {
                                            const target = e.currentTarget as HTMLElement;
                                            target.style.background = 'transparent';
                                            target.style.borderColor = `${matched.color}40`;
                                        }}
                                    >
                                        ← Edit inputs
                                    </button>
                                </div>
                            </div>

                            {/* Right: Full results display */}
                            <div style={{ gridColumn: 'span 1' }}>
                                <RoiResultsDisplay
                                    matched={matched}
                                    inputs={calc.inputs}
                                    tier={calc.tier}
                                />
                            </div>
                        </div>

                        {/* ── POPUP LOCK MODAL FOR CAPTURING LEADS ── */}
                        {!isUnlocked && (
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 10,
                                    padding: panel ? '16px 10px' : '40px 20px',
                                }}
                            >
                                <div
                                    style={{
                                        background: 'rgba(15, 15, 22, 0.85)',
                                        backdropFilter: 'blur(16px)',
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        borderRadius: panel ? 16 : 24,
                                        padding: panel ? '20px 16px' : '40px',
                                        maxWidth: 460,
                                        width: '100%',
                                        boxShadow: '0 24px 48px rgba(0, 0, 0, 0.8)',
                                        textAlign: 'center',
                                    }}
                                >
                                    <h3 className="font-display" style={{ fontSize: panel ? 18 : 24, fontWeight: 700, color: '#FFF', marginBottom: 12 }}>
                                        Unlock Full ROI Breakdown
                                    </h3>
                                    <p style={{ fontSize: 13, color: '#A0A0AB', lineHeight: 1.5, marginBottom: 20 }}>
                                        Enter your contact details to access investment yields, payback matrices, and customized franchise data.
                                    </p>

                                    <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                        <div style={{ textAlign: 'left' }}>
                                            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#E4E4E7', marginBottom: 6 }}>
                                                Email Address
                                            </label>
                                            <input 
                                                type="email" 
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="name@company.com"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    background: 'rgba(255,255,255,0.03)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: 8,
                                                    color: '#FFF',
                                                    outline: 'none',
                                                }}
                                            />
                                        </div>

                                        <div style={{ textAlign: 'left' }}>
                                            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#E4E4E7', marginBottom: 6 }}>
                                                Mobile Number
                                            </label>
                                            <input 
                                                type="tel" 
                                                required
                                                value={mobile}
                                                onChange={(e) => setMobile(e.target.value)}
                                                placeholder="+91 XXXXX XXXXX"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    background: 'rgba(255,255,255,0.03)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: 8,
                                                    color: '#FFF',
                                                    outline: 'none',
                                                }}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            style={{
                                                width: '100%',
                                                padding: '14px',
                                                background: `linear-gradient(90deg, ${matched.color || '#9333EA'}, #06B6D4)`,
                                                border: 'none',
                                                borderRadius: 8,
                                                color: '#FFF',
                                                fontWeight: 700,
                                                fontSize: 14,
                                                cursor: 'pointer',
                                                marginTop: 12,
                                                boxShadow: '0 4px 20px rgba(147, 51, 234, 0.25)',
                                            }}
                                        >
                                            View Performance Analysis
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {!panel ? <div className="divider" style={{ marginTop: 80 }} /> : null}
        </section>
    )
}

export default RoiCalculatorSection