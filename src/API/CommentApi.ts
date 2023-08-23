import RepositoryHelper from "../helpers/RepositoryHelper";
const resource = "/comments";

export const CommentApi = {
  saveTobaccoComment: (id: string | null, tobaccoId: string, text: string) =>
    RepositoryHelper.save({ id, tobaccoId, text }, `${resource}/tobacco`),
  deleteTobaccoComment: (id: string) =>
    RepositoryHelper.delete(id, `${resource}/tobacco`),

  saveCoalComment: (id: string | null, coalId: string, text: string) =>
    RepositoryHelper.save({ id, coalId, text }, `${resource}/coal`),
  deleteCoalComment: (id: string) =>
    RepositoryHelper.delete(id, `${resource}/coal`),
};
