import { useState } from "react";
import { Button, TextArea } from "../../UI";
import "./CommentCreating.scss";

interface ICommentCreating {
  getComment: (text: string) => Promise<boolean>;
}

export function CommentCreating({ getComment }: ICommentCreating) {
  const [text, setText] = useState<string>("");

  const sendComment = async (): Promise<void> => {
    const res: boolean = await getComment(text.trim());
    if (res) setText("");
  };

  const toCLear = () => {
    setText("");
  };

  const textChange = (newText: string): void => setText(newText);

  return (
    <>
      <div className="comment-creating">
        <TextArea
          text={text}
          onChange={textChange}
          label="Что бы вы хотели сказать эдакого о данном табаке"
          rows={5}
        />

        <Button
          className="comment-creating__button--send"
          click={sendComment}
          text="Отрпавить"
          disabled={text.trim().length < 20}
        />

        {text && (
          <Button
            className="comment-creating__button--clear"
            click={toCLear}
            text="Очистить"
          />
        )}
      </div>
    </>
  );
}
