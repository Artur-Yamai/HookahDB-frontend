import { GUID } from "../Types";
import RepositoryHelper from "../helpers/RepositoryHelper";
const resource = "/comments";

export const CommentApi = {
  saveTobaccoComment: (id: GUID | null, tobaccoId: string, text: string) =>
    RepositoryHelper.save({ id, tobaccoId, text }, `${resource}/tobacco`),
  deleteTobaccoComment: (id: GUID) =>
    RepositoryHelper.delete(id, `${resource}/tobacco`),

  saveCoalComment: (id: GUID | null, coalId: string, text: string) =>
    RepositoryHelper.save({ id, coalId, text }, `${resource}/coal`),
  deleteCoalComment: (id: GUID) =>
    RepositoryHelper.delete(id, `${resource}/coal`),
};
