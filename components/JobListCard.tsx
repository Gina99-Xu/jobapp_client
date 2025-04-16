import { jobListPayloadType } from '@/utils/types';
import { MapPin, Briefcase, CalendarDays, RadioTower } from 'lucide-react';

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

function JobListCard({
  jobListResponse,
}: {
  jobListResponse: jobListPayloadType;
}) {
  const {
    jobPostId,
    talentRequestTitle,
    jobDescription,
    candidateSkills,
    roleLevel,
    employmentType,
  } = jobListResponse;

  return (
    <Card className='bg-muted'>
      <CardHeader>
        <CardTitle>{talentRequestTitle}</CardTitle>
        <CardDescription>
          Core Skill: {candidateSkills.coreSkill}
        </CardDescription>
        <CardDescription>
          Skill Level: {candidateSkills.skillLevel}
        </CardDescription>
      </CardHeader>

      <CardContent className='mt-2 grid grid-cols-1 gap-2'>
        <JobInfo icon={<MapPin />} text={roleLevel} />
        <JobInfo icon={<MapPin />} text={employmentType} />
      </CardContent>
      <CardContent className='mt-2 grid grid-cols-2 gap-2'>
        <JobInfo
          icon={<RadioTower className='w-6  h-4' />}
          text={jobDescription.responsibilities}
        />
        <JobInfo
          icon={<RadioTower className='w-6 h-4' />}
          text={jobDescription.qualifications}
        />
      </CardContent>
      <CardFooter className='flex gap-4'>
        <Button asChild size='sm'>
          <Link
            className='bg-stone-300'
            href={`/job-management/${jobPostId}/job-application-form`}
          >
            Apply this Job
          </Link>
        </Button>
        <Button asChild size='sm'>
          <Link
            className='bg-red-500'
            href={`/job-management/${jobPostId}/job-stats`}
          >
            View Job Stats
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
export default JobListCard;
