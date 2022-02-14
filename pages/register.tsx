import {
    LockOutlined, MailOutlined, PhoneOutlined,
    UnlockOutlined, UserOutlined
} from "@ant-design/icons";
import {
    Button,
    Checkbox, Col, Divider, Form,
    Input, message,
    notification, Row
} from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import FormBanner from "../components/common/FormBanner";
import AuthServiceApi from "../api/AuthServiceApi";


const Register: FC = () => {
  const router = useRouter();
  const [load, setLoad] = useState(false);

  const onFinish = (values: any) => {
    // console.log("Received values of form: ", values.password);
    setLoad(true);
    const data = {
        name: values.name,
        email: values.email,
        password: values.password,
        confirm_password: values.confirm_password,
    }

    AuthServiceApi.register(data)
    .then((response) => {
      console.log(response);
      // console.log(response.data.data.name);
      setLoad(false);
      notification.success({
        message: "Check your email !",
        style: { color: "green" },
        description:
          "Please write your verification code which is sent to your email! ",
      });

      router.push({
        pathname: "/verify",
        query: { email: values.email },
      });
    })
    .catch((err) => {
      setLoad(false);
      // console.log(err.response.data.errors);
      if (err.response.data.errors) {
        err.response.data.errors.forEach((msg: string) => message.error(msg));
      } else {
        message.error(err.response.data.errors);
      }
    });
  };
  return (
    <>
      <div className="formBackground"></div>

      <div className="formDiv">
        <Row
          className="formSection"
          justify="center"
          align="middle"
          style={{width:"730px"}}

        >
        <FormBanner height="560px"/>

          <Col
          span={12}
          style={{
          padding: "0 30px",
          }}
          >
            <div>
              <div
                style={{
                  marginBottom: "32px",
                  padding: "0",
                  textAlign: "left",
                }}
              >
                <h2>Create Appify Lab account</h2>
                <Divider
                  orientation="right"
                  style={{ marginTop: "0px", marginBottom: "10px" }}
                ></Divider>

              </div>

              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please input your Name!" },
                  ]}
                >
                  <Input
              
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Name"
                  />
                </Form.Item>
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
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input
                 
                    prefix={<UnlockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item
                  name="confirm_password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input
                
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Confirm Password"
                  />
                </Form.Item>


                <div style={{ width: "81%", margin: "0 auto" }}>
                  <Divider
                    orientation="right"
                    style={{ marginTop: "0px", marginBottom: "20px" }}
                  ></Divider>
                </div>

                <Form.Item>
                  <Button
                    loading={load}
                    style={{ width: 300 }}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Register Now
                  </Button>
                </Form.Item>

                <div style={{ width: "81%", margin: "0 auto" }}>
                  <Divider
                    orientation="right"
                    style={{ marginTop: "0px", marginBottom: "10px" }}
                  ></Divider>
                </div>
                <div>
                  <p>
                    Do you have an account?{" "}
                    <Link href="/login">Log In</Link>
                  </p>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Register;

