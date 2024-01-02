import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Tasks from "./views/Tasks";
import { Menu, MenuProps } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const App = () => {
  if (window.location.pathname === '/') {
    window.location.pathname = '/tasks';
  }

  const [current, setCurrent] = useState<string>('tasks');

  const navItems: MenuProps["items"] = [
    {
      key: "tasks",
      label: "Tasks",
      icon: <CheckCircleOutlined />,
    }
  ]

  const onClick: MenuProps['onClick'] = (e) => {

    setCurrent(e.key);
  };


  return (
    <Router>
      <div>
        <Menu mode="horizontal" selectedKeys={[current]} items={navItems} onClick={onClick}/>
        <Routes>
          <Route 
            path="/tasks"
            element={<Tasks />}
          />
        </Routes>
      </div>
    </Router>
  )
}
export default App
