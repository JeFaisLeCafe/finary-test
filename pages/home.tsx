import Head from "next/head";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Home PE Soury</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center min-h-screen">
        <div>
          <h1 className="text-6xl font-bold pb-32">You're now logged in !</h1>
        </div>

        <p className="mt-3 text-2xl">Thanks for the opportunity !</p>
      </main>

      <footer className="flex items-center justify-center w-full h-12 border-t">
        Made with ❤️ by Pierre-Etienne Soury
      </footer>
    </div>
  );
};

export default HomePage;
