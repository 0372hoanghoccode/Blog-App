import React, { useState } from "react";
import { useSelector } from "react-redux";

const CommentReply = ({ comment, onReplySubmit }) => {
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (replyContent.trim().length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/comment/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: replyContent.trim(),
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
      console.error("Error submitting reply:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
    >
      <textarea
        placeholder={`Reply to ${comment.userId}...`}
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        rows={3}
        className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 resize-none"
        maxLength={500}
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {500 - replyContent.length} characters remaining
        </span>
        <button
          type="submit"
          disabled={!replyContent.trim() || isSubmitting}
          className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 ${
            !replyContent.trim() || isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? "Sending..." : "Reply"}
        </button>
      </div>
    </form>
  );
};

export default CommentReply;
