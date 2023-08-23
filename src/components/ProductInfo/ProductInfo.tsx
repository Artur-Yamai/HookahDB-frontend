import { useMemo, useRef } from "react";
import { observer } from "mobx-react-lite";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import UserStore from "../../store/user";
import { Product, MenuInteractionButton } from "../../Types";
import { Picture, RatingStars, MenuInteraction } from "../../UI";
import "./ProductInfo.scss";
import { RoleCodes, rightsCheck } from "../../helpers";

interface ProductInfoProps {
  product: Product;
  onDelete: (id: string) => void;
  onUpdate: () => void;
  onChangeRating: (value: number) => void;
  toggleFavorite: () => void;
}

interface InteractionRef {
  hideList: () => void;
}

export const ProductInfo = observer(
  ({
    product,
    onDelete,
    onUpdate,
    onChangeRating,
    toggleFavorite,
  }: ProductInfoProps): JSX.Element => {
    const InteractionRef = useRef<InteractionRef>(null);
    const favoriteButtonClass = useMemo(
      () => (product.isFavorite ? "product-info__favorite-button--fill" : ""),
      [product.isFavorite]
    );

    const buttonList: MenuInteractionButton[] = [
      {
        title: "Изменить",
        icon: <AiOutlineEdit />,
        method: () => {
          onUpdate();
          if (InteractionRef.current) {
            InteractionRef.current?.hideList();
          }
        },
      },
      {
        title: "Удалить",
        icon: <FiTrash />,
        method: () => onDelete(product.id),
      },
    ];

    return (
      <>
        <div className="product-title">
          <h1>{product.name}</h1>
        </div>
        <div className="product-info">
          <div className="product-info__common-data">
            {UserStore.userData && (
              <div className="product-info__controllers-place">
                <button
                  onClick={() => toggleFavorite()}
                  className={`product-info__favorite-button ${favoriteButtonClass}`}
                  data-mark-quantity={product.markQuantity}
                >
                  {product.isFavorite ? <BsBookmarkFill /> : <BsBookmark />}
                </button>
                {rightsCheck(RoleCodes.moderator) && (
                  <MenuInteraction
                    ref={InteractionRef}
                    buttonList={buttonList}
                  />
                )}
              </div>
            )}
            <Picture className="product-info__image" url={product.photoUrl} />
          </div>
          <div className="product-info__info-block">
            <p className="product-info__info">
              <span className="product-info__label">Изготовитель:</span>
              <span className="product-info__value">{product.fabricator}</span>
            </p>
            <p className="product-info__info">
              <span className="product-info__label">Описание:</span>
              <span className="product-info__value">{product.description}</span>
            </p>
            <RatingStars
              edit={UserStore.isAuth}
              count={5}
              value={product.rating}
              ratingsQuantity={product.ratingsQuantity}
              showDetails={true}
              onChange={onChangeRating}
            />
          </div>
        </div>
      </>
    );
  }
);
