import {
  AppWindow,
  Layers,
  ChartArea,
  List,
  BriefcaseBusiness,
  Brain,
  FolderKanban,
  ListCollapse,
} from 'lucide-react';

type NavLink = {
  href:
    | string
    | ((jobPostId: string) => string)
    | ((talentRequestId: string) => string)
    | ((talentFullfillmentId: string) => string);
  label: string;
  icon: React.ReactNode;
};

type NavLinkGroup = {
  title: string;
  links: NavLink[];
};

const jobRequestLinks: NavLinkGroup = {
  title: 'Job Requests',
  links: [
    {
      href: '/job-request/create-talent-request',
      label: 'Create New Job Request',
      icon: <Layers />,
    },

    {
      href: (talentRequestId) =>
        `/job-request/${talentRequestId}/view-talent-request-lists`,
      label: 'View / Approve Job Requests',
      icon: <ListCollapse />,
    },

    {
      href: (jobPostId) => `/job-management/${jobPostId}/job-lists`,
      label: 'View Job Listings',
      icon: <List />,
    },
  ],
};

const jobPostNavLinks: NavLinkGroup = {
  title: 'Job Analytics (AI-Integrated)',
  links: [
    {
      href: '/job-analysis/resume-analysis',
      label: 'View Resume Analysis',
      icon: <Brain />,
    },

    {
      href: '/job-analysis/job-stats',
      label: 'View Job Stats',
      icon: <ChartArea />,
    },
  ],
};

export const navLinks = {
  jobRequestLinks,
  jobPostNavLinks,
};

export type { NavLink, NavLinkGroup };
