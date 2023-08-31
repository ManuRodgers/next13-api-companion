import { Navbar } from '@/components/navbar';
import { SideBar } from '@/components/sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <Navbar />
      <div className="fixed inset-y-0 flex-col hidden w-20 h-full mt-16 md:flex">
        <SideBar />
      </div>
      <main className="h-full pt-16 md:pl-20">{children}</main>
    </div>
  );
}
