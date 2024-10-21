import { SidebarProvider} from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/app-sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.isAdmin) {
    redirect("/login");
    return null;
  }
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main className="bg-slate-100 min-w-full">
        {children}
      </main>
    </SidebarProvider>
  );
}
