import Sidebar from "../components/sidebar/sidebar";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // @ts-expect-error Server Components
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
