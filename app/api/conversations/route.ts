import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    const body = await request.json();

    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (isGroup && (!members || name)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    if (isGroup) {
      const newConversationn = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => {
                return {
                  id: member.value,
                };
              }),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });
      return NextResponse.json(newConversationn);
    }


    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const privateConversation = existingConversations[0]

    if (privateConversation) { 
      return NextResponse.json(privateConversation)
    }

    const newConversation = await prisma.conversation.create({
      data : {
        users : {
          connect : [
            {
              id : currentUser.id
            },
            {
              id : userId
            }
          ]
        }
      },
      include : {
        users : true
      }
    })

    return NextResponse.json(newConversation)

  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
