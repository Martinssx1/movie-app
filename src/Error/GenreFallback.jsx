import { IterationCcw } from "lucide-react";
export default function GenreFallback({ resetErrorBoundary }) {
  return (
    <div className="min-h-screen flex flex-col  items-center">
      <h2 className="font-bold text-xl">Couldn't Load Section</h2>

      <button
        className="flex cursor-pointer hover:text-gray-500"
        onClick={resetErrorBoundary}
      >
        <IterationCcw />
        Try again
      </button>
    </div>
  );
}
