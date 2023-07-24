import Head from "next/head";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-screen flex-col items-center overflow-hidden bg-black tracking-tighter text-white  lg:px-80 md:px-60 md:pt-10">
      <Head>
        <title>Punchline Quiz</title>
        <meta
          name="description"
          content="Das Deutschrap Punchline Quiz. Teste dein Wissen über die besten Lines der deutschen Rapszene."
        />
        <meta
          name="keywords"
          content="Deutschrap, Quiz, Punchline, Lines, Rapper, Rapszene, Rap, HipHop, Musik, Deutschrap Quiz, Deutschrap Punchline Quiz, Deutschrap Quiz, Deutsch Rap Quiz"
        />
        <meta name="author" content="Waldemar Panin" />
        
      </Head>
      <Header />
      <main className="flex h-full w-full flex-1 flex-col items-center text-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
