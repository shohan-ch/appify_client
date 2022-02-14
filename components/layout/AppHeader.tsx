import { Layout, Menu } from "antd";
import Link from "next/link";
import { FC } from "react";
const { Header } = Layout;
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthServiceApi from "../../api/AuthServiceApi";

const AppHeader: FC = () => {
  const [logged, setLogged] = useState(false);

  const router = useRouter();

  // useEffect(()=>{

  //   setToken(localStorage.getItem("token"));

  // },[token])

  const logOut = () => {
    AuthServiceApi.logOut()
      .then((res) => {
        console.log(res);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setLogged(false);

        router.push("login");
        // window.location.href = "http://localhost:3000/login";
      })
      .catch((err) => { 
        console.log(err.response);
      });
  };

  return (
    <Header
      style={{
        backgroundColor: "#fff",
        position: "fixed",
        width: "100%",
        zIndex: 1,
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Menu
        theme="light"
        mode="horizontal"
        style={{ border: "none", width: "92%", justifyContent:"end"}}
        defaultSelectedKeys={["home"]}
      >
      
        {localStorage.getItem("token") != null && !logged ? (
          <Menu.Item key="2">
            <Link href="/">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  logOut();
                }}
              >
                {" "}
                Logout
              </a>
            </Link>
          </Menu.Item>
        ) : (
          <Menu.Item key="5">
            <Link href="/login">Login</Link>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
};
export default AppHeader;
