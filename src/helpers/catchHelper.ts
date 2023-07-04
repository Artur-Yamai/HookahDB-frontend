import { AxiosError } from "axios";
import { ErrorHTTPRequest } from "../Types";
import { notify } from "../UI";

export const catchHelper = (error: unknown): void => {
  const err = error as AxiosError;
  const data = err?.response?.data as ErrorHTTPRequest;
  const message: string = data?.message;
  console.error(data);
  notify(
    message ?? "Произошла ошибка. Попробуйте повторить операцию позже",
    "error"
  );
};
