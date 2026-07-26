import { Link } from "react-router-dom";

interface FooterLinksProps {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

export default function FooterLinks({
  title,
  links,
}: FooterLinksProps) {
  return (
    <div>
      <h3 className="mb-6 font-semibold text-[var(--heading)]">
        {title}
      </h3>

      <div className="space-y-4">
        {links.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="block text-[var(--body)] transition hover:text-[var(--primary)]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}