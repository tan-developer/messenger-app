import { User } from "@prisma/client";
import { FullConversationType } from "./../types/index";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useConversationUser = (
  conversation: FullConversationType | { users: User[] }
) => {
  const sesssion = useSession();

  const otherUser = useMemo(() => {
    const currentEmail = sesssion.data?.user?.email;

    const otherUser = conversation.users.filter(
      (user) => user.email !== currentEmail
    );

    return otherUser[0]
  }, [sesssion.data?.user?.email, conversation.users]);

  return otherUser
};

export default useConversationUser