'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  CoreSkill,
  SkillLevel,
  createAndEditJobFullfillmentRequestSchema,
  CreateAndEditJobFullfillmentRequestType,
  jobFullfillmentRequestPayloadType,
  RequestStatus,
  RoleLevel,
  EmploymentType,
} from '@/utils/types';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import CustomFormSelect from './FormComponent';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

function CreateJobFullfillmentRequestForm() {
  const { talentFulfillmentId, talentRequestId } = useParams();
  console.log('talentFulfillmentId', talentFulfillmentId);
  console.log('talentRequestId', talentRequestId);

  const [jobFullfillRequest, setJobFullfillRequest] =
    useState<jobFullfillmentRequestPayloadType>(
      {} as jobFullfillmentRequestPayloadType
    );

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CreateAndEditJobFullfillmentRequestType>({
    resolver: zodResolver(createAndEditJobFullfillmentRequestSchema),
    defaultValues: {
      talentRequestId: '',
      talentFulfillmentId: '',
      jobId: '',
      jobDescription: '',
      talentRequestTitle: '',
      qualifications: '',
      startDate: new Date(),
      coreSkill: CoreSkill.JAVA,
      skillLevel: SkillLevel.ADVANCED,
      requestStatus: undefined,
      roleLevel: undefined,
      employmentType: undefined,
    },
  });

  useEffect(() => {
    const fetchTalentRequestById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/talent-fulfillment-service/talent-fulfillment/${talentFulfillmentId}`
        );
        setJobFullfillRequest(response.data);
        console.log('response  is', response);

        form.reset({
          talentFulfillmentId: response.data.talentFulfillmentId,
          talentRequestId: response.data.talentRequestId,
          jobId: response.data.jobId,
          talentRequestTitle: response.data.talentRequestTitle,
          jobDescription: response.data.jobDescription.responsibilities,
          qualifications: response.data.jobDescription.qualifications,
          startDate: new Date(response.data.startDate),
          coreSkill: response.data.candidateSkills.coreSkill,
          skillLevel: response.data.candidateSkills.skillLevel,
          requestStatus: response.data.requestStatus,
          roleLevel: response.data.roleLevel,
          employmentType: response.data.employmentType,
        });

        setLoading(false);
        console.log('response data is', response.data);
      } catch (error) {
        setError('Failed to fetch job requests');
        setLoading(false);
      }
    };

    fetchTalentRequestById();
  }, [talentFulfillmentId, form]);

  async function onSubmit(values: CreateAndEditJobFullfillmentRequestType) {
    console.log('submitting form values', JSON.stringify(values, null, 2)); // Log the form values);
    try {
      const backendData: jobFullfillmentRequestPayloadType = {
        talentRequestTitle: values.talentRequestTitle,
        jobDescription: {
          responsibilities: values.jobDescription,
          qualifications: values.qualifications,
        },
        candidateSkills: {
          coreSkill: values.coreSkill,
          skillLevel: values.skillLevel,
        },
        startDate: values.startDate.toISOString().split('T')[0],
        requestStatus: values.requestStatus,
        talentRequestId: values.talentRequestId,
        talentFulfillmentId: values.talentFulfillmentId,
        jobId: values.jobId,
        roleLevel: values.roleLevel,
        employmentType: values.employmentType,
      };

      console.log('insbackendData is ', backendData);

      const response = await fetch(
        'http://localhost:8080/talent-fulfillment-service/talent-fulfillment/job-post',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(backendData),
        }
      );
      return response.json();
    } catch (error: Error) {
      console.log('error occure submit fullfillment request', error.message);
    }
  }

  if (loading) return <h2 className='text-xl'>Loading....</h2>;
  if (error) return <h2 className='text-xl'>Eror: {error}</h2>;
  if (!jobFullfillRequest)
    return <h2 className='text-xl'>No job request data found!</h2>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='bg-muted p-8 rounded'
      >
        <input type='hidden' {...form.register('talentRequestId')} />
        <input type='hidden' {...form.register('talentFulfillmentId')} />
        <input type='hidden' {...form.register('jobId')} />

        <h2 className='capitalize font-semibold text-4xl mb-6'>
          Fullfill Job Request for {jobFullfillRequest.talentRequestTitle}
        </h2>
        <div className='grid gap-4 md:grid-cols-1 lg:grid-cols-1 items-start'>
          {/* Read-only fields */}
          {jobFullfillRequest.talentRequestTitle && (
            <div className='space-y-2'>
              <label className='text-sm font-medium leading-none'>
                Talent Request Title
              </label>
              <div className='p-2 border rounded-md bg-gray-100'>
                {jobFullfillRequest.talentRequestTitle}
              </div>
            </div>
          )}

          {jobFullfillRequest.jobDescription.qualifications && (
            <div className='space-y-2'>
              <label className='text-sm font-medium leading-none'>
                Qualifications
              </label>
              <div className='p-2 border rounded-md bg-gray-100'>
                {jobFullfillRequest.jobDescription.qualifications}
              </div>
            </div>
          )}

          {jobFullfillRequest.jobDescription.responsibilities && (
            <div className='space-y-2'>
              <label className='text-sm font-medium leading-none'>
                Responsibilities
              </label>
              <div className='p-2 border rounded-md bg-gray-100'>
                {jobFullfillRequest.jobDescription.responsibilities}
              </div>
            </div>
          )}

          {jobFullfillRequest.candidateSkills.coreSkill && (
            <div className='space-y-2'>
              <label className='text-sm font-medium leading-none'>
                Candidate Core Skill
              </label>
              <div className='p-2 border rounded-md bg-gray-100'>
                {jobFullfillRequest.candidateSkills.coreSkill}
              </div>
            </div>
          )}

          {jobFullfillRequest.candidateSkills.skillLevel && (
            <div className='space-y-2'>
              <label className='text-sm font-medium leading-none'>
                Candidate Skill Level
              </label>
              <div className='p-2 border rounded-md bg-gray-100'>
                {jobFullfillRequest.candidateSkills.skillLevel}
              </div>
            </div>
          )}

          {jobFullfillRequest.startDate && (
            <div className='space-y-2'>
              <label className='text-sm font-medium leading-none'>
                Job Start Date
              </label>
              <div className='p-2 border rounded-md bg-gray-100'>
                {jobFullfillRequest.startDate}
              </div>
            </div>
          )}

          <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
            <div className='w-full'>
              <CustomFormSelect
                name='requestStatus'
                control={form.control}
                labelText='Request Status'
                items={RequestStatus}
              />
            </div>
            <div className='w-full'>
              <CustomFormSelect
                name='roleLevel'
                control={form.control}
                labelText='Role Level'
                items={RoleLevel}
              />
            </div>

            <div className='w-full'>
              <CustomFormSelect
                name='employmentType'
                control={form.control}
                labelText='Employment Type'
                items={EmploymentType}
              />
            </div>
          </div>

          <Button type='submit' className='self-end capitalize'>
            Submit Job Request
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default CreateJobFullfillmentRequestForm;
