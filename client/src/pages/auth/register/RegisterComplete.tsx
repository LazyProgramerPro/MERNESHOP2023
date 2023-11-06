/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../../firebase";
import { container } from "../../../styled/Container";
import UserApi from "../../../services/userApi";
import { loggedInUser } from "../redux/user.slice";
import { useAppDispatch } from "../../../redux/store";

type FieldType = {
  email?: string;
  password?: string;
};

export default function RegisterComplete() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {
    console.log("values:", values);
    const { email, password } = values;

    // validate some require user password

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      ); //Verify user
      //
      if (result.user?.emailVerified) {
        //remove user email from local storage
        localStorage.removeItem("emailForRegistration");
        //get user id token

        const user = auth.currentUser;
        await user?.updatePassword(password);

        const idTokenResult = await user?.getIdTokenResult();
        //redux store

        console.log("idTokenResult:", idTokenResult);
        console.log("idTokenResult:", user);

        await dispatch(
          loggedInUser({
            email: email,
            token: idTokenResult,
          })
        );

        await UserApi.createOrUpdateUser()
          .then((res:any) => {
            dispatch(
              loggedInUser({
                email: res?.email,
                name: res?.name,
                _id: res?._id,
                role: res?.role,
                token: idTokenResult,
              })
            );
          })
          .catch((error) => {
            console.log("result:", error);
          });


        navigate("/");

        //redirect

        navigate("/");
      }
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
    <WrapperRegisterComplete>
      <Card title="Register Complete">
      <Form
        name="form-register-complete"
        initialValues={{
          email: localStorage.getItem("emailForRegistration"),
        }}
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
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register complete
          </Button>
        </Form.Item>
      </Form>
      </Card>
    </WrapperRegisterComplete>
  );
}

const WrapperRegisterComplete = styled.div`
  ${container}
  margin-top: 5.2rem;
  max-width: 60rem;
`;
