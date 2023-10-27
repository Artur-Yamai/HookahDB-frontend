import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Reference, NewReference } from "Types";
import { TextBox } from "UI";

interface FabricatorEditorProps {
  fabricator: Reference | null;
  onFormSubmit: (data: NewReference) => void;
}

export const FabricatorEditor = ({
  fabricator,
  onFormSubmit,
}: FabricatorEditorProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewReference>({
    defaultValues: { value: fabricator?.value ?? "" },
  });

  const onSubmit: SubmitHandler<NewReference> = (data) =>
    onFormSubmit({ value: data.value });

  register("value", {
    required: "Обязательное поле",
    minLength: { value: 2, message: "Минимум 2 символа" },
    maxLength: { value: 25, message: "Максимум 25 символов" },
  });

  const getErrorText = (text: string | undefined) => (
    <span className="hdb-form__error-text">{text}</span>
  );

  return (
    <form className="hdb-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="hdb-form__content">
        <div className="hdb-form__item">
          <Controller
            name="value"
            control={control}
            render={({ field }) => (
              <TextBox label="Название" isValid={!errors?.value} {...field} />
            )}
          />
          {errors?.value && getErrorText(errors.value.message)}
        </div>
      </div>
      <input type="submit" disabled={!!Object.keys(errors).length} />
    </form>
  );
};
