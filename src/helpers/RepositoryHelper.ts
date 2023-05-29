import Repository from "../API/axios";
import { catchHelper } from "./catchHelper";
import CommonStore from "../store/common";
import { notify } from "../UI";
import { NotifyTypes } from "../Types";

const options = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};

class RepositoryHelper {
  public async perfomOperation(notifyType: NotifyTypes, operation: Function) {
    try {
      CommonStore.toggleLoading(true);
      const result = await operation();
      if (result.message) {
        notify(result.message, notifyType);
      }
      return result;
    } catch (error) {
      catchHelper(error);
      return false;
    } finally {
      setTimeout(() => {
        CommonStore.toggleLoading(false);
      }, 500);
    }
  }

  public async get(endpoint: string) {
    return await this.perfomOperation("info", async () => {
      return await Repository.get(endpoint);
    });
  }

  public async save(entity: any, endpoint: string, returnWholeResponse = true) {
    const obj = { ...entity };

    var form = new FormData();
    for (const key in obj) {
      form.append(key, obj[key]);
    }
    return await this.perfomOperation("success", async () => {
      if (obj.id) {
        const response = await Repository.put(endpoint, form, options);
        return returnWholeResponse ? response.data : obj.id;
      } else {
        return await Repository.post(endpoint, form, options).then(
          (r) => r.data
        );
      }
    });
  }

  public async delete(entityId: string, endpoint: string) {
    try {
      CommonStore.toggleLoading(true);
      const response = await Repository.delete(endpoint, {
        data: {
          id: entityId,
        },
      });
      const message = response.data.message;
      notify(message, "success");
      return response.data.success;
    } catch (error) {
      catchHelper(error);
    } finally {
      setTimeout(() => {
        CommonStore.toggleLoading(false);
      }, 500);
    }
  }
}

export default new RepositoryHelper();
