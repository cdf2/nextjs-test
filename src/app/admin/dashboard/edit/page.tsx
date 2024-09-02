'use client'
import React, { LegacyRef, useRef, useState } from 'react';
import { Breadcrumb, Card, Space, theme, Input, Typography, Button } from 'antd';
import { Layout } from 'antd';
import axios from 'axios';
import { AddMemoResponseData, CodeType } from '../../(datatype)/datatype';
import TextArea, { TextAreaRef } from 'antd/lib/input/TextArea';

const { Header, Content, Footer, Sider } = Layout;
const ContentEditor: React.FC = () => {
    const [value, setValue] = useState('');
    const titleRef = useRef<TextAreaRef>(null);
    const contentRef = useRef<TextAreaRef>(null);
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { };
    const onClick = () => {
        const title = titleRef.current?.resizableTextArea?.textArea?.value;
        const content = contentRef.current?.resizableTextArea?.textArea?.value;
        if (!title || !content){
            alert('标题或内容不能为空');
            return;
        }
        axios({
            method: 'POST',
            data: {
                title,
                content
            },
            url: '/api/memo',
        }).then(res => {
            if (res?.data) {
                console.log(res.data);
                let data = res.data as AddMemoResponseData; 
                // 登录成功，跳转到后台管理页面
                if (CodeType.SUCCESS === data.code){
                    alert('添加成功');
                }
                else{
                    alert('添加失败');
                }
            } 
        }).catch(err => {
            alert('添加失败');
            console.log(err);
        });
     };
    return (

        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>编辑器</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <div className='flex flex-col justify-center items-center gap-4'>
                    <p className='font-bold text-xl'>标题</p>
                    <TextArea ref={titleRef} placeholder="输入标题" autoSize />
                    <p className='font-bold text-xl'>内容</p>
                    <TextArea
                        ref={contentRef}
                        showCount
                        maxLength={150}
                        onChange={onChange}
                        placeholder="disable resize"
                        style={{ height: 120, resize: 'none' }}
                    />
                    <Button type='primary' onClick={onClick} htmlType='submit'>提交</Button>
                </div>
            </div>
        </Content>
    );

};



export default ContentEditor;