import preview from '@/assets/preview.png';
import { File, User } from '@/common/models';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/vendors/ui/card';
import { CircleUserRound } from 'lucide-react';

interface Props {
  files: File[];
  user: User;
}

export function DriveGridView({ files, user }: Props) {
  return (
    <div className="flex flex-wrap">
      {files.map(file => (
        <Card className="w-[350px] mr-4 mb-4" key={file.id}>
          <CardHeader>
            <CardTitle>{file.name}</CardTitle>
            <CardDescription>{file.description ?? ''}</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full bg-theme-dark-grey rounded-lg"
                />
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground flex">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt="avatar"
                      className="w-6 h-6 mr-2 rounded-full"
                    />
                  ) : (
                    <CircleUserRound size={20} />
                  )}
                  {user.name} created
                </span>
                <span className="text-sm text-muted-foreground">
                  {file.date.toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
