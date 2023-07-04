import { GUID } from "../Types";
import RepositoryHelper from "../helpers/RepositoryHelper";
const resource = "/comments";

type EntityType = "tobacco";

export const CommentApi = {
  saveComment: (
    id: GUID | null,
    entityId: string,
    entityType: EntityType,
    text: string
  ) => RepositoryHelper.save({ id, entityId, entityType, text }, resource),

  deleteComment: (id: GUID) => RepositoryHelper.delete(id, resource),
};
