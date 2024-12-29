import { File, User } from '@/common/models';
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
          <TableHead className="w-[100px] py-4">Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Size</TableHead>
          <TableHead className="text-right">Created/Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map(file => (
          <TableRow key={file.id}>
            <TableCell className="font-medium py-4">{file.name}</TableCell>
            <TableCell>{file.type}</TableCell>
            <TableCell>
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
            <TableCell>{file.size}</TableCell>
            <TableCell className="text-right">
              {file.date.toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4} className="py-4">
            Total assets
          </TableCell>
          <TableCell className="text-right">{files.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
