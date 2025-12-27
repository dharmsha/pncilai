"use client";
import Topbar from "@/components/Header/Topbar";
import Navbar from "@/components/Header/Navbar";
import Footers from "@/components/Footer/Footers";

const Layout = ({ children }) => {
  return (
    <>
      <Topbar />
      <Navbar />
      <main>{children}</main>
      <Footers />
    </>
  );
};

export default Layout;
