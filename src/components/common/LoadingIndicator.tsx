interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator = ({ message = 'Loading data...' }: LoadingIndicatorProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-nba-blue rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
      </div>
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
};

export default LoadingIndicator;