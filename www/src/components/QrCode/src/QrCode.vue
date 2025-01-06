<template>
  <div class="qrCode">
    <div class="qrCode-card" :style="imgStyle">
      <img class="qrCode-canvas" :src="data.src" v-if="data.src" alt="qrcode" @click.stop="onCodeClick"/>
      <div class="qrCode-button" v-if="isExpires">
        <el-button type="primary" size="small" v-bind="buttonProp" @click.stop="onCodeClick">{{ props.text }}</el-button>
      </div>
    </div>
    <div class="qrCode-description" v-if="props.description || $slots.description">
      <slot name="description">{{ props.description }}</slot>
    </div>
  </div>
</template>

<script lang="ts">export default {name: 'QrCode'};</script>
<script lang="ts" setup>
import { computed, onMounted, reactive, watch } from 'vue';
import type { QrCodeOptions } from './Tools.ts';
import { MergeOptions } from '@utils/object';
import { ElButton } from 'element-plus';
import { debounce } from '@utils/limit';
import { QrCode } from './Tools';

interface Props {
  value: string;
  text?: string;
  click?: Function;
  expires?: number;
  description?: string;
  buttonProp?: typeof ElButton;
  options?: Partial<QrCodeOptions>;
}

const props = withDefaults(defineProps<Props>(), {
  expires: 0,
  text: 'Refresh',
  options: () => ({}),
});

const imgStyle = computed(() => {
  const width = (props.options || {}).width || 0;
  if (!width) return undefined;
  return {width: width + 'px', height: width + 'px'};
});

const data = reactive({
  src: '',
  expires: 0,
} as {
  src: string;
  expires: number;
  timeout?: NodeJS.Timeout
});

const isExpires = computed(() => props.expires && data.expires >= props.expires);

function nextExpires(value: number) {
  if (data.timeout) clearTimeout(data.timeout);
  if (!props.expires || isExpires.value) return; // 停止
  data.expires = value; // 更新时间
  data.timeout = setTimeout(() => {
    nextExpires(value + 1);
  }, 1000);
}

async function InstantRefresh() {
  data.src = await QrCode(props.value, MergeOptions({
    scale: 4,
    margin: 2,
    level: 'L',
    dark: '#000000ff',
    light: '#ffffffff',
  }, props.options));
  nextExpires(0);
}

const onRefresh = debounce(InstantRefresh);

onMounted(() => onRefresh());

watch(() => props.value, () => onRefresh());
watch(() => props.options, () => onRefresh());

const emits = defineEmits(['click']);

function onCodeClick(event: Event) {
  emits('click', event);
}

defineExpose({refresh: InstantRefresh});
</script>

<style lang="scss" src="./style.scss"></style>
