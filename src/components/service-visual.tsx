const KINDS = ["web", "agents", "mobile", "iot", "vlsi"] as const;
export type ServiceVisualKind = (typeof KINDS)[number];

function parts(stack: string) {
  return stack.split(" · ").map((part) => part.trim());
}

export function ServiceVisual({ kind, stack }: { kind: ServiceVisualKind; stack: string }) {
  const items = parts(stack);

  if (kind === "web") {
    return (
      <div className="card card-pad reveal study-visual">
        <p className="card-label">Stack</p>
        <pre className="study-stack">{items.join("\n")}</pre>
      </div>
    );
  }

  if (kind === "agents") {
    return (
      <div className="card card-pad reveal study-visual">
        <p className="card-label">Workflow</p>
        <ol className="study-flow">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </div>
    );
  }

  if (kind === "mobile") {
    return (
      <div className="study-phone reveal study-visual" aria-hidden="true">
        <div className="study-phone-screen">
          <p className="card-label">Android/iOS</p>
          {items.map((item) => (
            <p key={item} className="card-body">
              {item}
            </p>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "iot") {
    return (
      <div className="card card-pad reveal study-visual">
        <p className="card-label">Board</p>
        <div className="study-board">
          {items.map((item) => (
            <div key={item} className="study-node card-title" style={{ fontSize: 20 }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card card-pad reveal study-visual">
      <p className="card-label">Layout</p>
      <div className="study-chip">
        {items.map((item) => (
          <div key={item} className="study-node card-title" style={{ fontSize: 18 }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
