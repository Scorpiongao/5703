import React from 'react';
import './index.less';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Avatar, Button, Checkbox, Col, Form, Input, Layout, Row, Select, Space, Tabs, theme, Typography} from 'antd';
import type { TabsProps } from 'antd';
import {Link, Outlet} from "umi";
const { Title } = Typography;



const { Header, Content, Footer } = Layout;


const HomePage : React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const onChange = (key: string) => {
        console.log(key);
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="61">+61</Option>
            </Select>
        </Form.Item>
    );


    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Account Password`,
            children: <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="register">register now!</a>
                    </Form.Item>
                </Form>,
        },
        {
            key: '2',
            label: `Phone number`,
            children:
                <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="register">register now!</a>
                </Form.Item>
            </Form>,
        },
    ];
    return (
        <Layout className="layout">

            <Header>
                <div className="logo" />

            </Header>
            <Content style={{ padding: '0 50px' }}>

                <div className="site-layout-content" style={{ background: colorBgContainer }}>
                    <Row justify="center">
                        <Col span={10}></Col>
                        <Col span={5}>
                            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                        </Col>
                        <Col span={9}></Col>
                    </Row>

                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>CS28-2 ©2023 Created by G2 TEAM</Footer>
        </Layout>

    );
};
export default HomePage ;