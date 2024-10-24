<template>
  <div class="bootstrapIcon" :class="{'is-all': props.all}" v-show="icons.length || props.isEmpty">
    <template v-for="icon of icons">
      <div class="bootstrapIcon__item" :class="{'is-active': props.active === icon}" :title="icon" @click="onClick(icon)">
        <i class="bi" :class="['bi-' + icon]"></i>
      </div>
    </template>
    <el-empty v-if="!icons.length && props.isEmpty" image-size="100"/>
  </div>
</template>

<script lang="ts">export default { name: 'BootstrapIcon' };</script>

<script lang="ts" setup>
import { IconList } from './tools';
import { computed } from 'vue';

interface Props {
  name?: string;
  search?: string;
  all?: boolean;
  active?: string;
  isEmpty?: boolean;
  showAll?: boolean;
  showFill?: boolean;
}

const props = withDefaults(defineProps<Props>(), { name: '', all: false });
const icons = computed(() => {
  const data = (function () {
    if (props.showAll) return IconList;
    if (props.all) return IconList.filter((item) => {
      const index = item.indexOf('fill');
      return props.showFill ? index > -1 : index < 0;
    });
    return props.name ? [props.name] : [];
  })();
  return props.search ? data.filter(icon => icon.toLowerCase().indexOf((<string>props.search).toLowerCase()) >= 0) : data;
});

const emits = defineEmits(['click']);

function onClick(name: string) {
  emits('click', name);
}
</script>

<style lang="scss">
.bootstrapIcon {
  display: inline-table;

  &__item {
    width: 1em;
    height: 1em;
    line-height: 1em;
    display: inline-block;

    &.is-active {
      color: #48f;
    }
  }

  .el-empty {
    padding: 10px 0;
  }
}
</style>
