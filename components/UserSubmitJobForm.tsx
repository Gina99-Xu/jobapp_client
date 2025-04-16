'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  CreateAndEditUserJobApplicationRequestType,
  createUserJobApplicationRequestSchema,
  userJobApplicantRequestPayload,
  userJobApplicationData,
} from '@/utils/types';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { CustomFormField } from './FormComponent';
import { useParams, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { ArrowLeft, Loader2, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

function UserSubmitJobForm() {
  const { jobPostId } = useParams<{ jobPostId: string }>();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gptResult, setGptResult] = useState<userJobApplicationData | null>(
    null
  );
  const [showGptResult, setShowGptResult] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const form = useForm<CreateAndEditUserJobApplicationRequestType>({
    resolver: zodResolver(createUserJobApplicationRequestSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      mobileNumber: 0,
      userEmail: '',
      jobPostId,
    },
    mode: 'onChange',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF file!');
        return;
      }
      setResumeFile(file);
      toast.success('Resume uploaded successfully!');
    }
  };

  async function onSubmit(values: CreateAndEditUserJobApplicationRequestType) {
    console.log('submitting form values', JSON.stringify(values, null, 2)); // Log the form values);

    if (!resumeFile) {
      toast.error('Please upload your resume before submitting!');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('submmiting job application....', {
      position: 'top-center',
    });

    try {
      const formData = new FormData();
      const userJobApplicationData: userJobApplicantRequestPayload = {
        firstName: values.firstName,
        lastName: values.lastName,
        mobileNumber: Number(values.mobileNumber),
        userEmail: values.userEmail,
        jobPostId: values.jobPostId,
      };

      formData.append('userData', JSON.stringify(userJobApplicationData));
      formData.append('resumePdf', resumeFile);

      const response = await fetch(
        'http://localhost:8080/user-service/user-service/save-user-and-analyze-resume',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Error while submitting job application!');
      }

      const result = await response.json();
      console.log('api result', result);

      form.reset();
      setResumeFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setGptResult(result);
      setShowGptResult(true);

      toast.success('Application submitted successfully!', { id: toastId });
      console.log('gptresult is', gptResult);
      console.log('showGptResult is', showGptResult);

      toast.success('Application submitted successfully!', { id: toastId });
    } catch (error: any) {
      toast.error(error.message || 'Error while submitting job application!', {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='space-y-6'>
      <Button variant='ghost' onClick={() => router.back()}>
        <ArrowLeft className='h-4 w-4' />
        Back
      </Button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='bg-muted p-8 rounded-lg'
          encType='multipart/form-data'
        >
          <input type='hidden' {...form.register('jobPostId')} />
          <h2 className='capitalize font-semibold text-2xl mb-4'>
            Apply for Job Post: {jobPostId}
          </h2>
          <div className='grid grid-cols-1 gap-4'>
            <CustomFormField
              disabled={isSubmitting}
              name='firstName'
              control={form.control}
            />
            <CustomFormField
              disabled={isSubmitting}
              name='lastName'
              control={form.control}
            />
            <CustomFormField
              disabled={isSubmitting}
              name='userEmail'
              control={form.control}
            />
            <CustomFormField
              disabled={isSubmitting}
              name='mobileNumber'
              control={form.control}
            />
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-foreground'>
                Resume Upload (PDF only)
                <span className='text-destructive'>*</span>
              </label>
              <div className='flex items-center gap-4'>
                <Button
                  type='button'
                  variant={'outline'}
                  disabled={isSubmitting}
                  onClick={() => fileInputRef.current?.click()}
                  className='flex items-center gap-2'
                >
                  <Upload className='h-4 w-4' />
                  {resumeFile ? 'Update File' : 'Select Resume'}
                </Button>
                <input
                  disabled={isSubmitting}
                  type='file'
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept='.pdf'
                  className='hidden'
                />
                {resumeFile && (
                  <p className='text-sm text-muted-foreground'>
                    Selected file: {resumeFile.name}
                  </p>
                )}
                {!resumeFile && form.formState.isSubmitted && (
                  <p className='text-sm text-destructive mt-1'>
                    Please upload your resume
                  </p>
                )}
              </div>
            </div>
            <Button
              disabled={isSubmitting}
              type='submit'
              className='mt-4 w-full bg-neutral-200 text-primary hover:bg-primary hover:bg-neutral-300'
            >
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </div>
        </form>
      </Form>

      {gptResult && (
        <div className='space-y-4'>
          <div className='flex justify-end'>
            <Button
              onClick={() => setShowGptResult(!showGptResult)}
              variant='outline'
            >
              {showGptResult ? 'Hide Results' : 'View Analysis Results'}
            </Button>
          </div>

          {showGptResult && (
            <Card>
              <CardHeader>
                <CardTitle>Resume Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div>
                    <h3 className='font-medium'>Applicant Information</h3>
                    <p>
                      Name: {gptResult.firstName} {gptResult.lastName}
                    </p>
                    <p>Email: {gptResult.userEmail}</p>
                  </div>

                  {gptResult.userJobAppliedList?.map((analysis, index) => (
                    <div key={index} className='space-y-2'>
                      <h3 className='font-medium'>Analysis Scores</h3>
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
                            Education Score:{' '}
                            {analysis.educationScore.toFixed(2)}
                          </p>
                          <p>
                            Overall Score: {analysis.overallScore.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className='font-medium mt-4'>Analysis Summary</h4>
                        <p className='text-sm'>{analysis.overallAnalysis}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
export default UserSubmitJobForm;
