import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import useConversationUser from "@/app/hooks/useConversationUser";
import { useCallback, useMemo } from "react";
import Avatar from "@/app/components/Avatar";

interface Props {
  data: FullConversationType;
  selected: boolean;
}

const ConversationBox: React.FC<Props> = ({ data, selected }) => {
  const otherUser = useConversationUser(data);

  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body && lastMessage?.image) {
      return lastMessage.body;
    }

    return "Start a conversation";
  }, [lastMessage]);

  return (
    <div
      className={clsx(
        `
        w-full
        relative
        flex
        items-center
        space-x-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        p-2
        mb-2
      `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
      onClick={handleClick}
    >
      <Avatar user={otherUser} />
      <div className="min-w-0 flex-1 text-base">
        <div className="focus:outline-none">
          <div
            className="
            flex
            justify-between
            items-center
            mb-1
          "
          >
            <p className="text-md font-medium text-gray-900 ">
              {data.name || otherUser.name}
            </p>

            {lastMessage?.createAt && (
              <p className="
                text-xs
                text-gray-400
                font-light
              ">
                {format(new Date(lastMessage.createAt) , 'p')}
              </p>
            )}
          </div>
          <p className={clsx(`
            truncate
            text-sm
          ` , hasSeen ? 'text-gray-500 ' : "text-black font-medium")}>
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
