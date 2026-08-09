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
import { SetStateAction } from "react";

type Props = {
  search: string;
  setSearch: React.Dispatch<SetStateAction<string>>;
};

export default function SidebarChatSearch({ search, setSearch }: Props) {
  const { state, toggleSidebar } = useSidebar();
  const handleOpenSidebar = () => {
    if (state === "collapsed") {
      toggleSidebar();
    }
  };
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex items-center justify-center">
        <InputGroup
          className="cursor-pointer border-none"
          onClick={handleOpenSidebar}
        >
          <InputGroupInput
            placeholder="Search your chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon className="pr-2">
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
