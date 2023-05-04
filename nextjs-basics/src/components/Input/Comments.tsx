import { useEffect, useState } from "react";
import { CommentList } from "@/components/Input/CommentList";
import { NewComment } from "@/components/Input/NewComment";
import { Comment } from "@/helpers/types";
import { useNotificationContext } from "@/context/NotificationContext";
import styles from "@/components/Input/Comments.module.css";

export const Comments = ({ eventId }: { eventId: string }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const { toggleNotificationHandler } = useNotificationContext();

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = async (commentData: {
    email: string;
    name: string;
    text: string;
  }) => {
    try {
      const response = await fetch(`/api/comments/${eventId}`, {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setComments((prevState) => [data.comment, ...prevState]);

      toggleNotificationHandler({
        title: "Success",
        message: "Successfully added comment!",
        status: "success",
      });
    } catch (error) {
      toggleNotificationHandler({
        title: "Error",
        message: "Something went wrong!",
        status: "error",
      });
    }
  };

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => setComments(data.comments))
        .catch((error) => {
          toggleNotificationHandler({
            title: "Error",
            message: "Something went wrong!",
            status: "error",
          });
        });
    }
  }, [showComments, eventId, toggleNotificationHandler]);

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
};
