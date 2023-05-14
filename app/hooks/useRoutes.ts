import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";

import { SignOutResponse, signOut } from "next-auth/react";

import useConversation from "./useConversation";
import { IconType } from "react-icons";

export interface RoutesHookTypes {
  label: string;
  href: string;
  icon: IconType;
  active: boolean;
  onClick ?: () => void
}

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo<RoutesHookTypes[]>(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        active: pathname === "/conversations" || !!conversationId,
        icon: HiChat,
      },
      {
        label: "Users",
        href: "/users",
        active: pathname === "/users",
        icon: HiUsers,
      },
      {
        label: "Logout",
        href: "#",
        icon: HiArrowLeftOnRectangle,
        active : false,
        onClick : () => signOut()
      },
    ],
    [pathname, conversationId]
  );

  return routes
};


export default useRoutes