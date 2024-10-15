<template>
  <div id="Sign" class="sign">
    <div class="sign-header">sign-header</div>
    <div class="sign-content">
      <router-view v-slot="{ Component, route}">
        <keep-alive>
          <component :is="Component"/>
        </keep-alive>
      </router-view>
    </div>
    <div class="sign-footer">sign-footer</div>
  </div>
</template>

<script lang="ts">export default { name: 'Sign' };</script>

<style lang="scss" src="./style.scss"></style>
