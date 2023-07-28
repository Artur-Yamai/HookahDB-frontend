import { observer } from "mobx-react-lite";
import { Coal } from "../../../Types";

interface CoalListProps {
  coalList: Coal[];
}

const CoalList = ({ coalList }: CoalListProps): JSX.Element => {
  console.log(coalList);
  return (
    <div className="propduct-list">
      {coalList.map((coal) => (
        <div key={coal.id}>
          <pre>{coal.name}</pre>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default observer(CoalList);
