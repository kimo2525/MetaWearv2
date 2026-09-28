import {
  Image,
  ProductDetails,
  PriceRatingName,
  ShowCase,
  Item,
  OldPrice,
  Colors,
  Sizes,
  ProductInformation,
  OptionsContainer,
  OptionButton,
  StockContainer,
  OutOfStock,
  InStock,
} from "./product-details.styles.jsx";
import BreadCrumb from "../../components/bread-crumb/bread-crumb.compnent";

import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../components/button/button.component";
import { ProductDetailsComponentContainer } from "./product-details.styles";
import { useState } from "react";
import { addItemToCart } from "../../store/cart/cart.action.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCartItems } from "../../store/cart/cart.selector.js";

const ProductDetailsComponent = ({ product }) => {
  const cartItems = useSelector(selectCartItems);
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
  const dispatch = useDispatch();
  const { character } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const selectedVariant = product?.variants?.find(
    (variant) =>
      variant.size === selectedSize && variant.color === selectedColor,
  );

  const hasSelectedOptions = Boolean(selectedSize) && Boolean(selectedColor);

  const isOutOfStock =
    hasSelectedOptions && (!selectedVariant || selectedVariant.stock <= 0);
  console.log(product, "product");

  const isSizeAvailable = (size) => {
    if (!product?.variants) return false;

    // No color selected yet:
    // available if ANY color for this size has stock.
    if (!selectedColor) {
      return product.variants.some(
        (variant) => variant.size === size && variant.stock > 0,
      );
    }

    return product.variants.some(
      (variant) =>
        variant.size === size &&
        variant.color === selectedColor &&
        variant.stock > 0,
    );
  };

  const isColorAvailable = (color) => {
    if (!product?.variants) return false;

    // No size selected yet:
    // available if ANY size for this color has stock.
    if (!selectedSize) {
      return product.variants.some(
        (variant) => variant.color === color && variant.stock > 0,
      );
    }

    return product.variants.some(
      (variant) =>
        variant.color === color &&
        variant.size === selectedSize &&
        variant.stock > 0,
    );
  };

  const links = [
    { href: "/shop", label: "shop" },
    { href: `/shop/${character}`, label: character },
    { href: ``, label: product?.title },
  ];

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      return;
    }

    if (!selectedVariant || selectedVariant.stock <= 0) {
      return;
    }

    const productToAdd = {
      ...product,
      selectedSize,
      selectedColor,
      variantId: selectedVariant.id,
    };

    dispatch(addItemToCart(productToAdd));
  };
  //   <h1> hello</h1>;
  return (
    <ProductDetailsComponentContainer>
      <BreadCrumb links={links} />
      <ProductInformation>
        <ShowCase>
          <Image src={product?.image} alt={product?.title} />
        </ShowCase>
        <PriceRatingName>
          <Item>{product?.title}</Item>
          <Item>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>
                {star <= Math.round(product?.rating) ? "★" : "☆"}
              </span>
            ))}
            <span>{product?.rating}</span>
            <span>{` (${product?.reviewCount} reviews)`}</span>
          </Item>
          <Item>
            ${product?.price}
            {product?.originalPrice && (
              <OldPrice>${product?.originalPrice}</OldPrice>
            )}
          </Item>
          <Item>{product?.description}</Item>
          {/* <Item>
              <label htmlFor="">Color</label>
              <Colors>
                {product?.colors?.map((item) => (
                  <li
                    onClick={() =>
                      dispatch(addItemToCartColor(cartItems, item, product))
                    }
                  >
                    {item}
                  </li>
                ))}
              </Colors>
            </Item>
            <Item>
              <label htmlFor="">Size</label>
              <Sizes>
                {product?.sizes?.map((item) => (
                  <li
                    onClick={() =>
                      dispatch(addItemToCartSize(cartItems, item, product))
                    }
                  >
                    [{`${item}`}]
                  </li>
                ))}
              </Sizes>
            </Item> */}
          <div>
            <h4>Size: {selectedSize || "Select a size"}</h4>
            <OptionsContainer>
              {product?.sizes?.map((size) => {
                const available = isSizeAvailable(size);
                return (
                  <OptionButton
                    key={size}
                    type="button"
                    $selected={selectedSize === size}
                    $disabled={!available}
                    disabled={!available}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </OptionButton>
                );
              })}
            </OptionsContainer>
          </div>
          <div>
            <h4>Color: {selectedColor || "Select a color"}</h4>
            <OptionsContainer>
              {product?.colors?.map((color) => {
                const available = isColorAvailable(color);
                return (
                  <OptionButton
                    key={color}
                    type="button"
                    $selected={selectedColor === color}
                    $disabled={!available}
                    disabled={!available}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </OptionButton>
                );
              })}
            </OptionsContainer>
          </div>
          <StockContainer>
            {!hasSelectedOptions ? (
              <span>{product?.stock} total in stock</span>
            ) : isOutOfStock ? (
              <OutOfStock>Out of stock</OutOfStock>
            ) : (
              <InStock>
                {selectedVariant.stock}{" "}
                {selectedVariant.stock === 1 ? "item" : "items"} in stock
              </InStock>
            )}
          </StockContainer>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.inverted}
            onClick={addProductToCart}
          >
            Add to cart
          </Button>
        </PriceRatingName>
      </ProductInformation>
      <br />
      <ProductDetails>
        <strong>PRODUCT DETAILS</strong>
        <Item>
          {product?.features.map((item) => (
            <span>{item}</span>
          ))}
        </Item>
      </ProductDetails>
    </ProductDetailsComponentContainer>
  );
};

export default ProductDetailsComponent;
