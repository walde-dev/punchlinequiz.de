import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 z-50 flex w-full md:px-60 md:pt-10">
      <div className="flex w-full flex-row items-center justify-between">
        <Logo />
        <div className="flex space-x-1">
          <HeaderLink href="kalender"> kalender </HeaderLink>
          <HeaderLink href="einreichen"> einreichen </HeaderLink>
        </div>
      </div>
    </header>
  );
}

export function Logo() {
  return (
    <Link href="/" className="text-2xl">
      punchline<span className="font-bold text-primary">/</span>
      <span className="font-bold">quiz</span>
    </Link>
  );
}

export function HeaderLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="rounded-md px-4 py-2 text-xl transition-all duration-300 ease-in-out hover:bg-gray-800"
    >
      <span className="text-primary">/</span>
      {children}
    </a>
  );
}
