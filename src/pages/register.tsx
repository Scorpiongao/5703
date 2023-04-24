import React, { useState } from 'react';
import {Image, Layout, theme} from 'antd';
import {
    Avatar,
    Button,
    Checkbox,
    Col,
    Form,
    Input,
    Row,
    Select,
    Space,
    Typography
} from 'antd';
import yayJpg from "../../../../../src/assets/yay.jpg";
const { Title } = Typography;
const { Option } = Select;

interface DataNodeType {
    value: string;
    label: string;
    children?: DataNodeType[];
}


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Register: React.FC = () => {

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="61">+61</Option>
            </Select>
        </Form.Item>
    );

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);


    const { Header, Content, Footer } = Layout;
    return (

        <Layout className="layout">

            <Header>
                <div className="logo" />

            </Header>
            <Content style={{ padding: '0 50px' }}>

                <div className="site-layout-content" style={{ background: colorBgContainer }}>
                    <Row justify="center">
                        <Col span={8}></Col>
                        <Col span={8} >
                            <Row justify="center">
                                <Col span={5}>
{/*                                    <Image
                                        width={200}
                                        hight={200}
                                        src="yay.jpg" //这里改不行
                                    />*/}
                                </Col>
                                <p style={{ textAlign: 'center' }}>
                                    <img src={yayJpg} width={200} hight={200} />
                                </p>

                                <Col><Title level={2} italic={true} justify="center" style={{color: "#bae8e8"}}>Welcome to TraderWin!</Title></Col>
                            </Row>
                            <Form
                                {...formItemLayout}
                                form={form}
                                name="register"
                                onFinish={onFinish}
                                initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
                                style={{ maxWidth: 600 }}
                                scrollToFirstError
                            >
                                <Form.Item
                                    name="email"
                                    label={<span style={{fontSize: '16px'}}>E-mail</span>}
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label={<span style={{fontSize: '16px'}}>Password</span>}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    name="confirm"
                                    label={<span style={{fontSize: '16px'}}>Confirm Password</span>}
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    name="Username"
                                    label={<span style={{fontSize: '16px'}}>Username</span>}
                                    tooltip="Will be used for login"
                                    rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
                                >
                                    <Input />
                                </Form.Item>


                                <Form.Item
                                    name="phone"
                                    label={<span style={{fontSize: '16px'}}>Phone Number</span>}
                                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                                >
                                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                                </Form.Item>

                                <Form.Item
                                    name="gender"
                                    label={<span style={{fontSize: '16px'}}>Gender</span>}
                                    rules={[{ required: true, message: 'Please select gender!' }]}
                                >
                                    <Select placeholder="select your gender">
                                        <Option value="male">Male</Option>
                                        <Option value="female">Female</Option>
                                        <Option value="other">Other</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label={<span style={{fontSize: '16px'}}>Captcha</span>} extra="We must make sure that your are a human.">
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="captcha"
                                                noStyle
                                                rules={[{ required: true, message: 'Please input the captcha you got!' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Button style={{ backgroundColor: "#e3f6f5", color: "#272343", border: "none"  }}>Get captcha</Button>
                                        </Col>
                                    </Row>
                                </Form.Item>

                                <Form.Item
                                    name="agreement"
                                    valuePropName="checked"
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                        },
                                    ]}
                                    {...tailFormItemLayout}
                                >
                                    <Checkbox>
                                        I have read the <a href="@/pages/register">agreement</a>
                                    </Checkbox>
                                </Form.Item>
                                <Form.Item {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit" style={{ backgroundColor: "#bae8e8", color: "#272343", border: "none", fontSize: '16px' }}>
                                        Register
                                    </Button>
                                </Form.Item>

                                <Form.Item {...tailFormItemLayout}>
                                    <p style={{ fontSize: '18px' }}>
                                        Already have an account? <a href="/">Log in</a>
                                    </p>
                                </Form.Item>

                            </Form>
                        </Col>
                        <Col span={8}></Col>
                    </Row>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>CS28-2 ©2023 Created by G2 TEAM</Footer>
        </Layout>

    );
};

export default Register;