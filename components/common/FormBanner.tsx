import { Col } from "antd";

export default({height}:any) => {
  return (
    <Col
      style={{
        background:
          "url('https://image.freepik.com/free-vector/giant-checklist_23-2148081734.jpg?w=826') no-repeat center center #0068832b",
        backgroundSize: "cover",
        minHeight: height,
        borderRight: "2px solid #006883",
      }}
      span={12}
    ></Col>
  );
};
