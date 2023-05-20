import RepositoryHelper from "../helpers/RepositoryHelper";
const resource = "/comments";

type EntityType = "tobacco";

export const CommentApi = {
  saveComment: (entityId: string, entityType: EntityType, text: string) =>
    RepositoryHelper.save({ entityId, entityType, text }, resource),

  deleteComment: (entityId: string) =>
    RepositoryHelper.delete(entityId, resource),
};
