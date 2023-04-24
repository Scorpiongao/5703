import * as React from 'react';
import { Chart, Tooltip, Axis, Line, Point } from 'viser-react';
import {Col, Row, Avatar, List, Statistic, Card} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";

const CoinDetial: React.FC = () => {
    const data = [
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
        dataKey: 'value',
        min: 0,
    },{
        dataKey: 'year',
        min: 0,
        max: 1,
    }];
    interface CoinDetailParams {
        symbol: string;
    }

// ...

    return(
       <Row>
           <Col span={16}>
               <Card bordered={false}>
                   <Statistic
                       title="Active"
                       value={11.28}
                       precision={2}
                       valueStyle={{ color: '#3f8600' }}
                       prefix={<ArrowUpOutlined />}
                       suffix="%"
                   />
               </Card>
               <Chart forceFit height={750} data={data} scale={scale}>
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

           </Col>
       </Row>

    );

};
export default CoinDetial;