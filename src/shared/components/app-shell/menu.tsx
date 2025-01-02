import { ALT_C, DialogType } from '@/common/models';
import { useMenuShortcut } from '@/shared/hooks';
import { Button } from '@/vendors/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/vendors/ui/dropdown-menu';
import { api } from '@convex/_generated/api';
import { useMutation } from 'convex/react';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NewDocument, NewFolder, NewNote } from '../assets-dialogs';

export function Menu(): JSX.Element {
  const [open, setOpen] = useState<DialogType>(DialogType.NONE);
  const [keyboardShortcutCode, _] = useMenuShortcut(['F', 'D', 'N']);
  const keyboardEventMapper: Record<string, () => void> = {
    [`${ALT_C}-F`]: () => setOpen(DialogType.FOLDER),
    [`${ALT_C}-D`]: () => setOpen(DialogType.DOCUMENT),
    [`${ALT_C}-N`]: () => setOpen(DialogType.NOTE),
  };
  const saveFolderMutation = useMutation(api.assets.addFolder);

  const onNoteSave = (name: string, content: string) =>
    console.log(name, content);
  const onFolderSave = (name: string) => saveFolderMutation({ name });

  useEffect(() => {
    if (keyboardEventMapper[keyboardShortcutCode]) {
      keyboardEventMapper[keyboardShortcutCode]();
    }
  }, [keyboardShortcutCode]);

  const dialogNewFolderElement =
    open === DialogType.FOLDER ? (
      <NewFolder setOpen={setOpen} onSave={onFolderSave} />
    ) : null;

  const dialogNewDocumentElement =
    open === DialogType.DOCUMENT ? <NewDocument setOpen={setOpen} /> : null;

  const dialogNewNoteElement =
    open === DialogType.NOTE ? (
      <NewNote setOpen={setOpen} onSave={onNoteSave} />
    ) : null;

  const dialogElement =
    dialogNewFolderElement || dialogNewDocumentElement || dialogNewNoteElement;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="text-lg px-6">
            <Plus size={28} /> New
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 ml-4">
          <DropdownMenuLabel>Create or upload new</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setOpen(DialogType.FOLDER)}
            >
              Folder
              <DropdownMenuShortcut>ALT+C Then F</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setOpen(DialogType.NOTE)}
            >
              Note
              <DropdownMenuShortcut>ALT+C Then N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setOpen(DialogType.DOCUMENT)}
            >
              Document
              <DropdownMenuShortcut>ALT+C Then D</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {dialogElement}
    </>
  );
}
