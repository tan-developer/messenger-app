import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface IParams {
  conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {

  try {
    const currentUser = await getCurrentUser();
  } catch (error) {
    return new NextResponse("Internal Error" , {status : 500})
  }
}
