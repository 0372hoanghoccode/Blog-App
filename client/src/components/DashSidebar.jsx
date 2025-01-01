import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { User, ArrowRightFromLine } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

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

  return (
    <div className="w-full md:w-56 border-r h-full">
      <ScrollArea className="h-full py-6">
        <div className="space-y-1 px-3">
          <Link to="/dashboard?tab=profile">
            <Button 
              variant={tab === 'profile' ? 'secondary' : 'ghost'} 
              className="w-full justify-start"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            className="w-full justify-start cursor-pointer"
          >
            <ArrowRightFromLine className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}