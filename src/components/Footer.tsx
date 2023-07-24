export default function Footer() {
  return (
    <div className="flex w-full flex-row text-lg font-medium justify-center items-center space-x-1">
      <span>private beta</span>
      <span>
        by{" "}
        <a
          href="https://waldemar.dev"
          rel="noopener noreferrer"
          target="_blank"
          className="text-primary transition-all duration-300 ease-in-out hover:underline"
        >
          @walde
        </a>
      </span>
    </div>
  );
}
