import Link from "next/link"
import Image from "next/image"
const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-24">
            <Image src="/assets/images/logo.svg" width={128} height={38}
                 alt="eventscape logo"/>
          </Link>  
      </div>
      <div className="flex w-32 justify-end gap-3">

      </div>
    </header>
  )
}

export default Header