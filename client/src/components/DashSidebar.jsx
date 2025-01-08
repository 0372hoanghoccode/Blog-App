import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  HiUser,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
  HiLogout
} from 'react-icons/hi';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { signoutSuccess } from '../redux/user/userSlice';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const navItems = [
    {
      label: `${currentUser.isAdmin ? 'Admin' : 'User'} Profile`,
      icon: HiUser,
      href: '/dashboard?tab=profile',
      tab: 'profile',
      show: true
    },
    {
      label: 'Posts',
      icon: HiDocumentText,
      href: '/dashboard?tab=posts',
      tab: 'posts',
      show: currentUser.isAdmin
    },
    {
      label: 'Users',
      icon: HiOutlineUserGroup,
      href: '/dashboard?tab=users',
      tab: 'users',
      show: currentUser.isAdmin
    },
    {
      label: 'Comments',
      icon: HiAnnotation,
      href: '/dashboard?tab=comments',
      tab: 'comments',
      show: currentUser.isAdmin
    },
    {
      label: 'Dashboard',
      icon: HiChartPie,
      href: '/dashboard?tab=dash',
      tab: 'dash',
      show: currentUser.isAdmin
    }
  ];

  return (
    <div className="w-full md:w-56 border-r h-full">
      <ScrollArea className="h-full py-6">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            item.show && (
              <Link key={item.tab} to={item.href}>
                <Button
                  variant={tab === item.tab ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            )
          ))}
          
          <Button
            variant="ghost"
            className="w-full justify-start cursor-pointer"
            onClick={handleSignout}
          >
            <HiLogout className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
}