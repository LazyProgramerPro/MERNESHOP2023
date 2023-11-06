/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Form, Input, notification } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../../firebase";
import { RootState } from "../../../redux/store";
import { container } from "../../../styled/Container";

type FieldType = {
  email?: string;
  password?: string;
};

export default function ForgotPassword() {
  const [form] = Form.useForm();
  const [email, setEmail] = useState<string | null>("");

  //Can add && handle loading

  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user,navigate]);

  const onFinish = async (values: any) => {
    console.log("values:", values);
    const { email } = values;

    const config = {
      url: import.meta.env.VITE_APP_FORGOT_PASSWORD_REDIRECT || "http://localhost:5173/login",
      handleCodeInApp: true,
    };

    // validate some require user password

    try {
      await auth.sendPasswordResetEmail(email, config);
      notification.success({
        message: "Success",
        description: "Check your email for password reset link",
      });

      //sau khi đổi mật khẩu thành công đẩy người dùng đến
    } catch (error: any) {
      console.log("error:", error);

      notification.error({
        message: "Errors",
        description: error?.message,
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
    <WrapperForgotPassword>
      <Card title="Forgot Password">
        <Form
          form={form}
          name="form-forgot-password"
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={!email}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </WrapperForgotPassword>
  );
}

const WrapperForgotPassword = styled.div`
  ${container}
  margin-top: 5.2rem;
  max-width: 60rem;
`;
