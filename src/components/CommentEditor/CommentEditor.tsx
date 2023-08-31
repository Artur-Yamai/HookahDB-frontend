import { useEffect, useState, useMemo } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { Button, TextArea } from "../../UI";
import "./CommentEditor.scss";
import { Comment } from "../../Types";
import { CommentItem } from "../Comments/CommentItem";

interface CommentEditorProps {
  getComment: (text: string, id: string | null) => Promise<boolean>;
  deleteComment: (id: string) => void;
  comment: Comment | null;
}

export const CommentEditor = ({
  getComment,
  deleteComment,
  comment,
}: CommentEditorProps) => {
  const [text, setText] = useState<string>("");
  const [visibleTextArea, toggleVisibleTextArea] = useState<boolean>(false);

  useEffect(() => {
    toggleVisibleTextArea(!comment);
  }, [comment]);

  const sendButtonDisabled = useMemo(
    () => text.trim().length < 20 || text === comment?.text,
    [text, comment?.text]
  );

  useEffect(() => {
    if (!visibleTextArea) {
      setText(comment?.text ?? "");
    }
  }, [visibleTextArea, comment?.text]);

  const sendComment = async (): Promise<void> => {
    const res: boolean = await getComment(text.trim(), comment?.id ?? null);
    if (res) setText("");
  };

  const toCLear = () => setText("");
  const textChange = (newText: string): void => setText(newText);

  if (!visibleTextArea) {
    return (
      <div className="comment-editor comment-editor--has-comment">
        <h3>Ваш комментарий</h3>
        {comment && (
          <CommentItem comment={comment}>
            <>
              <span
                className="comment-editor__controller comment-editor__controller--edit"
                onClick={() => toggleVisibleTextArea(true)}
              >
                <AiFillEdit />
              </span>
              <span className="comment-editor__controller comment-editor__controller--delete">
                <FiTrash2 onClick={() => deleteComment(comment.id)} />
              </span>
            </>
          </CommentItem>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="comment-editor">
        <TextArea
          value={text}
          onChange={textChange}
          label="Что бы вы хотели сказать эдакого о данном табаке"
          rows={5}
        />
        <div className="comment-editor__button-place">
          <Button
            className="comment-editor__button--send"
            click={sendComment}
            text="Отправить"
            disabled={sendButtonDisabled}
          />
          {text && (
            <Button
              className="comment-editor__button--clear"
              click={toCLear}
              text="Очистить"
            />
          )}
          {comment && (
            <Button
              className="comment-editor__button--cancel"
              click={() => toggleVisibleTextArea(false)}
              text="Отменить"
            />
          )}
        </div>
      </div>
    </>
  );
};
