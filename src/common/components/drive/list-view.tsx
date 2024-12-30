import { File, FileTypeMap, User } from '@/common/models';
import { Badge } from '@/vendors/ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/vendors/ui/table';
import { CircleUserRound } from 'lucide-react';
import { DisplayDate } from '../display-date/display-date';
import { ActionsButtons } from './actions-buttons';

interface Props {
  files: File[];
  user: User;
}

export function DriveListView({ files, user }: Props) {
  return (
    <Table>
      <TableCaption>
        <span className="sr-only">A list of your assets.</span>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="py-4">Name</TableHead>
          <TableHead className="py-4">Tags</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Size</TableHead>
          <TableHead className="text-right">Created/Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map(file => (
          <TableRow key={file.id}>
            <TableCell className="font-medium py-4 w-1/7">
              {file.name}
            </TableCell>
            <TableCell className="w-1/7 flex gap-2">
              {file.tags?.map(tag => <Badge variant="outline">{tag}</Badge>)}
            </TableCell>
            <TableCell className="w-1/7">{FileTypeMap[file.type]}</TableCell>
            <TableCell className="w-1/7">
              {user.image ? (
                <img
                  src={user.image}
                  alt="avatar"
                  className="w-6 h-6 mr-2 rounded-full"
                />
              ) : (
                <CircleUserRound size={20} />
              )}
            </TableCell>
            <TableCell className="w-1/7">{file.size}</TableCell>
            <TableCell className="text-right w-1/7">
              <DisplayDate date={file.date} />
            </TableCell>
            <TableCell className="w-1/7 flex justify-end items-center py-4">
              <ActionsButtons />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6} className="py-4">
            Total assets
          </TableCell>
          <TableCell className="text-right">{files.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
