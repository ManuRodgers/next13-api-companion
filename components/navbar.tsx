import { MobileSidebar } from '@/components/mobile-sidebar';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import { Sparkles } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const font = Poppins({ weight: '600', subsets: ['latin'] });

export const Navbar = () => {
  return (
    <div className="fixed z-50 flex items-center justify-between w-full h-16 px-4 py-2 border-b border-primary/10 bg-secondary">
      <div className="flex items-center">
        <MobileSidebar />
        <Link href="/">
          <h1
            className={cn(
              'hidden md:block text-xl md:text-3xl font-bold text-primary',
              font.className
            )}
          >
            companion.ai
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <Button size="sm" variant={'premium'}>
          Upgrade
          <Sparkles className="w-4 h-4 ml-2 text-white fill-white" />
        </Button>
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
