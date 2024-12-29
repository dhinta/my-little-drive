import { ALT_C } from '@/common/models';
import { useEffect, useState } from 'react';

export function useMenuShortcut() {
  const [keyboardShortcutCode, setKeyboardShortcutCode] = useState('');

  useEffect(() => {
    const setKeyboardShortcut = (e: KeyboardEvent) => {
      const char = e.key.toUpperCase();
      if (e.altKey && char === 'C') {
        setKeyboardShortcutCode(ALT_C);
        return;
      }

      if (char === 'F' || char === 'D') {
        setKeyboardShortcutCode(text => `${text}-${char}`);
        e.preventDefault();
      }
    };

    const releaseKeyboardShortcut = () => setKeyboardShortcutCode('');

    document.addEventListener('keydown', setKeyboardShortcut);
    document.addEventListener('keyup', releaseKeyboardShortcut);

    return () => {
      document.removeEventListener('keydown', setKeyboardShortcut);
      document.removeEventListener('keyup', releaseKeyboardShortcut);
    };
  }, []);

  return [keyboardShortcutCode, setKeyboardShortcutCode] as const;
}
