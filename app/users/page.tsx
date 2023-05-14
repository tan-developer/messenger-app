
import { signOut } from "next-auth/react"
import EmptyState from "../components/EmptyState"

const Users : React.FC = () => {
  return <div className="hidden lg:block lg:pl-80 h-full"><EmptyState></EmptyState></div>
}

export default Users