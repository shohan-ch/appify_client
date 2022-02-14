import { CommentOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Col,
  Drawer,
  Input,
  notification,
  Row,
  Tabs,
} from "antd";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import FriendServiceApi from "../../api/FriendServiceApi";
import ChatBox from "./ChatBox";
import style from "./Chatlist.module.css";

const { Search } = Input;
const { TabPane } = Tabs;

const ChatList = (props: any, ref) => {
  const [frndRequestList, setFrndRequestList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [requestLoading, setRequestLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSearchList, setShowSearchList] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const chatBoxRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const getFriendList = () => {
    FriendServiceApi.getFriends()
      .then((res) => {
        // console.log(res);
        setFriendList(res.data.user);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getRequestList = () => {
    FriendServiceApi.getRequests()
      .then((res) => {
        console.log(res);
        setFrndRequestList(res.data.result);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const searchFriend = (search: any) => {
    FriendServiceApi.searchFriend(search)
      .then((res) => {
        // console.log(res.data.user);
        setSearchList(res.data.user);
        setLoading(false);
        setShowSearchList(true);
      })
      .catch((err) => {
        // console.log(err.response);
        setSearchList([]);
        setShowSearchList(false);
        setLoading(false);
        err.response.data.message != "" &&
          notification.error({
            message: err.response.data.message,
          });
      });
  };

  const sendRequest = (id: number) => {
    FriendServiceApi.sendRequest(id)
      .then((res) => {
        // console.log(res);
        notification.success({
          message: res.data.message,
        });
        setShowSearchList(false);
        setRequestLoading(false);
      })
      .catch((err) => {
        // console.log(err.response);
        notification.error({
          message: err.response.data.message,
        });
        setShowSearchList(false);
        setRequestLoading(false);
      });
  };

  const acceptRequest = (id: number) => {
    FriendServiceApi.acceptRequest(id)
      .then((res) => {
        console.log(res);
        notification.success({
          message: res.data.message,
        });
        getFriendList();
      })
      .catch((err) => {
        console.log(err.response);
        notification.error({
          message: err.response.data.message,
        });
      });
  };

  useImperativeHandle(ref, () => ({
    onClick() {
      getFriendList();
      getRequestList();
      setVisible(true);
    },
  }));

  const onClose = () => {
    setVisible(false);
    setShowSearchList(false);
  };

  const onSearch = (value: any) => {
    // console.log(value);
    setLoading(true);
    searchFriend(value);
  };

  const handleAdd = (id: number) => {
    setRequestLoading(true);
    sendRequest(id);
  };

  const hanldeAccept = (id: number) => {
    // alert(id);
    acceptRequest(id);
    getRequestList();
  };

  return (
    <>
      {/* ChatBox component */}
      <ChatBox ref={chatBoxRef} />

      <Drawer
        title="Appify Chat"
        placement="right"
        width={420}
        onClose={onClose}
        visible={visible}
      >
        <Search
          placeholder="Search by Email or Name"
          // allowClear
          enterButton="Search Friend"
          onSearch={onSearch}
          style={{ marginBottom: "30px", width: "100%" }}
          loading={loading}
          onChange={(e) => {
            if (e.target.value === "") {
              // input is cleared.
              setShowSearchList(false);
            }
          }}
        />

        {/* Searchlist component  */}

        {searchList.length > 0 &&
          showSearchList &&
          searchList.map((user) => (
            <Row
              key={user.id}
              gutter={[16, 8]}
              justify="space-between"
              style={{ marginBottom: "15px" }}
            >
              <Col>
                <FaUserTie className={style.userIcon} />
              </Col>
              <Col>
                <h4 className={style.chatUserName}>{user.name}</h4>
                <small>{user.email}</small>
              </Col>
              <Col>
                <Button
                  onClick={() => handleAdd(user.id)}
                  loading={requestLoading}
                >
                  Add Request
                </Button>
              </Col>
            </Row>
          ))}

        {!showSearchList && (
          <Tabs defaultActiveKey="1" centered>
            <TabPane
              tab={
                <span>
                  <CommentOutlined className="tabIcon" />
                  Chat
                </span>
              }
              key="1"
            >
              {/*Chat  List */}
              {console.log(friendList)}
              {!showSearchList && friendList.length > 0
                ? friendList.map((friend) => (
                    <Row
                      key={friend.id}
                      className={style.chatRow}
                      onClick={() =>
                        chatBoxRef.current != null &&
                        chatBoxRef.current.onClick(friend.friend_list.id)
                      }
                      gutter={[16, 20]}
                    >
                      <Col flex={1}>
                        <FaUserTie className={style.userIcon} />
                      </Col>

                      <Col flex={4}>
                        <h4 className="chatUserName">
                          {friend.friend_list.name}
                        </h4>
                        <small>Message</small>
                      </Col>
                      <Col>
                        <div>13-12-2021</div>
                      </Col>
                    </Row>
                  ))
                : "Your chat list is empty!"}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <UsergroupAddOutlined className={style.tabIcon} />
                  <Badge
                    size="small"
                    offset={[10, 0]}
                    count={frndRequestList && frndRequestList.length}
                  >
                    Friend's Request
                  </Badge>
                </span>
              }
              key="2"
            >
              {/*  Friend request Pending list */}

              {frndRequestList && frndRequestList.length > 0
                ? frndRequestList.map((element) => (
                    <Row
                      key={element.id}
                      gutter={[16, 8]}
                      className={style.frndRequestRow}
                    >
                      <Col span={4}>
                        <FaUserTie
                          style={{
                            marginTop: "15px",
                          }}
                          className={style.userIcon}
                        />
                      </Col>
                      <Col span={14}>
                        <h4>{element.user.name}</h4>
                        <small>
                          <strong> Email:</strong> {element.user.email}
                        </small>
                        <br></br>
                        <small>
                          <strong>Phone:</strong> {element.user.phone}
                        </small>
                      </Col>
                      <Col span={6}>
                        <Button
                          style={{ marginTop: "15px" }}
                          onClick={() => hanldeAccept(element.user_id)}
                          // loading={requestLoading}
                        >
                          Accept
                        </Button>
                      </Col>
                    </Row>
                  ))
                : "You have no friend request!"}
            </TabPane>
          </Tabs>
        )}
      </Drawer>
    </>
  );
};

export default forwardRef(ChatList);
