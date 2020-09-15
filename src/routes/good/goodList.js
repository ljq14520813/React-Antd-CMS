import React from 'react';


import {connect} from 'react-redux';
import {
    Table,
    Row,
    Col,
    DatePicker,
    Modal, 
    message,
    Button
} from 'antd';
import {
    // fetchAllCates
    // fetchAddGoods,
    fetchDelGoods
} from '@/utils/api';
import {time} from '@/utils/time';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {getGoodsList} from '@/store/actions/goodAction';
import CateSelect from '@/components/common/cateSelect';
import './style.scss';



const { confirm } = Modal;
const { RangePicker } = DatePicker;


class GoodList extends React.Component{
    columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            key:'name',
            align:'center',
            width:'20%',
            render:(text,record,index)=>(
                <div className='col-first'>
                    <img 
                        src={'http://localhost:9999'+record.img} 
                        alt={record.name}
                        className='table-col-img'
                    ></img>
                    <div>{text}</div>
                </div>
            )
            // sorter: true,
            // render: name => `${name.first} ${name.last}`,
            // width: '20%',
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
            key:'desc',
            align:'center'
            // filters: [
            //     { text: 'Male', value: 'male' },
            //     { text: 'Female', value: 'female' },
            // ],
            // width: '20%',
        },
        {
            title: '商品价格',
            dataIndex: 'price',
            key:'price',
            align:'center',
            render:text=>`${text}元`
        },
        {
            title:'商品品类',
            dataIndex:'cate',
            key:'cate',
            align:'center',
            render:text=>{
                // console.log(this);
                // let {cateArr} = this.state;
                // console.log(cateArr);
                switch(text){
                    case 'digital':return '手机数码';
                    case 'electric':return '电气设备';
                    case 'mother':return '母婴用品';
                    case 'clothes':return '休闲衣物';
                    default:return text;
                }
            }
        },
        {
            title:'是否热销',
            dataIndex:'hot',
            key:'hot',
            align:'center',
            render:text=>text?'是':'否'
        },
        {
            title:'排名',
            dataIndex:'rank',
            key:'rank',
            align:'center'
        },
        {
            title:'上架时间',
            dataIndex:'create_time',
            key:'create_time',
            align:'center',
            render:text=>time(text)
        },
        {
            title:'操作栏',
            dataIndex:'handle',
            key:'handle',
            align:'center',
            render:(text,record,index)=>(
                <div className='col-last'>
                    <span onClick={this.deleteConfirm.bind(this,record._id)}>删除</span>
                    <span onClick={this.edit.bind(this,record._id)}>编辑</span>
                </div>
            )
        }
    ];



    state = {
        // cateArr:[],
        pagination: {
            current: 1,//current
            pageSize: 2,//pageSize
            defaultPageSize:2,
            showSizeChanger:true,
            pageSizeOptions:[1,2,3,4,5],
            showQuickJumper :true,
            // hideOnSinglePage:true,
            showTotal:total => `共${total}条 `,
            total:0
        },
        filters:{
            cate:'',
            page:1,
            size:2
        },
        loading: false,
    };

    componentDidMount(){
        this.init();
        // fetchAllCates({}).then(res=>{
        //     this.setState({cateArr:res.data});
        // })
    }
    cateFilter(cate){
        this.setState({
            pagination:{
                ...this.state.pagination,
                current:1
            },
            filters:{
                ...this.state.filters,
                page:1,
                cate
            }
        },()=>{
            // console.log('过滤器',this.state.filters);
            this.init()
        })
    }
    dateFilter(time){
        console.log(time);//打印两个moment对象
        //  2020-08-01 12:00:00格式
        let startTime = time[0].format('YYYY-MM-DD HH:mm:ss');
        //  时间戳  1094515746511
        let endTime = time[1].valueOf();
        console.log(startTime,endTime);
    }
    deleteConfirm(_id){
        confirm({
            title: '提示！',
            icon: <ExclamationCircleOutlined />,
            content: '你确定要删除这条商品么？',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            // onOk:this.delYes.bind(this,_id),
            onOk:()=>{
                return new Promise((resolve, reject) => {
                    fetchDelGoods({_id}).then(res=>{
                        if(res.err===0){
                            this.init();
                            resolve();
                        }
                        else{reject()}
                    })
                }).catch(() => console.log('删除失败'));
                // console.log('删除',_id);
            },
            onCancel() {
                message.info('已取消操作');
                // console.log('取消');
            },
        })
    }
    edit(_id){
        // console.log('编辑',_id);
        this.props.history.push('/goodList/goodAdd?_id='+_id)
    }
    skipToAdd(){
        // console.log('跳转到新增页面')
        //了解路由传参
        this.props.history.push('/goodList/goodAdd')
    }
    handleTableChange(val){
        //方法1
        this.setState({
            filters:{
                ...this.state.filters,
                page:val.current,
                size:val.pageSize
            }
        },()=>{
            // console.log(val);
            this.init(val);
        })
        //方法2--->但是不能设置loading
        // let {filters} = this.state;
        // filters.page = val.current;
        // filters.size = val.pageSize;
        // this.props.getGoodsList(filters);

        // this.props.getGoodsList(filters).then(()=>{
        //     this.setState({
        //         pagination:{
        //             ...this.state.pagination,
        //             ...e,
        //             total:this.props.total
        //         }
        //     })
        // })
        // console.log(val);
    }
    init(val){
        let {filters} = this.state;
        this.setState({loading:true});
        // console.log(this.props.getGoodsList(filters));
        this.props.getGoodsList(filters).then(()=>{
            this.setState({
                loading:false,
                pagination:{
                    ...this.state.pagination,
                    ...val,
                    total:this.props.total
                }
            });
        })
        // console.log(this.state.pagination);
    }
    render(){
        let {pagination,loading} = this.state;
        let {filters} = this.state;
        let {goodArr} = this.props;
        // console.log(goodArr.length);
        return (
            <div className='jq-good-goodAdd'>
                <h1>商品列表</h1>
                <div className='list-choose'>
                <Row align='middle'>
                    <Col span={2}>选择品类：</Col>
                    <Col span={8}>
                        <CateSelect value={filters.cate} all onChange={this.cateFilter.bind(this)} />
                    </Col>
                    <Col span={2} offset={2}>选择时间</Col>
                    <Col span={6}>
                        <RangePicker showTime onChange={this.dateFilter.bind(this)} />
                    </Col>
                    <Col span={2} offset={2}>
                        <Button type="primary" onClick={this.skipToAdd.bind(this)}>商品新增</Button>
                    </Col>
                </Row>
                </div>
                <div>
                    <Table
                        columns={this.columns}
                        rowKey={record => record._id}
                        dataSource={goodArr}
                        pagination={goodArr.length!==[]&&pagination}
                        loading={loading}
                        onChange={this.handleTableChange.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(store){
    return {
        goodArr:store.good.list,
        total:store.good.total
    }
}

function mapActionToProps(dispatch){
    return {
       getGoodsList:params=>dispatch(getGoodsList(params))
    }
}

export default connect(mapStateToProps,mapActionToProps)(GoodList);