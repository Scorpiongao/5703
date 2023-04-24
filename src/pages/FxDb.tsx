import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, Col, List, message, Row, Select, Space, Statistic,} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, SearchOutlined} from '@ant-design/icons';
import VirtualList from 'rc-virtual-list';
import { Chart, Tooltip, Axis, Line, Point } from 'viser-react';
import axios from "axios";
import { Link , history } from "umi";
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

interface FXItem {
    symbol: string;
    price: string;

}


const ContainerHeight = 900;
const FxDb : React.FC = () => {
    const [datalist, setDatalist] = useState<FXItem[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/dashboard/currency-price-list");
                const data = await response.json();
                setDatalist(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    const [datachart1, setDatachart] = useState<{ year: string; value: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/dashboard/AUDtoCNY  ");
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
    const [page, setPage] = useState(1);
    const fetchData = async (page: number) => {
        try {
            const response = await fetch(`http://localhost:8080/dashboard/currency-price-list?page=${page}`);
            const data = await response.json();
            setDatalist((prevData) => [...prevData, ...data]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchData(1);
    }, []);
    const appendData = () => {
        setPage((prevPage) => prevPage + 1);
        fetchData(page + 1);
    };



    const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
            appendData();
        }
    };


    const [datanews, setDatatest] = useState<Array<{ href: string; title: string; avatar: string; content: string; }>>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/dashboard/news");
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
                const response = await fetch('http://localhost:8080/dashboard/cardAUDtoCNY ');
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
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/dashboard/currency-name');
            const data = await response.json();
            const formattedOptions = data.map(item => ({
                label: item.label,
                value: item.label,

            }));
            setOptions(formattedOptions);
        };

        fetchData();
    }, []);
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const handleSubmit = async () => {

        history.push('/FxDetial?option='+selectedOption1+'to'+selectedOption2);
    };




    //search

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
                            {(item:FXItem ) => (
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
                                options={options}
                                onChange={setSelectedOption1}
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
                                options={options}
                                onChange={setSelectedOption2}
                            />
                        </Col>
                        <Col>
                            <Button type="primary" icon={<SearchOutlined />} onClick={handleSubmit}>
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
export default FxDb ;