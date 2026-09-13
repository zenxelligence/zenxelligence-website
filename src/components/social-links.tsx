import { SOCIAL } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type IconProps = { className?: string };

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.45.01H3.54A3.54 3.54 0 0 0 0 3.54v16.92A3.54 3.54 0 0 0 3.54 24h16.91A3.55 3.55 0 0 0 24 20.46V3.54A3.55 3.55 0 0 0 20.45.01ZM7.34 19.5H4.17V9.26h3.17Zm-1.58-11.6a1.84 1.84 0 1 1 0-3.68 1.84 1.84 0 0 1 0 3.68ZM19.5 19.5h-3.17v-5.48c0-1.31-.02-3-1.83-3s-2.11 1.43-2.11 2.9v5.58H9.22V9.26h3.04v1.4h.04a3.33 3.33 0 0 1 3-1.64c3.21 0 3.8 2.11 3.8 4.86Z"
      />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3ZM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm5.2-2.6a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
      />
    </svg>
  );
}

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 360 362" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M307.546 52.566C273.709 18.684 228.706.017 180.756 0 81.951 0 1.538 80.404 1.504 179.235c-.017 31.594 8.242 62.432 23.928 89.609L0 361.736l95.024-24.925c26.179 14.285 55.659 21.805 85.655 21.814h.077c98.788 0 179.21-80.413 179.244-179.244.017-47.898-18.608-92.926-52.454-126.807v-.008Zm-126.79 275.788h-.06c-26.73-.008-52.952-7.194-75.831-20.765l-5.44-3.231-56.391 14.791 15.05-54.981-3.542-5.638c-14.912-23.721-22.793-51.139-22.776-79.286.035-82.14 66.867-148.973 149.051-148.973 39.793.017 77.198 15.53 105.328 43.695 28.131 28.157 43.61 65.596 43.593 105.398-.035 82.149-66.867 148.982-148.982 148.982v.008Zm81.719-111.577c-4.478-2.243-26.497-13.073-30.606-14.568-4.108-1.496-7.09-2.243-10.073 2.243-2.982 4.487-11.568 14.577-14.181 17.559-2.613 2.991-5.226 3.361-9.704 1.117-4.477-2.243-18.908-6.97-36.02-22.226-13.313-11.878-22.304-26.54-24.916-31.027-2.613-4.486-.275-6.91 1.959-9.136 2.011-2.011 4.478-5.234 6.721-7.847 2.244-2.613 2.983-4.486 4.478-7.469 1.496-2.991.748-5.603-.369-7.847-1.118-2.243-10.073-24.289-13.812-33.253-3.636-8.732-7.331-7.546-10.073-7.692-2.613-.13-5.595-.155-8.586-.155-2.991 0-7.839 1.118-11.947 5.604-4.108 4.486-15.677 15.324-15.677 37.361s16.047 43.344 18.29 46.335c2.243 2.991 31.585 48.225 76.51 67.632 10.684 4.615 19.029 7.374 25.535 9.437 10.727 3.412 20.49 2.931 28.208 1.779 8.604-1.289 26.498-10.838 30.228-21.298 3.73-10.46 3.73-19.433 2.613-21.298-1.117-1.865-4.108-2.991-8.586-5.234l.008-.017Z"
      />
    </svg>
  );
}

const ICONS = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <nav aria-label="Social" className={cn("flex items-center gap-2", className)}>
      {SOCIAL.map((item) => {
        const Icon = ICONS[item.id];
        return (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={item.label}
            title={item.label}
            className="flex size-9 items-center justify-center border border-border bg-bg-raised text-fg hover:border-accent hover:text-accent"
          >
            <Icon className="size-[17px]" />
          </a>
        );
      })}
    </nav>
  );
}
