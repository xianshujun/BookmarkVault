<template>
  <div class="sidebar">
    <span class="sidebar-title">书签管家/<br />BookmarkSave</span>
    <div class="sidebar-menu">
      <div class="menu-divider"><div class="divider-line"></div></div>
      <div class="menu-items">
        <div 
          class="menu-item" 
          :class="{ active: activeMenu === '书签管理' }"
          @click="handleMenuClick('书签管理')"
        >
          <span class="menu-text">书签管理</span>
        </div>
        <div 
          class="menu-item"
          :class="{ active: activeMenu === '版本管理' }"
          @click="handleMenuClick('版本管理')"
        >
          <span class="menu-text">版本管理</span>
          <img class="menu-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503543128_065b_a1e7_db3b_b9c2a10fe87c5f6c0a69ea6578146488.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  activeMenu: {
    type: String,
    default: '书签管理'
  }
})

function handleMenuClick(menu) {
  if (menu === '书签管理') {
    router.push('/')
  } else if (menu === '版本管理') {
    router.push('/version')
  }
}
</script>

<style scoped>
@import '@/styles/bookmark-manage.css';
</style>
