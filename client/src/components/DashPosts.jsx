import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <ScrollArea className="w-full rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date updated</TableHead>
                  <TableHead>Post image</TableHead>
                  <TableHead>Post title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Delete</TableHead>
                  <TableHead>Edit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userPosts.map((post) => (
                  <TableRow key={post._id}>
                    <TableCell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-20 h-10 object-cover bg-gray-500 rounded"
                        />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        className="font-medium hover:underline"
                        to={`/post/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    </TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}
                        className="text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </TableCell>
                    <TableCell>
                      <Link
                        className="text-teal-500 hover:underline"
                        to={`/update-post/${post._id}`}
                      >
                        Edit
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {showMore && (
              <Button
                variant="ghost"
                onClick={handleShowMore}
                className="w-full text-teal-500 py-6"
              >
                Show more
              </Button>
            )}
          </ScrollArea>

          <AlertDialog open={showModal} onOpenChange={setShowModal}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex gap-2">
                  <HiOutlineExclamationCircle className="h-5 w-5 text-red-500" />
                  Delete Post
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this post? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeletePost} className="bg-red-500 hover:bg-red-600">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
    </div>
  );
}