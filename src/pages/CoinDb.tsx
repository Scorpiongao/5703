import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, Col, Input, List, message, Row, Select, Space, Statistic,} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined,SearchOutlined } from '@ant-design/icons';
import VirtualList from 'rc-virtual-list';
import { Chart, Tooltip, Axis, Line, Point } from 'viser-react';
import queryString from 'query-string';
import { Link } from 'umi';
import * as $ from 'jquery';
import {print} from "jest-util";
import {array} from "@umijs/utils/compiled/zod/lib";
const DataSet = require('@antv/data-set');

//chart

const scale = [{
    dataKey: "value",
    nice:"ture"
},{
    dataKey: "year",
    type:"time",
    nice:"ture"
}];

const processData = (data: Record<string, string>) => {
    return Object.entries(data).map(([year, value]) => ({
        year,
        value: parseFloat(value),
    }));
};



//chart

interface CoinItem {
    symbol: string;
    price: string;

}

interface CardItem{
    title:string;
    rate:number;
}

// const fakeDataUrl =
//     'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 900;
const CoinDb : React.FC = () => {
    const [datachart1, setDatachart] = useState<{ year: string; value: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/dashboard/BTCtoUSDT");
                const data = await response.json();
                const chartData = processData(data);
                setDatachart(chartData);
                //setDatachart(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    //chart

    const [datalist, setData] = useState<CoinItem[]>([]);
    useEffect(() => {
        const fetchDatalist = async () => {
            try {
                const response = await fetch("http://localhost:8080/dashboard/getPrice   ");
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDatalist();
    }, []);



    const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop <= ContainerHeight + 20) {
            appendData();
        }
    };

//list
        useEffect(() => {
            const parsedQuery = queryString.parse(location.search);
            const title = parsedQuery.title as string;

            if (title) {
                // 使用 `title` 查询参数发起 API 请求，获取相关数据
                fetchData(title);
            }

        }, []);

    const fetchData = async (title: string) => {
        try {
            const response = await fetch(`http://your-api-url/your-endpoint?title=${title}`);
            const data = await response.json();

            // 更新组件状态，例如：
            // setData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const [datanews, setDatatest] = useState<Array<{ href: string; title: string; avatar: string; content: string; }>>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/dashboard/news-cypto");
                const data = await response.json();
                setDatatest(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const [title, setTitle] = useState('');
    const [rate, setValue] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/dashboard/card  ');
                const data = await response.json();

                // Update this line to access the first element in the array
                const firstDataItem = data[0];

                setTitle(firstDataItem.title);
                setValue(firstDataItem.rate);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const getStyleAndIcon = (value: number) => {
        if (value >= 0) {
            return {
                color: '#3f8600',
                icon: <ArrowUpOutlined />,
            };
        } else {
            return {
                color: '#cf1322',
                icon: <ArrowDownOutlined />,
            };
        }
    };

    const { color, icon } = getStyleAndIcon(rate);


    return (
        <Row >
            <Col span={6}>
                <div style={{ padding: '12px' }}>
                <List size="large">
                    <VirtualList
                        data={datalist}
                        height={ContainerHeight}
                        itemHeight={25}
                        itemKey="email"
                        onScroll={onScroll}
                    >
                        {(item: CoinItem) => (
                            <List.Item key={item.symbol}>
                                <List.Item.Meta
                                    // avatar={<Avatar src={item.picture.large} />}
                                    title={<Link to={`/CoinDetial?title=${item.symbol}`}>{item.symbol}</Link>}
                                    description={item.price}
                                />

                            </List.Item>
                        )}
                    </VirtualList>
                </List>
                </div>
            </Col>
            <Col span={10}>
                <div style={{ padding: '24px' }}>
                <Row gutter={[24,24]} align='middle' justify='center'>
                    <Col>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={[
                                {
                                    value: '1',
                                    label: 'Not Identified',
                                },
                                {
                                    value: '2',
                                    label: 'Closed',
                                },
                                {
                                    value: '3',
                                    label: 'Communicated',
                                },
                                {
                                    value: '4',
                                    label: 'Identified',
                                },
                                {
                                    value: '5',
                                    label: 'Resolved',
                                },
                                {
                                    value: '6',
                                    label: 'Cancelled',
                                },
                            ]}
                        />
                    </Col>

                    <Col>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={[
                                {
                                    value: '1',
                                    label: 'Not Identified',
                                },
                                {
                                    value: '2',
                                    label: 'Closed',
                                },
                                {
                                    value: '3',
                                    label: 'Communicated',
                                },
                                {
                                    value: '4',
                                    label: 'Identified',
                                },
                                {
                                    value: '5',
                                    label: 'Resolved',
                                },
                                {
                                    value: '6',
                                    label: 'Cancelled',
                                },
                            ]}
                        />
                    </Col>
                    <Col>
                        <Button type="primary" icon={<SearchOutlined />}>
                            Search
                        </Button>
                    </Col>

                </Row>
                </div>
                <Card bordered={false}>
                    <Statistic
                        title={title}
                        value={rate}
                        precision={2}
                        valueStyle={{ color }}
                        prefix={icon}
                        suffix="%"
                    />
                </Card>
                {/*<Chart forceFit height={750} data={data} scale={scale}>*/}
                {/*    <Tooltip />*/}
                {/*    <Axis />*/}
                {/*    <Line position="year*value" />*/}
                {/*    <Point position="year*value" shape="circle"/>*/}
                {/*</Chart>*/}
                <div style={{ padding: '8px' }}>
                <Chart forceFit height={600} data={datachart1} scale={scale}>
                    <Tooltip />
                    <Axis />
                    <Line position="year*value" />
                    <Point position="year*value" shape="circle"/>
                </Chart>
                </div>
            </Col>
            <Col span={8}>
                <div style={{ padding: '24px' }}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={datanews}
                    footer={
                        <div>

                        </div>
                    }
                    renderItem={(item) => (
                        <List.Item

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
                </div>
            </Col>
        </Row>
    );
};
export default CoinDb ;