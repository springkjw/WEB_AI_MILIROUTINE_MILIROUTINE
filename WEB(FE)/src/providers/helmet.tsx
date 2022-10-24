import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";

type MiliroutineHelmetProviderProps = {
  children: ReactNode;
};

export const MiliroutineHelmetProvider = ({
  children,
}: MiliroutineHelmetProviderProps) => {
  return <HelmetProvider>{children}</HelmetProvider>;
};
