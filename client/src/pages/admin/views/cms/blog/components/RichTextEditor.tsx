import React, { useCallback, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold, Italic, UnderlineIcon, Heading2, Heading3, List, ListOrdered,
  Quote, Link as LinkIcon, Image as ImageIcon, Undo, Redo, Code,
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
      attributes: { style: 'min-height: 400px; outline: none; padding: 16px;' },
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

  if (!editor) return null;

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
        <Divider />
        <ToolBtn onClick={() => editor.chain().focus().undo().run()}><Undo size={16} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().redo().run()}><Redo size={16} /></ToolBtn>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelected} style={{ display: 'none' }} />
      </div>
      <div style={{ backgroundColor: 'rgba(0,0,0,0.1)', color: theme.colors.adminText }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

const ToolBtn: React.FC<{ onClick: () => void; active?: boolean; children: React.ReactNode }> = ({ onClick, active, children }) => (
  <button type="button" onClick={onClick} style={{ ...toolBtnStyle, backgroundColor: active ? '#3b82f6' : 'transparent', color: active ? 'white' : theme.colors.adminText }}>
    {children}
  </button>
);
const Divider = () => <div style={{ width: '1px', backgroundColor: theme.colors.adminBorder, margin: '0 4px' }} />;

const toolbarStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '2px', padding: '8px', borderBottom: `1px solid ${theme.colors.adminBorder}`, flexWrap: 'wrap' };
const toolBtnStyle: React.CSSProperties = { border: 'none', borderRadius: '6px', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' };