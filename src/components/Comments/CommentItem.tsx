import moment from "moment";
import "moment/locale/ru";
import { Comment } from "../../Types";
import { Picture } from "../../UI";
import "./CommentItem.scss";

interface CommentItemProps {
  comment: Comment;
  children?: JSX.Element;
}

export const CommentItem = ({ children, comment }: CommentItemProps) => {
  const datetime = moment(comment.createdAt).format("Do MMMM YYYY, HH:mm");
  const fromNow = moment(comment.createdAt).fromNow();

  return (
    <li className="comment-item">
      <div className="comment-item__about-commentator">
        <Picture
          alt={"аватар " + comment.login}
          className="comment-item__avatar"
          url={comment.userAvatarUrl}
        />
        <div className="comment-item__author">
          <p className="comment-item__info">
            <span className="comment-item__login">{comment.login}</span>
            {children}
          </p>
          <p className="comment-item__datetime">
            <span className="comment-item__datetime--now">{datetime}</span>
            <span className="comment-item__datetime--from">{fromNow}</span>
          </p>
        </div>
      </div>

      <div className="comment-item__text">{comment.text}</div>
    </li>
  );
};
