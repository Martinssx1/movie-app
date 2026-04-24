import { IterationCcw } from "lucide-react";
export default function SimilarFallback({ resetErrorBoundary }) {
  return (
    <div className="p-4 text-white">
      <h3 className="mb-2">Couldn't load similar movies</h3>

      <button onClick={resetErrorBoundary} className="text-sm  flex underline">
        <IterationCcw />
        Retry
      </button>
    </div>
  );
}
