import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import { navLinks } from '@/utils/navlinks';

export function NavigationDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='font-bold p-2 rounded '>Menu</button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='min-w-[200px] bg-white rounded shadow-lg p-1'>
        {/**JOB REQUEST LINKS */}
        <div className='mb-1'>
          <div className='px-3 py-2 text-xs font-medium text-gray-500 uppercase'>
            {navLinks.jobRequestLinks.title}
          </div>
          {navLinks.jobRequestLinks.links.map((link) => (
            <div key={link.href}>
              <DropdownMenuItem key={link.href} asChild>
                <Link
                  href={link.href}
                  className='flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 rounded'
                >
                  <span className='text-gray-500'>{link.icon}</span>
                  {link.label}
                </Link>
              </DropdownMenuItem>
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className='border-t border-gray-200 my-1' />
        {/**JOB POST LINKS */}
        <div className='mb-1'>
          <div className='px-3 py-2 text-xs font-medium text-gray-500 uppercase'>
            {navLinks.jobPostNavLinks.title}
          </div>
          {navLinks.jobPostNavLinks.links.map((link) => (
            <div key={link.href}>
              <DropdownMenuItem key={link.href} asChild>
                <Link
                  href={link.href}
                  className='flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 rounded'
                >
                  <span className='text-gray-500'>{link.icon}</span>
                  {link.label}
                </Link>
              </DropdownMenuItem>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
