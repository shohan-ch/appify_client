import { Button, Col, Form, Input, message, Row , notification} from "antd";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import AuthServiceApi from "../api/AuthServiceApi";
import FormBanner from "../components/common/FormBanner";

const ResetPassword: FC = () => {
  const router = useRouter();

  // console.log(router.query.token);
  let token = router.query?.token;
  let email = router.query?.email;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const data = {
      email: email,
      token: token,
    };

    AuthServiceApi.checkToken(data)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.errors) {
          err.response.data.errors.forEach((msg: string) => message.error(msg));
        } else {
          message.error(err.response.data.message);
        }
        router.push("/forgot_password");
      });

    console.log("use effect");
  }, [router.isReady]);

  const onFinish = (values: any) => {
    // console.log("Received values of form: ", values.confirm_password);
    // console.log(router.query.token);
    const data = {
      email: router.query.email,
      token: router.query.token,
      password: values.password,
      confirm_password: values.confirm_password,
    };

    AuthServiceApi.resetPassword(data)
      .then((response) => {
        console.log(response.data.message);

        notification.success({
          message: response.data.message
        });
        // message.success(response.data.message);
        router.push("login");
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.errors) {
          err.response.data.errors.forEach((msg: string) => message.error(msg));
        } else {
          notification.error({
            message: err.response.data.message,
          });
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
              <h2>Reset forgot password</h2>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input type="password" placeholder="New password" />
              </Form.Item>
              <Form.Item
                name="confirm_password"
                rules={[
                  {
                    required: true,
                    message: "Please input your confirm password",
                  },
                ]}
              >
                <Input type="password" placeholder="Confirm password" />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ marginRight: "10px" }}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Change password
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ResetPassword;
