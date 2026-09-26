export type Engagement = {
  name: string;
  forWho: string;
  includes: string[];
  startingFrom: string;
  duration: string;
  highlighted?: boolean;
};

export const ENGAGEMENTS: Engagement[] = [
  {
    name: "Scoping sprint",
    forWho: "A written scope before a build starts.",
    includes: ["Written scope", "Architecture", "Fixed quote"],
    startingFrom: "",
    duration: "",
  },
  {
    name: "Build",
    forWho: "Fixed-bid or time and materials, after the scope.",
    includes: ["The scoped product", "Handover"],
    startingFrom: "",
    duration: "",
    highlighted: true,
  },
  {
    name: "Retainer",
    forWho: "Support and iteration after handover.",
    includes: ["Ongoing changes"],
    startingFrom: "",
    duration: "",
  },
];

/** TODO(owner): add real budget ranges. Do not invent amounts. "Not sure yet" stays until then. */
export const BUDGET_OPTIONS = ["Not sure yet"];
