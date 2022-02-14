import { Button, Col, Form, Input, message, notification, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import AuthServiceApi from "../api/AuthServiceApi";
import FormBanner from "../components/common/FormBanner";
const forgotPassword: FC = () => {
  const router = useRouter();
  const [load, setLoad] = useState(false);

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values.email);
    setLoad(true);

    const data = {
      email: values.email,
    };
    AuthServiceApi.forgetPassword(data)
      .then((response) => {
        console.log(response);
        setLoad(false);
        notification.success({
          message: "Reset your password",
          description: response.data.message,
        });
        // message.success(response.data.message);
        // router.push("/login");
      })
      .catch((err) => {
        console.log(err.response);
        setLoad(false);
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
          <FormBanner height="420px" />

          <Col
            span={12}
            style={{
              padding: "0 20px",
              width: "630px",
            }}
          >
            <Form
              name="normal_login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <h2>Forget your password?</h2>
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Please give your email" }]}
              >
                <Input placeholder="Write your email" />
              </Form.Item>

              <Form.Item>
                <Button
                  loading={load}
                  style={{ marginRight: "10px" }}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Send Email
                </Button>
              </Form.Item>

              <div>
                <p>
                  Back to <Link href="/login">Log In</Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default forgotPassword;
