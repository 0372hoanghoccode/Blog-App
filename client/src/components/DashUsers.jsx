import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Check, X, Trash2, Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!currentUser.isAdmin) {
    return <div className="p-4 text-center text-slate-500 dark:text-slate-400">You don't have permission to view this page.</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-light text-slate-800 dark:text-slate-200">User Management</h1>
      <div className="bg-white dark:bg-slate-900 shadow-sm rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                <TableHead className="w-[100px] text-xs font-semibold tracking-wide uppercase text-slate-600 dark:text-slate-300">Date created</TableHead>
                <TableHead className="text-xs font-semibold tracking-wide uppercase text-slate-600 dark:text-slate-300">User</TableHead>
                <TableHead className="text-xs font-semibold tracking-wide uppercase text-slate-600 dark:text-slate-300">Email</TableHead>
                <TableHead className="text-xs font-semibold tracking-wide uppercase text-slate-600 dark:text-slate-300">Admin</TableHead>
                <TableHead className="text-xs font-semibold tracking-wide uppercase text-slate-600 dark:text-slate-300 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors duration-200">
                  <TableCell className="py-3 text-sm text-slate-700 dark:text-slate-300">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="flex items-center space-x-2">
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-700 dark:text-slate-300">{user.username}</span>
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-slate-300">{user.email}</TableCell>
                  <TableCell className="text-center">
                    {user.isAdmin ? (
                      <Check className="text-teal-500 inline h-5 w-5 dark:text-slate-300" />
                    ) : (
                      <X className="text-gray-400 inline h-5 w-5 dark:text-slate-300" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-teal-600 transition-colors duration-200 dark:text-slate-300 dark:hover:text-teal-500"
                      onClick={() => {
                        // View user details functionality
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className="text-gray-600 hover:text-red-600 transition-colors duration-200 dark:text-slate-300 dark:hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
      {showMore && (
        <Button
          onClick={handleShowMore}
          variant="ghost"
          className="w-full text-gray-600 hover:text-teal-600 transition-colors duration-200 dark:text-slate-300 dark:hover:text-teal-500"
        >
          Show more
        </Button>
      )}

      <AlertDialog open={showModal} onOpenChange={setShowModal}>
        <AlertDialogContent className="bg-white rounded-lg shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-800 text-xl font-light dark:text-slate-300">Delete User</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to delete this user? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors duration-200">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-500 hover:bg-red-600 text-white transition-colors duration-200">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
