import Link from 'next/link'
import Image from 'next/image'

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <div className="relative w-40 h-12">
        <Image
          src="/logo.png" // You'll need to add your logo image
          alt="Crimson Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  )
}

export default Logo 