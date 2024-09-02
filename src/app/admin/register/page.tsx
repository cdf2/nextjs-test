'use client'


import { Card, Form, Input, Button, Space, InputRef } from 'antd';
import React, { useRef } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import axios from 'axios';


export default function RegisterPage() {
    let router = useRouter();
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const usernameRef = useRef<InputRef>(null);
    const passwordRef = useRef<InputRef>(null);
    const confirmPasswordRef = useRef<InputRef>(null);
    const postData =  (data: any) => {
        axios({
            method: 'POST',
            data: data,
            url: '/api/register',
        }).then(res => {
            if (res.data) {
                alert('注册成功');
                // router.push('/admin/login');
            } 
        }).catch(err => {
            alert('注册失败');
            console.log(err);
        });
    };
    const onClick = () => {
        let username = usernameRef.current?.input?.value;
        let password = passwordRef.current?.input?.value;
        let confirmPassword = confirmPasswordRef.current?.input?.value;
        if (password !== confirmPassword) {
            alert('两次密码输入不一致');
        }
        else{
            postData({
                username: username,
                password: password
            });
        }
    }
    return (
        <div className=' '>
            <Card title='全栈管理后台' className=' flex flex-col w-4/5 mx-auto my-20 '>
                <Input placeholder="请输入用户名" ref = {usernameRef} prefix={<UserOutlined />} />
                <br /><br />
                <Input.Password
                    ref = {passwordRef}
                    placeholder="请输入密码"
                    visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                />
                <br /><br />
                <Input.Password
                    ref = {confirmPasswordRef}
                    placeholder="请输入确认密码"
                    visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                />
                <br /><br />
                <div>
                    <Form.Item className="flex flex-col items-center justify-center">
                        <Button type='primary' onClick={onClick} htmlType='submit'>登录</Button>
                    </Form.Item>
                </div>
            </Card>
        </div>
    )
}