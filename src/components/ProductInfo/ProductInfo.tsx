import { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import UserStore from "../../store/user";
import { GUID, Product } from "../../Types";
import { Picture, RatingStars } from "../../UI";
import "./ProductInfo.scss";
import { RoleCodes, rightsCheck } from "../../helpers";

interface ProductInfoProps {
  product: Product;
  onDelete: (id: GUID) => void;
  onUpdate: () => void;
  onChangeRating: (value: number) => void;
  toggleFavorite: () => void;
}

export const ProductInfo = observer(
  ({
    product,
    onDelete,
    onUpdate,
    onChangeRating,
    toggleFavorite,
  }: ProductInfoProps): JSX.Element => {
    const favoriteButtonClass = useMemo(
      () => (product.isFavorite ? "product-info__favorite-button--fill" : ""),
      [product.isFavorite]
    );

    return (
      <>
        <div className="product-title">
          <h1>{product.name}</h1>
        </div>
        <div className="product-info">
          <div className="product-info__common-data">
            {UserStore.userData && (
              <div className="product-info__controllers-place">
                {rightsCheck(RoleCodes.moderator) && (
                  <>
                    <span
                      className="product-info__controller"
                      onClick={() => onUpdate()}
                    >
                      изменить
                    </span>
                    <span
                      className="product-info__controller"
                      onClick={() => onDelete(product.id)}
                    >
                      удалить
                    </span>
                  </>
                )}
                <button
                  onClick={() => toggleFavorite()}
                  className={`product-info__favorite-button ${favoriteButtonClass}`}
                  data-mark-quantity={product.markQuantity}
                >
                  {product.isFavorite ? <BsBookmarkFill /> : <BsBookmark />}
                </button>
              </div>
            )}
            <Picture url={product.photoUrl} />
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
