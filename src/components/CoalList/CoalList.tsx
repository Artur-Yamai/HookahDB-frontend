import { observer } from "mobx-react-lite";
import { ProductsList } from "components";
import { ProductItem } from "UI";
import { ProductAtList } from "Types";

interface CoalListProps {
  coals: ProductAtList[];
}

export const CoalList = observer(({ coals }: CoalListProps) => {
  return (
    <ProductsList>
      {coals.map((coal: ProductAtList) => (
        <ProductItem key={coal.id} data={coal} url={`/coal/${coal.id}`} />
      ))}
    </ProductsList>
  );
});
