import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useUnmount } from "../../hooks";
import TobaccoStore from "../../store/tobacco";
import "./TobaccoPage.scss";
import { Comment, Tobacco } from "../../Types";
import { TobaccoInfo, CommentsList, TobaccoEditDialog } from "../../components";
import { confirm } from "../../UI";

const TobaccoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const refTobaccoEditDialog: React.MutableRefObject<
    { show: (tobacco: Tobacco | null) => boolean } | undefined
  > = useRef();

  if (!id) {
    navigate("/notFound");
  }

  const tobacco: Tobacco | null = TobaccoStore.tobacco;
  const comments: Comment[] = TobaccoStore.comments;

  useUnmount(() => {
    TobaccoStore.clearTobaccoData();
    TobaccoStore.clearTobaccoComments();
  });

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

  const deleteComment = async (tobaccoId: string): Promise<void> => {
    const res = await confirm(
      "Вы уверены что хотите удалить этот комментарий?"
    );

    if (res) {
      TobaccoStore.deleteComment(tobaccoId);
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
    id: string | null
  ): Promise<boolean> => {
    await TobaccoStore.saveComment(text, id, tobacco.id);
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
      <CommentsList
        comments={comments}
        getComment={getComment}
        deleteComment={deleteComment}
      />
    </div>
  );
};

export default observer(TobaccoPage);
