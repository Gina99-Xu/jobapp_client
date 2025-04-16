'use client';

import JobRequestCard from './JobRequestCard';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { jobFullfillmentRequestPayloadType } from '@/utils/types';
import { useParams } from 'next/navigation';

function TalentFullfillmentById() {
  const { talentRequestId } = useParams();

  const [jobFullfillRequest, setJobFullfillRequest] =
    useState<jobFullfillmentRequestPayloadType>(
      {} as jobFullfillmentRequestPayloadType
    );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTalentRequestById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/talent-request-service/talent-request/${talentRequestId}`
        );
        setJobFullfillRequest(response.data);
        setLoading(false);

        console.log('response data is', response.data);
      } catch (error) {
        setError('Failed to fetch job requests');
        setLoading(false);
      }
    };

    fetchTalentRequestById();
  }, []);

  if (loading) return <h2 className='text-xl'>Loading....</h2>;
  if (error) return <h2 className='text-xl'>Eror: {error}</h2>;

  return (
    <>
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-xl font-semibold capitalize '>
          {jobFullfillRequest.talentRequestTitle}
        </h2>
      </div>
      <div className='grid md:grid-cols-2  gap-8'>
        <JobRequestCard
          key={jobFullfillRequest.talentRequestId}
          jobRequestResponse={jobFullfillRequest}
        />
      </div>
    </>
  );
}
export default TalentFullfillmentById;
