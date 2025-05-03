"use client";
import NavLink from "@/components/widgets/Navlink";
import clsx from "clsx";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type Status = {
  status: "authenticated" | "unauthenticated" | "loading";
};
const disabledNavbar = new Set(["/login", "/register", "/404"]);

export default function Navbar() {
  const buttonClass = clsx(
    "px-3 h-8 rounded-md hover:bg-gray-200 cursor-pointer bg-white"
  );

  const { status }: Status = useSession();
  const pathname: string = usePathname();

  const isAuthPage: boolean = useMemo(
    () => disabledNavbar.has(pathname),
    [pathname]
  );

  if (isAuthPage) return null;
  return (
    <nav className="flex bg-gray-800 py-3 px-5 justify-between items-center">
      <div className="flex">
        <h1 className="text-white">Navbar</h1>
        <ul className="flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/about/profile">Profile</NavLink>
        </ul>
      </div>
      <div>
        {status === "authenticated" ? (
          <button className={buttonClass} onClick={() => signOut()}>
            Logout
          </button>
        ) : (
          <button className={buttonClass} onClick={() => signIn()}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
