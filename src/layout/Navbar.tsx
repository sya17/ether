"use client";
import { hideSidebar } from "@/lib/redux/slices/commonSlice";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { PanelLeftClose, PanelRightClose, Search } from "lucide-react";
import ProfileUser from "@/components/custom/profile-user";
import { useTheme } from "next-themes";
import SelectTheme from "@/components/custom/select-theme";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export default function Navbar({ className }: { className: string }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(hideSidebar());
  };
  const hide = useSelector((state) => state.common.hideSidebar);

  return (
    <nav
      className={cn(
        "flex w-full p-2 justify-around items-center bg-background",
        className
      )}
    >
      <div className="w-full flex justify-start space-x-2">
        {hide ? (
          <PanelRightClose
            className="cursor-pointer text-gray-700"
            onClick={handleClick}
          />
        ) : (
          <PanelLeftClose
            className="cursor-pointer text-gray-700"
            onClick={handleClick}
          />
        )}
        {/* <span className="font-semibold">Company Logo</span> */}
      </div>
      <div className="w-full flex justify-center "></div>
      <div className="w-full flex justify-end space-x-4">
        <SelectTheme />
        {/* <ProfileUser /> */}
      </div>
    </nav>
  );
}
