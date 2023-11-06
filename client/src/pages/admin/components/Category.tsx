import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Popconfirm, Space, Table, notification } from "antd";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CategoryApi from "../../../services/categoryApi";
import AddEditCategoryForm from "./AddEditCategoryForm";

interface CategoryType {
  _id: string;
  name: string;
  slug: string;
}

export const loader = async () => {
  try {
    const data = await CategoryApi.getListCategories();
    return data;
  } catch (error) {
    return error;
  }
};

export default function Category() {
  const data = useLoaderData() as CategoryType[];
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const showDrawer = (categoryId: string | null) => {
    setOpen(true);
    setSelectedCategory(categoryId);
  };

  const onClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  const handleEditCategory = (slug: string) => {
    showDrawer(slug);
  };
  const handleDeleteCategory = async (slug: string) => {
    try {
      await CategoryApi.deleteCategory(slug);

      notification.success({
        message: "Success",
        description: "Remove category successfully",
      });

      navigate("/admin/category");
    } catch (error) {
      console.log("errors:", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "40%",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      width: "40%",
    },
    {
      title: "Action",
      key: "action",
      render: (record: CategoryType) => (
        <Space size="middle">
          <WrapperIcons onClick={() => handleEditCategory(record.slug)}>
            <EditOutlined />
          </WrapperIcons>
          <WrapperIcons>
            <Popconfirm
              cancelText="Cancel"
              okText="Remove"
              title="Are you sure you want to delete this category?"
              onConfirm={() => handleDeleteCategory(record.slug)}
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
        title="Category"
        extra={
          <Button
            type="primary"
            onClick={() => showDrawer(null)}
            icon={<PlusOutlined />}
          >
            New category
          </Button>
        }
      >
        <Table columns={columns} dataSource={data} />
      </Card>
      {open && (
        <AddEditCategoryForm
          open={open}
          onClose={onClose}
          selectedCategory={selectedCategory}
        />
      )}
    </>
  );
}

const WrapperIcons = styled.div`
  cursor: pointer;
`;
