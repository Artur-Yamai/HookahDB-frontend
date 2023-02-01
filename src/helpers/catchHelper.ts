import { AxiosError } from "axios";
import { IErrorHTTPRequest } from "../Types";
import { notify } from "../UI/Functions";

export function catchHelper(error: unknown): void {
  const err = error as AxiosError;
  const data = err?.response?.data as IErrorHTTPRequest;
  const message: string = data?.message;
  notify(
    message ?? "Произошла ошибка. Попробуйте повторить операцию позже",
    "error"
  );
}
