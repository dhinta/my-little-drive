import { ALT_C } from '@/common/models';
import { useEffect, useState } from 'react';

export function useMenuShortcut(chars: string[] = []) {
  const [keyboardShortcutCode, setKeyboardShortcutCode] = useState('');

  useEffect(() => {
    const setKeyboardShortcut = (e: KeyboardEvent) => {
      const char = e.key.toUpperCase();
      if (e.altKey && char === 'C') {
        setKeyboardShortcutCode(ALT_C);
        return;
      }

      if (chars.includes(char) && keyboardShortcutCode === ALT_C) {
        setKeyboardShortcutCode(text => `${text}-${char}`);
        e.preventDefault();
      }
    };

    const releaseKeyboardShortcut = () => setKeyboardShortcutCode('');

    document.addEventListener('keydown', setKeyboardShortcut);
    document.addEventListener('keyup', releaseKeyboardShortcut);

    return () => {
      console.log('unmount');
      document.removeEventListener('keydown', setKeyboardShortcut);
      document.removeEventListener('keyup', releaseKeyboardShortcut);
    };
  }, [keyboardShortcutCode]);

  return [keyboardShortcutCode, setKeyboardShortcutCode] as const;
}
