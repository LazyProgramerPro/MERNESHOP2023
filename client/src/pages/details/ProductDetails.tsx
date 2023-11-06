/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import { container } from "../../styled/Container";
import ProductDetail from "../../components/product/ProductDetail";
import ProductDetailImage from "../../components/product/ProductDetailImage";
import { useState, useEffect } from "react";
import { Product } from "../../types/product.type";
import { useParams } from "react-router-dom";
import ProductApi from "../../services/productApi";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    ProductApi.getProduct(slug).then((res: any) => {
      setProductDetails(res);
    });
  }, [slug]);

  console.log("productDetails:", productDetails);

  return (
    <WrapperProductDetails>
      <ProductDetailImage images={productDetails?.images} />
      <ProductDetail  productDetails={productDetails}/>
    </WrapperProductDetails>
  );
}

const WrapperProductDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 4.4rem;
  row-gap: 6.6rem;
  ${container}
`;
