'use client';

import { useContext, createContext } from 'react';

type JobFullfillContextType = {
  talentFulfillmentId: string;
};

const JobFullfillmentContext = createContext<
  JobFullfillContextType | undefined
>(undefined);

export function JobFullfillProvider({
  children,
  talentFulfillmentId,
}: {
  children: React.ReactNode;
  talentFulfillmentId: string;
}) {
  return (
    <JobFullfillmentContext.Provider value={{ talentFulfillmentId }}>
      {children}
    </JobFullfillmentContext.Provider>
  );
}

export function useJobFullfillmentContext() {
  const context = useContext(JobFullfillmentContext);
  if (context === undefined) {
    throw new Error('Fullfillment must be used within a Fullfillment Provider');
  }

  return context;
}
