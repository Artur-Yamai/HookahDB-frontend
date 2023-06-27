import { TobaccoClass } from "../../../Classes";

export interface TobaccoEditorProps {
  tobaccoData: TobaccoClass;
  setNewTobaccosData: (tobacco: TobaccoClass) => void;
  pullNewPhoto: (file: File) => void;
}
