import { observer } from "mobx-react-lite";
import { ProductsList } from "../..";
import { ProductItem } from "../../../UI";
import { Tobacco } from "../../../Types";

interface TobaccosListProps {
  tobaccos: Tobacco[];
}

export const TobaccosList = observer(({ tobaccos }: TobaccosListProps) => {
  return (
    <ProductsList>
      {tobaccos.map((tobacco: Tobacco) => (
        <ProductItem
          key={tobacco.id}
          data={tobacco}
          url={`/tobacco/${tobacco.id}`}
        />
      ))}
    </ProductsList>
  );
});
