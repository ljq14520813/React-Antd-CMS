import React from 'react';
import routes from '@/routes';
import {
    Route,Switch,Redirect
}from 'react-router-dom';


export default class Content extends React.Component{
    createRoutes(){
        let res=[];

        function create(arr){
            arr.map(ele=>{
                res.push(
                    <Route 
                        exact
                        key={ele.id}
                        path={ele.path}
                        component={ele.component}
                    />
                )
                //  递归，条件是ele.children存在，否则再调用自己
                if(ele.children){
                    create(ele.children)
                }
                return null;
            })
        }

        //在这里调用递归，依次创建子路由，最后用Switch包裹
        routes.map(ele=>(
            create(ele.children)
        ))
        return res;
    }
    render(){
        return (
            <div className='jq-content'>
                <Switch>
                    {this.createRoutes()}
                    <Redirect from='/*' to='/home' />
                </Switch>
            </div>
        )
    }
}