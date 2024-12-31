import { DateFormat } from '@/common/models';

interface Props {
  date: number | Date;
  format?: DateFormat;
}

export const DisplayDate = ({ date, format = DateFormat.LONG }: Props) => {
  const dateObject = Number.isNaN(date) ? (date as Date) : new Date(date);
  if (format === DateFormat.SHORT) {
    const month = dateObject.toLocaleString('default', { month: 'numeric' });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    return `${month}/${day}/${year}`;
  }

  if (format === DateFormat.LONG) {
    const month = dateObject.toLocaleString('default', { month: 'short' });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  if (format === DateFormat.FULL) {
    const month = dateObject.toLocaleString('default', { month: 'long' });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    return `${month} ${day}, ${year}`;
  }
};
