<template>
  Redirect
</template>

<script lang="ts">export default {name: 'Path Redirect'};</script>
<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router';

const route = useRoute();
const router = useRouter();
const state = route.fullPath.indexOf('/admin') === 0;
router.replace(`/${state ? 'admin/' : ''}errorFound`);
console.log(router.options);
</script>
