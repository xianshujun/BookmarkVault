<template>
  <div class="bookmark-manage-container">
    <div class="sidebar">
      <span class="sidebar-title">书签管家/<br />BookmarkSave</span>
      <div class="sidebar-menu">
        <div class="menu-divider"><div class="divider-line"></div></div>
        <div class="menu-items">
          <span class="menu-item active">书签管理</span>
          <div class="menu-item">
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
              <div class="search-input"><span class="search-placeholder">支持网站名称模糊搜索...</span></div>
            </div>
            <img class="search-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503538641_556c_066e_08ed_ba46761a5715889a587adede6a3f5553.png" />
          </div>
        </div>
        <div class="card-upload-section">
          <span class="upload-btn">点击上传json文件</span>
          <span class="upload-hint">支持firefox/chrome浏览器<br />导出的收藏夹并自动解析<br /></span>
        </div>
        <div class="card-mode-section">
          <div class="mode-toggle">
            <span class="mode-text">日间模式</span>
            <div class="mode-switch">
              <div class="switch-circle">
                <img class="switch-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_76742347215_1427_7c2d_b91f_485b4e25a5baaa14caf663d7b95e992d.png" />
              </div>
            </div>
          </div>
          <div class="file-list">
            <div class="file-item">
              <div class="file-info">
                <img class="file-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503783615_0729_e01c_b27a_6bfdd829228ca0e0932c05f28b9d7d7c.png" />
                <span class="file-name">element-plus-logo2.json</span>
              </div>
              <img class="delete-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503782513_e5bf_c144_db62_93e8c400956bd12c43a747a20a5f147b.png" />
            </div>
            <div class="file-item">
              <div class="file-info">
                <img class="file-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503783615_0729_e01c_b27a_6bfdd829228ca0e0932c05f28b9d7d7c.png" />
                <span class="file-name">element-plus-logo2.json</span>
              </div>
              <img class="delete-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503782513_e5bf_c144_db62_93e8c400956bd12c43a747a20a5f147b.png" />
            </div>
          </div>
        </div>
      </div>
      <div class="main-card">
        <div class="add-header">
          <span class="add-btn">手动添加网址</span>
          <img class="add-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503782554_81df_3038_74e8_a13546fc3c31a0c293e4a137acce9af9.png" />
        </div>
        <div class="add-section">
          <img class="empty-state" src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/77503542389/f4d1/9d6a/01f1/4a52d1ae8808e5aeba6a0c2f4d4aa002.png" />
          <span class="empty-text">暂无数据，请上传书签文件或加载演示数据</span>
        </div>
        <div class="pagination-section">
          <div class="page-size-selector">
            <div class="page-size">
              <span class="page-size-num">100</span>
              <span class="page-size-label">/页</span>
            </div>
            <img class="dropdown-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503545770_cd7e_cab3_0e4f_678736cb20177b90c9994687031cbd74.png" />
          </div>
          <div class="pagination">
            <img class="prev-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503544380_10eb_0c26_0024_976f1468e215628ecab809237fb56abc.png" />
            <div class="page-num active"><span>1</span></div>
            <div class="page-num"><span>2</span></div>
            <div class="page-num"><span>3</span></div>
            <div class="page-num"><span>4</span></div>
            <div class="page-num"><span>5</span></div>
            <img class="next-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503545312_de1f_5f1e_8089_642aa8dc991f5e1b6dcd8aec1358316c.png" />
          </div>
          <div class="jump-to">
            <span class="jump-text">前往</span>
            <span class="jump-num">4</span>
            <span class="jump-page">页</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeMenu = ref('书签管理')
const searchKeyword = ref('')
const isDayMode = ref(true)
const uploadedFiles = ref([
  { name: 'element-plus-logo2.json' },
  { name: 'element-plus-logo2.json' }
])
const currentPage = ref(1)
const pageSize = ref(100)
const total = ref(1000)
</script>

<style scoped>
@import '@/styles/bookmark-manage.css';
</style>
