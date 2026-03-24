"use client"

import * as React from "react"
import { useSidebar } from "@/components/ui/sidebar"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEndIcon, LayoutDashboard, MapPinned, TerminalSquareIcon, BotIcon, BookOpenIcon, Settings2Icon, FrameIcon, PieChartIcon, MapIcon } from "lucide-react"
let name; 

// This is sample data.
const data = {
  user: {
    name: "Sarthak",
    email: "mestosarthak@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      
      logo: (
        <GalleryVerticalEndIcon />
      ),
      plan: "Last mile experts",
    },
  ],
  //url doesn't seem to work as we changed the buttton components setting. 
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: (
        <LayoutDashboard />
      ),
      isActive: true,
    },
    {
      title: "Live Map (coming soon)",
      url: "#",
      icon: (
        <MapPinned />
      ),

    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: (
        <FrameIcon />
      ),
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: (
        <PieChartIcon />
      ),
    },
    {
      name: "Travel",
      url: "#",
      icon: (
        <MapIcon />
      ),
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  const { state } = useSidebar(); 
  (state === "collapsed") ? "RE" : "RouteEasy";
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        
          {state === "collapsed" ? <h1 className='text-2xl font-bold ml-0.5'>RE</h1>:<h1 className='text-3xl font-bold'>RouteEasy</h1>}
        
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
