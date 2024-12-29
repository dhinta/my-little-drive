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
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NewDocument, NewFolder } from '../assets-dialogs';

export function Menu(): JSX.Element {
  const [assetName, setAssetName] = useState('');
  const [open, setOpen] = useState<DialogType>(DialogType.NONE);
  const [keyboardShortcutCode, _] = useMenuShortcut();
  const keyboardEventMapper: Record<string, () => void> = {
    [`${ALT_C}-F`]: () => setOpen(DialogType.FOLDER),
    [`${ALT_C}-D`]: () => setOpen(DialogType.DOCUMENT),
  };

  useEffect(() => {
    if (keyboardEventMapper[keyboardShortcutCode]) {
      keyboardEventMapper[keyboardShortcutCode]();
    }
  }, [keyboardShortcutCode]);

  const dialogNewFolderElement =
    open === DialogType.FOLDER ? (
      <NewFolder
        assetName={assetName}
        setOpen={setOpen}
        setAssetName={setAssetName}
      />
    ) : null;

  const dialogNewDocumentElement =
    open === DialogType.DOCUMENT ? (
      <NewDocument
        assetName={assetName}
        setOpen={setOpen}
        setAssetName={setAssetName}
      />
    ) : null;

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
            <DropdownMenuItem className="cursor-pointer">
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

      {dialogNewFolderElement}
      {dialogNewDocumentElement}
    </>
  );
}
