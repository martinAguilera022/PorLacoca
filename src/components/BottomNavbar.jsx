"use client";

import { Home, Search, Bell,Hourglass, User,Plus,ChartNoAxesColumnIncreasing } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavBar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: <Home size={25} /> },
    { href: "/mis-partidos", icon: <Hourglass size={25} /> },

    { href: "/CrearPartido", icon: <Plus size={25} /> },
    { href: "/Ranking", icon: <ChartNoAxesColumnIncreasing size={25} /> },
    { href: "/profile", icon: <User size={25} /> },
    { href:"/notificaciones", icon: <Bell size={25}/> },
    
  ];

  return (
    <nav className="fixed bottom-4  md:hidden   left-1/2 transform -translate-x-1/2 bg-[#0f0f0f] rounded-full px-4 py-2 shadow-lg flex gap-4 justify-center items-center z-50">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all ${
              active ? "bg-white text-black font-medium" : "text-white/70"
            }`}
          >
            {item.icon}
            {active }
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavBar;
