import { ReactNode } from "react";
import { Header } from "@/components/Layout/Header";

export const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <main>{children}</main>
  </>
);
