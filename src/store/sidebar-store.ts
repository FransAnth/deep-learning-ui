import { create } from "zustand";

export const useSidenavStore = create((set: any) => {
  return {
    sidenavExpanded: true,
    toggleSidenav: (isExpanded: boolean) =>
      set(() => ({ sidenavExpanded: isExpanded })),
  };
});
