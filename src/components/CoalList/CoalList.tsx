import { observer } from "mobx-react-lite";
import { ProductsList } from "../../components";
import { ProductItem } from "../../UI";
import { Coal } from "../../Types";

interface CoalListProps {
  coals: Coal[];
}

export const CoalList = observer(({ coals }: CoalListProps) => {
  return (
    <ProductsList>
      {coals.map((coal: Coal) => (
        <ProductItem key={coal.id} data={coal} url={`/coal/${coal.id}`} />
      ))}
    </ProductsList>
  );
});
