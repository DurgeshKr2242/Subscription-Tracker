import HeroSection from "../components/LandingPage/HeroSection";

export default function Home() {
  return (
    <div className="w-screen tablet-s:pb-6 pb-14 min-h-screen h-100% tablet-s:pl-20 dark:bg-bgblack dark:text-white flex flex-col items-center gap-14">
      <HeroSection />
    </div>
  );
}
