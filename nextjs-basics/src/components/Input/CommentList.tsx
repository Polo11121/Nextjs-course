import styles from "@/components/Input/CommentList.module.css";
import { Comment } from "@/helpers/types";

export const CommentList = ({ comments }: { comments: Comment[] }) => (
  <ul className={styles.comments}>
    {comments.map((comment) => (
      <li key={comment.id}>
        <p>{comment.text}</p>
        <div>
          By <address>{comment.name}</address>
        </div>
      </li>
    ))}
    <li>
      <p>My comment is amazing!</p>
      <div>
        By <address>Maximilian</address>
      </div>
    </li>
    <li>
      <p>My comment is amazing!</p>
      <div>
        By <address>Maximilian</address>
      </div>
    </li>
  </ul>
);
