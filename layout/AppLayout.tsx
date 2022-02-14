import { Layout } from "antd";
import React, { FC } from "react";
import AppFooter from "../components/layout/AppFooter";
import AppHeader from "../components/layout/AppHeader";

const AppLayout: FC = ({ children }) => {
  const nossr = typeof window !== "undefined";

  const { Content } = Layout;
  return (
    <div>
      {nossr && (
        <Layout>
          <AppHeader />
          <Content style={{ marginTop: "40px"}}>{children}</Content>
          <AppFooter />
        </Layout>
      )}
    </div>
  );
};
export default AppLayout;
