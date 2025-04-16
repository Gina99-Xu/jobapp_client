import Navbar from '@/components/Navbar';
import Sidebar from '@/components/SideBar';

import { PropsWithChildren } from 'react';

function layout({ children }: PropsWithChildren) {
  return (
    <div className='min-h-screen'>
      <Navbar />
      <main className='grid lg:grid-cols-5'>
        {/* first-col hide on small screen */}
        <div className='hidden lg:block lg:col-span-1 bg-muted'>
          <Sidebar />
        </div>
        {/* second-col hide dropdown on big screen */}
        <div className='lg:col-span-4'>
          <div className='py-12 px-4 sm:px-8 lg:px-16'>{children}</div>
        </div>
      </main>
    </div>
  );
}

export default layout;
