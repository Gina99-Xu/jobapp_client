import CreateJobFullfillmentRequestForm from '@/components/CreateJobFullfillmentRequestForm';

function CreateTalentFullfillmentPage({
  params,
}: {
  params: { talentRequestId: string; talentFulfillmentId: string };
}) {
  return <CreateJobFullfillmentRequestForm />;
}

export default CreateTalentFullfillmentPage;
