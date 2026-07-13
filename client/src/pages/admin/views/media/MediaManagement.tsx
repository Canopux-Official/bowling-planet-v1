import React, { useState, useEffect, useCallback } from 'react';
import { Search, Loader, AlertCircle, Trash2, ImageOff, CheckCircle2, XCircle } from 'lucide-react';
import { apiClient } from '../../../../services/apiClient';
import { theme } from '../../../../theme';


interface CloudinaryImage {
    public_id: string;
    secure_url: string;
    width: number;
    height: number;
    bytes: number;
    created_at: string;
    format: string;
    inUse: boolean;
}

interface MediaState {
    images: CloudinaryImage[];
    loading: boolean;
    loadingMore: boolean;
    error: string | null;
    searchQuery: string;
    nextCursor: string | null;
    filter: 'all' | 'used' | 'unused';
    deletingId: string | null;
    confirmDeleteId: string | null;
}

export const MediaManagement: React.FC = () => {
    const [state, setState] = useState<MediaState>({
        images: [],
        loading: false,
        loadingMore: false,
        error: null,
        searchQuery: '',
        nextCursor: null,
        filter: 'all',
        deletingId: null,
        confirmDeleteId: null,
    });

    const fetchImages = useCallback(async (cursor?: string) => {
        setState(prev => ({
            ...prev,
            loading: !cursor,
            loadingMore: !!cursor,
            error: null,
        }));
        try {
            const params = new URLSearchParams();
            if (cursor) params.set('cursor', cursor);

            const data = await apiClient(`/cloudinary/images?${params.toString()}`, {
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
    }, []);

    useEffect(() => {
        fetchImages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLoadMore = () => {
        if (state.nextCursor && !state.loadingMore) {
            fetchImages(state.nextCursor);
        }
    };

    const handleDelete = async (publicId: string) => {
        setState(prev => ({ ...prev, deletingId: publicId, confirmDeleteId: null }));
        try {
            await apiClient(`/cloudinary/images/${encodeURIComponent(publicId)}`, {
                method: 'DELETE',
            });
            setState(prev => ({
                ...prev,
                images: prev.images.filter(img => img.public_id !== publicId),
                deletingId: null,
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                error: err instanceof Error ? err.message : 'Failed to delete image',
                deletingId: null,
            }));
        }
    };

    const filteredImages = state.images.filter(img => {
        const matchesSearch = img.public_id.toLowerCase().includes(state.searchQuery.toLowerCase());
        const matchesFilter =
            state.filter === 'all' ? true :
            state.filter === 'used' ? img.inUse :
            !img.inUse;
        return matchesSearch && matchesFilter;
    });

    const usedCount = state.images.filter(i => i.inUse).length;
    const unusedCount = state.images.length - usedCount;

    return (
        <div>
            {/* Page Header */}
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '26px', fontWeight: 700, color: theme.colors.adminText, margin: '0 0 4px 0', letterSpacing: '-0.4px' }}>
                    Media Management
                </h1>
                <p style={{ color: theme.colors.adminTextMuted, margin: 0, fontSize: '14px' }}>
                    Browse and clean up images stored in Cloudinary.
                </p>
            </div>

            {/* Controls Bar */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '20px',
                    flexWrap: 'wrap',
                }}
            >
                {/* Search */}
                <div style={{ position: 'relative', flex: '1 1 260px', minWidth: '220px' }}>
                    <Search
                        size={16}
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
                        placeholder="Search by public ID..."
                        value={state.searchQuery}
                        onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
                        style={{
                            width: '100%',
                            padding: '10px 12px 10px 38px',
                            borderRadius: '8px',
                            border: `1px solid ${theme.colors.adminBorder}`,
                            backgroundColor: theme.colors.adminSurface,
                            color: theme.colors.adminText,
                            fontSize: '14px',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>

                {/* Filter Tabs */}
                <div style={{ display: 'flex', gap: '8px' }}>
                    {(['all', 'used', 'unused'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setState(prev => ({ ...prev, filter: f }))}
                            style={{
                                padding: '8px 14px',
                                borderRadius: '8px',
                                border: `1px solid ${state.filter === f ? theme.colors.adminAccent : theme.colors.adminBorder}`,
                                backgroundColor: state.filter === f ? theme.colors.adminAccent : 'transparent',
                                color: state.filter === f ? '#FFFFFF' : theme.colors.adminText,
                                fontSize: '13px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                textTransform: 'capitalize',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {f === 'all' ? `All (${state.images.length})` : f === 'used' ? `In Use (${usedCount})` : `Unused (${unusedCount})`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            {state.loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: '12px' }}>
                    <Loader size={32} style={{ color: theme.colors.adminAccent, animation: 'spin 1s linear infinite' }} />
                    <p style={{ color: theme.colors.adminTextMuted, fontSize: '14px' }}>Loading media library...</p>
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
                        <p style={{ fontSize: '14px', color: theme.colors.adminDanger, fontWeight: 500, margin: 0 }}>Error</p>
                        <p style={{ fontSize: '12px', color: '#991B1B', margin: '4px 0 0 0' }}>{state.error}</p>
                    </div>
                    <button
                        onClick={() => fetchImages()}
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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: '8px' }}>
                    <ImageOff size={32} style={{ color: theme.colors.adminTextMuted, opacity: 0.5 }} />
                    <p style={{ color: theme.colors.adminTextMuted, fontSize: '14px' }}>
                        {state.searchQuery ? 'No images found matching your search' : 'No images in this category'}
                    </p>
                </div>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '18px',
                    }}
                >
                    {filteredImages.map((image) => (
                        <div
                            key={image.public_id}
                            style={{
                                position: 'relative',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                border: `1px solid ${theme.colors.adminBorder}`,
                                backgroundColor: theme.colors.adminSurface,
                                transition: 'box-shadow 0.2s ease',
                            }}
                        >
                            {/* Image */}
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={image.secure_url}
                                    alt={image.public_id}
                                    style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
                                />

                                {/* Status Tag */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '8px',
                                        left: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        padding: '4px 8px',
                                        borderRadius: '999px',
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        backgroundColor: image.inUse ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                        color: image.inUse ? '#16A34A' : '#DC2626',
                                        backdropFilter: 'blur(4px)',
                                    }}
                                >
                                    {image.inUse ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                    {image.inUse ? 'In Use' : 'Unused'}
                                </div>

                                {/* Delete Button */}
                                <button
                                    onClick={() => setState(prev => ({ ...prev, confirmDeleteId: image.public_id }))}
                                    disabled={image.inUse || state.deletingId === image.public_id}
                                    title={image.inUse ? 'Cannot delete — image is currently in use' : 'Delete image'}
                                    style={{
                                        position: 'absolute',
                                        top: '8px',
                                        right: '8px',
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        border: 'none',
                                        backgroundColor: image.inUse ? 'rgba(0,0,0,0.25)' : 'rgba(239, 68, 68, 0.9)',
                                        color: '#FFFFFF',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: image.inUse ? 'not-allowed' : 'pointer',
                                        opacity: state.deletingId === image.public_id ? 0.6 : 1,
                                    }}
                                >
                                    {state.deletingId === image.public_id ? (
                                        <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} />
                                    ) : (
                                        <Trash2 size={14} />
                                    )}
                                </button>
                            </div>

                            {/* Info */}
                            <div style={{ padding: '10px 12px' }}>
                                <p
                                    style={{
                                        margin: '0 0 4px 0',
                                        fontSize: '12px',
                                        fontWeight: 500,
                                        color: theme.colors.adminText,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                    title={image.public_id}
                                >
                                    {image.public_id.split('/').pop()}
                                </p>
                                <p style={{ margin: 0, fontSize: '11px', color: theme.colors.adminTextMuted }}>
                                    {Math.round(image.bytes / 1024)} KB • {image.width}×{image.height}
                                </p>
                            </div>

                            {/* Confirm Delete Overlay */}
                            {state.confirmDeleteId === image.public_id && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        backgroundColor: 'rgba(0,0,0,0.75)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        padding: '16px',
                                        textAlign: 'center',
                                    }}
                                >
                                    <p style={{ color: '#FFFFFF', fontSize: '13px', margin: 0 }}>
                                        Delete this image permanently?
                                    </p>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            onClick={() => setState(prev => ({ ...prev, confirmDeleteId: null }))}
                                            style={{
                                                padding: '6px 12px',
                                                borderRadius: '6px',
                                                border: `1px solid ${theme.colors.adminBorder}`,
                                                backgroundColor: 'transparent',
                                                color: '#FFFFFF',
                                                fontSize: '12px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => handleDelete(image.public_id)}
                                            style={{
                                                padding: '6px 12px',
                                                borderRadius: '6px',
                                                border: 'none',
                                                backgroundColor: theme.colors.adminDanger,
                                                color: '#FFFFFF',
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Load More */}
            {!state.loading && state.nextCursor && !state.searchQuery && state.filter === 'all' && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
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
                        {state.loadingMore && <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} />}
                        {state.loadingMore ? 'Loading...' : 'Load more images'}
                    </button>
                </div>
            )}

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};
