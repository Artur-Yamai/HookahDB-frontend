import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router";
import CoalStore from "../../store/coal";
import "./CoalPage.scss";
import { GUID, Coal } from "../../Types";

export const CoalPage = observer(() => {
  let { id } = useParams();
  id = id as GUID | undefined;
  const navigate = useNavigate();

  if (!id) {
    navigate("/notFound");
  }

  useEffect(() => {
    console.log(id);
    if (id) {
      CoalStore.getCoal(id);
    }
  }, [id]);

  const coal: Coal | null = CoalStore.coal;

  if (!coal) {
    // TODO: поместить красивый спиннер ^_^
    return <div>Loading...</div>;
  }

  return (
    <div className="coalPage">
      {coal.id}
      <hr />
      {coal.name}
    </div>
  );
});
