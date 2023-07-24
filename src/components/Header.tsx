export default function Header() {
  return (
    <header className="fixed top-0 z-50 flex w-full md:px-60 md:pt-10">
      <div className="flex flex-row justify-between w-full items-center">
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
    <span className="text-2xl">
      punchline<span className="font-bold text-primary">/</span>
      <span className="font-bold">quiz</span>
    </span>
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
    <a href={href} className="text-xl rounded-md py-2 px-4 hover:bg-gray-800 transition-all duration-300 ease-in-out">
      <span className="text-primary">/</span>
      {children}
    </a>
  );
}
