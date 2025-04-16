import { Briefcase } from 'lucide-react';
import { NavigationDropdown } from './NavigationDropdown';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-gray-200 w-full'>
      <div className='flex h-16 items-center justify-between px-4 sm:px-6'>
        <div className='flex items-center gap-4'>
          <Link
            href='/'
            className='flex items-center gap-2 hover:opacity-80 transition-opacity'
          >
            <Briefcase className='h-5 w-5 text-primary' />{' '}
            {/* Slightly smaller icon */}
            <span className='text-base font-semibold whitespace-nowrap'>
              AI-JobManagement
            </span>
          </Link>
        </div>
        <div className='flex items-start gap-4'>
          <NavigationDropdown />
        </div>
      </div>
    </nav>
  );
}
