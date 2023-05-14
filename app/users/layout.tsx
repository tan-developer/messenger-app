import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/sidebar";
import UserList from "./components/UserList";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const users = await getUsers()
  return (
    // @ts-expect-error Server Components
    <Sidebar>
      <div className="h-full">
      <UserList users={users}/>

        {children}
        </div>

    </Sidebar>
  );
}
