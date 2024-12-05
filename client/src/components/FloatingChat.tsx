import React, { useState, useRef, useEffect } from 'react';
import '../index.css';
import Chat from '../pages/Chat';

const FloatingChat = ({ onClose }: { onClose: () => void }) => {
  const [size, setSize] = useState({ width: 300, height: 400 });
  const [position, setPosition] = useState({ top: 20, left: 20 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const chatWindowRef = useRef<HTMLDivElement | null>(null);

  const MIN_SIZE = 150; // Minimum size for the chat window

  // Handle mouse events for resizing
  const startResizing = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    setIsResizing(true);
    setResizeDirection(direction);
  };

  const handleResize = (e: MouseEvent) => {
    if (!isResizing || !chatWindowRef.current) return;

    const rect = chatWindowRef.current.getBoundingClientRect();
    let newWidth = size.width;
    let newHeight = size.height;
    let newTop = position.top;
    let newLeft = position.left;

    // Calculate the new size and position based on the resizing direction
    switch (resizeDirection) {
      case 'top-left':
        newWidth = rect.right - e.clientX;
        newHeight = rect.bottom - e.clientY;
        newTop = e.clientY;
        newLeft = e.clientX;
        break;
      case 'top-right':
        newWidth = e.clientX - rect.left;
        newHeight = rect.bottom - e.clientY;
        newTop = e.clientY;
        break;
      case 'bottom-left':
        newWidth = rect.right - e.clientX;
        newHeight = e.clientY - rect.top;
        newLeft = e.clientX;
        break;
      case 'bottom-right':
        newWidth = e.clientX - rect.left;
        newHeight = e.clientY - rect.top;
        break;
      case 'top':
        newHeight = rect.bottom - e.clientY;
        newTop = e.clientY;
        break;
      case 'bottom':
        newHeight = e.clientY - rect.top;
        break;
      case 'left':
        newWidth = rect.right - e.clientX;
        newLeft = e.clientX;
        break;
      case 'right':
        newWidth = e.clientX - rect.left;
        break;
      default:
        break;
    }

    // Apply minimum size constraints
    newWidth = Math.max(newWidth, MIN_SIZE);
    newHeight = Math.max(newHeight, MIN_SIZE);

    // Apply maximum size constraints to ensure the window doesn't go out of bounds
    newWidth = Math.min(newWidth, window.innerWidth - rect.left);
    newHeight = Math.min(newHeight, window.innerHeight - rect.top);

    setSize({ width: newWidth, height: newHeight });
    setPosition({ top: newTop, left: newLeft });
  };

  const stopResizing = () => {
    setIsResizing(false);
    setResizeDirection(null);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', stopResizing);
    } else {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResizing);
    }

    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing]);

  return (
    <div
      ref={chatWindowRef}
      className="floating-chat"
      style={{ width: size.width, height: size.height, top: position.top, left: position.left }}
    >
      <div className="floating-chat-header">
        <button onClick={onClose}>Close</button>
      </div>
      <div className="floating-chat-body">
        <Chat user={{ username: 'defaultUser' }} />
      </div>

      {/* Resize handles for all sides */}
      <div
        className="floating-chat-resizer top-left"
        onMouseDown={(e) => startResizing(e, 'top-left')}
      />
      <div
        className="floating-chat-resizer top-right"
        onMouseDown={(e) => startResizing(e, 'top-right')}
      />
      <div
        className="floating-chat-resizer bottom-left"
        onMouseDown={(e) => startResizing(e, 'bottom-left')}
      />
      <div
        className="floating-chat-resizer bottom-right"
        onMouseDown={(e) => startResizing(e, 'bottom-right')}
      />
      <div
        className="floating-chat-resizer top"
        onMouseDown={(e) => startResizing(e, 'top')}
      />
      <div
        className="floating-chat-resizer bottom"
        onMouseDown={(e) => startResizing(e, 'bottom')}
      />
      <div
        className="floating-chat-resizer left"
        onMouseDown={(e) => startResizing(e, 'left')}
      />
      <div
        className="floating-chat-resizer right"
        onMouseDown={(e) => startResizing(e, 'right')}
      />
    </div>
  );
};

export default FloatingChat;
