// 控制地图显隐
<template>
  <div class=" change-tab">
    <a-radio-group @change="onDtChange" class="self-radio" v-model="defaultMap">
      <a-radio
        class="self-radio-item"
        v-for="(item, index) of dtmapNameList"
        :key="index"
        :value="index"
        >{{ item.name }}</a-radio
      >
    </a-radio-group>
  </div>
</template>

<script>
export default {
  name: "convertMap",
  props: {
    dtmapNameList: Array
  },
  data() {
    return {
      defaultMap: null
    };
  },
  watch: {
    dtmapNameList() {
      for (let i = 0; i < this.dtmapNameList.length; i++) {
        if (this.dtmapNameList[i].value.getVisible()) {
          this.defaultMap = i;
        }
      }
    }
  },
  methods: {
    onDtChange(e) {
      let index = e.target.value;
      for (let i = 0; i < this.dtmapNameList.length; i++) {
        this.dtmapNameList[i].value.setVisible(false);
        if (i === index) {
          this.dtmapNameList[i].value.setVisible(true);
        }
      }
    }
  }
};
</script>

<style lang="scss">
.change-tab {
  position: absolute;
  z-index: 1001;
  border-radius: $borderRadius;
  background-color: rgba(12, 76, 70, 0.9);
  /* width: 100%; */
  font-size: $font-sm;
  @include flex-box(row, space-between, center);
}

.self-radio {
  @include flex-box(column, null, flex-start);
  .self-radio-item {
    width: 100%;
    padding-bottom: 10px;
    color: $textColor;
    @include flex-box(row-reverse, space-between);
  }
  .ant-radio-inner {
    background-color: $transparent;
  }
  .ant-radio-checked {
    .ant-radio-inner {
      border-color: $green;
      &::after {
        background-color: $green;
      }
    }
    &::after {
      border-color: $green;
    }
  }
  .ant-radio-wrapper:hover .ant-radio,
  .ant-radio:hover .ant-radio-inner,
  .ant-radio-input:focus + .ant-radio-inner {
    border-color: $green;
  }
}
</style>
