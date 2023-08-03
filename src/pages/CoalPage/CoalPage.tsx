import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router";
import CoalStore from "../../store/coal";
import RatingStore from "../../store/rating";
import UserStore from "../../store/user";
import { CoalEditDialog, ProductInfo, CommentsList } from "../../components";
import "./CoalPage.scss";
import { GUID, Coal } from "../../Types";
import { confirm } from "../../UI";
import { useUnmount } from "../../hooks";

type paramsType = { id: GUID };

export const CoalPage = observer(() => {
  const [isVisible, toggleVisible] = useState<boolean>(false);
  let { id } = useParams<paramsType>();
  const navigate = useNavigate();

  if (!id) {
    navigate("/notFound");
  }

  const coal: Coal | null = CoalStore.coal;

  useUnmount(() => {
    CoalStore.clearCoalData();
  });

  useEffect(() => {
    if (id) {
      CoalStore.getCoal(id);
    }
  }, [id]);

  const updateCoal = (): void => {
    toggleVisible(true);
  };

  const deleteCoal = async (id: GUID) => {
    const res = await confirm(
      "Вы уверены что хотите удалить этот табак из списка?"
    );
    if (res) {
      await CoalStore.deleteCoal(id);
      navigate("/");
    }
  };

  const deleteComment = async (id: GUID): Promise<void> => {
    const res = await confirm(
      "Вы уверены что хотите удалить этот комментарий?"
    );

    if (res) {
      console.log(`deleteComment ${id}`);
    }
  };

  if (!coal) {
    // TODO: поместить красивый спиннер ^_^
    return <div>Loading...</div>;
  }

  const getComment = async (
    text: string,
    id: GUID | null
  ): Promise<boolean> => {
    console.log("getComment", text, id);
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
    <div className="coalPage w100">
      <CoalEditDialog
        coal={CoalStore.coal}
        isVisible={isVisible}
        closeDialog={() => toggleVisible(false)}
      />
      <ProductInfo
        product={coal}
        onDelete={deleteCoal}
        onUpdate={updateCoal}
        onChangeRating={onChangeRating}
        toggleFavorite={() => console.log("toggleFavorite")}
      />
      <CommentsList
        comments={[]}
        getComment={getComment}
        deleteComment={deleteComment}
      />
    </div>
  );
});
