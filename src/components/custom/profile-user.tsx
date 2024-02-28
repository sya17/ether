import * as icons from "lucide-react";
import * as Dropdown from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
export default function ProfileUser(params: {
  id: string;
  name: string;
  company?: string;
  className?: string;
}) {
  const router = useRouter();

  function initialName(val: string): string {
    if (val.length === 0) {
      throw new Error("Nama tidak boleh kosong");
    }
    const stringName = val.split(" ");
    const inisial = stringName.map((e) => e[0]).join("");
    return inisial;
  }

  const doLogout = () => {
    router.push("/login");
  };

  return (
    <div className={cn(params.className)}>
      <Dropdown.DropdownMenu>
        <Dropdown.DropdownMenuTrigger asChild>
          <div className="inline-flex items-center justify-start w-full p-2 space-x-2 rounded-md bg-background text-primary hover:bg-input/80 hover:text-primary/90 cursor-pointer">
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>{initialName(params.name)}</AvatarFallback>
            </Avatar>
            <span>{params.name}</span>
          </div>
        </Dropdown.DropdownMenuTrigger>
        <Dropdown.DropdownMenuContent className="w-56">
          <Dropdown.DropdownMenuLabel>My Profile</Dropdown.DropdownMenuLabel>
          <Dropdown.DropdownMenuSeparator />
          <Dropdown.DropdownMenuGroup>
            <Dropdown.DropdownMenuItem>
              <icons.User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <Dropdown.DropdownMenuShortcut>⇧⌘P</Dropdown.DropdownMenuShortcut>
            </Dropdown.DropdownMenuItem>
            <Dropdown.DropdownMenuItem>
              <icons.CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <Dropdown.DropdownMenuShortcut>⌘B</Dropdown.DropdownMenuShortcut>
            </Dropdown.DropdownMenuItem>
            <Dropdown.DropdownMenuItem>
              <icons.Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <Dropdown.DropdownMenuShortcut>⌘S</Dropdown.DropdownMenuShortcut>
            </Dropdown.DropdownMenuItem>
            <Dropdown.DropdownMenuItem>
              <icons.Keyboard className="mr-2 h-4 w-4" />
              <span>Keyboard shortcuts</span>
              <Dropdown.DropdownMenuShortcut>⌘K</Dropdown.DropdownMenuShortcut>
            </Dropdown.DropdownMenuItem>
          </Dropdown.DropdownMenuGroup>
          <Dropdown.DropdownMenuSeparator />
          <Dropdown.DropdownMenuGroup>
            <Dropdown.DropdownMenuItem>
              <icons.Users className="mr-2 h-4 w-4" />
              <span>Team</span>
            </Dropdown.DropdownMenuItem>
            <Dropdown.DropdownMenuSub>
              <Dropdown.DropdownMenuSubTrigger>
                <icons.UserPlus className="mr-2 h-4 w-4" />
                <span>Invite users</span>
              </Dropdown.DropdownMenuSubTrigger>
              <Dropdown.DropdownMenuPortal>
                <Dropdown.DropdownMenuSubContent>
                  <Dropdown.DropdownMenuItem>
                    <icons.Mail className="mr-2 h-4 w-4" />
                    <span>Email</span>
                  </Dropdown.DropdownMenuItem>
                  <Dropdown.DropdownMenuItem>
                    <icons.MessageSquare className="mr-2 h-4 w-4" />
                    <span>Message</span>
                  </Dropdown.DropdownMenuItem>
                  <Dropdown.DropdownMenuSeparator />
                  <Dropdown.DropdownMenuItem>
                    <icons.PlusCircle className="mr-2 h-4 w-4" />
                    <span>More...</span>
                  </Dropdown.DropdownMenuItem>
                </Dropdown.DropdownMenuSubContent>
              </Dropdown.DropdownMenuPortal>
            </Dropdown.DropdownMenuSub>
            <Dropdown.DropdownMenuItem>
              <icons.Plus className="mr-2 h-4 w-4" />
              <span>New Team</span>
              <Dropdown.DropdownMenuShortcut>⌘+T</Dropdown.DropdownMenuShortcut>
            </Dropdown.DropdownMenuItem>
          </Dropdown.DropdownMenuGroup>
          <Dropdown.DropdownMenuSeparator />
          <Dropdown.DropdownMenuItem>
            <icons.Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </Dropdown.DropdownMenuItem>
          <Dropdown.DropdownMenuItem>
            <icons.LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </Dropdown.DropdownMenuItem>
          <Dropdown.DropdownMenuItem disabled>
            <icons.Cloud className="mr-2 h-4 w-4" />
            <span>API</span>
          </Dropdown.DropdownMenuItem>
          <Dropdown.DropdownMenuSeparator />
          <Dropdown.DropdownMenuItem
            onClick={doLogout}
            className="cursor-pointer"
          >
            <icons.LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            {/* <Dropdown.DropdownMenuShortcut>⇧⌘Q</Dropdown.DropdownMenuShortcut> */}
          </Dropdown.DropdownMenuItem>
        </Dropdown.DropdownMenuContent>
      </Dropdown.DropdownMenu>
    </div>
  );
}
