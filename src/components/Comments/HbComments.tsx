import { IComment } from "../../Types";
import { CommentEditor } from "../../components";
import { HbComment } from "./HbComment";
import UserStore from "../../store/user";
import "./HbComments.scss";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

interface IHdbComments {
  comments: IComment[];
  getComment: (text: string, id: string | null) => Promise<boolean>;
  deleteComment: (id: string) => void;
}

function HbComments({ comments, getComment, deleteComment }: IHdbComments) {
  const [myComment, setMyComment] = useState<IComment | null>(null);
  const [otherComments, setOtherComments] = useState<IComment[]>([]);

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
      <h2>Комментарии пользователей</h2>
      <ul className="comments-block__list">
        {otherComments.map((comment) => (
          <HbComment
            key={comment.userId + comment.tobaccoId}
            comment={comment}
          />
        ))}
      </ul>
    </div>
  );
}

export default observer(HbComments);
