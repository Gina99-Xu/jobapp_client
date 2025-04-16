import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';

type StatsCardProps = {
  title: string;
  value: string | number;
};

function StatsCards({ title, value }: StatsCardProps) {
  return (
    <Card className='bg-muted'>
      <CardHeader className='flex flex-row justify-between items-center'>
        <CardTitle className='capitalize'>{title}</CardTitle>
        <CardDescription className='font-bold text-primary mt-[0px!important]'>
          {value}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export function StatsLoadingCard() {
  return (
    <Card className='w-[330px] h-[88px]'>
      <CardHeader className='flex flex-row justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <Skeleton className='h-12 w-12 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[150px]' />
            <Skeleton className='h-4 w-[100px]' />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default StatsCards;
