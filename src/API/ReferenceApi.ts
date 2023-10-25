import { Reference } from "Types";
import RepositoryHelper from "../helpers/RepositoryHelper";
const resource = "/reference";

export const ReferenceApi = {
  getReferenceEndpoint: (name: string) => `${resource}/${name}`,

  async getReference(name: string): Promise<Reference[] | null> {
    try {
      const { data } = await RepositoryHelper.get(
        this.getReferenceEndpoint(name)
      );
      return data.success ? data.body : null;
    } catch (_) {
      return null;
    }
  },

  async saveReferenceValue(
    referenceName: string,
    ref: Reference | Pick<Reference, "value">
  ): Promise<boolean> {
    try {
      const { data } = await RepositoryHelper.save(
        ref,
        this.getReferenceEndpoint(referenceName)
      );
      return data.success;
    } catch (_) {
      return false;
    }
  },
};
