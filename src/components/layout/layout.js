import React from 'react';
import JQHeader from './header';
import JQAside from './sider';
import JQContent from './content';
import {withRouter} from 'react-router-dom';
import './style.scss'

import {Layout} from 'antd'
const {Header,Sider,Content} = Layout;



class AntdLayout extends React.Component{
    render(){
        return (
            <div className='jq-layout'>
                <Layout>
                    <Sider width='170'>
                        <JQAside />
                    </Sider>
                    <Layout>
                        <Header>
                            <JQHeader />
                        </Header>
                        <Content>
                            <JQContent />
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default withRouter(AntdLayout);