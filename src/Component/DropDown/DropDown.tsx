import React, { useEffect, useState, ReactNode } from 'react';

function DropDownToggle({ onClick, children, toggled }) {
  return (
    <div
      className="DropDownToggle"
      style={{
        userSelect: 'none',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function DropDownOverlay({ children }) {
  return (
    <div
      style={{
        position: 'absolute',
        minWidth: 180,
        top: 'calc(100% + 6px)',
        // left: '0%',
        // transform: 'translate(0, 0)',
      }}
      className="DropDownOverlay"
    >
      {children}
    </div>
  );
}

interface DropDownProps {
  toggle: (show: boolean) => ReactNode;
  overlay: ReactNode;
  className?: string;
  position?: 'center' | 'right';
}

export function AppDropDown({
  toggle,
  overlay,
  className = '',
  position = 'center',
}: DropDownProps) {
  const [show, setShow] = useState(false);

  const checkClickInOverlay = (element: HTMLElement): boolean => {
    if (!element) {
      return false;
    }
    if (element === window.document.body) {
      return false;
    }
    if (
      element.className &&
      element.className.indexOf &&
      element.className.indexOf('DropDownOverlay') >= 0
    ) {
      return true;
    }
    return checkClickInOverlay(element.parentElement);
  };

  useEffect(() => {
    const onClickOutSide = (e: MouseEvent) => {
      if (checkClickInOverlay(e.target as HTMLElement)) {
        return;
      }
      if (show) {
        setTimeout(() => {
          setShow(false);
        });
      }
    };
    window.document.addEventListener('click', onClickOutSide);
    return function cleanup() {
      window.document.removeEventListener('click', onClickOutSide);
    };
  }, [show]);

  return (
    <div
      style={{
        position: 'relative',
      }}
      className={`AppDropDown ${className} ${position}`}
    >
      <DropDownToggle toggled={show} onClick={() => setShow(true)}>
        {toggle(show)}
      </DropDownToggle>

      {show && <DropDownOverlay>{overlay}</DropDownOverlay>}
    </div>
  );
}
