import RepositoryHelper from "../helpers/RepositoryHelper";

export const CommentApi = {
  createComment: (tobaccoId: string, text: string) =>
    RepositoryHelper.save({ tobaccoId, text }, "/comments"),
};
