import { ReactNode, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { QueryProvider } from "@/providers/query";

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen"></div>
      }
    >
      <QueryProvider>
        <Router>{children}</Router>
      </QueryProvider>
    </Suspense>
  );
};
