"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <li className={clsx("nav-link", { "nav-link-active": isActive })}>
        {children}
      </li>
    </Link>
  );
};

export default NavLink;
