import React, { useState, useEffect, useCallback } from 'react';
import { X, Search, Loader, AlertCircle, Check } from 'lucide-react';
import { apiClient } from '../../../services/apiClient';
import { theme } from '../../../theme';


interface CloudinaryImage {
    public_id: string;
    secure_url: string;
    width: number;
    height: number;
    bytes: number;
    created_at: string;
}

interface CloudinaryImagePickerProps {
    onSelect: (imageUrl: string) => void;
    maxWidth?: number;
    maxHeight?: number;
    folderPrefix?: string; // e.g., 'cms/resources'
}

interface CloudinaryPickerState {
    images: CloudinaryImage[];
    loading: boolean;
    loadingMore: boolean;
    error: string | null;
    searchQuery: string;
    selectedId: string | null;
    nextCursor: string | null;
}

export const CloudinaryImagePicker: React.FC<CloudinaryImagePickerProps> = ({
    onSelect,
    maxWidth: _maxWidth = 1200,
    maxHeight: _maxHeight = 800,
    folderPrefix = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState<CloudinaryPickerState>({
        images: [],
        loading: false,
        loadingMore: false,
        error: null,
        searchQuery: '',
        selectedId: null,
        nextCursor: null,
    });

    // Fetch images from Cloudinary via your backend
    // `cursor` is passed to fetch the next batch (cursor-based pagination, not page numbers)
    const fetchCloudinaryImages = useCallback(async (cursor?: string) => {
        setState(prev => ({
            ...prev,
            loading: !cursor,
            loadingMore: !!cursor,
            error: null,
        }));
        try {
            // const params = 'team-members';
            // if (folderPrefix) params.set('folder', folderPrefix);
            // if (cursor) params.set('cursor', cursor);

            // apiClient already parses JSON on success and throws Error on failure/non-2xx
            const data = await apiClient(`/cloudinary/images?folder=team-members`, {
                method: 'GET',
            });

            setState(prev => ({
                ...prev,
                images: cursor ? [...prev.images, ...(data.resources || [])] : (data.resources || []),
                nextCursor: data.nextCursor || null,
                loading: false,
                loadingMore: false,
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                error: err instanceof Error ? err.message : 'An error occurred',
                loading: false,
                loadingMore: false,
            }));
        }
    }, [folderPrefix]);

    const handleLoadMore = () => {
        if (state.nextCursor && !state.loadingMore) {
            fetchCloudinaryImages(state.nextCursor);
        }
    };

    // Load images when modal opens
    useEffect(() => {
        if (isOpen && state.images.length === 0 && !state.loading) {
            fetchCloudinaryImages();
        }
    }, [isOpen, state.images.length, state.loading, fetchCloudinaryImages]);

    // Filter images based on search
    const filteredImages = state.images.filter(img =>
        img.public_id.toLowerCase().includes(state.searchQuery.toLowerCase())
    );

    const handleSelectImage = (image: CloudinaryImage) => {
        setState(prev => ({ ...prev, selectedId: image.public_id }));
    };

    const handleConfirmSelection = () => {
        const selected = state.images.find(img => img.public_id === state.selectedId);
        if (selected) {
            onSelect(selected.secure_url);
            setIsOpen(false);
            setState(prev => ({ ...prev, selectedId: null, searchQuery: '' }));
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setState(prev => ({ ...prev, selectedId: null, searchQuery: '' }));
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    padding: '8px 16px',
                    backgroundColor: theme.colors.adminAccent,
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    fontFamily: theme.typography.fontBody,
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}
                onMouseOver={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        theme.colors.tealMid;
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        theme.colors.adminAccent;
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
            >
                <Search size={16} />
                Select from Gallery
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                    }}
                    onClick={handleClose}
                >
                    {/* Modal Content */}
                    <div
                        style={{
                            backgroundColor: theme.colors.adminSurface,
                            borderRadius: '12px',
                            border: `1px solid ${theme.colors.adminBorder}`,
                            width: '90%',
                            maxWidth: '900px',
                            maxHeight: '80vh',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                            fontFamily: theme.typography.fontBody,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '24px',
                                borderBottom: `1px solid ${theme.colors.adminBorder}`,
                            }}
                        >
                            <div>
                                <h2 style={{ fontFamily: theme.typography.fontDisplay, fontSize: '18px', fontWeight: 700, color: theme.colors.adminText, margin: 0 }}>
                                    Select Image
                                </h2>
                                <p style={{ fontSize: '12px', color: theme.colors.adminTextMuted, margin: '4px 0 0 0' }}>
                                    Choose from your Cloudinary library
                                </p>
                            </div>
                            <button
                                onClick={handleClose}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: theme.colors.adminTextMuted,
                                    padding: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onMouseOver={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.color = theme.colors.adminText;
                                }}
                                onMouseOut={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.color = theme.colors.adminTextMuted;
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div
                            style={{
                                padding: '16px 24px',
                                borderBottom: `1px solid ${theme.colors.adminBorder}`,
                            }}
                        >
                            <div style={{ position: 'relative' }}>
                                <Search
                                    size={18}
                                    style={{
                                        position: 'absolute',
                                        left: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: theme.colors.adminTextMuted,
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Search images..."
                                    value={state.searchQuery}
                                    onChange={(e) =>
                                        setState(prev => ({ ...prev, searchQuery: e.target.value }))
                                    }
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px 10px 40px',
                                        borderRadius: '8px',
                                        border: `1px solid ${theme.colors.adminBorder}`,
                                        backgroundColor: theme.colors.adminBg,
                                        color: theme.colors.adminText,
                                        fontSize: '14px',
                                        boxSizing: 'border-box',
                                        transition: 'border-color 0.2s ease',
                                    }}
                                    onFocus={(e) => {
                                        (e.currentTarget as HTMLInputElement).style.borderColor =
                                            theme.colors.adminAccent;
                                    }}
                                    onBlur={(e) => {
                                        (e.currentTarget as HTMLInputElement).style.borderColor =
                                            theme.colors.adminBorder;
                                    }}
                                />
                            </div>
                        </div>

                        {/* Content Area */}
                        <div
                            style={{
                                flex: 1,
                                overflow: 'auto',
                                padding: '24px',
                            }}
                        >
                            {state.loading ? (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%',
                                        gap: '12px',
                                    }}
                                >
                                    <Loader size={32} style={{ color: theme.colors.adminAccent, animation: 'spin 1s linear infinite' }} />
                                    <p style={{ color: theme.colors.adminTextMuted, fontSize: '14px' }}>Loading images...</p>
                                </div>
                            ) : state.error ? (
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '16px',
                                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(239, 68, 68, 0.3)',
                                    }}
                                >
                                    <AlertCircle size={20} style={{ color: theme.colors.adminDanger }} />
                                    <div>
                                        <p style={{ fontSize: '14px', color: theme.colors.adminDanger, fontWeight: 500, margin: 0 }}>
                                            Error loading images
                                        </p>
                                        <p style={{ fontSize: '12px', color: '#991B1B', margin: '4px 0 0 0' }}>
                                            {state.error}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => fetchCloudinaryImages()} // Wrap it here
                                        style={{
                                            marginLeft: 'auto',
                                            padding: '6px 12px',
                                            backgroundColor: theme.colors.adminDanger,
                                            color: '#FFFFFF',
                                            border: 'none',
                                            borderRadius: '6px',
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            fontWeight: 500,
                                        }}
                                    >
                                        Retry
                                    </button>
                                </div>
                            ) : filteredImages.length === 0 ? (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%',
                                        gap: '8px',
                                    }}
                                >
                                    <Search size={32} style={{ color: theme.colors.adminTextMuted, opacity: 0.5 }} />
                                    <p style={{ color: theme.colors.adminTextMuted, fontSize: '14px' }}>
                                        {state.searchQuery ? 'No images found matching your search' : 'No images available'}
                                    </p>
                                </div>
                            ) : (
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                                        gap: '16px',
                                    }}
                                >
                                    {filteredImages.map((image) => (
                                        <div
                                            key={image.public_id}
                                            onClick={() => handleSelectImage(image)}
                                            style={{
                                                position: 'relative',
                                                cursor: 'pointer',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                border: `2px solid ${state.selectedId === image.public_id
                                                    ? theme.colors.adminAccent
                                                    : theme.colors.adminBorder
                                                    }`,
                                                transition: 'all 0.2s ease',
                                                backgroundColor: theme.colors.adminBg,
                                            }}
                                            onMouseOver={(e) => {
                                                (e.currentTarget as HTMLDivElement).style.borderColor =
                                                    theme.colors.adminAccent;
                                                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)';
                                            }}
                                            onMouseOut={(e) => {
                                                (e.currentTarget as HTMLDivElement).style.borderColor =
                                                    state.selectedId === image.public_id
                                                        ? theme.colors.adminAccent
                                                        : theme.colors.adminBorder;
                                                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                                            }}
                                        >
                                            {/* Image */}
                                            <img
                                                src={image.secure_url}
                                                alt={image.public_id}
                                                style={{
                                                    width: '100%',
                                                    height: '180px',
                                                    objectFit: 'cover',
                                                    display: 'block',
                                                }}
                                            />

                                            {/* Selection Indicator */}
                                            {state.selectedId === image.public_id && (
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: '40px',
                                                            height: '40px',
                                                            borderRadius: '50%',
                                                            backgroundColor: theme.colors.adminAccent,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        <Check size={24} color="#FFFFFF" />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Hover Overlay with Info */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                    padding: '8px',
                                                    opacity: 0,
                                                    transition: 'opacity 0.2s ease',
                                                    fontSize: '11px',
                                                    color: '#FFFFFF',
                                                }}
                                                onMouseOver={(e) => {
                                                    (e.currentTarget as HTMLDivElement).style.opacity = '1';
                                                }}
                                                onMouseOut={(e) => {
                                                    (e.currentTarget as HTMLDivElement).style.opacity = '0';
                                                }}
                                            >
                                                <p style={{ margin: '0 0 4px 0', fontWeight: 500 }}>
                                                    {image.public_id.split('/').pop()}
                                                </p>
                                                <p style={{ margin: 0, color: theme.colors.adminBorderStrong }}>
                                                    {Math.round(image.bytes / 1024)} KB • {image.width}×{image.height}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Load More - only shown when there's more to fetch and user isn't actively searching */}
                            {!state.loading && state.nextCursor && !state.searchQuery && (
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                    <button
                                        onClick={handleLoadMore}
                                        disabled={state.loadingMore}
                                        style={{
                                            padding: '10px 24px',
                                            backgroundColor: 'transparent',
                                            color: theme.colors.adminText,
                                            border: `1px solid ${theme.colors.adminBorder}`,
                                            borderRadius: '8px',
                                            fontSize: '13px',
                                            fontWeight: 500,
                                            cursor: state.loadingMore ? 'not-allowed' : 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            opacity: state.loadingMore ? 0.6 : 1,
                                        }}
                                    >
                                        {state.loadingMore && (
                                            <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} />
                                        )}
                                        {state.loadingMore ? 'Loading...' : 'Load more images'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                gap: '12px',
                                padding: '24px',
                                borderTop: `1px solid ${theme.colors.adminBorder}`,
                                backgroundColor: theme.colors.adminBg,
                            }}
                        >
                            <button
                                onClick={handleClose}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: 'transparent',
                                    color: theme.colors.adminText,
                                    border: `1px solid ${theme.colors.adminBorder}`,
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseOver={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = theme.colors.adminBg;
                                }}
                                onMouseOut={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmSelection}
                                disabled={!state.selectedId}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: state.selectedId ? theme.colors.adminAccent : theme.colors.adminBorderStrong,
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    cursor: state.selectedId ? 'pointer' : 'not-allowed',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseOver={(e) => {
                                    if (state.selectedId) {
                                        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                                            theme.colors.tealMid;
                                        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (state.selectedId) {
                                        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                                            theme.colors.adminAccent;
                                        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                                    }
                                }}
                            >
                                Confirm Selection
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Global Keyframe Animation */}
            <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </>
    );
};