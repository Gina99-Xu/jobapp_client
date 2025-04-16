'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { JobStats } from '@/utils/types';
import { useParams, useRouter } from 'next/navigation';
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
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CodeIcon, StarIcon, TrendingUpIcon } from 'lucide-react';
import { Button } from './ui/button';

function StatsContainer() {
  const [jobStatsResponse, setJobStatsResponse] = useState<JobStats>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { jobPostId } = useParams();
  console.log(jobPostId);

  useEffect(() => {
    const fetchJobStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user-service/user-resume-analysis/job-stats?jobPostId=${jobPostId}`
        );
        setJobStatsResponse(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch job stats');
        setLoading(false);
      }
    };
    fetchJobStats();
  }, [jobPostId]);

  const chartData = [
    {
      name: 'Experience',
      score: jobStatsResponse?.avgExperienceScore || 0,
      fill: '#3b82f6', // blue
    },
    {
      name: 'Skills',
      score: jobStatsResponse?.avgSkillsScore || 0,
      fill: '#10b981', // green
    },
    {
      name: 'Education',
      score: jobStatsResponse?.avgEducationScore || 0,
      fill: '#8b5cf6', // purple
    },
    {
      name: 'Overall',
      score: jobStatsResponse?.avgOverallScore || 0,
      fill: '#f59e0b', // amber
    },
  ];

  if (loading)
    return (
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className='h-6 w-3/4 animate-pulse rounded bg-gray-200' />
            </CardHeader>
            <CardContent>
              <div className='h-4 w-full animate-pulse rounded bg-gray-200' />
            </CardContent>
          </Card>
        ))}
      </div>
    );

  if (error) return <div className='text-red-500'>Error: {error}</div>;

  return (
    <div className='space-y-6'>
      <Button variant='ghost' onClick={() => router.back()}>
        <ArrowLeft className='h-4 w-4' />
        Back
      </Button>
      {/* Summary Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Total Applicants'
          value={jobStatsResponse?.totalJobApplicants || 0}
          icon={<UsersIcon className='h-4 w-4' />}
        />
        <StatCard
          title='Avg Experience'
          value={jobStatsResponse?.avgExperienceScore || 0}
          maxValue={100}
          unit='%'
          icon={<StarIcon className='h-4 w-4' />}
        />
        <StatCard
          title='Avg Skills'
          value={jobStatsResponse?.avgSkillsScore || 0}
          maxValue={100}
          unit='%'
          icon={<CodeIcon className='h-4 w-4' />}
        />
        <StatCard
          title='Avg Overall'
          value={jobStatsResponse?.avgOverallScore || 0}
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
  );
}

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

// Add similar icon components for StarIcon, CodeIcon, TrendingUpIcon...

export default StatsContainer;
