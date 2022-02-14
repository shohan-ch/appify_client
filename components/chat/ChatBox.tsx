import { SendOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, notification, Row } from "antd";
import Pusher from "pusher-js";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ChatServiceApi from "../../api/ChatServiceApi";
import { useUser } from "../../utility/useUser";
import style from "./Chatbox.module.css";

const ChatBox = (props: any, ref: any) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const user = useUser();
  const inputRef = useRef(null);
  const [reciverId, setReciverId] = useState(null);
  const [messages, setMessages] = useState([]);

  const getMessages = (id: number) => {
    ChatServiceApi.getMessages(id)
      .then((res) => {
        // console.log(res);
        setMessages(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const sendMessage = (id: number, data: object) => {
    ChatServiceApi.sendMessage(id, data)
      .then((res) => {
        // console.log(res);
        getMessages(reciverId);
        form.resetFields();
      })
      .catch((err) => {
        // console.log(err.response);
        err.response.data.errors &&
          err.response.data.errors.map((error: string) => {
            notification.success({
              message: error,
            });
          });
      });
  };

  useEffect(() => {
    let chanelName = "chat_" + localStorage.getItem("user");

    const pusher: any = new Pusher("08e7b8690ccafe7ed6b5", {
      cluster: "ap2",
      // encrypted: true,
    });
    const channel = pusher.subscribe(chanelName);
    channel.bind("my-event", (data: any) => {
      if (reciverId !== null) {
        getMessages(reciverId);
      }
      // console.log(data);
    });
  }, [messages]);

  useEffect(() => {
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  });

  const formSubmit = (values: any) => {
    console.log(values);
    // return;
    const data = {
      message: values.message,
    };
    sendMessage(reciverId, data);
  };

  useImperativeHandle(ref, () => ({
    onClick(id: number) {
      getMessages(id);
      setReciverId(id);
      setVisible(true);
      console.log(visible);
    },
  }));

  return (
    <>
      <Drawer
        title="Appify Chat"
        placement="right"
        visible={visible}
        width={420}
        onClose={() => setVisible(false)}
        // className={style.drawerDiv}
      >
        {/* Message show Div */}

        {messages.map((message) => (
          <Row
            justify={message.user_id == user ? "end" : "start"}
            key={message.id}
          >
            <div
              className={`${
                message.user_id == user ? style.senderDiv : style.receiverDiv
              }`}
            >
              <div>
                {message.message
                  ? message.message
                  : `${process.env.SERVER_URL}message.upload_path`}
              </div>
              <small style={{ whiteSpace: "nowrap" }}>
                {new Date(message.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
            <div style={{ width: "100%" }}></div>
          </Row>
        ))}

        {/* -------------Form  Message Box-------- */}

        <Form onFinish={formSubmit} className={style.formBox} form={form}>
          <Form.Item name="message">
            <Input.TextArea
              className={style.inputBox}
              autoFocus={true}
              ref={inputRef}
              // onChange={onChange}
              placeholder="Message"
              autoSize={{ minRows: 1, maxRows: 10 }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SendOutlined />}
            ></Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default forwardRef(ChatBox);
