/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Form, Input, notification } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ROLE } from "../../../constants";
import { auth, googleAuthProvider } from "../../../firebase";
import { RootState, useAppDispatch } from "../../../redux/store";
import UserApi from "../../../services/userApi";
import { container } from "../../../styled/Container";
import { loggedInUser } from "../redux/user.slice";

type FieldType = {
  email?: string;
  password?: string;
};

export default function Login() {
  const [form] = Form.useForm();
  const [email, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");

  //Can add && handle loading

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    setEmail(localStorage.getItem("emailForRegistration"));
  }, []);

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user,navigate]);

  const roleBaseRedirect = (role: string) => {
    if (role === ROLE.ADMIN) {
      navigate("/admin/dashboard");
    } else {
      navigate("/user");
    }
  };

  const onFinish = async (values: any) => {
    console.log("values:", values);
    const { email, password } = values;

    // validate some require user password

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      console.log("error:", result);

      const { user } = result;
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user:", user);

        await dispatch(
          loggedInUser({
            email: email,
            token: idTokenResult,
          })
        );

        await UserApi.createOrUpdateUser()
          .then((res: any) => {
            dispatch(
              loggedInUser({
                email: res?.email,
                name: res?.name,
                _id: res?._id,
                role: res?.role,
                token: idTokenResult,
              })
            );
            roleBaseRedirect(res?.role);
          })
          .catch((error) => {
            console.log("result:", error);
          });

        // navigate("/");

        notification.success({
          message: "Success",
          description: "Login success",
        });
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

  const loginWithGoogle = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        if (user) {
          const idTokenResult = await user.getIdTokenResult();

          //Redux trước

          await dispatch(
            loggedInUser({
              email: email,
              token: idTokenResult,
            })
          );

          await UserApi.createOrUpdateUser()
            .then((res: any) => {
              dispatch(
                loggedInUser({
                  email: res?.email,
                  name: res?.name,
                  _id: res?._id,
                  role: res?.role,
                  token: idTokenResult,
                })
              );
              roleBaseRedirect(res?.role);
            })
            .catch((error) => {
              console.log("result:", error);
            });
          // navigate("/");

          notification.success({
            message: "Success",
            description: "Login success",
          });
        }
      })
      .catch((error) => {
        console.log("Failed:", error);
      });
  };

  return (
    <WrapperLogin>
      <Card title="Login">
        <Form
          form={form}
          name="form-login"
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
            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <WrapperButton>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!email || !password}
              >
                Login with Email/Password
              </Button>
            </Form.Item>
            <Button onClick={loginWithGoogle}>Login with Google</Button>
            <NavLink
              to={"/forgot/password"}
              key={"/forgot/password"}
              className="main-nav-link"
              end
            >
              Forgot password ?
            </NavLink>
          </WrapperButton>
        </Form>
      </Card>
    </WrapperLogin>
  );
}

const WrapperButton = styled.div`
  display: flex;
  gap: 1.2rem;
  /* align-items: center; */
`;

const WrapperLogin = styled.div`
  ${container}
  margin-top: 5.2rem;
  max-width: 60rem;
`;
