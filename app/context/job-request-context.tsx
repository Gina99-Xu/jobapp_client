'use client';

import { useContext, createContext } from 'react';

type TalentRequestContextType = {
  talentRequestId: string;
};

const TalentRequestContext = createContext< TalentRequestContextType| undefined>(
  undefined
);

export function TalentRequestProvider({
  children,
  talentRequestId,
}: {
  children: React.ReactNode;
  talentRequestId: string;
}) {
  return (
    <TalentRequestContext.Provider value={{ talentRequestId }}>
      {children}
    </TalentRequestContext.Provider>
  );
}

export function useTalentRequest() {
  const context = useContext(TalentRequestContext);
  if (context === undefined) {
    throw new Error(
      'talentrequest must be used within a talentrequest provider'
    );
  }

  return context;
}
