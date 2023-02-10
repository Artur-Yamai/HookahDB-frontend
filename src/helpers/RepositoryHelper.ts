import { AxiosError } from "axios";
import Repository from "../API/axios";
// import { catchHelper } from "./catchHelper";
import { IErrorHTTPRequest } from "../Types";
import { notify } from "../UI";

const options = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};

class RepositoryHelper {
  public async perfomOperation(operation: Function) {
    try {
      // TODO: запускать глобальный спиннер
      const result = await operation();
      console.log(result);
      notify(result.message);
      return result;
    } catch (error) {
      this.catchHelper(error);
      return false;
    } finally {
      // TODO: выключать глобальный спиннер
    }
  }

  public async save(entity: any, endpoint: string, returnWholeResponse = true) {
    const obj = { ...entity };

    var form = new FormData();
    for (const key in obj) {
      form.append(key, obj[key]);
    }
    return await this.perfomOperation(async () => {
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
      const config = {
        method: "DELETE",
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        data: `id=${entityId}`,
        url: endpoint,
      };
      const response = await Repository.request(config);
      const message = response.data.message;
      notify(message);
      return;
    } catch (error) {
      this.catchHelper(error);
    }
  }

  private catchHelper(error: unknown) {
    const err = error as AxiosError;
    const data = err?.response?.data as IErrorHTTPRequest;
    const message: string = data?.message;
    notify(
      message ?? "Произошла ошибка. Попробуйте повторить операцию позже",
      "error"
    );
    return { success: false };
  }
}

export default new RepositoryHelper();
