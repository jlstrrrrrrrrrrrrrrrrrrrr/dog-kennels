export const LoadingSpinner = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-50">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
      <p className="animate-pulse text-gray-600">Loading kennel data...</p>
    </div>
  );
};
