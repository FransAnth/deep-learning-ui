import { useContext, useMemo, useState } from "react";

import { SidebarContext } from "../sidebar/sidebar";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarItem = ({ icon, title, path }: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { expanded }: any = useContext(SidebarContext);
  const [active, setActive] = useState(false);

  useMemo(() => {
    setActive(location.pathname.startsWith(path));
  }, [location]);

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        group text-white
        ${active ? " bg-primary" : "hover:bg-primaryBgHover"}
    `}
      onClick={() => navigate(path)}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {title}
      </span>

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-primary text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {title}
        </div>
      )}
    </li>
  );
};

export default SidebarItem;
