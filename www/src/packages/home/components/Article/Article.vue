<template>
  <article class="var-article">
    <div class="var-article-left">
      <div class="var-article-image" :style="{backgroundImage: `url(${props.image})`}"></div>
    </div>
    <div class="var-article-right">
      <h3 class="var-article-title">{{ props.title }}</h3>
      <div class="var-article-content">
        <p>{{ props.content }}</p>
      </div>
      <div class="var-article-footer">
        <div class="var-article-footer__item is-date">
          <time :datetime="formatDate(props.date)">{{ formatDate(props.date) }}</time>
        </div>
        <span style="margin: 0 auto;"></span>
        <div class="var-article-footer__item is-read">
          <bootstrap-icon name="eye"/>
          <span>{{ props.read }}</span>
        </div>
        <div class="var-article-footer__item is-star">
          <bootstrap-icon name="star"/>
          <span>{{ props.star }}</span>
        </div>
        <div class="var-article-footer__item is-comment">
          <bootstrap-icon name="chat-left-dots"/>
          <span>{{ props.comment }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts">export default {name: 'ArticleItem'};</script>
<script setup lang="ts">
import {BootstrapIcon} from '@module/BootstrapIcon';
import {formatDate} from '@utils/date';
import {defineProps} from 'vue';

interface Props {
  date: number;
  title: string;
  star?: number;
  read?: number;
  image?: string;
  content: string;
  comment?: number;
}

const props = withDefaults(defineProps<Props>(), {
  star: () => 0,
  read: () => 0,
  comment: () => 0,
  title: () => '标题',
  content: () => '内容',
  date: () => Date.now(),
});
</script>

<style lang="scss" src="./style.scss"></style>
