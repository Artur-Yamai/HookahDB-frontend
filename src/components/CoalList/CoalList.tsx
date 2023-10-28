import { observer } from "mobx-react-lite";
import { ProductsList } from "components";
import { ProductItem } from "UI";
import { Product } from "Types";

interface CoalListProps {
  coals: Product[];
}

export const CoalList = observer(({ coals }: CoalListProps) => {
  return (
    <ProductsList>
      {coals.map((coal: Product) => (
        <ProductItem key={coal.id} data={coal} url={`/coal/${coal.id}`} />
      ))}
    </ProductsList>
  );
});
