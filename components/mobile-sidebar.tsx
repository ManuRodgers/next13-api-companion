import { SideBar } from '@/components/sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export /**
 *
 *
 * MobileSidebar will be used in the navbar.tsx file to create a mobile sidebar
 */
const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side={'left'} className="w-32 p-0 pt-10 bg-secondary">
        <SideBar />
      </SheetContent>
    </Sheet>
  );
};
