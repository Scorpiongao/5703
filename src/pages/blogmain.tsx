import * as React from 'react';
import {Col, Row, Avatar, List, Statistic, Card, Space, FloatButton} from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";

const blogmain: React.FC = () => {




    const [datablog, setDatatest] = useState<Array<{ title: string; description: string; content: string;  }>>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/blog/view/findAllBlogs", {
                    headers: {
                        'token': `${token}` // 添加token到请求头
                    }
                });

                const data = await response.json();
                setDatatest(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    return(
        <Row>
            <Col span={4}>

            </Col>
            <Col span={16}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 4,
                    }}
                    dataSource={datablog}

                    renderItem={(item) => (
                        <List.Item

                        >
                            <List.Item.Meta
                                title={<a >{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
                <FloatButton tooltip={<div>Write Blog</div>} href={'/BlogWrite'}/>
            </Col>
            <col span={4}>

            </col>
        </Row>

    );

};
export default blogmain;