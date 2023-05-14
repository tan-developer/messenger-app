"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";

const MobileFooter: React.FC = () => {
  const routes = useRoutes();

  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        justify-between
        w-full
        bottom-0
        z-40
        flex
        items-center
        bg-white
        border-t-[1px]
        lg:hidden
  "
    >
      {routes.map(item => {
        return <MobileItem key={item.label} {...item}/>
      })}
    </div>
  );
};

export default MobileFooter;
