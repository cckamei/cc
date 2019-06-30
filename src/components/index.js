import header from './header'; //普通页面头部
import footer from './footer'; //首页底部导航
import headerGoods from './header-goods'; //商品详情页面头部
import headerMenus from './header-menus'; //右侧带按钮组的头部
import agreement from './agreement'; //T&C
import popupList from './popup-list'; //首页点开展开
import recommend from './recommend'; //推荐商品
import popupConfirm from './popup-confirm'; //页面中间弹框 使用v-model方式打开
import inputText from './input-text'; //文本输入框
import inputPwd from './input-pwd'; //密码输入框
import inputCode from './input-code'; //验证码
import inputRadio from './input-radio'; //单选列表
import slideUp from './slide-up'; //从底部上划弹框
import formInput from './form-input'; //带label的文本输入框
import formSelect from './form-select'; //从底部上划的单选列表 slideUp + inputRadio
import formDatepicker from './form-datepicker'; //从底部上划的日期选择 slideUp + dateTimePicker
import formSlideUp from './form-slide-up'; //带label的从底部上划弹框，弹框内容自定义 slideUp + slot
import buttonRadio from './button-radio'; //单选按钮组
import coupon from './coupon'; //优惠券
import menus from './menus'; //页面头部展开扩展按钮
import scrollTop from './scroll-top'; //快速回到页面顶部
import tabs from './tabs'; //选项卡
import message from './message'; //新消息提醒
import popupSelect from './popup-select'; //页面中间弹框单选列表（代替popupConfirm + inputRadio）
import popupConfirm2 from './popup-confirm2'; //页面中间弹框，使用refs.open方式打开 (代替popupConfirm)
import range from './mint-ui/range/index'; //拉杆
import splitTitle from './split-title'; //块分割线

export default {
  header,
  footer,
  headerGoods,
  headerMenus,
  agreement,
  popupList,
  recommend,
  popupConfirm,
  inputText,
  inputPwd,
  inputCode,
  inputRadio,
  slideUp,
  formInput,
  formSelect,
  formDatepicker,
  formSlideUp,
  buttonRadio,
  coupon,
  menus,
  scrollTop,
  tabs,
  message,
  popupSelect,
  popupConfirm2,
  range,
  splitTitle
};