import { jobRequestResponsePayloadType, RequestStatus } from '@/utils/types';
import { MapPin, Briefcase, CalendarDays } from 'lucide-react';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import JobInfo from './JobInfo';

function JobRequestCard({
  jobRequestResponse,
}: {
  jobRequestResponse: jobRequestResponsePayloadType;
}) {
  const {
    talentRequestTitle,
    talentRequestId,
    jobDescription,
    candidateSkills,
    startDate,
    requestStatus,
    roleLevel,
    employmentType,
    talentFulfillmentId,
  } = jobRequestResponse;

  console.log(jobRequestResponse);
  return (
    <Card className='bg-muted'>
      <CardHeader>
        <CardTitle>{talentRequestTitle}</CardTitle>
        <CardDescription>Status: {requestStatus}</CardDescription>
      </CardHeader>
      <CardContent className='grid grid-cols-2 gap-4'>
        <JobInfo icon={<Briefcase />} text={jobDescription.qualifications} />
        <JobInfo icon={<MapPin />} text={jobDescription.qualifications} />
        <JobInfo icon={<CalendarDays />} text={startDate} />
      </CardContent>
      <CardFooter className='flex gap-4'>
        <Button asChild size='sm'>
          {requestStatus === RequestStatus.ASSIGNED ? (
            <Link
              className='bg-orange-400 hover:bg-orange-500'
              href={`/job-request/${talentRequestId}/${talentFulfillmentId}/create-talent-fullfillment`}
            >
              Approve Job Request
            </Link>
          ) : (
            <Button variant='outline'>{requestStatus}</Button>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
export default JobRequestCard;
