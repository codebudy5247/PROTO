import Sidenav from "./_components/Sidenav";
import Header from "./_components/Header";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidenav />
        <div className="flex flex-col">
          <Header />
          {children}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
