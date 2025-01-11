import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
        <p className="text-muted-foreground">Subscribe to our newsletter for the latest blog posts and updates.</p>
      </div>
      <Button asChild size="lg">
        <Link to="/subscribe">Subscribe Now</Link>
      </Button>
    </div>
  );
}

