import { JobFullfillProvider } from '@/app/context/job-fullfillment-context';

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { talentFulfillmentId: string };
}) {
  return (
    <JobFullfillProvider talentFulfillmentId={params.talentFulfillmentId}>
      {children}
    </JobFullfillProvider>
  );
}
