import { DateFormat } from '@/common/models';

interface Props {
  date: Date;
  format?: DateFormat;
}

export const DisplayDate = ({ date, format = DateFormat.LONG }: Props) => {
  if (format === DateFormat.SHORT) {
    const month = date.toLocaleString('default', { month: 'numeric' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  if (format === DateFormat.LONG) {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  if (format === DateFormat.FULL) {
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }
};
