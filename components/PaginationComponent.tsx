'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { PaginationProps } from '@/utils/types';

function PaginationComponent({
  currentPage,
  totalPages,
  paginate,
}: PaginationProps) {
  console.log(currentPage, totalPages);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handlePageChange = (page: number) => {
    paginate(page);
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    replace(`${pathname}?${params.toString()}`);
    console.log(params);
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className='flex items-center justify-center gap-2'>
      <Button
        variant='outline'
        size='sm'
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirstPage}
        aria-label='Previous page'
      >
        <ChevronLeft className='h-4 w-4' />
        <span className='sr-only md:not-sr-only'>Previous</span>
      </Button>

      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i + 1}
          variant={i + 1 === currentPage ? 'default' : 'outline'}
          size='sm'
          onClick={() => handlePageChange(i + 1)}
          aria-current={i + 1 === currentPage ? 'page' : undefined}
        >
          {i + 1}
        </Button>
      ))}

      <Button
        variant='outline'
        size='sm'
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLastPage}
        aria-label='Next page'
      >
        <span className='sr-only md:not-sr-only'>Next</span>
        <ChevronRight className='h-4 w-4' />
      </Button>
    </div>
  );
}

export default PaginationComponent;
