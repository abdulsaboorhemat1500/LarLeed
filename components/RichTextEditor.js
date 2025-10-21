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

  const ToolbarButton = ({ 
    onClick, 
    children, 
    title 
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="p-2 rounded hover:bg-gray-200 transition-colors"
    >
      {children}
    </button>
  );

  return (
    <div className="border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1 bg-gray-50 rounded-t-lg">
        <ToolbarButton 
          onClick={() => execCommand('bold')} 
          title="Bold"
        >
          <span className="font-bold">B</span>
        </ToolbarButton>
        
        <ToolbarButton 
          onClick={() => execCommand('italic')} 
          title="Italic"
        >
          <span className="italic">I</span>
        </ToolbarButton>
        
        <ToolbarButton 
          onClick={() => execCommand('underline')} 
          title="Underline"
        >
          <span className="underline">U</span>
        </ToolbarButton>
        
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        
        <ToolbarButton 
          onClick={() => execCommand('insertUnorderedList')} 
          title="Bullet List"
        >
          <span>• List</span>
        </ToolbarButton>
        
        <ToolbarButton 
          onClick={() => execCommand('insertOrderedList')} 
          title="Numbered List"
        >
          <span>1. List</span>
        </ToolbarButton>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`p-3 min-h-[${rows * 24}px] outline-none bg-white rounded-b-lg ${
          isFocused ? 'ring-0' : ''
        }`}
        style={{ 
          minHeight: `${rows * 24}px`,
          lineHeight: '1.5'
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />
    </div>
  );
}