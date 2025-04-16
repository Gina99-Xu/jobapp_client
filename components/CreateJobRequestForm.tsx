'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  CoreSkill,
  CreateAndEditJobRequestType,
  SkillLevel,
  createAndEditJobRequestSchema,
  jobRequestPayloadType,
} from '@/utils/types';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import CustomFormSelect, { CustomFormField } from './FormComponent';
import toast from 'react-hot-toast';
import { CustomDatePicker } from './CustomDatePicker';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function CreateJobRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<CreateAndEditJobRequestType>({
    resolver: zodResolver(createAndEditJobRequestSchema),
    defaultValues: {
      jobDescription: '',
      talentRequestTitle: '',
      qualifications: '',
      startDate: new Date(),
      coreSkill: CoreSkill.JAVA,
      skillLevel: SkillLevel.ENTRY,
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: CreateAndEditJobRequestType) => {
    const toastId = 'job-request-toast';

    setIsSubmitting(true);
    setError(null);

    try {
      const backendData: jobRequestPayloadType = {
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
      };

      const response = await fetch(
        'http://localhost:8080/talent-request-service/talent-request',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(backendData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit job request!');
      }

      await response.json();
      toast.success(
        'Job request submitted successfully, redirecting to job requests list soon',
        { id: toastId }
      );
      form.reset();
      // Redirect to job requests list after 2 seconds
      setTimeout(() => {
        router.push('/jobrequest/view-job-requests');
      }, 4000);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(message);
      toast.error('Error submitting job request', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Debug useEffect - will remove in production
  useEffect(() => {
    const subscription = form.watch((value) => {
      console.log('form values', value);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='bg-muted rounded'>
        <h2 className='text-3xl font-semibold text-primary mb-6'>
          Create Job Request
        </h2>
        {error && (
          <div className='mb-4 p-4 bg-red-50 text-red-600 rounded-md'>
            {error}
          </div>
        )}

        <div className='space-y-6'>
          <div className='grid gap-6 md:grid-cols-1'>
            <CustomFormField
              name='jobDescription'
              control={form.control}
              label='Job Description'
              placeholder='Enter Job Description'
              textarea
            />
            <CustomFormField
              name='talentRequestTitle'
              label='Job Title'
              placeholder='Enter Job Title'
              textarea
              control={form.control}
            />
            <CustomFormField
              name='qualifications'
              label='Qualifications'
              placeholder='Enter Job Qualifications'
              textarea
              control={form.control}
            />

            <div className='grid gap-2 md:grid-cols-2'>
              <CustomFormSelect
                name='coreSkill'
                control={form.control}
                labelText='Core Skill'
                items={CoreSkill}
              />
              <CustomFormSelect
                name='skillLevel'
                control={form.control}
                labelText='Skill Level'
                items={SkillLevel}
              />
              <CustomDatePicker
                name='startDate'
                control={form.control}
                label='Start Date'
              />
            </div>
            <Button
              disabled={isSubmitting}
              type='submit'
              className='bg-gray-100 hover:bg-gray-200 text-black w-full md:w-auto mt-4 transition-colors'
            >
              {isSubmitting ? 'Submitting...' : 'Submit Job Request'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
export default CreateJobRequestForm;
