import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import { useEffect, useState } from "react";
import {
  ThumbsUp,
  Reply as ReplyIcon,
  ChevronDown,
  ChevronUp,
  Edit2,
  Trash2,
  MessageCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Reply from "./Reply";

dayjs.extend(relativeTime);
dayjs.locale("vi");

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLoadReplies = async () => {
    try {
      const res = await fetch(`/api/comment/replies/${comment._id}`);
      if (res.ok) {
        const data = await res.json();
        setReplies(data);
        setShowReplies(!showReplies);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleReplySubmit = (newReply) => {
    setReplies([newReply, ...replies]);
    setShowReplyForm(false);
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-sm p-4 mb-3 border border-gray-100">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <img
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
              src={user.profilePicture}
              alt={user.username}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-1 space-x-2">
              <span className="font-medium text-gray-900">
                {user ? `@${user.username}` : "anonymous user"}
              </span>
              <span className="text-gray-500 text-sm">·</span>
              <span className="text-gray-500 text-sm">
                {dayjs(comment.createdAt).fromNow()}
              </span>
            </div>

            {isEditing ? (
              <div className="space-y-3">
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    variant="default"
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-gray-700 mt-2">{comment.content}</div>
            )}

            <div className="flex items-center mt-4 space-x-4">
              <button
                onClick={() => onLike(comment._id)}
                className={`flex items-center space-x-1 text-sm ${
                  currentUser && comment.likes.includes(currentUser._id)
                    ? "text-blue-500"
                    : "text-gray-500 hover:text-blue-500"
                } transition-colors duration-200`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{comment.numberOfLikes || ""}</span>
              </button>

              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-500 transition-colors duration-200"
              >
                <ReplyIcon className="w-4 h-4" />
                <span>Reply</span>
              </button>

              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      onClick={handleEdit}
                      className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-500 transition-colors duration-200"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => onDelete(comment._id)}
                      className="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-500 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </>
                )}

              {comment.replies?.length > 0 && (
                <button
                  onClick={handleLoadReplies}
                  className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-500 transition-colors duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{comment.replies.length} replies</span>
                  {showReplies ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showReplyForm && (
        <div className="ml-14">
          <Reply comment={comment} onReplySubmit={handleReplySubmit} />
        </div>
      )}

      {showReplies && replies.length > 0 && (
        <div className="ml-14 space-y-3">
          {replies.map((reply) => (
            <Comment
              key={reply._id}
              comment={reply}
              onLike={onLike}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
