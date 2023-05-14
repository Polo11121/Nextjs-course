import { ReactNode } from "react";
import { Navigation } from "@/components/UI/Navigation/Navigation";

export const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Navigation />
    <main>{children}</main>
  </>
);
