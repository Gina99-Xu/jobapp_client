import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex items-center justify-center hero min-h-screen bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-6xl font-bold text-primary'>
            AI-Powered Job Management System{' '}
          </h1>
          <p className='py-6 text-lg leading-loose'>
            Automate Job Posting and Manage Your Talent Pool Effortlessly
          </p>
          <div className='flex justify-center gap-2'>
            <Button asChild variant='secondary'>
              <Link href='/job-request/create-talent-request'>Explore Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
