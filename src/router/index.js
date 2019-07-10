import Vue from 'vue'
import Router from 'vue-router'
// 路由懒加载
const Home = () => import('@/views/home/index');
const ShopList = () => import('@/views/shopList/index');
const ShopDetail = () => import('@/views/shopList/shopDetail');
const AttendanceRecords = () => import('@/views/attendance/index');
const Message = () => import('@/views/message/index');
const ResourceHome = () => import('@/views/resource/index');
const ResourceList = () => import('@/views/resource/list');
const ResourceDetail = () => import('@/views/resource/detail');
const ResourceRenewalFee = () => import('@/views/resource/renewalFee');
const PaySuccess = () => import('@/views/resource/success');
const ResourceInstroduct = () => import('@/views/resource/instroduct');
const GeneralIntroduct = () => import('@/views/resource/generalIntroduct');
const FindDetail = () => import('@/views/findDetail/index');
const AgentHome = () => import('@/views/agent/index');
const AgentIntro = () => import('@/views/agent/agentIntro');
const AgentApply = () => import('@/views/agent/applyAgent');
const AgentSetting = () => import('@/views/agent/agentSetting');
const ProductDetail = () => import('@/views/share/productDetail'); //产品详情页分享
const CourseDetail = () => import('@/views/share/courseDetail'); //课程详情页分享
const RecruitDetail = () => import('@/views/share/recruitDetail'); //招聘详情页分享
const ShopHome = () => import('@/views/share/shopHome'); //店铺首页分享分享
const MerchantProtocol = () => import('@/views/protocol/merchantProtocol'); //商家协议
const PrivacyProtocol = () => import('@/views/protocol/privacyProtocol'); //隐私协议
const UserProtocol = () => import('@/views/protocol/userProtocol'); //用户协议
const GroupRule = () => import('@/views/protocol/groupRule'); //团购活动规则

// import Home from '@/views/home/index'
// import ShopList from '@/views/home/index'
// import ShopDetail from '@/views/home/index'
// import AttendanceRecords from '@/views/home/index'
// import Message from '@/views/home/index'
// import ResourceHome from '@/views/resource/index'
// import ResourceList from '@/views/resource/list'
// import ResourceDetail from '@/views/resource/detail'
// import ResourceRenewalFee from '@/views/resource/renewalFee'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/shopList',
      name: 'ShopList',
      component: ShopList
    },
    {
      path: '/shopDetail',
      name: 'ShopDetail',
      component: ShopDetail
    },
    {
      path: '/attendanceRecords',
      name: 'AttendanceRecords',
      component: AttendanceRecords
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/resourceHome',
      name: 'ResourceHome',
      component: ResourceHome
    },
    {
      path: '/resourceList',
      name: 'ResourceList',
      component: ResourceList
    },
    {
      path: '/resourceDetail',
      name: 'ResourceDetail',
      component: ResourceDetail
    },
    {
      path: '/paySuccess',
      name: 'PaySuccess',
      component: PaySuccess
    },
    {
      path: '/resourceInstroduct',
      name: 'ResourceInstroduct',
      component: ResourceInstroduct
    },
    {
      path: '/resourceRenewalFee',
      name: 'ResourceRenewalFee',
      component: ResourceRenewalFee
    },
    {
      path: '/agentHome',
      name: 'AgentHome',
      component: AgentHome
    },
    {
      path: '/agentIntro',
      name: 'AgentIntro',
      component: AgentIntro
    },
    {
      path: '/agentApply',
      name: 'AgentApply',
      component: AgentApply
    },
    {
      path: '/findDetail',
      name: 'FindDetail',
      component: FindDetail
    },
    {
      path: '/agentSetting',
      name: 'AgentSetting',
      component: AgentSetting
    },
    {
      path: '/productDetail',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/courseDetail',
      name: 'CourseDetail',
      component: CourseDetail
    },
    {
      path: '/recruitDetail',
      name: 'RecruitDetail',
      component: RecruitDetail
    },
    {
      path: '/shopHome',
      name: 'ShopHome',
      component: ShopHome
    },
    {
      path: '/merchantProtocol',
      name: 'MerchantProtocol',
      component: MerchantProtocol
    },
    {
      path: '/privacyProtocol',
      name: 'PrivacyProtocol',
      component: PrivacyProtocol
    },
    {
      path: '/userProtocol',
      name: 'UserProtocol',
      component: UserProtocol
    },
    {
      path: '/groupRule',
      name: 'GroupRule',
      component: GroupRule
    }
  ]
})
