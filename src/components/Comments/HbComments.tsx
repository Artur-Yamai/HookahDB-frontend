import { IComment } from "../../Types";
import { CommentEditor } from "../../components";
import { HbComment } from "./HbComment";
import UserStore from "../../store/user";
import "./HbComments.scss";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

interface IHdbComments {
  comments: IComment[];
  getComment: (text: string, commentId: string | null) => Promise<boolean>;
  deleteComment: (id: string) => void;
}

function HbComments({ comments, getComment, deleteComment }: IHdbComments) {
  const [myComment, setMyComment] = useState<IComment | null>(null);
  const [otherComments, setOtherComments] = useState<IComment[]>([]);

  useEffect(() => {
    if (UserStore.userData) {
      const comms = [...comments];
      const index = comms.findIndex(
        (comment) => comment.user.id === UserStore.userData?.id
      );

      if (index !== -1) {
        const cmt = comms[index];
        comms.splice(index, 1);

        setMyComment(cmt);
        setOtherComments(comms);
      } else {
        setOtherComments(comments);
      }
    } else {
      setOtherComments(comments);
    }
  }, [comments]);

  return (
    <div className="comments-block">
      {UserStore.userData && (
        <CommentEditor
          getComment={(text) => getComment(text, myComment?.id ?? null)}
          deleteComment={deleteComment}
          comment={myComment}
        />
      )}
      <h2>Комментарии пользователей</h2>
      <ul className="comments-block__list">
        {otherComments.map((comment) => (
          <HbComment key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
}

export default observer(HbComments);
