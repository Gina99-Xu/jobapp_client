'use client';

import JobRequestCard from './JobRequestCard';
import { useEffect, useState } from 'react';

import axios from 'axios';
import {
  jobFullfillmentRequestPayloadType,
  RequestStatus,
} from '@/utils/types';
import { Button } from './ui/button';

import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from './ui/input';

function JobRequestList() {
  const [jobRequestResponses, setJobRequestResponses] = useState<
    jobFullfillmentRequestPayloadType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleJobRequestStatusChange = () => {};

  const resetFilterParams = () => {};

  const handleSearchTermSubmit = () => {};

  useEffect(() => {
    const fetchTalentRequest = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/talent-fulfillment-service/talent-fulfillment'
        );
        setJobRequestResponses(response.data);
        setLoading(false);

        console.log('response data is', response.data);
      } catch (error) {
        setError('Failed to fetch job requests');
        setLoading(false);
      }
    };

    fetchTalentRequest();
  }, []);

  if (loading) return <h2 className='text-xl'>Loading....</h2>;
  if (error) return <h2 className='text-xl'>Eror: {error}</h2>;

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex items-center gap-4 mb-8'>
        <h2 className='text-xl font-semibold capitalize '>
          {jobRequestResponses.length} Job Requests Found
        </h2>
      </div>
      <div className='grid grid-cols-2 '>
        <div className='grid grid-cols-2 gap-4 mb-4'>
          <form
            className='bg-muted mb-4 grid grid-cols-3 gap-2 rounded-lg'
            onSubmit={handleSearchTermSubmit}
          >
            <Input
              type='text'
              placeholder='Search Jobs'
              name='search'
              defaultValue={searchTerm}
            />
            <Button className='align-self-end' variant='outline' type='submit'>
              Search
            </Button>
          </form>
        </div>
        <div className='flex flex-row gap-2'>
          <Select
            onValueChange={handleJobRequestStatusChange}
            defaultValue={RequestStatus.APPROVED}
            name='requestStatus'
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[...Object.values(RequestStatus)].map((requestStatus) => {
                return (
                  <SelectItem key={requestStatus} value={requestStatus}>
                    {requestStatus}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {/* Reset Button */}
          <Button
            variant='outline'
            onClick={resetFilterParams}
            className='ml-2'
          >
            Reset Filters
          </Button>
        </div>
      </div>
      {jobRequestResponses.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
          {jobRequestResponses.map((jobRequestResponse) => {
            return (
              <JobRequestCard
                key={jobRequestResponse.talentFulfillmentId}
                jobRequestResponse={jobRequestResponse}
              />
            );
          })}
        </div>
      ) : (
        <div className='text-center py-12'>
          <p className='text-lg text-muted-foreground'>No job requests found</p>
        </div>
      )}
    </div>
  );
}
export default JobRequestList;
