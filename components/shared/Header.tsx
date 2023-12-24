import Link from "next/link"
import Image from "next/image"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "../ui/button"
import Navbar from "./Navbar"
import Navside from "./Navside"
const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-34">
            <Image src="/assets/images/logo.svg" width={128} height={38}
                 alt="eventscape logo"/>
        </Link>
        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
             <Navbar />
          </nav>
        </SignedIn>  
        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <Navside />
          </SignedIn>
          <SignedOut>
              <Button asChild className="rounded-full" size="lg">
                <Link href="/sign-in">
                  Login
                </Link>
              </Button>
          </SignedOut>
        </div> 
      </div>
    </header>
  )
}

export default Header