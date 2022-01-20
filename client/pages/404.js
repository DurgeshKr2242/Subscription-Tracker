import { useRouter } from "next/router";
export default function Custom404() {
  const router = useRouter();
  return (
    <section className="flex flex-col items-center justify-center w-screen h-screen gap-4 dark:bg-bgblack dark:text-white">
      <h1 className="text-6xl font-bold">Ughh! Its a 404</h1>
      <p className="mt-8 text-3xl dark:text-gray-300">
        How did you even end up here!
      </p>
      <p className="text-3xl dark:text-gray-300 ">
        This page does&apos;nt even exists
      </p>
      <p className="text-3xl dark:text-gray-300">Let me help you get back.</p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-2 mt-4 text-lg font-bold tracking-wide rounded-lg shadow-md shadow-yellow-800 bg-bgyellow text-bgblack"
      >
        Go Home
      </button>
    </section>
  );
}
