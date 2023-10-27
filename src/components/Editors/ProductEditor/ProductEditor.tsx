import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ReferenceApi } from "API";
import { Product, ProductForSave, Reference } from "Types";
import { useMount } from "hooks";
import "./ProductEditor.scss";
import { Select, Picture, InputTypeFIle, TextBox, TextArea } from "UI";

interface Inputs {
  name: string;
  description: string;
  fabricatorId: string;
  picture: string | File;
}

export interface ProductEditorProps {
  onFormSubmit: (data: ProductForSave, photo?: File) => void;
  product: Product | null;
}

export const ProductEditor = ({
  product,
  onFormSubmit,
}: ProductEditorProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: product?.name ?? "",
      fabricatorId: product?.fabricatorId ?? "",
      description: product?.description ?? "",
      picture: product?.photoUrl,
    },
  });

  const [photo, setPhoto] = useState<File>();
  const [loading, toggleLoading] = useState<boolean>(false);
  const [fabricators, setFabricators] = useState<Reference[]>([]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onFormSubmit(
      {
        name: data.name,
        description: data.description,
        fabricatorId: data.fabricatorId,
      },
      photo
    );
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

  register("fabricatorId", { required: "Обязательное поле" });

  register("description", { required: "Обязательное поле" });

  register("picture", { required: "Обязательно прикрепите фото" });

  const changeFile = (fileList: FileList) =>
    fileList[0] && setPhoto(fileList[0]);

  const getErrorText = (text: string | undefined) => {
    return <span className="hdb-form__error-text">{text}</span>;
  };

  return (
    <form className="hdb-form product-editor" onSubmit={handleSubmit(onSubmit)}>
      <div className="hdb-form__content">
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
            name="fabricatorId"
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <Select
                value={product?.fabricatorId}
                onChange={(e: Reference) => onChange(e.id)}
                label="Производитель"
                isValid={!errors?.fabricatorId}
                valueKey="id"
                labelKey="value"
                isLoading={loading}
                options={fabricators}
                {...field}
              />
            )}
          />
          {errors?.fabricatorId && getErrorText(errors.fabricatorId.message)}
        </div>

        <div className="hdb-form__item">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea
                label="Описание"
                isValid={!errors?.description}
                rows={6}
                {...field}
              />
            )}
          />
          {errors?.description && getErrorText(errors.description.message)}
        </div>

        <div className="hdb-form__item product-editor__photo-loader-place">
          <Controller
            name="picture"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <>
                <Picture
                  key={product?.photoUrl}
                  className="product-editor__picture"
                  url={product?.photoUrl}
                  pictureFile={photo}
                />
                <InputTypeFIle
                  label="Сменить изображение"
                  onChange={(event) => {
                    onChange(event[0]);
                    changeFile(event);
                  }}
                  {...field}
                />
              </>
            )}
          />

          {errors?.picture && getErrorText(errors.picture.message)}
        </div>
      </div>

      <input type="submit" disabled={!!Object.keys(errors).length} />
    </form>
  );
};
