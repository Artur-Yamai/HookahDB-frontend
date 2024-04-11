import { useMemo } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { TextBox, notify } from "UI";
import "./RestorePasswordForm.scss";

interface Inputs {
  currentPass: string;
  newPass: string;
  confirmPass: string;
}

interface RestorePasswordFormProps {
  onSubmit: (currentPass: string, newPass: string) => Promise<boolean>;
}

export const RestorePasswordForm = ({ onSubmit }: RestorePasswordFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      currentPass: "",
      newPass: "",
      confirmPass: "",
    },
  });

  register("currentPass", { required: "Обязательное поле" });
  const message: string = "Пароль должен содержать не менее 8 символов";
  register("newPass", {
    required: "Обязательное поле",
    minLength: { value: 8, message },
  });
  register("confirmPass", {
    required: "Обязательное поле",
    minLength: { value: 8, message },
  });

  const passDontConfirmText = useMemo(
    () =>
      watch("confirmPass").length && watch("confirmPass") !== watch("newPass")
        ? "Пароли не совпадают"
        : "",
    // eslint-disable-next-line
    [watch("confirmPass"), watch("newPass")]
  );

  const getErrorText = (text: string | undefined) => (
    <span className=" hdb-form__error-text">{text}</span>
  );

  const onSendPassData: SubmitHandler<Inputs> = async (data) => {
    const result: boolean = await onSubmit(data.currentPass, data.newPass);
    if (result) {
      notify("Пароль изменен");
      reset({ currentPass: "", newPass: "", confirmPass: "" });
    }
  };

  return (
    <form
      className="hdb-form restore-password-form"
      onSubmit={handleSubmit(onSendPassData)}
    >
      <fieldset>
        <legend>Смена пароля</legend>

        <div className="hdb-form__item">
          <Controller
            name="currentPass"
            control={control}
            render={({ field }) => (
              <TextBox
                label="Старый пароль"
                type="password"
                isValid={!errors?.currentPass}
                {...field}
              />
            )}
          />
          {errors?.currentPass && getErrorText(errors.currentPass.message)}
        </div>

        <div className="hdb-form__item">
          <Controller
            name="newPass"
            control={control}
            render={({ field }) => (
              <TextBox
                label="Старый пароль"
                type="password"
                isValid={!errors?.newPass}
                {...field}
              />
            )}
          />
          {errors?.newPass && getErrorText(errors.newPass.message)}
        </div>

        <div className="hdb-form__item">
          <Controller
            name="confirmPass"
            control={control}
            render={({ field }) => (
              <TextBox
                label="Повторите новый пароль"
                type="password"
                isValid={!errors?.confirmPass}
                {...field}
              />
            )}
          />
          {passDontConfirmText
            ? getErrorText(passDontConfirmText)
            : errors?.confirmPass && getErrorText(errors.confirmPass.message)}
        </div>

        <input
          type="submit"
          disabled={!!Object.keys(errors).length || !!passDontConfirmText}
          className="hdb-form__submit"
          value="Сменить пароль"
        />
      </fieldset>
    </form>
  );
};
