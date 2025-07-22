import React, { PropsWithChildren } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

// I could use PropsWithChildren instead of the type { children: React.ReactNode }

function layout({ children }: PropsWithChildren) {
  // Side bar will take up one column
  return (
    <main className="grid lg:grid-cols-5">
      {/* firt column hide on small screen */}
      <div className="hidden lg:block lg:col-span-1 lg:min-h-screen">
        <Sidebar></Sidebar>
      </div>

      {/* second column hide dropdown on big screen */}
      <div className="lg:col-span-4">
        <Navbar></Navbar>
        {/* Some padding and others */}
        <div className="py-16 px-4 sm:px-8 lg:px-16">{children}</div>
      </div>
    </main>
  );
}

export default layout;
