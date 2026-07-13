// import React, { useCallback, useRef } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Underline from '@tiptap/extension-underline';
// import Link from '@tiptap/extension-link';
// import Placeholder from '@tiptap/extension-placeholder';
// import {
//   Bold, Italic, UnderlineIcon, Heading2, Heading3, List, ListOrdered,
//   Quote, Link as LinkIcon, Image as ImageIcon, Undo, Redo, Code,
// } from 'lucide-react';
// import { useToast } from '../../../../components/Toast';
// import { ResizableImage } from './ResizableImage';
// import { blogService } from '../services';
// import { theme } from '../../../../../../theme';


// interface Props {
//   content: string;
//   onChange: (html: string) => void;
// }

// export const RichTextEditor: React.FC<Props> = ({ content, onChange }) => {
//   const { showToast } = useToast();
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       Link.configure({ openOnClick: false }),
//       ResizableImage,
//       Placeholder.configure({ placeholder: 'Start writing your blog...' }),
//     ],
//     content,
//     onUpdate: ({ editor }) => onChange(editor.getHTML()),
//     editorProps: {
//       attributes: { style: 'min-height: 400px; outline: none; padding: 16px;' },
//       handleDrop: (_view, event) => {
//         const file = event.dataTransfer?.files?.[0];
//         if (file && file.type.startsWith('image/')) {
//           event.preventDefault();
//           uploadAndInsert(file);
//           return true;
//         }
//         return false;
//       },
//       handlePaste: (_view, event) => {
//         const file = Array.from(event.clipboardData?.files || []).find((f) => f.type.startsWith('image/'));
//         if (file) {
//           event.preventDefault();
//           uploadAndInsert(file);
//           return true;
//         }
//         return false;
//       },
//     },
//   });

//   const uploadAndInsert = useCallback(async (file: File) => {
//     try {
//       const res = await blogService.uploadImage(file);
//       editor?.chain().focus().setImage({ src: res.data.url }).run();
//     } catch (err: any) {
//       showToast('error', err.message || 'Failed to upload image');
//     }
//   }, [editor, showToast]);

//   const handleToolbarImageClick = () => fileInputRef.current?.click();
//   const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) uploadAndInsert(file);
//     e.target.value = '';
//   };

//   const setLink = () => {
//     const url = window.prompt('Enter URL');
//     if (url) editor?.chain().focus().setLink({ href: url }).run();
//   };

//   if (!editor) return null;

//   return (
//     <div style={{ border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '8px', overflow: 'hidden' }}>
//       <div style={toolbarStyle}>
//         <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}><Bold size={16} /></ToolBtn>
//         <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}><Italic size={16} /></ToolBtn>
//         <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')}><UnderlineIcon size={16} /></ToolBtn>
//         <Divider />
//         <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}><Heading2 size={16} /></ToolBtn>
//         <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}><Heading3 size={16} /></ToolBtn>
//         <Divider />
//         <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}><List size={16} /></ToolBtn>
//         <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}><ListOrdered size={16} /></ToolBtn>
//         <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}><Quote size={16} /></ToolBtn>
//         <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')}><Code size={16} /></ToolBtn>
//         <Divider />
//         <ToolBtn onClick={setLink} active={editor.isActive('link')}><LinkIcon size={16} /></ToolBtn>
//         <ToolBtn onClick={handleToolbarImageClick}><ImageIcon size={16} /></ToolBtn>
//         <Divider />
//         <ToolBtn onClick={() => editor.chain().focus().undo().run()}><Undo size={16} /></ToolBtn>
//         <ToolBtn onClick={() => editor.chain().focus().redo().run()}><Redo size={16} /></ToolBtn>
//         <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelected} style={{ display: 'none' }} />
//       </div>
//       <div style={{ backgroundColor: 'rgba(0,0,0,0.1)', color: theme.colors.adminText }}>
//         <EditorContent editor={editor} />
//       </div>
//     </div>
//   );
// };

// const ToolBtn: React.FC<{ onClick: () => void; active?: boolean; children: React.ReactNode }> = ({ onClick, active, children }) => (
//   <button type="button" onClick={onClick} style={{ ...toolBtnStyle, backgroundColor: active ? '#3b82f6' : 'transparent', color: active ? 'white' : theme.colors.adminText }}>
//     {children}
//   </button>
// );
// const Divider = () => <div style={{ width: '1px', backgroundColor: theme.colors.adminBorder, margin: '0 4px' }} />;

// const toolbarStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '2px', padding: '8px', borderBottom: `1px solid ${theme.colors.adminBorder}`, flexWrap: 'wrap' };
// const toolBtnStyle: React.CSSProperties = { border: 'none', borderRadius: '6px', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' };


import React, { useCallback, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold, Italic, UnderlineIcon, Heading2, Heading3, List, ListOrdered,
  Quote, Link as LinkIcon, Image as ImageIcon, Undo, Redo, Code,
  AlignLeft, AlignCenter, AlignRight,
} from 'lucide-react';
import { useToast } from '../../../../components/Toast';
import { ResizableImage } from './ResizableImage';
import { blogService } from '../services';
import { theme } from '../../../../../../theme';


interface Props {
  content: string;
  onChange: (html: string) => void;
}

export const RichTextEditor: React.FC<Props> = ({ content, onChange }) => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      ResizableImage,
      Placeholder.configure({ placeholder: 'Start writing your blog...' }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'blog-editor-content',
        style: 'min-height: 400px; outline: none; padding: 16px;',
      },
      handleDrop: (_view, event) => {
        const file = event.dataTransfer?.files?.[0];
        if (file && file.type.startsWith('image/')) {
          event.preventDefault();
          uploadAndInsert(file);
          return true;
        }
        return false;
      },
      handlePaste: (_view, event) => {
        const file = Array.from(event.clipboardData?.files || []).find((f) => f.type.startsWith('image/'));
        if (file) {
          event.preventDefault();
          uploadAndInsert(file);
          return true;
        }
        return false;
      },
    },
  });

  const uploadAndInsert = useCallback(async (file: File) => {
    try {
      const res = await blogService.uploadImage(file);
      editor?.chain().focus().setImage({ src: res.data.url }).run();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to upload image');
    }
  }, [editor, showToast]);

  const handleToolbarImageClick = () => fileInputRef.current?.click();
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadAndInsert(file);
    e.target.value = '';
  };

  const setLink = () => {
    const url = window.prompt('Enter URL');
    if (url) editor?.chain().focus().setLink({ href: url }).run();
  };

  // New: image alignment — only meaningful when an image node is selected
  const setImageAlign = (align: 'left' | 'center' | 'right') => {
    const value = align === 'center' ? 'none' : align; // 'none' = centered/block, matches extension default
    editor?.chain().focus().updateAttributes('image', { align: value }).run();
  };

  if (!editor) return null;

  const isImageSelected = editor.isActive('image');

  return (
    <div style={{ border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '8px', overflow: 'hidden' }}>
      <div style={toolbarStyle}>
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}><Bold size={16} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}><Italic size={16} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')}><UnderlineIcon size={16} /></ToolBtn>
        <Divider />
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}><Heading2 size={16} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}><Heading3 size={16} /></ToolBtn>
        <Divider />
        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}><List size={16} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}><ListOrdered size={16} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}><Quote size={16} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')}><Code size={16} /></ToolBtn>
        <Divider />
        <ToolBtn onClick={setLink} active={editor.isActive('link')}><LinkIcon size={16} /></ToolBtn>
        <ToolBtn onClick={handleToolbarImageClick}><ImageIcon size={16} /></ToolBtn>

        {/* Image alignment — only usable when an image is selected */}
        <ToolBtn onClick={() => setImageAlign('left')} active={editor.isActive('image', { align: 'left' })} disabled={!isImageSelected}><AlignLeft size={16} /></ToolBtn>
        <ToolBtn onClick={() => setImageAlign('center')} active={editor.isActive('image', { align: 'none' })} disabled={!isImageSelected}><AlignCenter size={16} /></ToolBtn>
        <ToolBtn onClick={() => setImageAlign('right')} active={editor.isActive('image', { align: 'right' })} disabled={!isImageSelected}><AlignRight size={16} /></ToolBtn>

        <Divider />
        <ToolBtn onClick={() => editor.chain().focus().undo().run()}><Undo size={16} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().redo().run()}><Redo size={16} /></ToolBtn>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelected} style={{ display: 'none' }} />
      </div>

      {/* Editor content area — styled to match the dark public-facing site */}
      <div className="blog-editor-wrapper">
        <EditorContent editor={editor} />
      </div>

      {/* Global styles for the editor content: headings, spacing, dark theme */}
      <style>{`
        .blog-editor-wrapper {
          background-color: #0a0a0a;
          color: #e5e5e5;
        }
        .blog-editor-content {
          font-family: ${theme.typography.fontBody};
        }
        .blog-editor-content {
          max-width: 820px;   /* matches the live article width so wrapping previews accurately */
          margin: 0 auto;
        }
        .blog-editor-content ul {
          list-style-type: disc;
          list-style-position: outside;
        }
        .blog-editor-content ol {
          list-style-type: decimal;
          list-style-position: outside;
        }
        .blog-editor-content h2,
        .blog-editor-content h3,
        .blog-editor-content ul,
        .blog-editor-content ol,
        .blog-editor-content blockquote,
        .blog-editor-content pre {
          clear: both;   /* these elements always start below a floated image, never beside it */
        }
        .blog-editor-content p {
          margin: 0 0 14px 0;
          line-height: 1.7;
          color: #d4d4d4;
        }
        .blog-editor-content h2 {
          font-size: 26px;
          font-weight: 700;
          margin: 28px 0 12px 0;
          color: #ffffff;
          line-height: 1.3;
        }
        .blog-editor-content h3 {
          font-size: 20px;
          font-weight: 600;
          margin: 22px 0 10px 0;
          color: #ffffff;
          line-height: 1.3;
        }
        .blog-editor-content ul,
        .blog-editor-content ol {
          margin: 0 0 14px 0;
          padding-left: 24px;
          color: #d4d4d4;
        }
        .blog-editor-content li {
          margin-bottom: 6px;
        }
        .blog-editor-content blockquote {
          border-left: 3px solid #3b82f6;
          margin: 18px 0;
          padding: 4px 0 4px 16px;
          color: #a3a3a3;
          font-style: italic;
        }
        .blog-editor-content pre {
          background-color: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 6px;
          padding: 12px 16px;
          margin: 16px 0;
          overflow-x: auto;
          font-size: 13px;
        }
        .blog-editor-content code {
          background-color: #1a1a1a;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 13px;
        }
        .blog-editor-content a {
          color: #60a5fa;
          text-decoration: underline;
        }
        .blog-editor-content::after {
          content: '';
          display: table;
          clear: both; /* prevents floated images from collapsing the container */
        }
        .blog-editor-content p.is-editor-empty:first-child::before {
          color: #6b6b6b;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
          
      `}</style>
    </div>
  );
};

const ToolBtn: React.FC<{ onClick: () => void; active?: boolean; disabled?: boolean; children: React.ReactNode }> = ({ onClick, active, disabled, children }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    style={{
      ...toolBtnStyle,
      backgroundColor: active ? '#3b82f6' : 'transparent',
      color: disabled ? '#525252' : active ? 'white' : theme.colors.adminText,
      opacity: disabled ? 0.4 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
    }}
  >
    {children}
  </button>
);
const Divider = () => <div style={{ width: '1px', backgroundColor: theme.colors.adminBorder, margin: '0 4px' }} />;

const toolbarStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '2px', padding: '8px', borderBottom: `1px solid ${theme.colors.adminBorder}`, flexWrap: 'wrap', backgroundColor: theme.colors.adminSurface };
const toolBtnStyle: React.CSSProperties = { border: 'none', borderRadius: '6px', padding: '6px', display: 'flex', alignItems: 'center' };
