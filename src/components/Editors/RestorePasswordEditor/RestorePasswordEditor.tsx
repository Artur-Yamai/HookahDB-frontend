import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TextBox } from "UI";

interface RestorePasswordEditorProps {
  onFormSubmit: (email: string) => void;
}

export const RestorePasswordEditor = ({
  onFormSubmit,
}: RestorePasswordEditorProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ email: string }>({ defaultValues: { email: "" } });

  const onSubmit: SubmitHandler<{ email: string }> = (data) =>
    onFormSubmit(data.email);

  const getErrorText = (text?: string) => (
    <span className="hdb-form__error-text">{text}</span>
  );

  register("email", { required: "Обязательное поле" });

  return (
    <form className="hdb-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="hdb-form__content">
        <div className="hdb-form__item">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextBox
                label="Email"
                type="email"
                isValid={!errors?.email}
                {...field}
              />
            )}
          />
          {errors?.email && getErrorText(errors.email.message)}
        </div>
      </div>
      <input
        className="hdb-form__input-submit"
        type="submit"
        disabled={!!Object.keys(errors).length}
      />
    </form>
  );
};
