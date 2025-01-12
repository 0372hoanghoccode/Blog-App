import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import PostCard from '../components/PostCard';
import { SearchIcon, SlidersHorizontal, Loader2 } from 'lucide-react';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: ''
  });
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category/get");
        const data = await res.json();
        if (res.ok) {
          setCategories(data);
          if (data.length > 0 && !sidebarData.category) {
            setSidebarData((prev) => ({
              ...prev,
              category: data[0]._id,
            }));
          }
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "desc",
        category: categoryFromUrl || "uncategorized",
      });
    }
    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (value, id) => {
    setSidebarData({ ...sidebarData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="w-full md:w-1/3 lg:w-1/4 hidden md:block">
          <div className="sticky top-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center">
                <Input
                  placeholder="Search..."
                  id="searchTerm"
                  type="text"
                  value={sidebarData.searchTerm}
                  onChange={(e) => handleChange(e.target.value, "searchTerm")}
                  className="rounded-r-none"
                />
                <Button type="submit" size="icon" className="rounded-l-none">
                  <SearchIcon className="h-4 w-4" />
                </Button>
              </div>
              <Select
                onValueChange={(value) => handleChange(value, "sort")}
                value={sidebarData.sort}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Latest</SelectItem>
                  <SelectItem value="asc">Oldest</SelectItem>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) => handleChange(value, "category")}
                value={sidebarData.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="submit" className="w-full">
                Apply Filters
              </Button>
            </form>
          </div>
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Search Results</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Search Filters</SheetTitle>
                  <SheetDescription>
                    Adjust your search parameters here.
                  </SheetDescription>
                </SheetHeader>
                <Separator className="my-4" />
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="searchTerm" className="text-sm font-medium">
                      Search Term
                    </label>
                    <Input
                      id="searchTerm"
                      type="text"
                      value={sidebarData.searchTerm}
                      onChange={(e) => handleChange(e.target.value, "searchTerm")}
                      placeholder="Enter search term..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="sort" className="text-sm font-medium">
                      Sort By
                    </label>
                    <Select
                      onValueChange={(value) => handleChange(value, "sort")}
                      value={sidebarData.sort}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="desc">Latest</SelectItem>
                        <SelectItem value="asc">Oldest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <Select
                      onValueChange={(value) => handleChange(value, "category")}
                      value={sidebarData.category}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </form>
                <SheetFooter>
                  <Button type="submit" className="w-full mt-4" onClick={handleSubmit}>
                    Apply Filters
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
          <ScrollArea className="h-[calc(100vh-120px)]">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : posts.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">No posts found.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}
            {showMore && (
              <div className="mt-8 text-center">
                <Button onClick={handleShowMore} variant="outline">
                  Show More
                </Button>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

