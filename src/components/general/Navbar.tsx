import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { auth } from "@/app/utils/auth";
import { Userdropdawn } from "./UserDropdawn";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex justify-between items-center p-4">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo1.png" alt="Logo" width={40} height={40} />
        <h1 className="text-2xl font-bold">
          Career <span className="text-primary">Wave</span>
        </h1>
      </Link>
      <div className="hidden md:flex items-center gap-5">
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
