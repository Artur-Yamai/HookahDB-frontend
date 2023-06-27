import { IReference } from "../Types";
import RepositoryHelper from "../helpers/RepositoryHelper";
const resource = "/reference";

export const ReferenceApi = {
  getReferenceEndpoint: (name: string) => `${resource}/${name}`,
  async getReference(name: string): Promise<IReference[] | null> {
    try {
      const { data } = await RepositoryHelper.get(
        this.getReferenceEndpoint(name)
      );
      return data.success ? data.body : null;
    } catch (_) {
      return null;
    }
  },
};
