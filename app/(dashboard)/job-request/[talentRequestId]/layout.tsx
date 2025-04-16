import { TalentRequestProvider } from '@/app/context/job-request-context';

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { talentRequestId: string };
}) {

  return (
    <TalentRequestProvider talentRequestId={params.talentRequestId}>
      {children}
    </TalentRequestProvider>
  );
}
