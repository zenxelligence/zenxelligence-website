const STEPS = [
  {
    n: "01",
    title: "Brief",
    body: "You tell us what has to exist at handover, and on which surface: web, mobile, agents, IoT, or VLSI.",
  },
  {
    n: "02",
    title: "Scope",
    body: "We reply within one business day. Scope, timeline, and cost are written down before a line ships.",
  },
  {
    n: "03",
    title: "Build",
    body: "The same two engineers stay on the work. We do not hand you to another firm halfway through.",
  },
  {
    n: "04",
    title: "Handover",
    body: "You leave with the system, the source, and a runbook. You own what we built.",
  },
];

export function ProcessSteps() {
  return (
    <ol className="process">
      {STEPS.map((step) => (
        <li key={step.n} className="process-step">
          <span className="process-num">{step.n}</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
