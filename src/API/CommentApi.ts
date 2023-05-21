import RepositoryHelper from "../helpers/RepositoryHelper";
const resource = "/comments";

type EntityType = "tobacco";

export const CommentApi = {
  saveComment: (
    id: string | null,
    entityId: string,
    entityType: EntityType,
    text: string
  ) => RepositoryHelper.save({ id, entityId, entityType, text }, resource),

  deleteComment: (id: string) => RepositoryHelper.delete(id, resource),
};
