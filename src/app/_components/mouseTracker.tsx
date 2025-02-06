"use client"
import React, { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

const MorphingCursor = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0
      );
      setIsMobile(isTouchDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent): void => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseDown = useCallback((): void => {
    setIsClicking(true);
  }, []);

  const handleMouseUp = useCallback((): void => {
    setIsClicking(false);
  }, []);

  useEffect(() => {
    // Handle cursor visibility based on device type
    if (isMobile) {
      // Reset to default cursor styles on mobile
      document.body.style.cursor = '';
      document.documentElement.style.cursor = '';
      
      // Remove any existing style tag for cursor hiding
      const existingStyle = document.getElementById('cursor-style');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
      
      return;
    }

    // Desktop behavior
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const interactiveElements = document.querySelectorAll('a, button, input[type="submit"], [role="button"]');
    
    // Add cursor: none to all interactive elements
    interactiveElements.forEach(element => {
      (element as HTMLElement).style.cursor = 'none';
      element.addEventListener('mouseenter', () => setIsHovering(true));
      element.addEventListener('mouseleave', () => setIsHovering(false));
    });

    return () => {
      // Reset cursor styles on cleanup
      document.body.style.cursor = '';
      document.documentElement.style.cursor = '';
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(element => {
        (element as HTMLElement).style.cursor = '';
        element.removeEventListener('mouseenter', () => setIsHovering(true));
        element.removeEventListener('mouseleave', () => setIsHovering(false));
      });
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, isMobile]);

  // Add a style tag to ensure cursor is hidden everywhere (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const style = document.createElement('style');
    style.id = 'cursor-style'; // Add an ID for easy removal
    style.textContent = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById('cursor-style');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, [isMobile]);

  // Don't render custom cursor on mobile
  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[200]">
      <div
        className="fixed rounded-full border transition-all duration-300"
        style={{
          width: isHovering ? '50px' : '30px',
          height: isHovering ? '50px' : '30px',
          borderColor: isHovering ? '#FFD5C2' : '#85472B',
          opacity: 0.3,
          transform: `translate(${position.x - (isHovering ? 25 : 15)}px, ${position.y - (isHovering ? 25 : 15)}px)`,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      />

      <div
        className="fixed transition-all duration-300"
        style={{
          width: isHovering ? '20px' : '12px',
          height: isHovering ? '20px' : '12px',
          backgroundColor: isClicking ? 'rgba(255, 213, 194, 0.9)' : 'rgba(255, 213, 194, 0.7)',
          borderRadius: isHovering ? '2px' : '50%',
          transform: `translate(${position.x - (isHovering ? 10 : 6)}px, ${position.y - (isHovering ? 10 : 6)}px) rotate(${isHovering ? '45deg' : '0deg'})`,
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          mixBlendMode: 'difference'
        }}
      />

      {isHovering && (
        <>
          {[0, 90, 180, 270].map((rotation, index) => (
            <div
              key={index}
              className="fixed bg-[#85472B] rounded-full"
              style={{
                width: '4px',
                height: '4px',
                opacity: 0.5,
                transform: `
                  translate(
                    ${position.x + Math.cos((rotation * Math.PI) / 180) * 20 - 2}px,
                    ${position.y + Math.sin((rotation * Math.PI) / 180) * 20 - 2}px
                  )
                `,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
          ))}
        </>
      )}

      <div
        className="fixed rounded-full bg-[#FFD5C2] mix-blend-difference"
        style={{
          width: '4px',
          height: '4px',
          transform: `translate(${position.x - 2}px, ${position.y - 2}px)`,
          opacity: isHovering ? 0 : 0.9,
          transition: 'opacity 0.2s ease-out'
        }}
      />
    </div>
  );
};

export default MorphingCursor;