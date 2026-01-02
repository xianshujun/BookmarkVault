<template>
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
      <img class="prev-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503544380_10eb_0c26_0024_976f1468e215628ecab809237fb56abc.png" @click="handlePrevPage" />
      <div 
        class="page-num" 
        :class="{ active: currentPage === page, ellipsis: page === '...' }" 
        v-for="page in displayPages" 
        :key="page"
        @click="page !== '...' && handleGoToPage(page)"
      ><span>{{ page }}</span></div>
      <img class="next-icon" src="@/icons/obj_w5rCgMKVw6DCmGzCmsK-_77503545312_de1f_5f1e_8089_642aa8dc991f5e1b6dcd8aec1358316c.png" @click="handleNextPage" />
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
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  displayPages: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['prevPage', 'nextPage', 'goToPage', 'jump'])

const jumpPageNum = ref(1)

function handlePrevPage() {
  emit('prevPage')
}

function handleNextPage() {
  emit('nextPage')
}

function handleGoToPage(page) {
  emit('goToPage', page)
}

function handleJump() {
  const page = parseInt(jumpPageNum.value)
  if (page >= 1 && page <= props.totalPages) {
    emit('jump', page)
  }
}
</script>

<style scoped>
.pagination-section {
  width: 1590px;
  height: 42px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  position: relative;
  margin-top: auto;
}

.total-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;
  font-size: 14px;
  font-family: 'FZShuSong-Z01', 'FZShuSong', '方正书宋', serif;
  font-weight: 400;
  line-height: 22px;
  color: #606266;
  white-space: pre;
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
  padding-left: 0;
}

.page-size-selector {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-top: 3px;
  padding-right: 11px;
  padding-bottom: 3px;
  padding-left: 15px;
  gap: 12px;
  flex-shrink: 0;
  border-radius: 2px;
  border-width: 1px 1px 1px 1px;
  border-style: solid;
  border-color: #dcdfe6;
  position: relative;
}

.page-size {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 3px;
  flex-shrink: 0;
  position: relative;
}

.page-size-num {
  flex-shrink: 0;
  font-size: 14px;
  font-family: 'FZShuSong-Z01', 'FZShuSong', '方正书宋', serif;
  font-weight: 400;
  line-height: 22px;
  color: #606266;
  white-space: pre;
}

.page-size-label {
  flex-shrink: 0;
  font-size: 14px;
  font-family: 'FZShuSong-Z01', 'FZShuSong', '方正书宋', serif;
  font-weight: 400;
  line-height: 22px;
  color: #606266;
  white-space: pre;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
  position: relative;
  flex-shrink: 0;
  margin-top: 0px;
  margin-right: -0.5px;
  margin-bottom: -1px;
  margin-left: -0.5px;
}

.pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  position: relative;
}

.prev-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  margin-top: 0px;
  margin-right: -0.5px;
  margin-bottom: -1px;
  margin-left: -0.5px;
}

.page-num {
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 4px;
  padding-right: 12px;
  padding-bottom: 4px;
  padding-left: 12px;
  flex-shrink: 0;
  text-align: center;
  font-size: 14px;
  font-family: 'FZShuSong-Z01', 'FZShuSong', '方正书宋', serif;
  font-weight: 400;
  line-height: 22px;
  color: #606266;
  white-space: pre;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-num:hover {
  background-color: #f5f7fa;
}

.page-num.active {
  font-size: 14px;
  font-family: 'FZShuSong-Z01', 'FZShuSong', '方正书宋', serif;
  font-weight: 700;
  line-height: 22px;
  color: #409eff;
  white-space: pre;
}

.page-num.active:hover {
  background-color: #409eff;
  color: #ffffff;
}

.page-num.ellipsis {
  cursor: default;
  font-weight: 400;
  color: #606266;
}

.page-num.ellipsis:hover {
  background-color: transparent;
}

.next-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  margin-top: 0px;
  margin-right: -0.5px;
  margin-bottom: -1px;
  margin-left: -0.5px;
}

.prev-icon,
.next-icon {
  cursor: pointer;
  transition: all 0.3s ease;
}

.prev-icon:hover,
.next-icon:hover {
  opacity: 0.7;
}

.jump-to {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 2px;
  position: relative;
}

.jump-text {
  flex-shrink: 0;
  font-size: 14px;
  font-family: 'FZShuSong-Z01', 'FZShuSong', '方正书宋', serif;
  font-weight: 400;
  line-height: 22px;
  color: #606266;
  white-space: pre;
}

.jump-page {
  flex-shrink: 0;
  font-size: 14px;
  font-family: 'FZShuSong-Z01', 'FZShuSong', '方正书宋', serif;
  font-weight: 400;
  line-height: 22px;
  color: #606266;
  white-space: pre;
}

.jump-input {
  width: 56px !important;
  height: 30px !important;
  display: inline-block !important;
  flex-shrink: 0;
  border-radius: 2px !important;
  border: 1px solid #dcdfe6 !important;
  text-align: center;
  font-size: 14px !important;
  font-family: 'FZShuSong-Z01', 'FZShuSong', '方正书宋', serif;
  font-weight: 400;
  line-height: 22px;
  color: #606266 !important;
  background-color: #ffffff !important;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;
  padding: 0 7px !important;
  -webkit-appearance: none !important;
  -moz-appearance: textfield !important;
}

.jump-input::-webkit-outer-spin-button,
.jump-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.jump-input::-moz-number-spin-box {
  -moz-appearance: textfield;
}

.jump-input:hover {
  border-color: #c0c4cc;
}

.jump-input:focus {
  border-color: #409eff;
}

.jump-input::placeholder {
  color: #c0c4cc;
}

@media screen and (max-width: 1440px) {
  .pagination-section {
    gap: 12px;
  }
}

@media screen and (max-width: 768px) {
  .pagination-section {
    gap: 8px;
  }

  .page-num,
  .prev-icon,
  .next-icon {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }

  .jump-input {
    width: 48px;
    font-size: 12px;
  }
}
</style>
