import { ReactNode } from "react";
import { QueryClient, DefaultOptions, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
  },
};

const queryClient = new QueryClient({ defaultOptions: queryConfig });

type QueryProviderProps = {
  children: ReactNode;
};

export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV !== "test" && <ReactQueryDevtools />}
      {children}
    </QueryClientProvider>
  );
};
