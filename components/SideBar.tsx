'use client';

import { navLinks } from '@/utils/navlinks';
import { Button } from './ui/button';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const jobPostId = useParams().jobPostId as string;

  return (
    <aside className='py-12 px-4 sm:px-6 bg-muted h-full'>
      <div className='flex flex-col gap-y-4'>
        {/**JOB REQUEST LINKS */}
        <div className='mb-4'>
          <h2 className='text-lg font-bold'>
            {navLinks.jobRequestLinks.title}
          </h2>
          <div className='flex flex-col gap-y-2'>
            {navLinks.jobRequestLinks.links.map((link) => {
              const href =
                typeof link.href === 'function'
                  ? link.href(jobPostId)
                  : link.href;

              return (
                <div key={href}>
                  <Button
                    asChild
                    variant={pathname === link.href ? 'default' : 'link'}
                  >
                    <Link href={href}>
                      <span className='mr-2'>{link.icon}</span> {link.label}
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/**JOB POST LINKS */}
        <div className='mb-4'>
          <h2 className='text-lg font-bold'>
            {navLinks.jobPostNavLinks.title}
          </h2>
          <div className='flex flex-col gap-y-2'>
            {navLinks.jobPostNavLinks.links.map((link) => {
              const href =
                typeof link.href === 'function'
                  ? link.href(jobPostId)
                  : link.href;
              return (
                <div key={href}>
                  <Button
                    asChild
                    key={href}
                    variant={pathname === href ? 'default' : 'link'}
                  >
                    <Link href={href}>
                      <span className='mr-2'>{link.icon}</span> {link.label}
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
