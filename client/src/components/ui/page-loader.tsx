
import { Loader } from "./loader";

interface PageLoaderProps {
  isLoading: boolean;
  text?: string;
}

const PageLoader = ({ isLoading, text = "Loading page..." }: PageLoaderProps) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center space-y-4">
        <Loader size="lg" text={text} />
        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-800 mb-1">Bhada.in</h3>
          <p className="text-sm text-blue-600">Your Property Portal</p>
        </div>
      </div>
    </div>
  );
};

export { PageLoader };
