const useToggleKebab = () => {
  let lastClicked: number | null = null;
  const toggleKebab: Function = (i: number, bool: boolean, kebabRef: any) => {
    let handleMenu = (e: any) => {
      if (e.target.classList.value !== "") {
        setTimeout(() => {
          kebabRef?.current[i]?.classList.add("hidden");
        }, 150);
      }
      document.removeEventListener("mousedown", handleMenu);
    };
    if (lastClicked !== i && lastClicked !== null) {
      kebabRef?.current[lastClicked]?.classList.add("hidden");
    }
    lastClicked = i;

    if (bool && kebabRef?.current[i]?.classList.contains(`kebab${i}`)) {
      document.removeEventListener("mousedown", handleMenu);
      document.addEventListener("mousedown", handleMenu);
      return kebabRef?.current[i]?.classList.toggle("hidden");
    }
  };

  return { toggleKebab };
};

export default useToggleKebab;
