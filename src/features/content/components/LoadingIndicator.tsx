export function LoadingIndicator() {
  return (
    <div className="flex items-center justify-center rounded-lg">
      <div className="animate-pulse rounded-full bg-blue-200 px-3 py-1 text-center text-xs font-medium leading-none text-blue-800">
        Loading...
      </div>
    </div>
  );
}
