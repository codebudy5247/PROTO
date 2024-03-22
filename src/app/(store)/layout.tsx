import { api } from "@/trpc/server";
import { Header } from "./_components/header/Header";
import { Footer } from "./_components/Footer";
const StoreLayout = async ({ children }: { children: React.ReactNode }) => {
  const collections = await api.collection.list();
  return (
    <>
      <div className="min-h-screen">
        <Header collections={collections} />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default StoreLayout;
