import React from 'react';
import { Menu } from 'antd';
import routes from '@/routes'
import {Link,withRouter} from 'react-router-dom';
import logo from '@/utils/img';


const { SubMenu } = Menu;

class Sider extends React.Component{
    rootSubmenuKeys = ['1', '2'];
    state={
        openKeys:['1']
    }
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };
    createMenuItem(children){
        if(children){
            return children.map(ele=>(
                <Menu.Item key={ele.id} icon={ele.icon}>
                    <Link to={ele.path} replace>
                        {ele.text}
                    </Link>
                </Menu.Item>
            ))
        }else{
            return 
        }
    }

    createNaves(){
        let arr=[];
        routes.map(ele=>(
            arr.push(
                <SubMenu key={ele.id} icon={ele.icon} title={ele.text}>
                    {this.createMenuItem(ele.children)}
                </SubMenu>
            )
        ));
        return arr;
    }
    goBack(){
        this.props.history.goBack();
    }
    render(){
        return (
            <div className='jq-sider'>
                <div className='jq-sider-logo'>
                    {/* <Link> */}
                        <img 
                            src={logo.logo}  
                            alt='logo加载失败'
                            onClick={this.goBack.bind(this)}
                        ></img>
                    {/* </Link> */}
                </div>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    mode="inline"
                    theme="dark"
                >
                    {this.createNaves()}
                </Menu>
            </div>
        )
    }
}

export default withRouter(Sider);
