import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import { useEffect, useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Reply as ReplyIcon,
  ChevronDown,
  ChevronUp,
  Edit2,
  Trash2,
  MessageCircle,
  CornerDownRight,
  Crown,
  Star,
  Award,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Reply from "./Reply";
import { Badge } from "@/components/ui/badge";

dayjs.extend(relativeTime);
dayjs.locale("vi");

const RankBadge = ({ rank }) => {
  const rankConfig = {
    fan: {
      icon: Star,
      color: "bg-blue-500",
      text: "Fan",
    },
    superfan: {
      icon: Award,
      color: "bg-purple-500",
      text: "Super Fan",
    },
    god: {
      icon: Crown,
      color: "bg-yellow-500",
      text: "God",
    },
  };

  if (!rankConfig[rank]) return null;

  const { icon: Icon, color, text } = rankConfig[rank];

  return (
    <Badge className={`${color} text-white flex items-center gap-1`}>
      <Icon className="w-3 h-3" />
      {text}
    </Badge>
  );
};

export default function Comment({
  comment,
  onLike,
  onDislike,
  onEdit,
  onDelete,
  isReply = false,
  depth = 0,
}) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);
  const [showReplyForm, setShowReplyForm] = useState(false);
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

  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleReplySubmit = (newReply) => {
    comment.replies = [newReply, ...comment.replies];
    setShowReplies(true);
    setShowReplyForm(false);
  };

  const indentationStyle = {
    marginLeft: isReply ? `${Math.min(depth * 16, 48)}px` : "0px",
  };

  const borderStyle =
    depth > 0
      ? {
          borderLeft: "2px solid",
          borderColor: "rgb(59 130 246)",
          paddingLeft: "12px",
        }
      : {};

  return (
    <div className="w-full" style={indentationStyle}>
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 ${
          isReply ? "mt-3" : "mb-3"
        }`}
        style={borderStyle}
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <img
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-100 dark:border-gray-700"
              src={user.profilePicture}
              alt={user.username}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-1 space-x-2">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {user ? `@${user.username}` : "anonymous user"}
              </span>
              {comment.rank && comment.rank !== "normal" && (
                <RankBadge rank={comment.rank} />
              )}
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                ·
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {dayjs(comment.createdAt).fromNow()}
              </span>
              {isReply && (
                <div className="flex items-center text-blue-500 text-sm">
                  <CornerDownRight className="w-3 h-3 mr-1" />
                  <span>Reply</span>
                </div>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-3">
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    size="sm"
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={handleSave}
                    variant="default"
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Lưu thay đổi
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-wrap">
                {comment.content}
              </div>
            )}

            <div className="flex items-center mt-4 space-x-4">
              <button
                onClick={() => onLike(comment._id)}
                className={`flex items-center space-x-1 text-sm ${
                  currentUser && comment.likes.includes(currentUser._id)
                    ? "text-blue-500"
                    : "text-gray-500 dark:text-gray-400 hover:text-blue-500"
                } transition-colors duration-200`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{comment.numberOfLikes || ""}</span>
              </button>

              <button
                onClick={() => onDislike(comment._id)}
                className={`flex items-center space-x-1 text-sm ${
                  currentUser && comment.dislikes?.includes(currentUser._id)
                    ? "text-red-500"
                    : "text-gray-500 dark:text-gray-400 hover:text-red-500"
                } transition-colors duration-200`}
              >
                <ThumbsDown className="w-4 h-4" />
                <span>{comment.numberOfDislikes || ""}</span>
              </button>

              {!isReply && (
                <button
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200"
                >
                  <ReplyIcon className="w-4 h-4" />
                  <span>Trả lời</span>
                </button>
              )}

              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      onClick={handleEdit}
                      className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Sửa</span>
                    </button>

                    <button
                      onClick={() => onDelete(comment._id)}
                      className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Xóa</span>
                    </button>
                  </>
                )}

              {!isReply && comment.replies?.length > 0 && (
                <button
                  onClick={handleToggleReplies}
                  className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{comment.replies.length} phản hồi</span>
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

      {!isReply && showReplyForm && (
        <div className="ml-8 mt-2">
          <Reply comment={comment} onReplySubmit={handleReplySubmit} />
        </div>
      )}

      {showReplies && comment.replies?.length > 0 && (
        <div className="space-y-3">
          {comment.replies.map((reply) => (
            <Comment
              key={reply._id}
              comment={reply}
              onLike={onLike}
              onDislike={onDislike}
              onEdit={onEdit}
              onDelete={onDelete}
              isReply={true}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
