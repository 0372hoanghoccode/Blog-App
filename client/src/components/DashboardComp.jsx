import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=5');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comment/getcomments?limit=5');
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  const StatCard = ({ title, total, lastMonth, icon: Icon, bgColor }) => (
    <Card className="w-full md:w-72">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase">
              {title}
            </p>
            <p className="text-2xl font-bold">{total}</p>
          </div>
          <div className={`${bgColor} p-3 rounded-full`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 text-sm">
          <span className="text-emerald-500 flex items-center">
            <HiArrowNarrowUp className="mr-1" />
            {lastMonth}
          </span>
          <span className="text-muted-foreground">Last month</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total Users"
          total={totalUsers}
          lastMonth={lastMonthUsers}
          icon={HiOutlineUserGroup}
          bgColor="bg-teal-600"
        />
        <StatCard
          title="Total Comments"
          total={totalComments}
          lastMonth={lastMonthComments}
          icon={HiAnnotation}
          bgColor="bg-indigo-600"
        />
        <StatCard
          title="Total Posts"
          total={totalPosts}
          lastMonth={lastMonthPosts}
          icon={HiDocumentText}
          bgColor="bg-lime-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Users</CardTitle>
            <Button variant="outline" asChild>
              <Link to="/dashboard?tab=users">See all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User Image</TableHead>
                  <TableHead>Username</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Comments</CardTitle>
            <Button variant="outline" asChild>
              <Link to="/dashboard?tab=comments">See all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Content</TableHead>
                  <TableHead>Likes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comments.map((comment) => (
                  <TableRow key={comment._id}>
                    <TableCell className="max-w-[200px]">
                      <p className="truncate">{comment.content}</p>
                    </TableCell>
                    <TableCell>{comment.numberOfLikes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Posts</CardTitle>
            <Button variant="outline" asChild>
              <Link to="/dashboard?tab=posts">See all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post._id}>
                    <TableCell>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-14 h-10 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <p className="truncate">{post.title}</p>
                    </TableCell>
                    <TableCell>{post.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}