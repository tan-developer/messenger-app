import getConversations from "../actions/getConversations";
import Sidebar from "../components/sidebar/sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations()

  return (
  // @ts-expect-error

    <Sidebar>
      <ConversationList initConversation={conversations}/>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
