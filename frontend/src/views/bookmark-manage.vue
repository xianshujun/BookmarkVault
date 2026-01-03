<template>
  <div class="bookmark-manage-container" :class="{ 'dark-mode': !isDayMode }">
    <LeftSidebar :active-menu="activeMenu" />
    <div class="main-content">
      <div class="top-card">
        <div class="card-title-section">
          <span class="card-title">书签管理</span>
          <span class="card-subtitle">支持网站名或网址模糊搜索，支持json文件上传并自动解析</span>
        </div>
        <div class="card-search-section">
          <span class="search-title">BookmarkSave</span>
          <div class="search-input-wrapper">
            <div class="search-input-container">
              <input 
                type="text" 
                class="search-input" 
                v-model="searchKeyword"
                placeholder="支持网站名称模糊搜索..."
                @keyup.enter="handleSearch"
              />
            </div>
            <img class="search-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503538641_556c_066e_08ed_ba46761a5715889a587adede6a3f5553.png" @click="handleSearch" />
          </div>
        </div>
        <div class="card-upload-section">
          <input 
            type="file" 
            ref="fileInput" 
            accept=".json" 
            style="display: none" 
            @change="handleFileInputChange"
          />
          <span class="upload-btn" @click="triggerFileUpload">点击上传json文件</span>
          <span class="upload-hint">支持firefox/chrome浏览器<br />导出的收藏夹并自动解析<br /></span>
        </div>
        <div class="card-mode-section">
          <DarkModeToggle :is-day-mode="isDayMode" @toggle="toggleMode" />
          <div class="file-list">
            <div class="file-item" v-for="(file, index) in uploadedFiles" :key="index">
              <div class="file-info">
                <img class="file-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503783615_0729_e01c_b27a_6bfdd829228ca0e0932c05f28b9d7d7c.png" />
                <span class="file-name">{{ file.name }}</span>
              </div>
              <img class="delete-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503782513_e5bf_c144_db62_93e8c400956bd12c43a747a20a5f147b.png" @click="deleteFile(index)" />
            </div>
          </div>
        </div>
      </div>
      <div class="main-card">
        <div class="add-header">
          <span class="add-btn" @click="openAddDialog">手动添加网址</span>
          <img class="add-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503782554_81df_3038_74e8_a13546fc3c31a0c293e4a137acce9af9.png" @click="handleRefresh" />
        </div>
        <div class="add-section">
          <el-table v-if="bookmarkList.length > 0" :data="bookmarkList" style="width: 100%">
            <el-table-column prop="title" label="网站名称" width="300"></el-table-column>
            <el-table-column prop="url" label="网址" width="400"></el-table-column>
            <el-table-column prop="dateAdded" label="添加时间" width="200"></el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="small" @click="editBookmark(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteBookmark(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div v-else class="empty-state-container">
            <img class="empty-state" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503542389_f4d1_9d6a_01f1_4a52d1ae8808e5aeba6a0c2f4d4aa002.png" />
            <span class="empty-text">暂无数据，请上传书签文件或加载演示数据</span>
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

    <el-dialog v-model="addDialogVisible" title="添加网站" width="500px">
      <el-form :model="bookmarkForm" label-width="80px">
        <el-form-item label="网站名称">
          <el-input v-model="bookmarkForm.title" placeholder="请输入网站名称"></el-input>
        </el-form-item>
        <el-form-item label="网址">
          <el-input v-model="bookmarkForm.url" placeholder="请输入网址"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitBookmark">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBookmarkStore } from '@/store/bookmark'
import LeftSidebar from '@/components/layout/left-sidebar.vue'
import DarkModeToggle from '@/components/layout/dark-mode-toggle.vue'
import Pagination from '@/components/layout/pagination.vue'
import { getBookmarks, addBookmark, searchBookmarks } from '@/api/bookmark'
import { ElMessage } from 'element-plus'

const {
  activeMenu,
  fileInput,
  searchKeyword,
  isDayMode,
  uploadedFiles,
  currentPage,
  pageSize,
  total,
  bookmarkList,
  addDialogVisible,
  bookmarkForm,
  totalPages,
  displayPages,
  handleFileUpload,
  deleteFile,
  toggleMode,
  openAddDialog,
  closeAddDialog,
  editBookmark,
  deleteBookmark,
  prevPage,
  nextPage,
  goToPage,
  handleJump,
  initTheme
} = useBookmarkStore()

onMounted(() => {
  initTheme()
  loadBookmarks()
})

async function loadBookmarks() {
  try {
    const response = await getBookmarks()
    if (response && response.data) {
      bookmarkList.value = response.data
      total.value = response.data.length
    }
  } catch (error) {
    console.error('加载书签失败:', error)
    ElMessage.error('加载书签失败')
  }
}

async function submitBookmark() {
  if (!bookmarkForm.value.title || !bookmarkForm.value.url) {
    ElMessage.warning('请填写完整信息')
    return
  }
  
  try {
    const response = await addBookmark({
      title: bookmarkForm.value.title,
      url: bookmarkForm.value.url
    })
    
    if (response && response.data) {
      ElMessage.success(response.data.message || '添加成功')
      await loadBookmarks()
      closeAddDialog()
    }
  } catch (error) {
    console.error('添加书签失败:', error)
    ElMessage.error('添加书签失败')
  }
}

async function handleSearch() {
  const keyword = searchKeyword.value.trim()
  
  if (keyword) {
    try {
      const response = await searchBookmarks(keyword)
      if (response && response.data) {
        bookmarkList.value = response.data
        total.value = response.data.length
        ElMessage.success(`搜索到 ${response.data.length} 条结果`)
      }
    } catch (error) {
      console.error('搜索失败:', error)
      ElMessage.error('搜索失败')
    }
  } else {
    await loadBookmarks()
  }
}

async function handleRefresh() {
  try {
    const { refreshBookmarks } = await import('@/api/bookmark')
    const response = await refreshBookmarks()
    if (response && response.data) {
      bookmarkList.value = response.data
      total.value = response.data.length
      ElMessage.success('刷新成功')
    }
  } catch (error) {
    console.error('刷新失败:', error)
    ElMessage.error('刷新失败')
  }
}

function triggerFileUpload() {
  fileInput.value.click()
}

async function handleFileInputChange(event) {
  const file = event.target.files[0]
  await handleFileUpload(file)
  event.target.value = ''
}
</script>

<style scoped>
@import '@/styles/bookmark-manage.css';
</style>
