import Head from "next/head";
import { useState } from "react";
import IndexMFAInput from "../components/IndexMFAInput";
import IndexEmailInput from "../components/IndexEmailInput";

export default function Index() {
  const [needMFA, setNeedMFA] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Finary PE Soury</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center min-h-screen">
        <div>
          <h1 className="text-6xl font-bold pb-32">
            Welcome to{" "}
            <a className="text-blue-600" href="https://finary.eu/app">
              Finary
            </a>
          </h1>
        </div>

        <div className="flex flex-1 flex-row flex-wrap justify-center items-center">
          {needMFA ? (
            <IndexMFAInput />
          ) : (
            <IndexEmailInput setNeedMFA={setNeedMFA} />
          )}
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-12 border-t">
        Made with ❤️ by Pierre-Etienne Soury
      </footer>
    </div>
  );
}
