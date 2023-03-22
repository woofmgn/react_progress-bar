import { FC, ReactNode } from "react";
import cls from "./Layout.module.css";

type TLayout = {
  children: ReactNode;
};

export const Layout: FC<TLayout> = ({ children }) => {
  return <main className={cls.main}>{children}</main>;
};
