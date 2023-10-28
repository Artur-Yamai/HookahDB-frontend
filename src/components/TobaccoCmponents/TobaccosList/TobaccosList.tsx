import { observer } from "mobx-react-lite";
import { ProductsList } from "components";
import { ProductItem } from "UI";
import { Product } from "Types";

interface TobaccosListProps {
  tobaccos: Product[];
}

export const TobaccosList = observer(({ tobaccos }: TobaccosListProps) => {
  return (
    <ProductsList>
      {tobaccos.map((tobacco: Product) => (
        <ProductItem
          key={tobacco.id}
          data={tobacco}
          url={`/tobacco/${tobacco.id}`}
        />
      ))}
    </ProductsList>
  );
});
