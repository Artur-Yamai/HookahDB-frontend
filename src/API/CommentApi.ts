import RepositoryHelper from "../helpers/RepositoryHelper";
const resource = "/comments";

export const CommentApi = {
  saveComment: (tobaccoId: string, text: string, commentId: string | null) =>
    RepositoryHelper.save({ tobaccoId, text, id: commentId }, resource),

  deleteComment: (id: string) => RepositoryHelper.delete(id, resource),
};
