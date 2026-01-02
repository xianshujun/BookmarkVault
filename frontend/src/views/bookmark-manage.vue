<template>
  <div class="bookmark-manage-container" :class="{ 'dark-mode': !isDayMode }">
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
              />
            </div>
            <img class="search-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503538641_556c_066e_08ed_ba46761a5715889a587adede6a3f5553.png" />
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
          <div class="mode-toggle">
            <span class="mode-text">{{ isDayMode ? '日间模式' : '夜间模式' }}</span>
            <div class="mode-switch" @click="toggleMode">
              <div class="switch-circle" :class="{ 'dark-switch': !isDayMode }">
                <img class="switch-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_76742347215_1427_7c2d_b91f_485b4e25a5baaa14caf663d7b95e992d.png" />
              </div>
            </div>
          </div>
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
        <div class="pagination-section">
          <div class="total-text">共 {{ total }} 条</div>
          <div class="page-size-selector">
            <div class="page-size">
              <span class="page-size-num">{{ pageSize }}</span>
              <span class="page-size-label">/页</span>
            </div>
            <img class="dropdown-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503545770_cd7e_cab3_0e4f_678736cb20177b90c9994687031cbd74.png" />
          </div>
          <div class="pagination">
            <img class="prev-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503544380_10eb_0c26_0024_976f1468e215628ecab809237fb56abc.png" @click="prevPage" />
            <div 
              class="page-num" 
              :class="{ active: currentPage === page, ellipsis: page === '...' }" 
              v-for="page in displayPages" 
              :key="page"
              @click="page !== '...' && goToPage(page)"
            ><span>{{ page }}</span></div>
            <img class="next-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503545312_de1f_5f1e_8089_642aa8dc991f5e1b6dcd8aec1358316c.png" @click="nextPage" />
          </div>
          <div class="jump-to">
            <span class="jump-text">前往</span>
            <input 
              type="number" 
              class="jump-input" 
              v-model="jumpPageNum"
              @keyup.enter="handleJump"
              min="1"
              :max="totalPages"
            />
            <span class="jump-page">页</span>
          </div>
        </div>
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

const fileInput = ref(null)

const {
  activeMenu,
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
  jumpPageNum,
  handleMenuClick,
  handleFileUpload,
  deleteFile,
  toggleMode,
  openAddDialog,
  submitBookmark,
  editBookmark,
  deleteBookmark,
  prevPage,
  nextPage,
  goToPage,
  handleJump,
  handleRefresh,
  initTheme
} = useBookmarkStore()

onMounted(() => {
  initTheme()
})

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
