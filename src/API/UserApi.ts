import axios from "./axios";

export const UserApi = {
  auth: async (login: string, password: string) =>
    await axios.post("/user/auth", {
      password,
      login,
    }),

  autoAuth: async () => await axios.get("/user/authByToken"),

  register: async (login: string, password: string, email: string) =>
    await axios.post("/user/register", {
      login,
      email,
      password,
    }),

  saveNewAvatar: async (formData: FormData) =>
    await axios.post("/user/saveAvatar", formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    }),

  loginExists: async (login: string) =>
    await axios.post("/user/loginExists", { login }),
  emailExists: async (email: string) =>
    await axios.post("/user/emailExists", { email }),
};
