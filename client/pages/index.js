import Head from "next/head";
import HeroSection from "../components/LandingPage/HeroSection";

export default function Home() {
  return (
    <div className="w-screen tablet-s:pb-6 pb-14 min-h-screen h-100% tablet-s:pl-20 dark:bg-bgblack dark:text-white flex flex-col items-center gap-14">
      <Head>
        <meta
          name="description"
          content="Here you will see a list of all your added friends. You can later use these friends and tag them while creating your subscription to keep a track of all the prople you shared your subscriptions with.
          Platform for tracking subscriptions and all of your friends with whom you often share your subscriptions. You may also add people with whom you share your subscriptions and never forget who all the individuals with whom you shared your subscriptions are again. So get rid of all your stress related to your subscriptions because we are going to take care of your subcriptions and trck them."
        />
        <meta
          name="keywords"
          content="subs subscription-tracker subscriptionTracker subscription tracker subscribe track subscriptiontrackerapp subscriptionTrack subscriptiontrackapp"
        />
        <title>SUBS</title>
      </Head>
      <HeroSection />
    </div>
  );
}
