import { observer } from "mobx-react-lite";
import { ProductsList } from "components";
import { ProductItem } from "UI";
import { ProductAtList } from "Types";

interface TobaccosListProps {
  tobaccos: ProductAtList[];
}

export const TobaccosList = observer(({ tobaccos }: TobaccosListProps) => {
  return (
    <ProductsList>
      {tobaccos.map((tobacco: ProductAtList) => (
        <ProductItem
          key={tobacco.id}
          data={tobacco}
          url={`/tobacco/${tobacco.id}`}
        />
      ))}
    </ProductsList>
  );
});
