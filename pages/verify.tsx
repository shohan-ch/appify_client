import { Button, Col, Form, Input, message, notification, Row } from "antd";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import AuthServiceApi from "../api/AuthServiceApi";
import FormBanner from "../components/common/FormBanner";

const Verify: FC = () => {
  const router = useRouter();
  const [load, setLoad] = useState(false);

  const clickHandle = () => {
    // alert(router.query.email);
    setLoad(true);

    const data = {
      email: router.query.email,
    };
    AuthServiceApi.reverify(data)
      .then((response) => {
        console.log(response.data.message);
        setLoad(false);

        notification.success({
          message: "Check your email !",
          description:
            "Your verification code send to your email. Please check!",
          style: { color: "green" },
        });
      })
      .catch((err) => {
        console.log(err.response.data.message);
        message.error(err.response.data.message);
      });
  };

  const onFinish = (values: any) => {
    // console.log("Received values of form: ", values.code);
    // console.log(router.query.email);
    const data = {
      email: router.query.email,
      verify_code: values.code,
    };

    AuthServiceApi.verify(data)
      .then((response) => {
        // console.log(response);
        message.success("Your verification done. Please log in!");
        router.push("/login");
      })
      .catch((err) => {
        setLoad(false);
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
          <FormBanner height="420px" />

          <Col
            span={12}
            style={{
              padding: "0 20px",
              width: "630px",
            }}
          >
            {/* {email} */}

            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <h2>Verification Area</h2>

              <Form.Item
                name="code"
                rules={[{ required: true, message: "Please input your code" }]}
              >
                <Input placeholder="Give your code" />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ marginRight: "10px" }}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Verify Now
                </Button>
                Or{"  "}
                <Button
                  type="primary"
                  onClick={clickHandle}
                  loading={load}
                  style={{ marginLeft: "10px" }}
                >
                  Resend email
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Verify;
