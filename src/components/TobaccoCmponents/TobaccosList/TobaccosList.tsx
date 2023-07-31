import { observer } from "mobx-react-lite";
import { ProductsList } from "../..";
import { ProductItem } from "../../../UI";
import TobaccoStore from "../../../store/tobacco";
import { Tobacco } from "../../../Types";

export const TobaccosList = observer(() => {
  return (
    <ProductsList>
      {TobaccoStore.tobaccos.map((tobacco: Tobacco) => (
        <ProductItem
          key={tobacco.id}
          data={tobacco}
          url={`/tobacco/${tobacco.id}`}
        />
      ))}
    </ProductsList>
  );
});
