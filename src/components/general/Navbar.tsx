import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { auth, signOut } from "@/app/utils/auth";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex justify-between items-center p-4">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png.png" alt="Logo" width={40} height={40} />
        <h1 className="text-2xl font-bold">
          Career <span className="text-primary">Wave</span>
        </h1>
      </Link>
      <div className="flex items-center gap-5">
        <ThemeToggle />
        {session?.user ? (
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button>LogOut</Button>
          </form>
        ) : (
            <Link href="/login" className={buttonVariants({variant : "outline", size : "lg"})}>
            Login</Link>
          
        )}
      </div>
    </nav>
  );
}
