import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main className="bg-slate-100 min-w-full">
        <SidebarTrigger className="lg:hidden" />
        {children}
      </main>
    </SidebarProvider>
  );
}
