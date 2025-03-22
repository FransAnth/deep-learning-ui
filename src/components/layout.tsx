import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar/sidebar";
import SidebarItem from "./sidebar/sidebar-item";
import { NetworkIcon } from "lucide-react";

const Layout = () => {
  return (
    <div className="flex w-full">
      <Sidebar>
        <SidebarItem
          icon={<NetworkIcon size={20} />}
          title="Digit Recognition"
          path="/digit-recognition"
        />
      </Sidebar>
      <div className="w-full bg-secondaryBg overflow-auto h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
