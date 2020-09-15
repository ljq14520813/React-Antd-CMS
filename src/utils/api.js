import axios from './fetch';

function fetchUsers(params){
    return axios({
        url:'/users/all',
        method:'GET',
        params
    })
}

//登录
function fetchLogin(data){
    return axios({
        url:'users//cms/login',
        method:'POST',
        data
    })
}



//获取所有品类
function fetchAllCates(params){
    return axios({
        url:'/cates/all',
        method:'GET',
        params
    })
}
//添加修改商品
function fetchAddGoods(data){
    return axios({
        url:'/goods/updateGoods',
        method:'POST',
        data
    })
}
//获取商品详情
function fetchGoodsDetail(params){
    return axios({
        url:'/goods/detail',
        method:'GET',
        params
    })
}
//获取商品列表
function fetchGoodsList(params){
    return axios({
        url:'/goods/list',
        method:'GET',
        params
    })
}
//删除商品
function fetchDelGoods(data){
    return axios({
        url:'/goods/delGoods',
        method:'POST',
        data
    })
}
//  获取排名
function fetchRank(params){
    return axios({
        url:'/goods/rank',
        method:'GET',
        params
    })
}

export {
    fetchUsers,
    fetchLogin,
    fetchAllCates,
    fetchAddGoods,
    fetchGoodsDetail,
    fetchDelGoods,
    fetchGoodsList,
    fetchRank
}