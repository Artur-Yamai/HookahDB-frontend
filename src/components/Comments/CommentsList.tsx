import { Comment } from "../../Types";
import { CommentEditor } from "..";
import { CommentItem } from "./CommentItem";
import UserStore from "../../store/user";
import "./CommentsList.scss";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

interface CommentsListProps {
  comments: Comment[];
  getComment: (text: string, id: string | null) => Promise<boolean>;
  deleteComment: (id: string) => void;
}

const CommentsList = ({
  comments,
  getComment,
  deleteComment,
}: CommentsListProps) => {
  const [myComment, setMyComment] = useState<Comment | null>(null);
  const [otherComments, setOtherComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (UserStore.userData) {
      const newComments = [...comments];
      const index = newComments.findIndex(
        (comment) => comment.userId === UserStore.userData?.id
      );

      if (index !== -1) {
        const myComment = newComments[index];
        newComments.splice(index, 1);

        setMyComment(myComment);
        setOtherComments(newComments);
        return;
      }
    }
    setMyComment(null);
    setOtherComments(comments);

    // eslint-disable-next-line
  }, [comments, UserStore.userData]); // Если comments придет раньше UserStore.userData, то повторного поиска комментария авторизированного юзера не будет

  return (
    <div className="comments-block">
      {UserStore.userData && (
        <CommentEditor
          getComment={getComment}
          deleteComment={deleteComment}
          comment={myComment}
        />
      )}

      {otherComments.length ? (
        <>
          <h2>Комментарии пользователей</h2>
          <ul className="comments-block__list">
            {otherComments.map((comment) => (
              <CommentItem
                key={comment.userId + comment.tobaccoId}
                comment={comment}
              />
            ))}
          </ul>
        </>
      ) : (
        <h2>Комментарии пользователей отсутствуют</h2>
      )}
    </div>
  );
};

export default observer(CommentsList);
