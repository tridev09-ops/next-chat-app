import UsersPage from "./users/page";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 text-zinc-900 dark:bg-slate-950 dark:text-slate-100 font-sans">
      <UsersPage />
    </div>
  );
}
