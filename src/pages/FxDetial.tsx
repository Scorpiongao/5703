import { Chart, Tooltip, Axis, Line, Point } from 'viser-react';
import * as React from 'react';
import {Col, Row, Avatar, List, Statistic, Card,Dropdown, Space} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";
import type { MenuProps } from 'antd';
import { useLocation } from 'umi';



const datalist = [
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
const items: MenuProps['items'] = [
    {
        label: <a href="https://www.commbank.com.au/international/foreign-exchange-rates.html?ei=hp-prodnav_INT-FXrates">Common Wealth bank</a>,
        key: '0',
    },
    {
        label: <a href="https://www.nab.com.au/personal/international-banking/foreign-exchange-rates">Nab</a>,
        key: '1',
    },

    {
        label: <a href="https://www.anz.com.au/personal/travel-international/currency-converter/">Anz</a>,
        key: '2',
    },
    {
        label: <a href="https://www.hsbc.com.au/calculators/real-time-exchange-rates/">HSBC</a>,
        key: '3',
    },
    {
        label: <a href="https://www.aliyun.com"></a>,
        key: '4',
    },
];




const FxDetial: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get('title');
    const option= searchParams.get('option');
    // ... 获取地址栏参数的代码 ...
    const [cardtitle, setcardTitle] = useState('');
    const [rate, setValue] = useState(0);
    useEffect(() => {
        const sendData = async () => {
            await fetch('http://localhost:8080/dashboard/postsearch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ option }),
            });
        };

        if (option) {
            sendData();
        }
    }, [option]);

    // 获取数据
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/dashboard/searchcard');
                const data = await response.json();

                // Update this line to access the first element in the array
                const firstDataItem = data[0];

                setcardTitle(firstDataItem.title);
                setValue(firstDataItem.rate);
            }catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (option) {
            fetchData();
        }
    }, [option]);
    //获取返回值

    const [chartdata, setchartData] = useState<{ year: string; value: number }[]>([]);
    useEffect(() => {
        const sendData = async () => {
            await fetch('http://localhost:8080/dashboard/postsearch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ option }),
            });
        };

        if (option) {
            sendData();
        }
    }, [option]);

    // 获取数据
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/dashboard/searchchart");
                const data = await response.json();
                const chartData = processData(data);
                setchartData(chartData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (option) {
            fetchData();
        }
    }, [option]);

    const [loadings, setLoadings] = useState<boolean[]>([]);

    const enterLoading = (index: number) => {
        setLoadings((state) => {
            const newLoadings = [...state];
            newLoadings[index] = true;
            return newLoadings;
        });

        setTimeout(() => {
            setLoadings((state) => {
                const newLoadings = [...state];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 6000);
    };
    return(
        <Row gutter={24}>
            <Col span={16}>
                <Card bordered={false}>
                    <Statistic
                        title={cardtitle}
                        value={rate}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                    />
                </Card>
                <Chart forceFit height={750} data={chartdata} scale={scale}>
                    <Tooltip />
                    <Axis />
                    <Line position="year*value" />
                    <Point position="year*value" shape="circle"/>
                </Chart>
            </Col>
            <Col span={8}>
                <List
                    itemLayout="horizontal"
                    dataSource={datalist}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
                <Space direction="vertical">
                <Dropdown.Button
                    type="primary"
                    loading={loadings[0]}
                    menu={{ items }}
                    onClick={() => enterLoading(0)}
                >
                    Submit
                </Dropdown.Button>
                </Space>
            </Col>
        </Row>

    );

};
export default FxDetial;