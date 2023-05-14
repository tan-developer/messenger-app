"use client";

import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import Avatar from "../Avatar";

interface DesktopSidebarProps {
  currentUser: User | null;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  console.log(currentUser);
  return (
    <div
      className="
    hidden
    lg:fixed
    lg:inset-y-0
    lg:left-0
    lg:z-40
    lg:w-20
    xl:px-6
    lg:overflow-y-auto
    lg:bg-white
    lg:border-r-[1px]
    lg:pb-4
    lg:flex-col  
    lg:flex
    justify-between
  "
    >
      <nav
        className="
      mt-4
      flex
      flex-col
      justify-between
    "
      >
        <ul
          className="
          flex
          flex-col
          items-center
          space-y-1
        "
        >
          {routes.map((item) => {
            return <DesktopItem key={item.label} {...item} />;
          })}
        </ul>
      </nav>

      <nav
        className="
        mt-4
        flex
        flex-col
        justify-between
        items-center
      "
      >
        <div
          className="
          cursor-pointer
          hover:opacity-75
          transition
        "
        >
          <Avatar user={currentUser}/>

        </div>
      </nav>
    </div>
  );
};

export default DesktopSidebar;
