/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Spin,
  notification,
} from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../../components/form/UploadFiles";
import CategoryApi from "../../../services/categoryApi";
import ProductApi from "../../../services/productApi";
import { Category } from "../../../types/category.type";
import { SubCategory } from "../../../types/sub-category.type";

type AddEditProductForm = {
  onClose: () => void;
  open: boolean;
  selectedProduct: string | null;
};

const initialState = {
  images: [],
};

export default function AddEditProductForm(props: AddEditProductForm) {
  const navigate = useNavigate();
  const { onClose, open, selectedProduct } = props;
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState<any>({});
  const [categories, setCategories] = useState<Category[] | any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [subCategories, setSubCategories] = useState<SubCategory[] | any>([]);

  const [images, setImages] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEmpty(selectedProduct)) {
      setInitialValues({});
    } else {
      ProductApi.getProduct(selectedProduct).then((product: any) => {

        console.log("productproductproduct:",product)
        setInitialValues({
          ...product,
          category: product.category?._id,
          subCategory: product.subCategory?.map((sc: any) => sc?._id),
        });
        setImages({ images: product.images });
        setSelectedCategory(product?.category?._id);
      });
    }
  }, [selectedProduct]);

  useEffect(() => {
    CategoryApi.getListCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      CategoryApi.getSubCategories(selectedCategory).then((res) => {
        setSubCategories(res);
      });
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory]);

  const onFinish = async (values: any) => {
    // validate some require user password
    values.images = images?.images;

    try {
      if (!selectedProduct) {
        await ProductApi.createProduct(values);
        notification.success({
          message: "Success",
          description: "Add product successfully",
        });
        setImages(initialState);
      } else {
        await ProductApi.updateProduct(initialValues?.slug, values);
        setImages(initialState);
        notification.success({
          message: "Success",
          description: "Update product successfully",
        });
      }
      // call api xong thì đóng Drawer

      onClose();

      navigate("/admin/product");
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
      width={720}
      title={
        isEmpty(selectedProduct)
          ? "Add product"
          : `Edit product ${initialValues && initialValues?.name}`
      }
      placement="right"
      onClose={onClose}
      open={open}
    >
      {!isEmpty(selectedProduct) && isEmpty(initialValues) ? (
        <Spin></Spin>
      ) : (
        <Form
          name="form-add-edit-product"
          form={form}
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              {" "}
              <Form.Item
                label="Product name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name product!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item
                label="Product description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input your description product!",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              {" "}
              <Form.Item
                label="Product price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input your price product!",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item
                label="Shipping"
                name="shipping"
                rules={[
                  {
                    required: true,
                    message: "Please input your price product!",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Select an item shipping"
                >
                  <Select.Option value="Yes" key="Yes">
                    Yes
                  </Select.Option>
                  <Select.Option value="No" key="No">
                    No
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Product quantity"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "Please input your quantity product!",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Color"
                name="color"
                rules={[
                  {
                    required: true,
                    message: "Please input your color product!",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Select an item color"
                >
                  {["Black", "Brown", "Silver", "White", "Blue"].map(
                    (c, index) => {
                      return (
                        <>
                          <Select.Option value={c} key={index}>
                            {c}
                          </Select.Option>
                        </>
                      );
                    }
                  )}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Brand"
                name="brand"
                rules={[
                  {
                    required: true,
                    message: "Please input your brand product!",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Select an item brand"
                >
                  {["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"].map(
                    (b, index) => {
                      return (
                        <>
                          <Select.Option value={b} key={index}>
                            {b}
                          </Select.Option>
                        </>
                      );
                    }
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Please input your category product!",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Select an item category"
                  onChange={(value: string) => {
                    setSelectedCategory(value);
                    form.setFieldsValue({ subCategory: [] });
                  }}
                >
                  {categories.map((c: Category, index: number) => {
                    return (
                      <>
                        <Select.Option value={c?._id} key={index}>
                          {c?.name}
                        </Select.Option>
                      </>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Sub Category"
                name="subCategory"
                rules={[
                  {
                    required: true,
                    message: "Please input your sub category product!",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  showSearch
                  allowClear
                  placeholder="Select an item sub category"
                >
                  {subCategories.map((sc: SubCategory, index: number) => {
                    return (
                      <>
                        <Select.Option value={sc._id} key={index}>
                          {sc?.name}
                        </Select.Option>
                      </>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <FileUpload
            values={images}
            setValues={setImages}
            setLoading={setLoading}
          />

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={loading}>
              Save
            </Button>
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
}
