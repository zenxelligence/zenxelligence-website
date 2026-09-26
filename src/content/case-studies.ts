export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  problem: string;
  built: string;
  stack: string[];
  duration: string;
  outcome: string;
  quote?: string;
  image?: string;
};

export const CASE_STUDIES: CaseStudy[] = [];
