/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Drawer, Form, Input, Spin, notification } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import CategoryApi from "../../../services/categoryApi";
import { useNavigate } from "react-router-dom";

type AddEditCategoryForm = {
  onClose: () => void;
  open: boolean;
  selectedCategory: string | null;
};


export default function AddEditCategoryForm(props:AddEditCategoryForm) {

  const navigate = useNavigate()
  const { onClose, open, selectedCategory } = props;
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState<any>({});

  useEffect(() => {
    if (isEmpty(selectedCategory)) {
      setInitialValues({});
    } else {
      CategoryApi.getCategory(selectedCategory).then((category) => {
        setInitialValues(category);
      });
    }
  }, [selectedCategory]);


  const onFinish = async (values: any) => {
    // validate some require user password


    const {name} = values;
    try {
      if(!selectedCategory){
       await CategoryApi.createCategory({name})
       notification.success({ message:"Success", description:"Add category successfully"})
      }else{
        await CategoryApi.updateCategory(initialValues?.slug,{name})
        notification.success({ message:"Success", description:"Update category successfully"})
      }
      // call api xong thì đóng Drawer

      onClose()

      navigate("/admin/category")

      
    } catch (error) {
      console.log("error:", error);
    }
  };

  const onFinishFailed = (errorInfo:any) => {
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
          ? "Add category"
          : `Edit category ${initialValues && initialValues?.name}`
      }
      placement="right"
      onClose={onClose}
      open={open}
    >
      {!isEmpty(selectedCategory) && isEmpty(initialValues) ? (
        <Spin></Spin>
      ) : (
        <Form
          name="form-add-edit-category"
          form={form}
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Name category"
            name="name"
            rules={[
              { required: true, message: "Please input your name category!" },
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
