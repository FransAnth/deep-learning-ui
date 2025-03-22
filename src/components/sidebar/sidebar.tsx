import { ChevronFirst, ChevronLast } from "lucide-react";
import { createContext } from "react";
import { useSidenavStore } from "../../store/sidebar-store";
import { ChatbotIcon } from "../../assets";

const SidebarContext = createContext({});

const Sidebar = ({ children }: any) => {
  const expanded = useSidenavStore((state) => state.sidenavExpanded);
  const toggleSidenav = useSidenavStore((state) => state.toggleSidenav);

  return (
    <aside className="h-screen w-fit">
      <nav className="h-full flex flex-col bg-primaryBg border-r shadow-sm">
        <div className="py-4 px-2 flex justify-between items-center">
          <img
            src={ChatbotIcon}
            className={`overflow-hidden transition-all ${
              expanded ? "w-20" : "w-0"
            } p-2`}
          />
          <button
            onClick={() => toggleSidenav(!expanded)}
            className="p-1.5 rounded-3xl bg-secondary cursor-pointer"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
};

export { Sidebar, SidebarContext };
