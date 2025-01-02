import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { signoutSuccess } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { FaUser, FaSignOutAlt, FaFileAlt } from 'react-icons/fa'

export default function DashSidebar() {
  const location = useLocation()
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)
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
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data.message)
      } else {
        dispatch(signoutSuccess())
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="w-full md:w-56 border-r h-full">
      <ScrollArea className="h-full py-6">
        <div className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <Button
              variant={tab === 'profile' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
            >
              <FaUser className="mr-2 h-4 w-4" />
              {currentUser.isAdmin ? 'Admin' : 'User'} Profile
            </Button>
          </Link>
          
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <Button
                variant={tab === 'posts' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
              >
                <FaFileAlt className="mr-2 h-4 w-4" />
                Posts
              </Button>
            </Link>
          )}
          
          <Button
            variant="ghost"
            className="w-full justify-start cursor-pointer"
            onClick={handleSignout}
          >
            <FaSignOutAlt className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}