/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Drawer, Form, Input, Select, Spin, notification } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import SubCategoryApi from "../../../services/subCategoryApi";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../types/category.type";
import CategoryApi from "../../../services/categoryApi";

type AddEditCategoryForm = {
  onClose: () => void;
  open: boolean;
  selectedCategory: string | null;
};

export default function AddEditCategoryForm(props: AddEditCategoryForm) {
  const navigate = useNavigate();
  const { onClose, open, selectedCategory } = props;
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState<any>({});
  const [categories, setCategories] = useState<Category[] | any>([]);

  useEffect(() => {
    CategoryApi.getListCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  useEffect(() => {
    if (isEmpty(selectedCategory)) {
      setInitialValues({});
    } else {
      SubCategoryApi.getCategory(selectedCategory).then((category) => {
        setInitialValues(category);
      });
    }
  }, [selectedCategory]);

  const onFinish = async (values: any) => {
    // validate some require user password

    console.log("valuesvaluesvalues:", values);

    const { name,parent } = values;
    try {
      if (!selectedCategory) {
        await SubCategoryApi.createCategory({ name, parent});
        notification.success({
          message: "Success",
          description: "Add category successfully",
        });
      } else {
        await SubCategoryApi.updateCategory(initialValues?.slug, {
          name,
          parent,
        });
        notification.success({
          message: "Success",
          description: "Update category successfully",
        });
      }
      // call api xong thì đóng Drawer

      onClose();

      navigate("/admin/sub-category"); // sẽ auto gọi lại hàm Loader (chỗ này liệu có nguy hiểm gì ko nhỉ)
    } catch (error) {
      console.log("error:", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    notification.error({
      message: "Errors",
      description: errorInfo.message,
    });
  };
  return (
    <Drawer
      title={
        isEmpty(selectedCategory)
          ? "Add sub category"
          : `Edit sub category ${initialValues && initialValues?.name}`
      }
      placement="right"
      onClose={onClose}
      open={open}
    >
      {!isEmpty(selectedCategory) && isEmpty(initialValues) ? (
        <Spin></Spin>
      ) : (
        <Form
          name="form-add-edit-sub-category"
          form={form}
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Parent"
            name="parent"
            rules={[
              {
                required: true,
                message: "Please input your name parent category!",
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              placeholder="Select an item parent"
            >
              {categories?.map((item: Category, key: number) => (
                <Select.Option value={item._id} key={key}>
                  {item?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Name sub category"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name sub category!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
}
