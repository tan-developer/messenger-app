"use client";

import Avatar from "@/app/components/Avatar";
import useConversationUser from "@/app/hooks/useConversationUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const targetUser = useConversationUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, []);

  return (
    <div
      className="
      bg-white
      w-full
      flex
      border-b-[1px]
      sm:px-4
      py-4
      lg:px-6
      items-center
      shadow-sm
      justify-between
    "
    >
      <div className="flex gap-3 items-center">
        <Link
          className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          href={"/conversations"}
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar user={targetUser} />

        <div className="flex flex-col">
          <div className="">{conversation.name || targetUser.name}</div>

          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => {}}
        className="
          text-sky-500
          cursor-pointer
          hover:text-sky-600
          transition
        "
      />
    </div>
  );
};

export default Header;
