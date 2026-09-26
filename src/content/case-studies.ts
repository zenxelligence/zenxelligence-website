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

/** TODO(owner): add studies only when the client has agreed. Empty list hides the rail and shows the on-request line. */
export const CASE_STUDIES: CaseStudy[] = [];
