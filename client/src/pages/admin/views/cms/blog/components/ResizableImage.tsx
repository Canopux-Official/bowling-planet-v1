// extensions/ResizableImage.tsx
import Image from '@tiptap/extension-image';
import { ReactNodeViewRenderer, NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import React, { useRef, useState } from 'react';

const ResizableImageComponent: React.FC<NodeViewProps> = ({ node, updateAttributes, selected }) => {
  const { src, alt, width } = node.attrs;
  const imgRef = useRef<HTMLImageElement>(null);
  const [dragging, setDragging] = useState(false);

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    const startX = e.clientX;
    const startWidth = imgRef.current?.offsetWidth || 300;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(80, Math.round(startWidth + (moveEvent.clientX - startX)));
      updateAttributes({ width: newWidth });
    };
    const onMouseUp = () => {
      setDragging(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <NodeViewWrapper style={{ display: 'inline-block', position: 'relative', lineHeight: 0 }}>
      <img
        ref={imgRef}
        src={src}
        alt={alt || ''}
        style={{
          width: width ? `${width}px` : '100%',
          maxWidth: '100%',
          display: 'block',
          borderRadius: '6px',
          outline: selected ? '2px solid #3b82f6' : 'none',
          outlineOffset: '2px',
        }}
      />
      {selected && (
        <div
          onMouseDown={startResize}
          style={{
            position: 'absolute', right: -6, bottom: -6, width: 14, height: 14,
            backgroundColor: '#3b82f6', borderRadius: '50%',
            cursor: 'nwse-resize', border: '2px solid white',
            opacity: dragging ? 1 : 0.85,
          }}
        />
      )}
    </NodeViewWrapper>
  );
};

export const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        renderHTML: (attributes) => ({
          width: attributes.width,
          style: attributes.width ? `width: ${attributes.width}px` : null,
        }),
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
});