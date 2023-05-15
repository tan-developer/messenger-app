import { Conversation , Message , User } from "@prisma/client";

export type FullMassageType = Message & {
  sender : User,
  seen : User[]
}

export type FullConversationType = Conversation & {
  users : User[],
  messages : FullMassageType[]
}