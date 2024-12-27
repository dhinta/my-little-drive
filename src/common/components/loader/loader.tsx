interface Props {
  size?: 'sm' | 'md' | 'lg';
}

export function Loader({ size = 'md' }: Props) {
  const sizeMap = {
    sm: 'w-[30px] h-[30px]',
    md: 'w-[60px] h-[60px]',
    lg: 'w-[120px] h-[120px]',
  };
  const borderMap = {
    sm: 'border-[4px] border-t-[4px]',
    md: 'border-[8px] border-t-[8px]',
    lg: 'border-[16px] border-t-[16px]',
  };

  return (
    <div
      className={`w-[48px] h-[48px] ${borderMap[size]} ${sizeMap[size]} border-t-theme-blue border-theme-white rounded-full animate-spin`}
    ></div>
  );
}
