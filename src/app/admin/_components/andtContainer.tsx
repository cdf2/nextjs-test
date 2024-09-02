'use client'
import React, { useState } from 'react';
import { ConfigProvider, DatePicker, message } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import zhCN from 'antd/locale/zh_CN';

// dayjs.locale('zh-cn');

export function AndtContainer({children}: any) {
    return (
        <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
    )
}