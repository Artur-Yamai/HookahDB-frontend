import { IComment } from "../../Types";
import { Picture } from "../../UI";
import "./HbComment.scss";

interface IHbComment {
  comment: IComment;
}

export function HbComment({ comment }: IHbComment) {
  return (
    <li className="comment-item">
      <div className="comment-item__about-commentator">
        <div className="comment-item__avatar">
          <Picture url={comment.user.avatarUrl} />
        </div>
        <div className="comment-item__author">
          <p className="comment-item__login">{comment.user.login}</p>
          <p className="comment-item__datetime">{comment.createdAt}</p>
        </div>
      </div>

      <div className="comment-item__text">{comment.text}</div>
    </li>
  );
}
