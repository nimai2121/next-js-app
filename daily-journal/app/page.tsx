import DailyThought from "./components/DailyThought";

export default function Home() {
  return (
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-100 px-30 bg-black dark:bg-black sm:items-start">
        
        <DailyThought/>  

      </main>
    
  );
}
