import logo from "../asset/logo.svg";
import loader from "../asset/loading.gif";
import minicart from "../asset/minicart.svg";
import productThumb from "../asset/image.jpg";
const MagentoConfig = {
  logo: logo,
  loader: loader,
  thumb: productThumb,
  minicartLogo: minicart,
  baseUrl: window.location.origin,
  url: "http://ee24.local:8800/rest",
  mediaUrl: "http://ee24.local:8800/media/",
  home_cms_block_id: "22",
  store: "default",
  authentication: {
    integration: {
      access_token: "k0c1lkrs2umv0j6omqu1u60v6lg4v4z2",
    },
  },
  reviewEnabled: false,
  api: {
    cmsblock: `/V1/cmsBlock/`,
    menu: "/V1/categories",
    registration: "/V1/customers",
    token: "/V1/integration/customer/token",
    category: "/V1/products?",
    product: "/V1/products/",
    quote: {
      cart: "/V1/carts/mine",
      addtocart: "/V1/carts/mine/items",
      totals: "/V1/carts/mine/totals",
    },
    checkout: {
      shipping: {
        methods: "/V1/carts/mine/estimate-shipping-methods",
        address: "/V1/carts/mine/shipping-information",
      },
      payment: {
        methods: "/V1/carts/mine/shipping-information",
      },
    },
  },
};
export default MagentoConfig;
