/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, notification,Card } from "antd";
import styled from "styled-components";
import { container } from "../../../styled/Container";
import { auth } from "../../../firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type FieldType = {
  email?: string;
};

export default function Register() {

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user,navigate]);

  //chỗ này lên viết 1 hook, có thời gian sẽ làm sau

  const onFinish = async (values: any) => {
    console.log("values:", values);

    const { email } = values;

    const config = {
      url: import.meta.env.VITE_APP_REGISTER_REDIRECTURL|| "http://localhost:5173/register/complete",
      handleCodeInApp: true,
    };

    try {
      await auth.sendSignInLinkToEmail(email, config);
      localStorage.setItem("emailForRegistration", email);
      notification.success({
        message: "Send email successfully",
        description: `Email is sent to ${email} .Click the link to complete your registration`,
      });
    } catch (error) {
      console.log(error);
      
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <WrapperRegister>
      <Card title="Register">
      <Form
        name="form-register"
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
          <Input type="email" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      </Card>
    </WrapperRegister>
  );
}

const WrapperRegister = styled.div`
  ${container}
  margin-top: 5.2rem;
  max-width: 60rem;
`;
