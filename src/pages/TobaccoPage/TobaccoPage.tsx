import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useUnmount } from "../../hooks";
import TobaccoStore from "../../store/tobacco";
import RatingStore from "../../store/rating";
import UserStore from "../../store/user";
import "./TobaccoPage.scss";
import { Comment, GUID, Tobacco } from "../../Types";
import { ProductInfo, CommentsList, TobaccoEditDialog } from "../../components";
import { confirm, notify } from "../../UI";
import { TobaccoClass } from "../../Classes";

export const TobaccoPage = observer(() => {
  const [isVisibleDialog, toggleVisibleDialog] = useState<boolean>(false);
  let { id } = useParams();
  id = id as GUID | undefined;
  const navigate = useNavigate();

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

  const deleteTobacco = async (id: GUID) => {
    const res = await confirm(
      "Вы уверены что хотите удалить этот табак из списка?"
    );
    if (res) {
      await TobaccoStore.deleteTobacco(id);
      navigate("/");
    }
  };

  const updateTobacco = () => {
    toggleVisibleDialog(true);
  };

  const deleteComment = async (tobaccoId: GUID): Promise<void> => {
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

  const saveData = async (
    tobacco: TobaccoClass,
    newPhoto?: File
  ): Promise<void> => {
    console.log(tobacco, newPhoto);
    if (tobacco.id) {
      console.log(tobacco.name);
      await TobaccoStore.updateTobacco(tobacco, newPhoto);
    } else if (newPhoto) {
      await TobaccoStore.createTobacco(tobacco, newPhoto);
    } else {
      return notify("Не все поля заполнены", "warning");
    }

    toggleVisibleDialog(false);
  };

  if (!tobacco) {
    // TODO: поместить красивый спиннер ^_^
    return <div>Loading...</div>;
  }

  const getComment = async (
    text: string,
    id: GUID | null
  ): Promise<boolean> => {
    await TobaccoStore.saveComment(text, id, tobacco.id);
    return true;
  };

  const onChangeRating = async (value: number): Promise<void> => {
    const isChange: boolean = await RatingStore.changeTobaccoRating({
      id: tobacco.isRated ? `${tobacco.id}:${UserStore.userData}` : null,
      tobaccoId: tobacco.id,
      rating: value,
    });
    isChange && TobaccoStore.getTobacco(tobacco.id);
  };

  return (
    <div className="tobacco-page">
      <TobaccoEditDialog
        isVisible={isVisibleDialog}
        tobacco={TobaccoStore.tobacco}
        closeDislog={() => toggleVisibleDialog(false)}
        saveData={saveData}
      />
      <ProductInfo
        product={tobacco}
        onDelete={deleteTobacco}
        onUpdate={updateTobacco}
        onChangeRating={onChangeRating}
        toggleFavorite={toggleFavorite}
      />
      <CommentsList
        comments={comments}
        getComment={getComment}
        deleteComment={deleteComment}
      />
    </div>
  );
});
