import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Reply({ comment, onReplySubmit }) {
  const [replyContent, setReplyContent] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (replyContent.trim().length === 0) return;

    try {
      const res = await fetch("/api/comment/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: replyContent,
          postId: comment.postId,
          userId: currentUser._id,
          parentId: comment._id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setReplyContent("");
        onReplySubmit(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 ml-12">
      <Textarea
        placeholder="Write a reply..."
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        rows={2}
        className="mb-2"
      />
      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          disabled={!replyContent.trim()}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Reply
        </Button>
      </div>
    </form>
  );
}
