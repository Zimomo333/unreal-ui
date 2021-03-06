import UrButton from './button';
import UrCarousel from './carousel';
import UrCarouselItem from './carousel-item';
import UrInput from './input';
import UrTag from './tag';
import UrSelect from './select';
import UrOption from './option';
import UrBreadcrumb from './breadcrumb';
import UrBreadcrumbItem from './breadcrumb-item';
import UrRadio from './radio';
import UrRadioGroup from './radio-group';
import UrCheckbox from './checkbox';
import UrCheckboxGroup from './checkbox-group';
import UrPagination from './pagination';

// 存储组件列表
const components = [
  UrButton,
  UrCarousel,
  UrCarouselItem,
  UrInput,
  UrTag,
  UrSelect,
  UrOption,
  UrBreadcrumb,
  UrBreadcrumbItem,
  UrRadio,
  UrRadioGroup,
  UrCheckbox,
  UrCheckboxGroup,
  UrPagination,
];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return;
  // 遍历注册全局组件
  components.map((component) => Vue.component(component.name, component));
};

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  UrButton,
  UrCarousel,
  UrCarouselItem,
  UrInput,
  UrTag,
  UrSelect,
  UrOption,
  UrBreadcrumb,
  UrBreadcrumbItem,
  UrRadio,
  UrRadioGroup,
  UrCheckbox,
  UrCheckboxGroup,
  UrPagination,
};
