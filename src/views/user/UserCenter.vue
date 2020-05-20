<!--
 * @Author: coco-Tang
 * @Date: 2019-08-29 13:59:07
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-09-23 11:19:06
 * @Description: 
 -->
<template>
  <div class="module_UserCenter">
    <h3>个人中心</h3>
    <!-- <div class="wrapper">
      <ul class="content" id="content" ref="viewBox">
        <li v-for="(province) in arr" :key="province.provinceId">
          <div>{{province.provinceIdName}}</div>
          <div class="city" v-for="(city) in province.cities" :key="city.cityId">{{city.cityName}}</div>
        </li>
      </ul>
      <ul class="serach-index">
        <li v-for="(item, index) in search" :key="index">{{item}}</li>
      </ul>
    </div> -->
  </div>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import BScroll from "better-scroll";
import orderServices from "@/services/order";

@Component({
  name: "user",
  components: {}
})
export default class UserCenter extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  // @Prop() private parentData!: any
  // @Emit('event_name') private handler() {}
  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */
  // @Getter private some_getter!: any
  // @Action private some_action!: () => void
  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  private created() {}
  private async mounted() {
    let obj = this.$refs['viewBox'] as HTMLElement;
    console.log(obj.clientHeight);
    obj.addEventListener("scroll", () => {
      console.log(" scroll " + obj.scrollTop);
    });

    // this.arr = await orderServices.get_newslist_api();

    // 生成大写字母
    for (let key = 65; key < 91; key++) {
      this.search.push(String.fromCharCode(key));
    }
    // let scroll = new BScroll('.wrapper')
  }
  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  public arr: Array<any> = [
    {
      provinceId: "3",
      provinceIdName: "安徽",
      cities: [
        {
          cityId: "31",
          cityName: "合肥"
        },
        {
          cityId: "32",
          cityName: "宿州"
        },
        {
          cityId: "33",
          cityName: "淮北"
        },
        {
          cityId: "34",
          cityName: "亳州"
        },
        {
          cityId: "35",
          cityName: "阜阳"
        },
        {
          cityId: "36",
          cityName: "蚌埠"
        },
        {
          cityId: "37",
          cityName: "淮南"
        },
        {
          cityId: "38",
          cityName: "滁州"
        },
        {
          cityId: "39",
          cityName: "六安"
        },
        {
          cityId: "391",
          cityName: "马鞍山"
        },
        {
          cityId: "392",
          cityName: "芜湖"
        },
        {
          cityId: "393",
          cityName: "宣城"
        },
        {
          cityId: "394",
          cityName: "铜陵"
        },
        {
          cityId: "395",
          cityName: "池州"
        },
        {
          cityId: "396",
          cityName: "安庆"
        },
        {
          cityId: "397",
          cityName: "黄山"
        }
      ]
    },
    {
      provinceId: "2",
      provinceIdName: "江苏",
      cities: [
        {
          cityId: "21",
          cityName: "南京"
        },
        {
          cityId: "22",
          cityName: "苏州"
        },
        {
          cityId: "23",
          cityName: "无锡"
        },
        {
          cityId: "24",
          cityName: "常州"
        },
        {
          cityId: "25",
          cityName: "镇江"
        },
        {
          cityId: "26",
          cityName: "扬州"
        },
        {
          cityId: "27",
          cityName: "南通"
        },
        {
          cityId: "320300",
          cityName: "徐州"
        },
        {
          cityId: "320700",
          cityName: "连云港"
        },
        {
          cityId: "320800",
          cityName: "淮安"
        },
        {
          cityId: "320900",
          cityName: "盐城"
        },
        {
          cityId: "321200",
          cityName: "泰州"
        },
        {
          cityId: "321300",
          cityName: "宿迁"
        }
      ]
    },
    {
      provinceId: "1",
      provinceIdName: "上海",
      cities: [
        {
          cityId: "11",
          cityName: "黄浦区"
        },
        {
          cityId: "12",
          cityName: "静安区"
        },
        {
          cityId: "13",
          cityName: "浦东新区"
        },
        {
          cityId: "14",
          cityName: "嘉定区"
        },
        {
          cityId: "15",
          cityName: "青浦区"
        },
        {
          cityId: "16",
          cityName: "普陀区"
        },
        {
          cityId: "17",
          cityName: "奉贤区"
        }
      ]
    },
    {
      provinceId: "4",
      provinceIdName: "浙江",
      cities: [
        {
          cityId: "401",
          cityName: "杭州"
        },
        {
          cityId: "402",
          cityName: "宁波"
        },
        {
          cityId: "403",
          cityName: "温州"
        },
        {
          cityId: "404",
          cityName: "绍兴"
        },
        {
          cityId: "405",
          cityName: "湖州"
        },
        {
          cityId: "406",
          cityName: "嘉兴"
        },
        {
          cityId: "407",
          cityName: "金华"
        },
        {
          cityId: "408",
          cityName: "衢州"
        },
        {
          cityId: "409",
          cityName: "舟山"
        },
        {
          cityId: "410",
          cityName: "台州"
        },
        {
          cityId: "411",
          cityName: "丽水"
        }
      ]
    }
  ]; // data
  private search: Array<string> = [];
  // get computed_data(): string { return 'computed' } // computed
  /* ------------------------ WATCH ------------------------ */
  // @Watch('some_thing') private some_thing_changed(val: any, oldVal: any) {}
  /* ------------------------ METHODS ------------------------ */
  // private some_method(): void {}
}
</script>

<style lang="less" scoped>
// @import '~@/assets/less/var'

.module_UserCenter {
  height: 100%;
  .wrapper {
    padding: 0 20px;
    display: flex;
    height: 100%;
    background-color: #ccc;
    justify-content: space-between;
    .content {
      overflow: scroll;
    }
    .city {
      padding-left: 20px;
    }
  }
}
</style>
