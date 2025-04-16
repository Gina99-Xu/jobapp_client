import * as z from 'zod';

export type SearchPageProps = {
  jobPostId?: string;
  userEmail?: string;
  title: SearchJobPropsTitle;
};

export enum SearchJobPropsTitle {
  RESUME_ANALYSIS = 'RESUME ANALYSIS',
  JOB_STATS_ANALYSIS = 'JOB STATS ANALYSIS',
}

export enum CoreSkill {
  JAVA = 'JAVA',
  PYTHON = 'PYTHON',
  NODEJS = 'NODEJS',
  REACT = 'REACT',
  AGILE_COACH = 'AGILE_COACH',
  PROJECT_MANAGEMENT = 'PROJECT_MANAGEMENT',
}

export enum SkillLevel {
  STUDENT = 'STUDENT',
  JUNIOR = 'JUNIOR',
  ENTRY = 'ENTRY',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}

export enum RequestStatus {
  APPROVED = 'APPROVED',
  OPEN = 'OPEN',
  ASSIGNED = 'ASSIGNED',
}

export enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  CONTRACT = 'CONTRACT',
}

export enum RoleLevel {
  INDIVIDUAL_CONTRIBUTOR = 'INDIVIDUAL_CONTRIBUTOR',
  LEADERSHIP = 'LEADERSHIP',
}

export type jobDescriptionType = {
  responsibilities: string;
  qualifications: string;
};

export type CandidateSkillsType = {
  coreSkill: CoreSkill;
  skillLevel: SkillLevel;
};

export type jobRequestPayloadType = {
  talentRequestTitle: string;
  jobDescription: jobDescriptionType;
  candidateSkills: CandidateSkillsType;
  startDate: string;
};

export type jobRequestResponsePayloadType = {
  talentRequestTitle: string;
  jobDescription: jobDescriptionType;
  candidateSkills: CandidateSkillsType;
  startDate: string;
  talentRequestId: string;
  requestStatus: RequestStatus;
};

export type jobFullfillmentRequestPayloadType = {
  talentRequestTitle: string;
  jobDescription: jobDescriptionType;
  candidateSkills: CandidateSkillsType;
  startDate: string;
  requestStatus: RequestStatus;
  roleLevel: RoleLevel;
  employmentType: EmploymentType;
  talentRequestId: string;
  talentFulfillmentId: string;
  jobId: string;
};

export type jobListPayloadType = {
  jobPostId: string;
  talentRequestTitle: string;
  jobDescription: jobDescriptionType;
  candidateSkills: CandidateSkillsType;
  roleLevel: RoleLevel;
  employmentType: EmploymentType;
};

export type userJobApplicantRequestPayload = {
  firstName: string;
  lastName: string;
  mobileNumber: number;
  userEmail: string;
  jobPostId: string;
};

export const createUserJobApplicationRequestSchema = z.object({
  firstName: z.string().min(1, {
    message: 'first name must be at least 1 characters',
  }),
  lastName: z.string().min(1, {
    message: 'last name must be at least 1 characters',
  }),
  mobileNumber: z.coerce.number().min(3, {
    message: 'mobile number must be at least 3 characters',
  }),
  userEmail: z.string().min(1, {
    message: 'userEmail must be at least 1 characters',
  }),
  jobPostId: z.string().min(1, {
    message: 'jobpostID must be at least 1 characters',
  }),
});

export const createAndEditJobFullfillmentRequestSchema = z.object({
  requestStatus: z.nativeEnum(RequestStatus, {
    errorMap: () => ({
      message: 'Please fill the request status',
    }),
  }),
  roleLevel: z.nativeEnum(RoleLevel, {
    errorMap: () => ({
      message: 'Please select a role level',
    }),
  }),

  employmentType: z.nativeEnum(EmploymentType, {
    errorMap: () => ({
      message: 'Please select the employment type',
    }),
  }),

  coreSkill: z.nativeEnum(CoreSkill, {
    errorMap: () => ({
      message: 'Please select a core level',
    }),
  }),
  skillLevel: z.nativeEnum(SkillLevel, {
    errorMap: () => ({
      message: 'Please select a skill level',
    }),
  }),
  jobDescription: z.string().min(2, {
    message:
      'job description or responsibilities must be at least 2 characters',
  }),
  talentRequestTitle: z.string().min(2, {
    message: 'talentRequestTitle must be at least 2 characters',
  }),

  qualifications: z.string().min(2, {
    message: 'talentRequestTitle must be at least 2 characters',
  }),
  talentRequestId: z.string().min(1, {
    message: 'talentRequestId must be not null',
  }),
  talentFulfillmentId: z.string().min(1, {
    message: 'talentFulfillmentId must be not null',
  }),

  jobId: z.string(),

  startDate: z.coerce
    .date()
    .min(new Date(), { message: 'Start date must be in the future' }),
});

export const createAndEditJobRequestSchema = z.object({
  coreSkill: z.nativeEnum(CoreSkill, {
    errorMap: () => ({
      message: 'Please select a core level',
    }),
  }),
  skillLevel: z.nativeEnum(SkillLevel, {
    errorMap: () => ({
      message: 'Please select a skill level',
    }),
  }),
  jobDescription: z.string().min(2, {
    message:
      'job description or responsibilities must be at least 2 characters',
  }),
  talentRequestTitle: z.string().min(2, {
    message: 'talentRequestTitle must be at least 2 characters',
  }),

  qualifications: z.string().min(2, {
    message: 'talentRequestTitle must be at least 2 characters',
  }),
  startDate: z.coerce
    .date()
    .min(new Date(), { message: 'Start date must be in the future' }),
});

export type CreateAndEditUserJobApplicationRequestType = z.infer<
  typeof createUserJobApplicationRequestSchema
>;

export type CreateAndEditJobRequestType = z.infer<
  typeof createAndEditJobRequestSchema
>;

export type CreateAndEditJobFullfillmentRequestType = z.infer<
  typeof createAndEditJobFullfillmentRequestSchema
>;

export type JobStats = {
  totalJobApplicants: number;
  avgExperienceScore: number;
  avgSkillsScore: number;
  avgEducationScore: number;
  avgOverallScore: number;
};

export type userJobApplicationData = {
  userId: string;
  firstName: string;
  lastName: string;
  mobileNumber: number;
  userEmail: string;
  userJobAppliedList: userJobApplicationResultData[];
};

export type userJobApplicationResultData = {
  userResumeAnalysisId: string;
  jobPostId: string;
  experienceScore: number;
  skillsScore: number;
  educationScore: number;
  overallScore: number;
  overallAnalysis: string;
};

export type JobType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
};

export enum JobStatus {
  Pending = 'pending',
  Interview = 'interview',
  Declined = 'declined',
}

export enum JobMode {
  FullTime = 'full-time',
  PartTime = 'part-time',
  Internship = 'internship',
}

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paginate: (page: number) => void;
};

export const createAndEditJobSchema = z.object({
  position: z.string().min(2, {
    message: 'position must be at least 2 characters.',
  }),
  company: z.string().min(2, {
    message: 'company must be at least 2 characters.',
  }),
  location: z.string().min(2, {
    message: 'location must be at least 2 characters.',
  }),
  status: z.nativeEnum(JobStatus),
  mode: z.nativeEnum(JobMode),
});

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;
