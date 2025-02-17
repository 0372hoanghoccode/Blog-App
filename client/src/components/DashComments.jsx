import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Trash2, Edit2 } from 'lucide-react';
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

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!currentUser.isAdmin) {
    return (
      <div className="p-4 text-center text-slate-500 dark:text-slate-400">
        You don't have permission to view this page.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-light text-slate-800 dark:text-slate-200">
        Comment Management
      </h1>
      <div className="bg-white dark:bg-slate-900 shadow-sm rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                <TableHead className="w-[100px] text-xs font-semibold tracking-wide uppercase text-slate-600 dark:text-slate-300">
                  Date Updated
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide uppercase text-slate-600 dark:text-slate-300">
                  Comment
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide uppercase text-slate-600 dark:text-slate-300">
                  Likes
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide uppercase text-slate-600 dark:text-slate-300">
                  Post
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide uppercase text-slate-600 dark:text-slate-300">
                  User
                </TableHead>
                <TableHead className="text-right text-xs font-semibold tracking-wide uppercase text-slate-600 dark:text-slate-300">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.map((comment) => (
                <TableRow
                  key={comment._id}
                  className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors duration-200"
                >
                  <TableCell className="py-3 text-sm text-slate-700 dark:text-slate-300">
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="py-3 text-sm max-w-xs truncate text-slate-700 dark:text-slate-300">
                    {comment.content}
                  </TableCell>
                  <TableCell className="py-3 text-sm text-slate-700 dark:text-slate-300">
                    {comment.numberOfLikes}
                  </TableCell>
                  <TableCell className="py-3 text-sm max-w-xs truncate text-slate-700 dark:text-slate-300">
                    {comment.postId}
                  </TableCell>
                  <TableCell className="py-3 text-sm max-w-xs truncate text-slate-700 dark:text-slate-300">
                    {comment.userId}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="text-slate-600 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-500 transition-colors duration-200"
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
          className="w-full text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-500 transition-colors duration-200"
        >
          Show more
        </Button>
      )}

      <AlertDialog open={showModal} onOpenChange={setShowModal}>
        <AlertDialogContent className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-800 dark:text-slate-200 text-xl font-light">
              Delete Comment
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 dark:text-slate-400">
              Are you sure you want to delete this comment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors duration-200">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteComment}
              className="bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

