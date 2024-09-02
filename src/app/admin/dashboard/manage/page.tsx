'use client'
import React, { useState } from 'react';
// import './index.css';
import ContentList from './_components/contentList';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Form, Input, Layout, Menu, Modal, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

export default function Dashboard() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Content style={{ margin: '0 16px' }}>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>所有记录</Breadcrumb.Item>
    </Breadcrumb>
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <ContentList setCollapsed={setCollapsed}></ContentList>
    </div>
    <Modal open={collapsed} onCancel={() => setCollapsed(false)}>
      <Form layout="vertical">
        <Form.Item label="标题">
          <Input />
        </Form.Item>
        <Form.Item label="内容">
          <Input.TextArea />
        </Form.Item>

      </Form>
    </Modal>
  </Content>

  )
}
