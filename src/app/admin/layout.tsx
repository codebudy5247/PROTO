import Sidenav from "./_components/Sidenav";
import Header from "./_components/Header";
import AuthProvider from "./AuthProvidor";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidenav />
        <div className="flex flex-col">
          <Header />
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default AdminLayout;
