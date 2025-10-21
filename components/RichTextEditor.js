// components/RichTextEditor.tsx
'use client';

import { useState, useRef, useEffect } from 'react';


export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Enter your text here...",
  rows = 10 
}) {
  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command, value = '') => {
    document.execCommand('styleWithCSS', false, 'true');
    document.execCommand(command, false, value);
    handleInput();
    editorRef.current?.focus();
  };

    const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
    handleInput();
  };

  const formatHeading = (level) => {
    document.execCommand('formatBlock', false, `h${level}`);
    handleInput();
    editorRef.current?.focus();
  };

  const ToolbarButton = ({ 
    onClick, 
    children, 
    title,
    active = false
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded transition-colors min-w-[40px] flex items-center justify-center text-sm font-medium ${
        active 
          ? 'bg-blue-500 text-white' 
          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-3 flex flex-wrap gap-2 bg-gray-50 rounded-t-lg">
        {/* Headings */}
        <div className="flex gap-1">
          <ToolbarButton 
            onClick={() => formatHeading(1)} 
            title="Heading 1"
          >
            H1
          </ToolbarButton>
          <ToolbarButton 
            onClick={() => formatHeading(2)} 
            title="Heading 2"
          >
            H2
          </ToolbarButton>
          <ToolbarButton 
            onClick={() => formatHeading(3)} 
            title="Heading 3"
          >
            H3
          </ToolbarButton>
        </div>

        <div className="w-px h-8 bg-gray-300"></div>

        {/* Text Formatting */}
        <div className="flex gap-1">
          <ToolbarButton 
            onClick={() => execCommand('bold')} 
            title="Bold"
          >
            <span className="font-bold text-base">B</span>
          </ToolbarButton>
          
          <ToolbarButton 
            onClick={() => execCommand('italic')} 
            title="Italic"
          >
            <span className="italic text-base">I</span>
          </ToolbarButton>
          
          <ToolbarButton 
            onClick={() => execCommand('underline')} 
            title="Underline"
          >
            <span className="underline text-base">U</span>
          </ToolbarButton>
        </div>

        <div className="w-px h-8 bg-gray-300"></div>

        {/* Lists */}
        <div className="flex gap-1">
          <ToolbarButton 
            onClick={() => execCommand('insertUnorderedList')} 
            title="Bullet List"
          >
            <span className="text-base">• List</span>
          </ToolbarButton>
          
          <ToolbarButton 
            onClick={() => execCommand('insertOrderedList')} 
            title="Numbered List"
          >
            <span className="text-base">1. List</span>
          </ToolbarButton>
        </div>

        <div className="w-px h-8 bg-gray-300"></div>

        {/* Alignment */}
        <div className="flex gap-1">
          <ToolbarButton 
            onClick={() => execCommand('justifyLeft')} 
            title="Align Left"
          >
            ⬅
          </ToolbarButton>
          <ToolbarButton 
            onClick={() => execCommand('justifyCenter')} 
            title="Align Center"
          >
            ↔
          </ToolbarButton>
          <ToolbarButton 
            onClick={() => execCommand('justifyRight')} 
            title="Align Right"
          >
            ➡
          </ToolbarButton>
        </div>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`p-4 min-h-[200px] outline-none bg-white rounded-b-lg rich-text-editor ${
          isFocused ? 'ring-0' : ''
        }`}
        style={{ 
          minHeight: `${rows * 24}px`,
          lineHeight: '1.6'
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />
    </div>
  );
}