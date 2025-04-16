'use client';

import { Input } from '@/components/ui/input';
import { ArrowLeft, Search } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import {
  JobStats,
  SearchJobPropsTitle,
  SearchPageProps,
  userJobApplicationData,
} from '@/utils/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

import { Progress } from '@/components/ui/progress';
import { CodeIcon, StarIcon, TrendingUpIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

function StatCard({
  title,
  value,
  maxValue = null,
  unit = '',
  icon,
}: {
  title: string;
  value: number;
  maxValue?: number | null;
  unit?: string;
  icon?: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {value.toFixed(1)}
          {unit}
        </div>
        {maxValue && (
          <p className='text-xs text-gray-500'>
            {((value / maxValue) * 100).toFixed(1)}% of max
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
      <path d='M16 3.13a4 4 0 0 1 0 7.75' />
    </svg>
  );
}

export default function SearchPage({ title }: SearchPageProps) {
  console.log(title);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [jobStats, setJobStats] = useState<JobStats | null>(null);
  const [resumeStats, setResumeStats] = useState<userJobApplicationData | null>(
    null
  );

  const router = useRouter();
  const toastId = 'search-with-AI';

  const handleSearch = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsSearching(true);
      setError(null);

      console.log('Searching for:', searchQuery);

      if (title === SearchJobPropsTitle.RESUME_ANALYSIS) {
        const searchUrl = `http://localhost:8080/user-service/user-service/resume-analysis?userEmail=${searchQuery}`;

        //`http://localhost:8080/user-service/user-resume-analysis/job-stats?jobPostId=${searchQuery}`;

        const response = await fetch(searchUrl);
        if (!response.ok) {
          throw new Error('Error searching. Please try again.');
        }
        const data = await response.json();
        toast.success('Search successful', { id: toastId });
        setResumeStats(data);
        console.log(setResumeStats);
      } else {
        const searchUrl = `http://localhost:8080/user-service/user-resume-analysis/job-stats?jobPostId=${searchQuery}`;
        console.log('indise job search');

        const response = await fetch(searchUrl);
        if (!response.ok) {
          throw new Error('Error searching. Please try again.');
        }
        console.log('indise job search');

        const data = await response.json();
        toast.success('Search successful', { id: toastId });
        setJobStats(data);
        console.log(jobStats);
      }
    } catch (error) {
      setError((error as Error).message);
      toast.error('Something went wrong', { id: toastId });
    } finally {
      setIsSearching(false);
      setSearchQuery('');
    }
  };

  const chartData = [
    {
      name: 'Experience',
      score: jobStats?.avgExperienceScore || 0,
      fill: '#3b82f6', // blue
    },
    {
      name: 'Skills',
      score: jobStats?.avgSkillsScore || 0,
      fill: '#10b981', // green
    },
    {
      name: 'Education',
      score: jobStats?.avgEducationScore || 0,
      fill: '#8b5cf6', // purple
    },
    {
      name: 'Overall',
      score: jobStats?.avgOverallScore || 0,
      fill: '#f59e0b', // amber
    },
  ];

  if (isSearching) return <h2 className='text-xl pt-8'>Searching...</h2>;
  if (error)
    return (
      <div>
        <h2 className='text-xl pt-8 text-destructive'>Error: {error}</h2>
        <Button variant='ghost' onClick={() => router.back()}>
          <ArrowLeft className='h-4 w-4' />
          Back
        </Button>
      </div>
    );

  return (
    <div className='pt-8 p-4 flex justify-center items-center'>
      <div className='w-full max-w-2xl bg-card rounded-lg shadow-sm p-6 border'>
        <h2 className='text-3xl font-semibold text-primary mb-6'>{title}</h2>
        <form onSubmit={handleSearch} className='space-y-6'>
          <div className='space-y-4'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground' />
              <Input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Enter job post ID to search...'
                className='pl-10 pr-4 py-6 text-base'
                disabled={isSearching}
              />
            </div>

            <Button
              type='submit'
              disabled={isSearching || !searchQuery.trim()}
              className='w-full py-6 text-base'
              variant='default'
            >
              {isSearching ? (
                <span className='flex items-center justify-center'>
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Searching...
                </span>
              ) : (
                <span className='flex items-center justify-center'>
                  <Search className='mr-2 h-5 w-5' />
                  Search
                </span>
              )}
            </Button>
          </div>
        </form>

        {resumeStats && (
          <div className='mt-6 space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Applicant Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Name: {resumeStats.firstName} {resumeStats.lastName}
                </p>
                <p>Email: {resumeStats.userEmail}</p>
              </CardContent>
            </Card>

            {resumeStats.userJobAppliedList?.map((analysis, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>Job Application Analysis #{index + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <p>
                          Experience Score:{' '}
                          {analysis.experienceScore.toFixed(2)}
                        </p>
                        <p>Skills Score: {analysis.skillsScore.toFixed(2)}</p>
                      </div>
                      <div>
                        <p>
                          Education Score: {analysis.educationScore.toFixed(2)}
                        </p>
                        <p>Overall Score: {analysis.overallScore.toFixed(2)}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className='font-medium'>Analysis Summary</h4>
                      <p className='text-sm'>{analysis.overallAnalysis}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {jobStats && (
          <div className='space-y-6'>
            {/* Summary Cards */}
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <StatCard
                title='Total Applicants'
                value={jobStats?.totalJobApplicants || 0}
                icon={<UsersIcon className='h-4 w-4' />}
              />
              <StatCard
                title='Avg Experience'
                value={jobStats?.avgExperienceScore || 0}
                maxValue={100}
                unit='%'
                icon={<StarIcon className='h-4 w-4' />}
              />
              <StatCard
                title='Avg Skills'
                value={jobStats?.avgSkillsScore || 0}
                maxValue={100}
                unit='%'
                icon={<CodeIcon className='h-4 w-4' />}
              />
              <StatCard
                title='Avg Overall'
                value={jobStats?.avgOverallScore || 0}
                maxValue={100}
                unit='%'
                icon={<TrendingUpIcon className='h-4 w-4' />}
              />
            </div>

            {/* Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
              </CardHeader>
              <CardContent className='h-80'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                    <Legend />
                    <Bar dataKey='score' name='Average Score'>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Progress Bars */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Scores</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {chartData.map((item) => (
                  <div key={item.name} className='space-y-1'>
                    <div className='flex justify-between'>
                      <span className='text-sm font-medium'>{item.name}</span>
                      <span className='text-sm text-gray-500'>
                        {item.score.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={item.score} className='h-2' />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
