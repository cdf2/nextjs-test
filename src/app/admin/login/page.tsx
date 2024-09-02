'use client'


import { Card, Form, Input, Button, InputRef } from 'antd';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useRef } from 'react';
import { CodeType, LoginResponseData } from '../(datatype)/datatype';

export default function LoginPage() {
    const usernameRef = useRef<InputRef>(null);
    const passwordRef = useRef<InputRef>(null);
    const router = useRouter();
    const onClick = () => {
        let username = usernameRef.current?.input?.value;
        let password = passwordRef.current?.input?.value;
        if (!username || !password) {
            alert('用户名或密码不能为空');
            return;
        }
        axios({
            method: 'POST',
            data: {
                username: username,
                password: password
            },
            url: '/api/login',
        }).then(res => {
            if (res?.data) {
                let data = res.data as LoginResponseData; 
                // 登录成功，跳转到后台管理页面
                if (CodeType.SUCCESS === data.code){
                    router.push('/admin/dashboard/manage');
                }
                else{
                    alert('登录失败，请检查用户名或密码');
                }
            } 
        }).catch(err => {
            alert('登录失败');
            console.log(err);
        });
    }
    return (
        <div className='login-form'>
            <Card title='全栈管理后台' className='w-4/5 mx-auto my-20'> 
                <Form.Item name='用户名' rules={[{ required: true, message: '请输入用户名!' }]}>
                    <Input ref={usernameRef} placeholder='请输入用户名' />
                </Form.Item>
                <Form.Item name='密码' rules={[{ required: true, message: '请输入密码!' }]}>
                    <Input.Password ref={passwordRef} placeholder='请输入密码' />
                </Form.Item>
                <div>
                    <Form.Item  className="flex flex-col items-center justify-center">
                        <Button type='primary' onClick={onClick} htmlType='submit'>登录</Button>
                    </Form.Item>
                </div>
            </Card>
        </div>
    )
}