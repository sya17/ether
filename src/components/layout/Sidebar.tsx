"user client";
import { icons } from "lucide-react";
import { useSelector } from "@/lib/redux/store";
import { sidebarDummy } from "@/constant/dummy/sidebar-dummy";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { setActivePage } from "@/lib/redux/slices/commonSlice";
import ProfileUser from "../custom/profile-user";
import { Separator } from "../ui/separator";
import { Sidebar } from "@/interfaces/sidebar";

export default function Sideba({ className }: { className: string }) {
  const hide = useSelector((state) => state.common.hideSidebar);

  const dispatch = useDispatch();
  const selectdMenu = (activePage: string) => {
    dispatch(setActivePage(activePage));
  };

  let ActivePage = useSelector((state) => state.common.activePage);

  const SidebarElements = ({
    element,
    level = 0,
    expandParent,
  }: {
    element: Sidebar;
    level?: number;
    expandParent: () => void;
  }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const IconComponent = icons[element.icon as keyof typeof icons];
    const paddingLeft = level ? `${level * 2}rem` : `${1}rem`;
    const openMenu = (element: Sidebar) => {
      if (element.child && element.child.length > 0) {
        setIsExpanded(!isExpanded);
        expandParent(); // Notify the parent about the state change
      } else {
        selectdMenu(element.id);
      }
    };
    return (
      <div className="overflow-hidden flex flex-col text-foreground my-2">
        <div
          className={cn(
            "relative hover:bg-primary/90 hover:text-primary-foreground/90 flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground ",
            {
              "bg-accent": isExpanded,
              "bg-primary text-primary-foreground": ActivePage == element.id,
            }
          )}
          style={{ paddingLeft }}
          onClick={() => {
            openMenu(element);
          }}
        >
          {IconComponent && <IconComponent />}
          <span>{element.label}</span>
          {element.child &&
            element.child.length > 0 &&
            (isExpanded ? (
              <icons.ChevronDown className="ml-auto text-xs tracking-widest text-muted-foreground" />
            ) : (
              <icons.ChevronRight className="ml-auto text-xs tracking-widest text-muted-foreground" />
            ))}
        </div>
        {isExpanded && element.child && element.child.length > 0 && (
          <div className="overflow-hidden  flex flex-col text-foreground ">
            {element.child.map((child, index) => (
              <SidebarElements
                key={index}
                element={child}
                level={level + 1}
                expandParent={expandParent}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return hide ? (
    <></>
  ) : (
    <aside className={cn("w-1/4 bg-popover", className)}>
      <div className="flex h-full w-full flex-col overflow-hidden text-popover-foreground">
        <div className="h-14 flex justify-center items-center p-2">
          Company Logo
        </div>
        <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
          <icons.Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <input
            placeholder="search..."
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {/* List */}
        <div className="h-full overflow-y-auto overflow-x-hidden p-2">
          {/* Group */}
          {sidebarDummy.map((element, index) => (
            <SidebarElements
              key={index}
              element={element}
              expandParent={() => {}}
            />
          ))}
        </div>
        <Separator className="shadow-md" />
        <ProfileUser
          id="1"
          name="ETHER ADMIN"
          className="h-14 m-2 inline-flex justify-start items-center"
        />
      </div>
    </aside>
  );
}
