/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditOutlined } from "@ant-design/icons";
import { Pagination, Spin } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductApi from "../../services/productApi";
import { container } from "../../styled/Container";
import { NavLink } from "react-router-dom";

export default function Home() {
  const [listNewProducts, setListNewProducts] = useState([]);
  const [listSellerProducts, setListSellerProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  // const [loading,setLoading] = useState(false);
  // handle loading (Ske or Spin)

  console.log("page:", page, totalProducts);

  useEffect(() => {
    ProductApi.getAllProducts("createdAt", "desc", page).then(
      (products: any) => {
        console.log(products);
        setListNewProducts(products);
      }
    );
    ProductApi.getAllProducts("sold", "desc", page).then((products: any) => {
      console.log(products);
      setListSellerProducts(products);
    });

    ProductApi.getProductCount().then((res: any) => {
      setTotalProducts(res);
    });
  }, [page]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "pageSize:", pageSize);
    // Perform any additional actions based on the page change, like fetching data
    setPage(page);
  };

  if (totalProducts == 0) {
    return <Spin></Spin>;
  }

  return (
    <>
      {/* <Typewriter /> */}
      <Title>Best seller</Title>

      <WrapperHome>
        {listSellerProducts.map((product: any, index: number) => (
          <ProductItem key={index}>
            <img
              src={product?.images[0]?.url}
              className="product-img"
              alt={product?.images[0]?.url}
              style={{ width: "100%", height: "220px" }}
            />
            <Content>
              <Category>
                <span>{product?.category?.name}</span>
              </Category>
              <p className="product--name">{product?.name}</p>
              <ul className="product-attributes">
                <li className="product-price">
                  <EditOutlined></EditOutlined>
                  <span>
                    <strong>{product?.price}</strong> $
                  </span>
                </li>
                <li className="product-brand">
                  <EditOutlined></EditOutlined>
                  <span>{product?.brand}</span>
                </li>
                <li className="product-color">
                  <EditOutlined></EditOutlined>
                  <span>{product?.color}</span>
                </li>
              </ul>

              <WrapperButton>
                <NavLink to={`/product/${product.slug}`}>
                  <div className="btnView">View</div>
                </NavLink>
                <div className="btnAdd">Add to cart</div>
              </WrapperButton>
            </Content>
          </ProductItem>
        ))}
      </WrapperHome>
      <Wrapp>
        <Pagination
          current={page}
          total={totalProducts} // Replace with the total number of items you have
          pageSize={5} // Adjust this based on your application's requirements
          onChange={handlePaginationChange}
        />
      </Wrapp>
      {/* Chỗ này hơi lười nên x2 */}
      <Title>New</Title>

      <WrapperHome>
        {listNewProducts.map((product: any, index: number) => (
          <ProductItem key={index}>
            <img
              src={product?.images[0]?.url}
              className="product-img"
              alt={product?.images[0]?.url}
              style={{ width: "100%", height: "220px" }}
            />
            <Content>
              <Category>
                <span>{product?.category?.name}</span>
              </Category>
              <p className="product--name">{product?.name}</p>
              <ul className="product-attributes">
                <li className="product-price">
                  <EditOutlined></EditOutlined>
                  <span>
                    <strong>{product?.price}</strong> $
                  </span>
                </li>
                <li className="product-brand">
                  <EditOutlined></EditOutlined>
                  <span>{product?.brand}</span>
                </li>
                <li className="product-color">
                  <EditOutlined></EditOutlined>
                  <span>{product?.color}</span>
                </li>
              </ul>

              <WrapperButton>
                <NavLink to={`/product/${product.slug}`}>
                  <div className="btnView">View</div>
                </NavLink>
                <div className="btnAdd">Add to cart</div>
              </WrapperButton>
            </Content>
          </ProductItem>
        ))}
      </WrapperHome>
    </>
  );
}

const WrapperButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  .btnView,
  .btnAdd {
    font-size: 1.4rem;
    padding: 1rem 1.6rem;
    background-color: #087f5b;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 500;
    display: inline-block;
    border-radius: 10rem;
    &:hover {
      background-color: #099268;
    }
  }
`;

const Wrapp = styled.div`
  ${container}
  padding: 3rem;
`;

const Title = styled.div`
  ${container}
  padding: 2.4rem;
  font-size: 3.4rem;
  display: flex;
  justify-content: flex-start;
  color: #333;
  font-weight: 600;
`;

const Content = styled.div`
  padding: 2.4rem;
  .product--name {
    font-size: 2.4rem;
    color: #333;
    font-weight: 600;
    margin-bottom: 2.2rem;
  }
  .product-attributes {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2.8rem;
  }
  .product-price,
  .product-brand,
  .product-color {
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    gap: 1.6rem;
  }
`;

const Category = styled.div`
  margin-bottom: 0.8rem;
  display: flex;
  gap: 0.4rem;
  span {
    display: inline-block;
    padding: 0.4rem 0.8rem;
    font-size: 1.2rem;
    text-transform: uppercase;
    color: #333;
    border-radius: 100px;
    font-weight: 600;
    margin-bottom: 1.2rem;
    display: flex;
    gap: 0.4rem;
    background-color: #51cf66;
  }
`;
const ProductItem = styled.div`
  box-shadow: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.075);
  border-radius: 11px;
  overflow: hidden;
  transition: all 0.4s;
  cursor: pointer;
  &:hover {
    transform: translateY(-1.2rem);
    box-shadow: 0 3.2rem 6.4rem rgba(0, 0, 0, 0.06);
  }
`;

const WrapperHome = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 4.4rem;
  row-gap: 6.6rem;
  ${container}
`;
