"use client";

import logo from "@/assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  // const pathname = usePathname();
  // const router = useRouter();

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    // if (protectedRoutes.some((route) => pathname.match(route))) {
    //   router.push("/");
    // }
  };

  return (
    <header className="border-b w-full sticky top-0 z-50 bg-rose-200/60">
      <div className="container flex justify-between items-center mx-auto h-16 px-3">
        <Link href="/">
          <h1 className="text-2xl flex items-center gap-2 font-bold cursor-pointer">
            <Image src={logo} alt="logo" width={40} height={40} />
            <p>
              Tasty<span className="text-rose-600">Tray</span>
            </p>
          </h1>
        </Link>
        {/* <div className="hidden md:flex max-w-md flex-grow justify-center">
          <p className="text-primary uppercase text-xl">Delicious meals delivered to your door</p>
        </div> */}
        <nav className="flex gap-2">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="cursor-pointer w-10 h-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`profile/${user?.role}`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`dashboard/${user?.role}`}>Dashboard</Link>
                  </DropdownMenuItem>{" "}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="bg-red-100 text-red-600 cursor-pointer font-semibold" onClick={handleLogOut}>
                    <LogOut />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login">
              <Button className="rounded-lg cursor-pointer">Login</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
