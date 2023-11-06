/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../../firebase";
import { useAppDispatch } from "../../../redux/store";
import { container } from "../../../styled/Container";
import { logOut } from "../../auth/redux/user.slice";

type FieldType = {
  email?: string;
  password?: string;
};

export default function Password() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    console.log("values:", values);
    const { password } = values;
    // validate some require user password
    try {
      await auth.currentUser?.updatePassword(password);
      notification.success({
        message: "Success",
        description: "Password updated successfully",
      });

      //đổi pass xong thì update redux user =null(bắt đăbg nhập lại: logOut)
      dispatch(logOut(null))

      // redirect về trang login
      navigate("/login");
        
    } catch (error : any) {
      console.log("error:", error);

      notification.error({
        message: "Errors",
        description: error.message,
      });
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
    <WrapperPassword>
      <Card title="Update Password">
        <Form
          name="form-update-password"
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </WrapperPassword>
  );
}

const WrapperPassword = styled.div`
  ${container}
  margin-top: 5.2rem;
  max-width: 60rem;
`;
