import React from 'react';
import loadable from '@loadable/component';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
  } from '@ant-design/icons';

const Home = loadable(()=>import('./system/home'));
const Analyze = loadable(()=>import('./system/analyze'));
const GoodAdd = loadable(()=>import('./good/goodAdd'));
const GoodList = loadable(()=>import('./good/goodList'));

const routes=[
    {
        id:1,
        text:'系统概况',
        icon:<AppstoreOutlined/>,
        children:[
            {
                id:11,
                text:'首页概况',
                path:'/home',
                component:Home,
                icon:<MenuUnfoldOutlined />
            },
            {
                id:12,
                text:'数据分析',
                path:'/analyze',
                component:Analyze,
                icon:<MenuFoldOutlined />
            }
        ]
    },
    {
        id:2,
        text:'商品管理',
        icon:<PieChartOutlined />,
        children:[
            {
                id:21,
                text:'商品列表',
                path:'/goodList',
                component:GoodList,
                icon:<MenuFoldOutlined />,
                children:[
                    {
                        id:2101,
                        text:'商品新增',
                        path:'/goodList/goodAdd',
                        component:GoodAdd,
                        icon:<MenuFoldOutlined />
                    },
                ]
            }
        ]
    }
]

export default routes;