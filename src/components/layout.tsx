import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar/sidebar";
import SidebarItem from "./sidebar/sidebar-item";
import { BotIcon, NetworkIcon } from "lucide-react";

const Layout = () => {
  return (
    <div className="flex w-full">
      <Sidebar>
        <SidebarItem
          icon={<NetworkIcon size={20} />}
          title="Digit Recognition"
          path="/digit-recognition"
        />
        <SidebarItem
          icon={<BotIcon size={20} />}
          title="Tic Tac Toe"
          path="/tic-tac-toe"
        />
      </Sidebar>
      <div className="w-full bg-secondaryBg overflow-auto h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
