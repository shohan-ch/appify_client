import React from "react"
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Row, Col, Button } from "antd";
import {useRef} from "react";
import ChatList from '../components/chat/ChatList'




const Home: NextPage = () => {

  const chatRef =  useRef(null);


  
  return (
    <Row style={{ width: "92.7%", marginTop:"40px" }}>
       <ChatList ref={chatRef}/>
      <Button style={{ marginLeft: "auto" }} onClick={()=>chatRef.current.onClick()} type="primary">Start Chat</Button>
    
      <div style={style.div}>
       <h2 style={style.heading}>Welcome to Appify Chat</h2>
     
       <p style={style.para}>Press the button to start Chat</p>
      </div>
 

    </Row>

  );
};


const style = {
  div:{
    width: "100%",
    textAlign: "center" as "center",
  },
   heading:{
    fontWeight: "bold",
    fontSize: "50px",
    color:"#1890ff",
  },
  para:{
    fontSize: "29px",
    fontWeight: "bold",
    fontFamily: "cursive",
  }


}





export default Home;
