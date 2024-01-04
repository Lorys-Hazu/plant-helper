import { Menu, MenuProps } from 'antd';
import { BorderOuterOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navItems: MenuProps["items"] = [
    {
      key: "tasks",
      label: <Link to="/tasks">Tasks</Link>,
      icon: <CheckCircleOutlined />,
    },
    {
      key: "plants",
      label: <Link to="/plants">Plants</Link>,
      icon: <BorderOuterOutlined />,
    }
  ]

  const keys = useLocation().pathname.split('/');

  return (
    <Menu
    mode="horizontal"
    style={{ width: '100%', justifyContent: 'center' }}
    selectedKeys={keys} 
    items={navItems} 
    />
  );
}

export default Navbar;