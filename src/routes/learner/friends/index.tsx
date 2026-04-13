import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/learner/friends/")({
  component: FriendsPage,
});

function FriendsPage() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white p-6">
      <div className="">
        <header className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                Mind Map
              </h1>
              <p className="text-sm text-slate-500 mt-1">Mind map storage</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-sky-300"
              title="Tải mindmap"
            >
              <span className="text-sm hidden sm:inline">Export</span>
            </button>

            <button
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-sky-300"
              title="Làm mới"
              onClick={() => window.location.reload()}
            >
              <span className="text-sm hidden sm:inline">Reload</span>
            </button>
          </div>
        </header>

        <main className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-slate-300 rounded-lg bg-white/50 p-10">
          <h1 className="text-center text-3xl mt-20">
            In Progress, Wait for releasing
          </h1>
        </main>
      </div>
    </div>
  );
}
