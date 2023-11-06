// ProductDetail.js

import { Product } from "../../types/product.type";


interface ProductDetailProps {
  productDetails:Product|null
}

const ProductDetail = (props:ProductDetailProps) => {
const {productDetails} = props;
console.log("productDetails:",productDetails)
  return (
    <div title="Card title">
   {JSON.stringify(productDetails)}
  </div>
  );
};

export default ProductDetail;

