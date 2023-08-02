import { useState } from "react";
import { ReferenceApi } from "../../../API";
import { Reference } from "../../../Types";
import { TextBox, InputTypeFIle, Picture, TextArea, Select } from "../../../UI";
import { useMount } from "../../../hooks";
import { ProductClass } from "../../../Classes";
import "./ProductEditor.scss";

export interface ProductEditorProps {
  productData: ProductClass;
  setNewData: (product: ProductClass) => void;
  pullNewPhoto: (file: File) => void;
}

type FieldName = "name" | "description";

export const ProductEditor = ({
  productData,
  pullNewPhoto,
  setNewData,
}: ProductEditorProps) => {
  const [product, setProduct] = useState<ProductClass>(productData);
  const [loading, toggleLoading] = useState<boolean>(false);
  const [fabricators, setFabricators] = useState<Reference[]>([]);

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

  const changeValue = (newValue: string, field: FieldName): void => {
    const newProduct: ProductClass = { ...product } as ProductClass;
    newProduct[field] = newValue;
    setProduct(newProduct);
    setNewData(newProduct);
  };

  const changeSelectValue = (newValue: Reference) => {
    const newProduct: ProductClass = { ...product };
    newProduct.fabricatorId = newValue?.id ?? "";
    setProduct(newProduct);
    setNewData(newProduct);
  };

  const renderFile = (file: File) => {
    const reader: FileReader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const img = document.querySelector(".product-editor img");
      const photo = e?.target?.result;
      if (!img || !photo || typeof photo !== "string") return;
      img.setAttribute("src", photo);
    };

    reader.readAsDataURL(file);
  };

  const changeFile = (files: FileList) => {
    const file: File = files[0];

    if (!file) return;
    pullNewPhoto(file);

    renderFile(file);
  };

  return (
    <form className="product-editor editor-form">
      <div className="editor-form__field">
        <Select
          options={fabricators}
          value={product?.fabricatorId}
          isLoading={loading}
          onChange={changeSelectValue}
          isClearable={true}
          placeholder="Производитель"
          valueKey="id"
          labelKey="value"
        />
      </div>
      <TextBox
        name="name"
        value={product?.name ?? ""}
        placeholder="Добавьте название"
        label="Название"
        width="100%"
        onChange={(e) => changeValue(e, "name")}
      />
      <div className="editor-form__field">
        <TextArea
          label="Введите"
          placeholder="Описание"
          text={product?.description ?? ""}
          onChange={(e) => changeValue(e, "description")}
        />
      </div>
      <div
        className="editor-form__field product-editor__photo"
        style={{ width: "300px" }}
      >
        <Picture url={product?.photoUrl} />
        <InputTypeFIle onChange={changeFile} label="Сменить изображение" />
      </div>
    </form>
  );
};
