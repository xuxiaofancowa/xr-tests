import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import style from "./App.module.css";
import { Button, Modal, Tabs, message } from "antd";
import { Popup } from "antd-mobile";
import VConsole from "vconsole";
const vConsole = new VConsole();
function App() {
  const [activeTab, setActiveTab] = useState("1");
  const onChange = (key: string) => {
    setActiveTab(key);
  };
  const items = useMemo(() => {
    return [
      {
        key: "1",
        label: "Tab 1",
        children: <OrderPage />,
      },
      {
        key: "2",
        label: "Tab 2",
        children: "Content of Tab Pane 2",
      },
    ];
  }, []);

  console.log("---页面高度", document.querySelector(".tabsInfo")?.clientHeight);
  
  const setHeight = useCallback(()=>{
    const tabpane=document.querySelector('.ant-tabs-tabpane')
    const content = document.querySelector('.ant-tabs-content')
    if(tabpane){
      tabpane.setAttribute('style','height:100%')
      content?.setAttribute('style','height:100%')
    }else{
      setTimeout(()=>{
        setHeight()
      },50)
    }
  },[])
  useEffect(()=>{
    setHeight()
  },[setHeight])
  return (
    <div className={style.app}>
      <Tabs
        activeKey={activeTab}
        items={items}
        onChange={onChange}
        style={{
          height: window.innerHeight,
        }}
        className="tabsInfo"
      />
    </div>
  );
}

function OrderPage() {
  const ref = useRef();
  const [messageApi, contextHolder] = message.useMessage();
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  //@ts-ignore
  console.log("列表高度", ref.current?.clientHeight);

  return (
    //@ts-ignore
    <div className={style.page} ref={ref}>
      {contextHolder}
      <Modal
        title="Basic Modal"
        open={open}
        onOk={() => {
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      >
        数量{count}
      </Modal>
      <div className={style.header}>header</div>
      <div className={style.list}>
        <Button
          onClick={() => {
            if (count > 0) {
              setCount(count - 1);
            }
          }}
        >
          -
        </Button>
        <span style={{ marginInline: 5 }}> {count}</span>
        <Button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </Button>
      </div>
      <div className={style.bottom}>
        <div
          style={{
            flex: 1,
          }}
          onClick={() => {
            setVisible(true);
          }}
        >
          {count}
        </div>
        <div
          onClick={() => {
            if (count === 0) {
              messageApi.warning("数量不能为0");
              return;
            }
            setOpen(true);
          }}
        >
          提交
        </div>
      </div>
      <Popup
        visible={visible}
        closeOnMaskClick
        getContainer={null}
        style={{
          zIndex: 777,
        }}
        onClose={() => {
          setVisible(false);
        }}
        bodyStyle={{
          height: "40vh",
          zIndex: 777,
        }}
        maskStyle={{
          zIndex: 666,
        }}
      >
        数量{count}
      </Popup>
    </div>
  );
}

export default App;
