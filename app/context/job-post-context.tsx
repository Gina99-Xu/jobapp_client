'use client';

import { useContext, createContext } from 'react';

type JobPostContextType = {
  jobPostId: string;
};

const JobPostContext = createContext<JobPostContextType | undefined>(undefined);

export function JobPostProvider({
  children,
  jobPostId,
}: {
  children: React.ReactNode;
  jobPostId: string;
}) {
  return (
    <JobPostContext.Provider value={{ jobPostId }}>
      {children}
    </JobPostContext.Provider>
  );
}

export function useJobPost() {
  const context = useContext(JobPostContext);
  if (context === undefined) {
    throw new Error('useJobPost must be used within a JobPostProvider');
  }

  return context;
}
