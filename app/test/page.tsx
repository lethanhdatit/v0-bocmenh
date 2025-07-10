import TestClient from "./TestClient";

export const dynamic = "force-dynamic";

export default async function TestPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-gray-950 via-slate-900 text-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
       <TestClient />
      </div>
    </main>
  );
}
