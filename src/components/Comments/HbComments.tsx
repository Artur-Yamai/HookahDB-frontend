import { IComment } from "../../Types";
import { HbComment } from "./HbComment";
import "./HbComments.scss";

interface IHdbComments {
  comments: IComment[];
}

export function HbComments({ comments }: IHdbComments) {
  return (
    <ul className="comments-block">
      {comments.map((comment) => (
        <HbComment key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}
