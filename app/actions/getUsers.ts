import prisma  from "@/app/libs/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
  const session = await getSession()

  if(!session?.user?.email) {
    return []
  }

  try {
    const listUser = await prisma.user.findMany({
      orderBy : {
        createAt : 'desc'
      }, 
      where : {
        NOT : {
          email : session.user.email
        }
      }
    })


    return listUser

    console.log()

  } catch (error) {
    return []
  }
}

export default getUsers