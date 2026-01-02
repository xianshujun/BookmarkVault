<template>
  <div class="mode-toggle">
    <span class="mode-text">{{ isDayMode ? '日间模式' : '夜间模式' }}</span>
    <div class="mode-switch" @click="handleToggle">
      <div class="switch-circle" :class="{ 'dark-switch': !isDayMode }">
        <img class="switch-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_76742347215_1427_7c2d_b91f_485b4e25a5baaa14caf663d7b95e992d.png" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isDayMode: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['toggle'])

function handleToggle() {
  emit('toggle')
}
</script>

<style scoped>
@import '@/styles/bookmark-manage.css';
</style>
