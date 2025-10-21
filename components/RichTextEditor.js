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
  const [lastSelection, setLastSelection] = useState(null);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  // Save selection when editor loses focus
  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setLastSelection(selection.getRangeAt(0));
    }
  };

  // Restore selection when editor gains focus
  const restoreSelection = () => {
    if (lastSelection && editorRef.current) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(lastSelection);
      }
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    restoreSelection();
  };

  const handleBlur = () => {
    setIsFocused(false);
    saveSelection();
  };

  const execCommand = (command, value = '') => {
    // Ensure editor is focused
    editorRef.current?.focus();
    
    // Save current selection
    saveSelection();
    
    // Execute command
    document.execCommand('styleWithCSS', false, 'true');
    document.execCommand(command, false, value);
    
    // Update content
    handleInput();
    
    // Restore focus to editor
    editorRef.current?.focus();
  };

  const formatHeading = (level) => {
    editorRef.current?.focus();
    saveSelection();
    document.execCommand('formatBlock', false, `h${level}`);
    handleInput();
    editorRef.current?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
    handleInput();
  };

  const handleMouseUp = () => {
    saveSelection();
  };

  const handleKeyUp = () => {
    saveSelection();
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
      className="p-2 rounded transition-colors min-w-[40px] flex items-center justify-center text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
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

        {/* Clear Formatting */}
        <div className="w-px h-8 bg-gray-300"></div>
        
        <ToolbarButton 
          onClick={() => execCommand('removeFormat')} 
          title="Clear Formatting"
        >
          Clear
        </ToolbarButton>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseUp={handleMouseUp}
        onKeyUp={handleKeyUp}
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
      
      {/* Instructions */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
        💡 <strong>Tip:</strong> Select text first, then click formatting buttons. Or click buttons first to apply to new text.
      </div>
    </div>
  );
} 