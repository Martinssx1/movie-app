import { IterationCcw } from "lucide-react";
function ErrorFallback({ resetErrorBoundary }) {
  return (
    <div className="min-h-screen flex flex-col mt-70 items-center">
      <h2 className="font-bold text-xl">Something isnt Right</h2>

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
export default ErrorFallback;
