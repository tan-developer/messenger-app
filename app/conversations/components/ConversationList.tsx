"use client"

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import { Conversation } from "@prisma/client"
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {MdOutlineGroupAdd} from 'react-icons/md'
import ConversationBox from "./ConversationBox";

interface Props {
  initConversation : FullConversationType[];
}

const ConversationList : React.FC<Props> = ({
  initConversation
}) => {
  const [items , setItems] = useState<FullConversationType[]>(initConversation)

  const router = useRouter();

  const {conversationId , isOpen} = useConversation();


  return <div className={clsx(`
    fixed
    inset-y-0
    pb-20
    lg:pb-0
    lg:w-80
    lg:left-20
    lg:block
    overflow-y-auto
    border-r
    border-gray-200
    ` , 
      isOpen ? 'hidden' : 'block w-full left-0'
    )}>
      <div className="px-3">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800">
            Messages
          </div>
          <div className="text-center flex items-center">
            <MdOutlineGroupAdd size={20}/>
          </div>
        </div>
        {
          items.map(item => (
            <ConversationBox 
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))
        }
      </div>
    </div>
}

export default ConversationList