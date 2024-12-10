'use client';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  Code, 
  Layout, 
  Database, 
  BookOpen,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { SidebarProps, SidebarItemProps, SidebarGroupEnum } from '@/utils/type';
import { sidebarGroup } from '@/utils/bundle-items';
import Link from 'next/link';

const folderSections = [
  {
    title: SidebarGroupEnum.HLD,
    icon: <Database className="w-5 h-5 text-muted-foreground" />
  },
  {
    title: SidebarGroupEnum.LLD,
    icon: <Code className="w-5 h-5 text-muted-foreground" />
  },
  {
    title: SidebarGroupEnum.JAVASCRIPT,
    icon: <Layout className="w-5 h-5 text-muted-foreground" />
  },
  {
    title: SidebarGroupEnum.REACT,
    icon: <Layout className="w-5 h-5 text-muted-foreground" />
  },
  {
   title: SidebarGroupEnum.DATABASE,
   icon: <Database className="w-5 h-5 text-muted-foreground" />
  },
  {
    title: SidebarGroupEnum.DOM,
    icon: <Layout className="w-5 h-5 text-muted-foreground" />
  }
];

export default function AppSidebar() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const pathname = usePathname();
  const router = useRouter();

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const isActive = (url: string) => pathname === url;
  const sideMenuItems: SidebarProps[] = sidebarGroup(folderSections);

  return (
    <Sidebar className="min-h-screen">
      <SidebarContent className="bg-background border-r border-border px-3 py-6">
        <SidebarGroup>
          {/* Title Section with Icon */}
          <div className="px-4 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
              <SidebarGroupLabel className="text-2xl font-bold text-primary cursor-pointer" onClick={() => router.push('/')}>
                Archive Notes
              </SidebarGroupLabel>
            </div>
            {/* Separator */}
            <div className="h-px bg-border" />
          </div>
          <SidebarGroup className="space-y-8">
            {
              sideMenuItems.map((menu: SidebarProps, index: number) => (
                <div className="space-y-4" key={index}>
                  <div className="px-4 flex items-center gap-2 cursor-pointer" onClick={() => toggleSection(menu.title)}>
                    {menu.icon}
                    <SidebarGroupLabel className="text-xl font-semibold text-foreground">
                      {menu.title}
                    </SidebarGroupLabel>
                    {openSections[menu.title] ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  {openSections[menu.title] && (
                    <SidebarGroupContent className='ml-6'>
                      <SidebarMenu>
                        {menu.items.map((item: SidebarItemProps) => (
                          <SidebarMenuItem 
                            key={item.name}
                            className={`rounded-[--radius] transition-all text-nowrap duration-200`}
                          >
                            <SidebarMenuButton asChild>
                              <Link
                                href={item.url} 
                                className={`
                                  flex items-center gap-3 px-4 py-3 text-base font-medium
                                  rounded-[--radius] transition-all duration-200
                                  group relative
                                  ${isActive(item.url) 
                                    ? 'text-primary bg-secondary hover:bg-secondary hover:text-primary' 
                                    : 'hover:bg-secondary hover:text-primary'
                                  }
                                `}
                              >
                                {item.name}
                                {isActive(item.url) && (
                                  <ChevronRight className="w-4 h-4 absolute right-2 text-primary" />
                                )}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  )}
                </div>
              ))
            }
          </SidebarGroup>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
