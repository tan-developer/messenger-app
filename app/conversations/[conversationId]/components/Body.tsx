"use client";

import prisma from "@/app/libs/prismadb";
import useConversation from "@/app/hooks/useConversation";
import { FullMassageType } from "@/app/types";
import { useRef, useState } from "react";
import MessageBox from "./MessageBox";

interface BodyProps {
  initialMessages: FullMassageType[];
}

const Body = async ({ initialMessages }: BodyProps) => {
  const [messages, setMessages] = useState<FullMassageType[]>(initialMessages);

  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  return (
    <div className="h-full overflow-y-auto">
      {messages.map((message, index) => (
        <MessageBox
          data={message}
          isLast={index === messages.length - 1}
          key={index}
        />
      ))}
      <div className="pt-24" ref={bottomRef}></div>
    </div>
  );
};

export default Body;
