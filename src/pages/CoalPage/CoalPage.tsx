import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router";
import CoalStore from "store/coal";
import RatingStore from "store/rating";
import UserStore from "store/user";
import { CoalEditDialog, ProductInfo, CommentsList } from "components";
import "./CoalPage.scss";
import { Comment, Product } from "Types";
import { confirm } from "UI";
import { useUnmount } from "hooks";
import { Helmet } from "react-helmet";

type paramsType = { id: string };

export const CoalPage = observer(() => {
  const [isVisible, toggleVisible] = useState<boolean>(false);
  let { id } = useParams<paramsType>();
  const navigate = useNavigate();

  if (!id) {
    navigate("/notFound");
  }

  const coal: Product | null = CoalStore.coal;
  const comments: Comment[] = CoalStore.comments;

  useUnmount(() => {
    CoalStore.clearCoalData();
    CoalStore.clearCoalComments();
  });

  useEffect(() => {
    if (id) {
      CoalStore.getCoal(id);
      CoalStore.getComments(id);
    }
  }, [id]);

  const deleteCoal = async (id: string) => {
    const res = await confirm(
      "Вы уверены что хотите удалить этот табак из списка?"
    );
    if (res) {
      await CoalStore.deleteCoal(id);
      navigate("/");
    }
  };

  const deleteComment = async (id: string): Promise<void> => {
    const res = await confirm(
      "Вы уверены что хотите удалить этот комментарий?"
    );

    if (res) {
      CoalStore.deleteComment(id);
    }
  };

  if (!coal) {
    // TODO: поместить красивый спиннер ^_^
    return <div>Loading...</div>;
  }

  const toggleFavorite = async () => {
    if (coal.isFavorite) {
      await CoalStore.deleteFromFavoriteList(coal.id);
    } else {
      await CoalStore.addToFavoriteList(coal.id);
    }
  };

  const getComment = async (
    text: string,
    id: string | null
  ): Promise<boolean> => {
    await CoalStore.saveComment(text, id, coal.id);
    return true;
  };

  const onChangeRating = async (value: number): Promise<void> => {
    const isChange: boolean = await RatingStore.changeCoalRating({
      id: coal.isRated ? `${coal.id}:${UserStore.userData}` : null,
      coalId: coal.id,
      rating: value,
    });
    isChange && CoalStore.getCoal(coal.id);
  };

  return (
    <>
      <Helmet>
        <title>{coal.name}</title>
      </Helmet>
      <div className="coalPage w100">
        <CoalEditDialog
          coal={CoalStore.coal}
          isVisible={isVisible}
          closeDialog={() => toggleVisible(false)}
        />
        <ProductInfo
          product={coal}
          onDelete={deleteCoal}
          onUpdate={() => toggleVisible(true)}
          onChangeRating={onChangeRating}
          toggleFavorite={toggleFavorite}
        />
        <CommentsList
          comments={comments}
          getComment={getComment}
          deleteComment={deleteComment}
        />
      </div>
    </>
  );
});
