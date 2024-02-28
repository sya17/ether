"use client";

import Navbar from "@/layout/Navbar";
import Sidebar from "@/layout/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { setActivePage } from "@/lib/redux/slices/commonSlice";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    dispatch(setActivePage("dashboard_page"));

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  const ActivePage = useSelector((state) => {
    return state.common.page;
  });

  return (
    <div className="flex flex-row min-h-screen bg-background font-sans antialiased overflow-hidden">
      {!isMobile && <Sidebar className="border-r" />}
      <div className="flex-1 flex flex-col min-w-fit space-y-1 bg-secondary">
        <Navbar className="h-14 border-b" />
        <main className="flex flex-1 max-h-full p-2 ">
          {ActivePage && <ActivePage className="h-full overflow-hidden" />}
        </main>
        <Toaster />
      </div>
    </div>
  );
}
