import { observer } from "mobx-react-lite";
import { ProductsList } from "../../components";
import { ProductItem } from "../../UI";
import CoalStore from "../../store/coal";
import { Coal } from "../../Types";

export const CoalList = observer(() => {
  return (
    <ProductsList>
      {CoalStore.coals.map((coal: Coal) => (
        <ProductItem key={coal.id} data={coal} url={`/coal/${coal.id}`} />
      ))}
    </ProductsList>
  );
});
