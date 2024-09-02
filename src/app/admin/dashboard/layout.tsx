'use client'
import React, { Children, useState  } from 'react';
// import './index.css';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { usePathname, useRouter } from 'next/navigation'

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    label,
    children,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('所有备忘录', '0', <PieChartOutlined />, ),
  getItem('添加备忘录', '1', <DesktopOutlined />, ),
];

const links = [
  '/admin/dashboard/manage',
  '/admin/dashboard/edit'
]

const content = [
  {
    title: 'Bill is a cat.',
    date: '2022-01-01',
    content: 'Bill is a cat. Bill is a cat. B'
  },
  {
    title: 'Bill is a cat.',
    date: '2022-01-01',
    content: 'Bill is a cat. Bill is a cat. B'
  }
]


const Dashboard: React.FC = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  let pathname = usePathname()
  let router = useRouter()
  console.log(pathname, links.indexOf(pathname))
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={
          [`${links.indexOf(pathname)}`]
          } mode="inline" items={items} 
          onClick={(info) => {
            router.push(links[+info.key])
          }} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} >
          <div className='flex h-full text-xl justify-center align-middle items-center'>
            <p>备忘录管理</p>
          </div>
        </Header>
        {children}
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};



export default Dashboard;