import DailyThought from "./components/DailyThought";

export default function Home() {
  return (
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-100 px-30 bg-black dark:bg-black sm:items-start">
        <h1 className= "m-3 text-3xl font-bold text-[#ff0000]"> Welcome to My Journal App</h1>
        <DailyThought/>  

      </main>
    
  );
}
