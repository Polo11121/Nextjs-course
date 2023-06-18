import { ReactNode } from "react";
import { MainNavigation } from "./MainNavigation";

export const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <MainNavigation />
    <main>{children}</main>
  </>
);
