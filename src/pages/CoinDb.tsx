import React, {useEffect, useState} from 'react';
import {Avatar, Col, List, message, Row, Space,} from 'antd';
import {LikeOutlined, MessageOutlined, StarOutlined} from "@ant-design/icons-svg";
import VirtualList from 'rc-virtual-list';
import { Chart, Tooltip, Axis, Line, Point } from 'viser-react';
import * as $ from 'jquery';
const DataSet = require('@antv/data-set');

//chart
const datachart = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
];

const scale = [{
    dataKey: 'value',
    min: 0,
},{
    dataKey: 'year',
    min: 0,
    max: 1,
}];



//chart

interface UserItem {
    email: string;
    gender: string;
    name: {
        first: string;
        last: string;
        title: string;
    };
    nat: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
}

const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 900;
const CoinDb : React.FC = () => {

    //chart

    const [data, setData] = useState<UserItem[]>([]);

    const appendData = () => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((body) => {
                setData(data.concat(body.results));
                message.success(`${body.results.length} more items loaded!`);
            });
    };

    useEffect(() => {
        appendData();
    }, []);

    const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
            appendData();
        }
    };
    const data1 = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];
    const datatest = Array.from({ length: 23 }).map((_, i) => ({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: `https://joesch.moe/api/v1/random?key=${i}`,
        description:
            'Ant Design, a design language ',
        content:
            'We supply a series of design principles, practical .',
    }));


    return (
        <Row >
            <Col span={5}>

                <List size="large">
                    <VirtualList
                        data={data}
                        height={ContainerHeight}
                        itemHeight={30}
                        itemKey="email"
                        onScroll={onScroll}
                    >
                        {(item: UserItem) => (
                            <List.Item key={item.email}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.picture.large} />}
                                    title={<a href="https://ant.design">{item.name.last}</a>}
                                    description={item.email}
                                />

                            </List.Item>
                        )}
                    </VirtualList>
                </List>
            </Col>
            <Col span={11}>
                <Chart forceFit height={600} data={datachart} scale={scale}>
                    <Tooltip />
                    <Axis />
                    <Line position="year*value" />
                    <Point position="year*value" shape="circle"/>
                </Chart>

            </Col>
            <Col span={8}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 4,
                    }}
                    dataSource={datatest}
                    footer={
                        <div>

                        </div>
                    }
                    renderItem={(item) => (
                        <List.Item
                            key={item.title}
                            extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                />
                            }
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    );
};
export default CoinDb ;