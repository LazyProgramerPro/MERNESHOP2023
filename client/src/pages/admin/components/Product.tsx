/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Popconfirm,
  Space,
  Table,
  Tag,
  notification,
} from "antd";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductApi from "../../../services/productApi";
import AddEditProductForm from "./AddEditProductForm";

interface ProductType {
  name: string | null;
  description?: string | null;
  price?: number | null;
  category?: any | null;
  subCategory?: any | null;
  quantity?: number | null;
  shipping?: boolean | null;
  color?: string | null;
  brand?: string | null;
  _id: string;
  slug: string;
}

export const loader = async () => {
  try {
    const data = await ProductApi.getListProducts(100);
    return data;
  } catch (error) {
    return error;
  }
};

export default function Product() {
  const data = useLoaderData() as ProductType[];
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const showDrawer = (productId: string | null) => {
    setOpen(true);
    setSelectedProduct(productId);
  };

  const onClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleEditProduct = (slug: string) => {
    showDrawer(slug);
  };
  const handleDeleteProduct = async (slug: string) => {
    try {
      await ProductApi.deleteProduct(slug);

      notification.success({
        message: "Success",
        description: "Remove product successfully",
      });

      navigate("/admin/product");
    } catch (error) {
      console.log("errors:", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "10%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "10%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "10%",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "10%",
      render: (record: any) => <Tag>{record.name}</Tag>,
    },
    {
      title: "Sub Category",
      dataIndex: "subCategory",
      key: "subCategory",
      render: (record: any) => (
        <>
          {record.map((r: any) => {
            return <Tag>{r.name}</Tag>;
          })}
        </>
      ),
      width: "10%",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: "10%",
    },
    {
      title: "Shipping",
      dataIndex: "shipping",
      key: "shipping",
      width: "10%",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: "10%",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: "10%",
    },

    {
      title: "Action",
      key: "action",
      render: (record: ProductType) => (
        <Space size="middle">
          <WrapperIcons onClick={() => handleEditProduct(record.slug)}>
            <EditOutlined />
          </WrapperIcons>
          <WrapperIcons>
            <Popconfirm
              cancelText="Cancel"
              okText="Remove"
              title="Are you sure you want to delete this product?"
              onConfirm={() => handleDeleteProduct(record.slug)}
            >
              <DeleteOutlined />
            </Popconfirm>
          </WrapperIcons>
        </Space>
      ),
      width: "30%",
    },
  ];

  return (
    <>
      <Card
        title="Product"
        extra={
          <Button
            type="primary"
            onClick={() => showDrawer(null)}
            icon={<PlusOutlined />}
          >
            New product
          </Button>
        }
      >
        <Table columns={columns} dataSource={data} />
      </Card>
      {open && (
        <AddEditProductForm
          open={open}
          onClose={onClose}
          selectedProduct={selectedProduct}
        />
      )}
    </>
  );
}

const WrapperIcons = styled.div`
  cursor: pointer;
`;
