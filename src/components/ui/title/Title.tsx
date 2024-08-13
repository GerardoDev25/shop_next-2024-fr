import { titleFont } from '@/config';

interface Props {
  title: string;
  subTitle?: string;
  className?: string;
}
export const Title = ({ title, className, subTitle }: Props) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1
        className={`${titleFont.className} antialiased text-4xl font-semibold my-7`}
      >
        {title}
      </h1>
      {subTitle && <h3 className='text-lg mb-5'>{subTitle}</h3>}
    </div>
  );
};
