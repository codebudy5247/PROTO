import Logo from "@/components/Logo";
import { capitalizeFirstLetter } from "@/lib/utils";
import Link from "next/link";

export const Footer = () => {
  const footerLinks = [
    {
      label: "company",
      links: [
        {
          label: "About",
          href: "/about",
        },
        {
          label: "Term Of Use",
          href: "/term-of-use",
        },
        {
          label: "Privacy Policy",
          href: "/privacy-policy",
        },
        {
          label: "How it works",
          href: "/how-works",
        },
        {
          label: "Contact Us",
          href: "/contact-us",
        },
      ],
    },
    {
      label: "support",
      links: [
        {
          label: "Support Career",
          href: "/support",
        },
        {
          label: "Service",
          href: "/24-service",
        },
        {
          label: "Quick Chat",
          href: "/quick-chat",
        },
      ],
    },
    {
      label: "contact",
      links: [
        {
          label: "Whatsapp",
          href: "/whatsapp",
        },
        {
          label: "Support",
          href: "/24-service",
        },
      ],
    },
  ];
  return (
    <footer className="mb-16 bg-white md:mb-0">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col md:flex-1">
            <Logo />
          </div>
          <div className="mt-5 flex justify-between md:mt-0 md:flex-[2] md:justify-around">
            {footerLinks.map(({ label, links }) => (
              <div key={label} className="flex flex-col">
                <strong className="mb-5 text-sm font-bold text-neutral-600 md:text-base">
                {capitalizeFirstLetter(label)}
                </strong>
                <ul className="flex flex-col gap-2 text-xs font-normal text-neutral-500 md:text-sm">
                  {links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="transition hover:text-neutral-700"
                    >
                      {link.label}
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
