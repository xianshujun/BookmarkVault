<template>
  <div class="version-manage-container" :class="{ 'dark-mode': !isDayMode }">
    <LeftSidebar :active-menu="activeMenu" />
    <div class="main-content">
      <div class="top-card">
        <div class="card-title-section">
          <span class="card-title">版本管理</span>
          <span class="card-subtitle">管理书签版本，支持版本查看和恢复</span>
        </div>
        
          <input 
            type="file" 
            ref="versionFileInput" 
            accept=".json" 
            style="display: none" 
            @change="handleVersionFileInputChange"
          />
        
        <div class="card-mode-section">
          <DarkModeToggle :is-day-mode="isDayMode" @toggle="toggleMode" />
                  <span class="upload-btn" @click="triggerVersionFileUpload">上传新文件</span>
        </div>
      </div>
      <div class="main-card">
        <div class="version-list">
          <div class="version-item" v-for="(version, index) in paginatedVersionList" :key="index">
            <div class="version-info">
              <span class="version-name">{{ version.name }}</span>
              <span class="version-date">{{ version.date }}</span>
            </div>
            <div class="version-actions">
              <span class="action-btn" @click="viewVersion(version)">查看</span>
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

    <VersionDetailsDialog 
      v-model="detailDialogVisible"
      :version-detail="currentVersionDetail"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useVersionStore } from '@/store/version'
import LeftSidebar from '@/components/layout/left-sidebar.vue'
import DarkModeToggle from '@/components/layout/dark-mode-toggle.vue'
import Pagination from '@/components/layout/pagination.vue'
import VersionDetailsDialog from '@/components/version-details-model.vue'
import { getVersionDetail } from '@/api/version'
import { ElMessage } from 'element-plus'

const versionFileInput = ref(null)
const detailDialogVisible = ref(false)
const currentVersionDetail = ref(null)

const {
  activeMenu,
  isDayMode,
  versionList,
  currentPage,
  pageSize,
  total,
  totalPages,
  displayPages,
  hasUploaded,
  loadVersions,
  handleVersionUpload,
  handleRecover,
  toggleMode,
  initTheme,
  prevPage,
  nextPage,
  goToPage,
  handleJump
} = useVersionStore()

const paginatedVersionList = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return versionList.value.slice(start, end)
})

function triggerVersionFileUpload() {
  versionFileInput.value.click()
}

async function handleVersionFileInputChange(event) {
  const file = event.target.files[0]
  await handleVersionUpload(file)
  event.target.value = ''
}

async function viewVersion(version) {
  try {
        if (!hasUploaded.value) {
      currentVersionDetail.value = {
        id: version.id,
        name: version.name,
        date: version.date,
        bookmarkCount: Math.floor(Math.random() * 50) + 10,
        bookmarks: [
          { title: 'Google', url: 'https://www.google.com', dateAdded: '2024-01-15 10:30:00' },
          { title: 'GitHub', url: 'https://github.com', dateAdded: '2024-01-16 14:20:00' },
          { title: 'Stack Overflow', url: 'https://stackoverflow.com', dateAdded: '2024-01-17 09:15:00' },
          { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', dateAdded: '2024-01-18 16:45:00' },
          { title: 'Vue.js', url: 'https://vuejs.org', dateAdded: '2024-01-19 11:30:00' }
        ]
      }
      detailDialogVisible.value = true
      return
    }
    
    const response = await getVersionDetail(version.id)
    if (response && response.data) {
      currentVersionDetail.value = response.data
      detailDialogVisible.value = true
    }
  } catch (error) {
    console.error('获取版本详情失败:', error)
    ElMessage.error('获取版本详情失败')
  }
}

async function restoreVersion(version) {
  try {
    await handleRecover(version.id)
  } catch (error) {
    console.error('恢复版本失败:', error)
    ElMessage.error('恢复版本失败')
  }
}

onMounted(() => {
  initTheme()
  loadVersions()
})
</script>

<style scoped>
@import '@/styles/bookmark-manage.css';
@import '@/styles/version-manage.css';
</style>
