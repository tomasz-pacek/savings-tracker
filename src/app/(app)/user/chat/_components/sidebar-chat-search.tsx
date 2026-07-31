"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  SidebarGroup,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";

export default function SidebarChatSearch() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleOpenSidebar = () => {
    if (isCollapsed) {
      toggleSidebar();
    }
  };

  const [chatSearch, setChatSearch] = useQueryState("chatSearch", {
    defaultValue: "",
    shallow: false,
    limitUrlUpdates: {
      method: "debounce",
      timeMs: 500,
    },
  });

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex items-center justify-center">
        <InputGroup
          className="cursor-pointer border-none"
          onClick={handleOpenSidebar}
        >
          <InputGroupInput
            placeholder="Search your chats..."
            value={chatSearch}
            onChange={(e) => setChatSearch(e.target.value)}
          />
          <InputGroupAddon className="pr-2">
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
