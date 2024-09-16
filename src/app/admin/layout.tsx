import Sidenav from "./_components/Sidenav";
import Header from "./_components/Header";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidenav />
        <div className="flex h-screen flex-col">
          <Header />
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
