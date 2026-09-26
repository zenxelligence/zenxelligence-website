export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  body?: string[];
};

/** TODO(owner): add at least two real notes before this section is indexed or linked in the footer. */
export const POSTS: Post[] = [];
