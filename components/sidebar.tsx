'use client';

import { cn } from '@/lib/utils';
import { Home, Plus, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const routes = [
    {
      Icon: Home,
      href: '/',
      label: 'Home',
      pro: false,
    },
    {
      Icon: Plus,
      href: '/companion/new',
      label: 'Create',
      pro: true,
    },
    {
      Icon: Settings,
      href: '/settings',
      label: 'Settings',
      pro: false,
    },
  ];
  return (
    <div className="flex flex-col h-full space-y-4 text-primary bg-secondary">
      <div className="justify-center flex-1 p-3">
        <div className="space-y-2">
          {routes.map(({ Icon, href, label, pro }) => (
            <div
              key={href}
              onClick={() => {
                router.push(href);
              }}
              className={cn(
                'text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
                pathname === href && 'text-primary bg-primary/10'
              )}
            >
              <div className="flex flex-col items-center flex-1 gap-y-2">
                <Icon className="w-5 h-5" />
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
