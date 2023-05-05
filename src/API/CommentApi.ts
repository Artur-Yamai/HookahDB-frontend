import RepositoryHelper from "../helpers/RepositoryHelper";
const resource = "/comments";

export const CommentApi = {
  createComment: (tobaccoId: string, text: string) =>
    RepositoryHelper.save({ tobaccoId, text }, resource),

  deleteComment: (id: string) => RepositoryHelper.delete(id, resource),
};
