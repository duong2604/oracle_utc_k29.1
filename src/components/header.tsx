import { Separator } from "@radix-ui/react-separator";
import LanguageItem from "./language-item";
import { ModeToggle } from "./mode-toggle";
import NotificationItem from "./notification-item";
import { SidebarTrigger } from "./ui/sidebar";
import AvatarItem from "./avatar-item";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <div className="flex w-full items-center justify-end gap-2">
        <LanguageItem />
        <ModeToggle />
        <NotificationItem />
        <AvatarItem />
      </div>
    </header>
  );
}
