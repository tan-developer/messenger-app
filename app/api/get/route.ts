import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"

interface IParams {
  conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {

  try {
    const currentUser = await getCurrentUser();
    const {conversationId} = params;

    if(!currentUser?.email || !currentUser.id) {
      return new NextResponse("Unauthorized" , {status : 401})
    }

    const conversation = await prisma.conversation.findUnique({
      where : {
        id : conversationId 
      },
      include : {
        messages : {
          include : {
            seen : true
          }
        }
      }
    })

  } catch (error) {
    return new NextResponse("Internal Error" , {status : 500})
  }
}
