import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router";
import CoalStore from "../../store/coal";
import { ProductInfo } from "../../components";
import "./CoalPage.scss";
import { GUID, Coal } from "../../Types";
import { confirm } from "../../UI";
import { useUnmount } from "../../hooks";

export const CoalPage = observer(() => {
  let { id } = useParams();
  id = id as GUID | undefined;
  const navigate = useNavigate();

  if (!id) {
    navigate("/notFound");
  }

  useUnmount(() => {
    CoalStore.clearCoalData();
  });

  useEffect(() => {
    if (id) {
      CoalStore.getCoal(id);
    }
  }, [id]);

  const deleteCoal = async (id: GUID) => {
    const res = await confirm(
      "Вы уверены что хотите удалить этот табак из списка?"
    );
    if (res) {
      await CoalStore.deleteCoal(id);
      navigate("/");
    }
  };

  const coal: Coal | null = CoalStore.coal;

  if (!coal) {
    // TODO: поместить красивый спиннер ^_^
    return <div>Loading...</div>;
  }

  return (
    <div className="coalPage">
      <ProductInfo
        product={coal}
        onDelete={deleteCoal}
        onUpdate={() => console.log("updateTobacco")}
        onChangeRating={(value: number) => console.log("onChangeRating", value)}
        toggleFavorite={() => console.log("toggleFavorite")}
      />
    </div>
  );
});
