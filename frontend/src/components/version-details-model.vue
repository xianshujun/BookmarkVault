<template>
  <el-dialog
    v-model="dialogVisible"
    title="版本详情"
    width="800px"
    :before-close="handleClose"
  >
    <div class="version-detail-content" v-if="versionDetail">
      <div class="detail-section">
        <h3 class="section-title">版本信息</h3>
        <div class="info-row">
          <span class="info-label">版本名称：</span>
          <span class="info-value">{{ versionDetail.name }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">创建时间：</span>
          <span class="info-value">{{ versionDetail.date }}</span>
        </div>
        <div class="info-row" v-if="versionDetail.bookmarkCount !== undefined">
          <span class="info-label">书签数量：</span>
          <span class="info-value">{{ versionDetail.bookmarkCount }}</span>
        </div>
      </div>
      
      <div class="detail-section" v-if="versionDetail.bookmarks && versionDetail.bookmarks.length > 0">
        <h3 class="section-title">书签列表</h3>
        <el-table :data="versionDetail.bookmarks" style="width: 100%" max-height="400">
          <el-table-column prop="title" label="网站名称" width="300"></el-table-column>
          <el-table-column prop="url" label="网址" show-overflow-tooltip></el-table-column>
          <el-table-column prop="dateAdded" label="添加时间" width="200"></el-table-column>
        </el-table>
      </div>
      
      <div class="empty-state" v-else>
        <span class="empty-text">暂无书签数据</span>
      </div>
    </div>
    
    <div class="empty-state" v-else>
      <span class="empty-text">暂无版本详情数据</span>
    </div>
    
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  versionDetail: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

function handleClose() {
  dialogVisible.value = false
}
</script>

<style scoped>
.version-detail-content {
  padding: 10px 0;
}

.detail-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ebeef5;
}

.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
}

.info-label {
  color: #606266;
  min-width: 80px;
  font-weight: 500;
}

.info-value {
  color: #303133;
  flex: 1;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
}

.empty-text {
  font-size: 14px;
  color: #909399;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
