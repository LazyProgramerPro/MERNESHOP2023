import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Popconfirm, Space, Table, Tag, notification } from "antd";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SubCategoryApi from "../../../services/subCategoryApi";
import AddEditSubCategoryForm from "./AddEditSubCategoryForm";

interface SubCategoryType {
  _id: string;
  name: string;
  slug: string;
  parent:{
    name:string;
  };
}

export const loader = async () => {
  try {
    const data = await SubCategoryApi.getListCategories();
    return data;
  } catch (error) {
    return error;
  }
};

export default function SubCategory() {
  const data = useLoaderData() as SubCategoryType[];
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
      await SubCategoryApi.deleteCategory(slug);

      notification.success({
        message: "Success",
        description: "Remove category successfully",
      });

      navigate("/admin/sub-category");
    } catch (error) {
      console.log("errors:", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      width: "25%",
    },
    {
      title: "Parent",
      dataIndex: "parent",
      key: "parent",
      width: "25%",
      render: (record: SubCategoryType) => (<Tag color="red">{record?.name}</Tag>)
    },

    {
      title: "Action",
      key: "action",
      render: (record: SubCategoryType) => (
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
        title="Sub category"
        extra={
          <Button
            type="primary"
            onClick={() => showDrawer(null)}
            icon={<PlusOutlined />}
          >
            New sub category
          </Button>
        }
      >
        <Table columns={columns} dataSource={data} />
      </Card>
      {open && (
        <AddEditSubCategoryForm
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
