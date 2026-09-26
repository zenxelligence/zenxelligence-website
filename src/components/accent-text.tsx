export function AccentText({ text }: { text: string }) {
  const match = text.match(/^(.*\s)?(\S+?)([.!?])?$/);
  if (!match) return text;
  const [, before = "", word, punct = ""] = match;
  if (!word) return text;
  return (
    <>
      {before}
      <span className="accent">{`${word}${punct}`}</span>
    </>
  );
}

export function TwoTone({ text }: { text: string }) {
  const splitAt = text.search(/[.!?]\s+\S/);
  if (splitAt === -1) return text;
  const cut = splitAt + 1;
  return (
    <>
      <span className="block">{text.slice(0, cut)}</span>
      <span className="tone-dim block">{text.slice(cut).trim()}</span>
    </>
  );
}
