import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import TobaccoStore from "../../store/tobacco";
import "./TobaccoPage.scss";
import { ITobacco } from "../../Types";
import { TobaccoInfo } from "../../components";

function TobaccoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate("/notFound");
  }

  const tobacco: ITobacco | null = TobaccoStore.tobacco;

  useEffect(() => {
    return () => {
      TobaccoStore.clearTobaccoData();
    };
  }, []);

  useEffect(() => {
    if (id) {
      TobaccoStore.getTobacco(id);
    }
  }, [id]);

  if (!tobacco) {
    // TODO: поместить красивый спиннер ^_^
    return <div>Loading...</div>;
  }

  return (
    <div className="tobacco-page">
      <TobaccoInfo tobacco={tobacco} />
    </div>
  );
}

export default observer(TobaccoPage);
