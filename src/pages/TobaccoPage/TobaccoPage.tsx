import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import TobaccoStore from "../../store/tobacco";
import "./TobaccoPage.scss";
import { IComment, ITobacco } from "../../Types";
import { TobaccoInfo, HbComments, TobaccoEditDialog } from "../../components";
import { confirm } from "../../UI";

function TobaccoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const refTobaccoEditDialog: React.MutableRefObject<
    { show: (tobacco: ITobacco | null) => boolean } | undefined
  > = useRef();

  if (!id) {
    navigate("/notFound");
  }

  const tobacco: ITobacco | null = TobaccoStore.tobacco;
  const comments: IComment[] = TobaccoStore.comments;

  useEffect(() => {
    return () => {
      TobaccoStore.clearTobaccoData();
      TobaccoStore.clearTobaccoComments();
    };
  }, []);

  useEffect(() => {
    if (id) {
      TobaccoStore.getTobacco(id);
      TobaccoStore.getComments(id);
    }
  }, [id]);

  const deleteTobacco = async (id: string) => {
    const res = await confirm(
      "Вы уверены что хотите удалить этот табак из списка?"
    );
    if (res) {
      await TobaccoStore.deleteTobacco(id);
      navigate("/");
    }
  };

  const updateTobacco = async () => {
    if (!refTobaccoEditDialog.current) return;

    refTobaccoEditDialog.current.show(tobacco);
  };

  const deleteComment = async (id: string): Promise<void> => {
    const res = await confirm(
      "Вы уверены что хотите удалить этот комментарий?"
    );

    if (res) {
      TobaccoStore.deleteComment(id);
    }
  };

  const toggleFavorite = async () => {
    if (!tobacco?.id) return;

    if (tobacco.isFavorite) {
      await TobaccoStore.deleteFromFavoriteList(tobacco.id);
    } else {
      await TobaccoStore.addToFavoriteList(tobacco.id);
    }
  };

  if (!tobacco) {
    // TODO: поместить красивый спиннер ^_^
    return <div>Loading...</div>;
  }

  const getComment = async (
    text: string,
    commentId: string | null
  ): Promise<boolean> => {
    await TobaccoStore.saveComment(tobacco.id, text, commentId);
    return true;
  };

  return (
    <div className="tobacco-page">
      <TobaccoEditDialog ref={refTobaccoEditDialog} />
      <TobaccoInfo
        tobacco={tobacco}
        deleteTobacco={deleteTobacco}
        updateTobacco={updateTobacco}
        toggleFavorite={toggleFavorite}
      />
      <HbComments
        comments={comments}
        getComment={getComment}
        deleteComment={deleteComment}
      />
    </div>
  );
}

export default observer(TobaccoPage);
