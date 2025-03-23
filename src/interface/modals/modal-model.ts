import { JSX } from "react";

export interface IAddDataModal {
  isOpen: boolean;
  closeModalAction: (data: boolean) => void;
}

export interface IModal extends IAddDataModal {
  title: string;
  className?: string;
  children: string | JSX.Element | JSX.Element[];
  bodyStyle?: string;
}
