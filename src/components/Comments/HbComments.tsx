import { IComment } from "../../Types";
import { CommentCreating } from "../../components";
import { HbComment } from "./HbComment";
import "./HbComments.scss";

interface IHdbComments {
  comments: IComment[];
  getComment: (comment: string) => Promise<boolean>;
}

export function HbComments({ comments, getComment }: IHdbComments) {
  return (
    <div className="comments-block">
      <ul className="comments-block__list">
        {comments.map((comment) => (
          <HbComment key={comment.id} comment={comment} />
        ))}
      </ul>
      <CommentCreating getComment={getComment} />
    </div>
  );
}
