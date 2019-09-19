<!--
 * @Author: coco-Tang
 * @Date: 2019-09-19 10:24:54
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-09-19 13:37:55
 * @Description: 地图组件
 -->
<template>
  <div class="module_Amap"></div>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "amap",
  components: {}
})
export default class Amap extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  // @Prop() private parentData!: any
  // @Emit('event_name') private handler() {}
  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */
  // @Getter private some_getter!: any
  // @Action private some_action!: () => void
  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  // private created() {}
  // private mounted() {}
  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  // private my_data: string = 'some thing' // data
  // get computed_data(): string { return 'computed' } // computed
  /* ------------------------ WATCH ------------------------ */
  // @Watch('some_thing') private some_thing_changed(val: any, oldVal: any) {}
  /* ------------------------ METHODS ------------------------ */
  // private some_method(): void {}
}
</script>

<style lang="less" scoped>
// @import '~@/assets/less/var'

.module_Amap {
}
</style>
