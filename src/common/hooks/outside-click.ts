import { RefObject, useEffect } from 'react';

export function useOutsideClick(
  ref: RefObject<HTMLElement>,
  callback: () => void,
) {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (ref.current && !ref.current.contains(target)) {
        callback();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, [callback, ref]);
}
