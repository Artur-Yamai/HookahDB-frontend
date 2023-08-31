import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ReferenceApi } from "API";
import { Product, Reference } from "Types";
import { useMount } from "hooks";
import "./ProductEditor.scss";
import { Select, Picture, InputTypeFIle, TextBox, TextArea } from "UI";

export interface ProductEditorProps {
  product: Product | null;
}

type InputName = "name" | "description" | "fabricator" /*| "picture" */;

type Inputs = {
  name: string;
  description: string;
  fabricator: Reference;
  // picture: string | File;
};

export const ProductEditor = ({ product }: ProductEditorProps) => {
  const {
    register,
    handleSubmit,
    // watch,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: product?.name ?? "",
      fabricator:
        product?.fabricatorId ?? product?.fabricator
          ? { id: product.fabricatorId, value: product.fabricator }
          : undefined,
      description: product?.description ?? "",
      // picture: product?.photoUrl,
    },
  });

  const [loading, toggleLoading] = useState<boolean>(false);
  const [fabricators, setFabricators] = useState<Reference[]>([]);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log({
      name: data.name,
      description: data.description,
      fabricatorId: data.fabricator.id,
    });
  };

  useMount(async () => {
    toggleLoading(true);
    const result: Reference[] | null = await ReferenceApi.getReference(
      "fabricator"
    );
    toggleLoading(false);
    if (result) {
      setFabricators(result);
    }
  });

  register("name", { required: "Обязательное поле" });

  register("fabricator", { required: "Обязательное поле" });

  register("description", {
    required: "Обязательное поле",
  });

  const changeFile = (e: FileList) => {
    console.log(e);
  };

  const getErrorText = (text: string | undefined) => {
    return <span className="hdb-form__error-text">{text}</span>;
  };

  const getErrorStyleClass = (field: InputName): string => {
    return errors?.[field] ? "hdb-form__input--error" : "";
  };

  return (
    <form className="hdb-form product-editor" onSubmit={handleSubmit(onSubmit)}>
      <div className="hdb-form__item">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextBox label="Название" isValid={!errors?.name} {...field} />
          )}
        />
        {errors?.name && getErrorText(errors.name.message)}
      </div>

      <div className="hdb-form__item">
        <Controller
          name="fabricator"
          control={control}
          render={({ field }) => (
            <Select
              label="Производитель"
              isValid={!errors?.fabricator}
              valueKey="id"
              labelKey="value"
              isLoading={loading}
              options={fabricators}
              {...field}
            />
          )}
        />
        {errors?.fabricator && getErrorText(errors.fabricator.message)}
      </div>

      <div className="hdb-form__item">
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              label="Описание"
              isValid={!errors?.description}
              {...field}
            />
          )}
        />
        {errors?.description && getErrorText(errors.description.message)}
      </div>

      {/* <div className="hdb-form__item product-editor__photo-loader-place">
        <Picture
          key={product?.photoUrl}
          className="product-editor__picture"
          url={product?.photoUrl}
        />
        <InputTypeFIle
          {...register("picture", {
            required: "Recipe picture is required",
          })}
          onChange={changeFile}
          label="Сменить изображение"
        />
      </div> */}

      <input type="submit" disabled={!!Object.keys(errors).length} />
    </form>
  );
};
