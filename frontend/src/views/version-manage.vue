<template>
  <div class="version-manage-container" :class="{ 'dark-mode': !isDayMode }">
    <LeftSidebar :active-menu="activeMenu" />
    <div class="main-content">
      <div class="top-card">
        <div class="card-title-section">
          <span class="card-title">版本管理</span>
          <span class="card-subtitle">管理书签版本，支持版本对比和回滚</span>
        </div>
        
          <input 
            type="file" 
            ref="versionFileInput" 
            accept=".json" 
            style="display: none" 
            @change="handleVersionFileInputChange"
          />
          <span class="upload-btn" @click="triggerVersionFileUpload">上传新文件</span>
        
        <div class="card-mode-section">
          <DarkModeToggle :is-day-mode="isDayMode" @toggle="toggleMode" />
        </div>
      </div>
      <div class="main-card">
        <div class="version-list">
          <div class="version-item" v-for="(version, index) in versionList" :key="index">
            <div class="version-info">
              <span class="version-name">{{ version.name }}</span>
              <span class="version-date">{{ version.date }}</span>
            </div>
            <div class="version-actions">
              <span class="action-btn" @click="viewVersion(version)">查看</span>
              <span class="action-btn" @click="compareVersion(version)">对比</span>
              <span class="action-btn" @click="restoreVersion(version)">恢复</span>
            </div>
          </div>
        </div>
        <Pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          :total-pages="totalPages"
          :display-pages="displayPages"
          @prev-page="prevPage"
          @next-page="nextPage"
          @go-to-page="goToPage"
          @jump="handleJump"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import LeftSidebar from '@/components/layout/left-sidebar.vue'
import DarkModeToggle from '@/components/layout/dark-mode-toggle.vue'
import Pagination from '@/components/layout/pagination.vue'

const activeMenu = ref('版本管理')
const isDayMode = ref(true)
const versionFileInput = ref(null)

const allVersionList = ref([
  { name: '版本 1.0', date: '2024-01-15 10:30:00' },
  { name: '版本 1.1', date: '2024-01-20 14:20:00' },
  { name: '版本 1.2', date: '2024-01-25 09:15:00' },
  { name: '版本 1.3', date: '2024-02-01 11:45:00' },
  { name: '版本 1.4', date: '2024-02-10 16:20:00' },
  { name: '版本 1.5', date: '2024-02-15 08:30:00' },
  { name: '版本 1.6', date: '2024-02-20 13:50:00' },
  { name: '版本 1.7', date: '2024-02-25 10:15:00' },
  { name: '版本 1.8', date: '2024-03-01 15:40:00' },
  { name: '版本 1.9', date: '2024-03-05 09:20:00' },
  { name: '版本 2.0', date: '2024-03-10 14:55:00' },
  { name: '版本 2.1', date: '2024-03-15 11:30:00' }
])

const currentPage = ref(1)
const pageSize = ref(5)

const total = computed(() => allVersionList.value.length)
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

const versionList = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return allVersionList.value.slice(start, end)
})

const displayPages = computed(() => {
  const pages = []
  const maxVisible = 5
  
  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage.value <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages.value)
    } else if (currentPage.value >= totalPages.value - 2) {
      pages.push(1, '...', totalPages.value - 3, totalPages.value - 2, totalPages.value - 1, totalPages.value)
    } else {
      pages.push(1, '...', currentPage.value - 1, currentPage.value, currentPage.value + 1, '...', totalPages.value)
    }
  }
  
  return pages
})

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function goToPage(page) {
  currentPage.value = page
}

function handleJump(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function toggleMode() {
  isDayMode.value = !isDayMode.value
}

function triggerVersionFileUpload() {
  versionFileInput.value.click()
}

function handleVersionFileInputChange(event) {
  const file = event.target.files[0]
  console.log('上传版本文件:', file)
  event.target.value = ''
}

function viewVersion(version) {
  console.log('查看版本:', version)
}

function compareVersion(version) {
  console.log('对比版本:', version)
}

function restoreVersion(version) {
  console.log('恢复版本:', version)
}

onMounted(() => {
})
</script>

<style scoped>
@import '@/styles/bookmark-manage.css';
@import '@/styles/version-manage.css';
</style>
