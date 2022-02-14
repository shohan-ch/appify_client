import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import AuthServiceApi from "../api/AuthServiceApi";
import FormBanner from "../components/common/FormBanner";

const Login: FC = () => {
  const router = useRouter();

  const onFinish = (values: any) => {
    // console.log("Received values of form: ", values.password);
    const data = {
      email: values.email,
      password: values.password,
    };

    AuthServiceApi.login(data)
      .then((response) => {
        // console.log(response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.user.id);
        window.location.href="/";
      })
      .catch((err) => {
        // console.log(err.response.data);
        if (err.response.data.errors) {
          err.response.data.errors.forEach((msg: string) => message.error(msg));
        } else {
          message.error(err.response.data.message);
        }
      });
  };
  return (
    <>
      <div className="formBackground"></div>

      <div className="formDiv">
        <Row className="formSection" justify="center" align="middle">
          {/* span-12 form banner  */}
          <FormBanner height="420px" />

          <Col
            span={12}
         
          >
            <div style={{ margin: "0 auto", padding: "0 30px" }}>
              <h2 style={{ color: "#006883", fontWeight: "bold" }}>
                Login Area{" "}
              </h2>
              <Divider
                orientation="right"
                style={{ marginTop: "0px", marginBottom: "10px" }}
              ></Divider>
              <p>Please give your credentilas for login</p>
            

              <Form
                name="normal_login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your Email!" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                  }}
                >
                  <Form.Item name="remember" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <Link href="/forgot_password">
                    <a> Forgot password?</a>
                  </Link>
                </div>

                <Form.Item>
                  <Button
                    style={{ width: "100%", marginBottom: "10px" }}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                  <Divider orientation="right"></Divider>
                  Don't have an account?{" "}
                  <Link href="/register">
                    <a>register now!</a>
                  </Link>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
