import { JobPostProvider } from '@/app/context/job-post-context';

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { jobPostId: string };
}) {
  console.log(params);
  return (
    <JobPostProvider jobPostId={params.jobPostId}>{children}</JobPostProvider>
  );
}
