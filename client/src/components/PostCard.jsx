import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

function truncateHTML(html, maxLength) {
  const div = document.createElement('div');
  div.innerHTML = html;
  const text = div.textContent || div.innerText || '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

export default function PostCard({ post }) {
  const truncatedContent = truncateHTML(post.content, 100);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/post/${post.slug}`} className="block overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative h-[260px] overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">{post.category}</Badge>
        </div>
        <h3 className="text-lg font-semibold line-clamp-2 mb-2">{post.title}</h3>
        <div className="text-sm text-muted-foreground line-clamp-3">
          {truncatedContent}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <Button asChild variant="ghost" size="sm" className="ml-auto">
          <Link to={`/post/${post.slug}`} className="flex items-center">
            Read  <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

