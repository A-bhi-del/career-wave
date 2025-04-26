import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { auth } from "@/app/utils/auth";
import { Userdropdawn } from "./UserDropdawn";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 p-4 w-full">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo1.png" alt="Logo" width={40} height={40} />
          <h1 className="text-2xl font-bold">
            Career <span className="text-primary">Wave</span>
          </h1>
        </Link>
      </div>

      {/* Search bar - hidden on mobile */}
    
      {/* Right side actions */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Link
          className={`${buttonVariants({ size: "lg" })} rounded-full`}
          href="/post-job"
        >
          Post Job
        </Link>

        {session?.user ? (
          <Userdropdawn
            email={session.user.email as string}
            name={session.user.name as string}
            image={session.user.image as string}
          />
        ) : (
          <Link
            className={buttonVariants({ variant: "outline", size: "lg" })}
            href="/login"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
