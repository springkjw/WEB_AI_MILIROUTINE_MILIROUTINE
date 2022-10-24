import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen"></div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider></HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
