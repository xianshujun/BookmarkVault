import { ref } from 'vue'
import { getVersions, uploadJsonFile, recoverVersion } from '@/api/version'
import { useTheme } from '@/hooks/useTheme'
import { usePagination } from '@/hooks/usePagination'
import { ElMessage } from 'element-plus'

export function useVersionStore() {
  const activeMenu = ref('版本管理')
  const versionList = ref([])
  const hasUploaded = ref(false)

  const { isDayMode, initTheme, toggleMode } = useTheme()
  const { currentPage, pageSize, total, totalPages, displayPages, prevPage, nextPage, goToPage, handleJump, resetPagination } = usePagination(5)

  const demoVersionList = ref([
    { id: 1, name: '版本 1.0', date: '2024-01-15 10:30:00' },
    { id: 2, name: '版本 1.1', date: '2024-01-20 14:20:00' },
    { id: 3, name: '版本 1.2', date: '2024-01-25 09:15:00' },
    { id: 4, name: '版本 1.3', date: '2024-02-01 11:45:00' },
    { id: 5, name: '版本 1.4', date: '2024-02-10 16:20:00' },
    { id: 6, name: '版本 1.5', date: '2024-02-15 08:30:00' },
    { id: 7, name: '版本 1.6', date: '2024-02-20 13:50:00' },
    { id: 8, name: '版本 1.7', date: '2024-02-25 10:15:00' },
    { id: 9, name: '版本 1.8', date: '2024-03-01 15:40:00' },
    { id: 10, name: '版本 1.9', date: '2024-03-05 09:20:00' },
    { id: 11, name: '版本 2.0', date: '2024-03-10 14:55:00' },
    { id: 12, name: '版本 2.1', date: '2024-03-15 11:30:00' }
  ])

  function handleMenuClick(menu) {
    activeMenu.value = menu
  }

  async function loadVersions() {
    if (!hasUploaded.value) {
      versionList.value = demoVersionList.value
      total.value = demoVersionList.value.length
    } else {
      try {
        const response = await getVersions()
        if (response && response.data) {
          versionList.value = response.data
          total.value = response.data.length
        }
      } catch (error) {
        console.error('加载版本列表失败:', error)
        ElMessage.error('加载版本列表失败')
      }
    }
  }

  async function handleVersionUpload(file) {
    if (!file) return

    if (!file.name.endsWith('.json')) {
      ElMessage.error('请选择JSON格式的文件')
      return
    }

    try {
      const result = await uploadJsonFile(file)
      
      hasUploaded.value = true
      
      if (result && result.data) {
        ElMessage.success('文件上传并解析成功')
        await loadVersions()
      }
    } catch (error) {
      console.error('Upload error:', error)
      ElMessage.error('文件上传失败')
    }
  }

  async function handleRecover(id) {
    try {
      const response = await recoverVersion(id)
      if (response && response.data) {
        ElMessage.success(response.data.message || '恢复成功，请切换到书签管理查看')
        await loadVersions()
      }
    } catch (error) {
      console.error('恢复版本失败:', error)
      ElMessage.error('恢复版本失败')
    }
  }

  return {
    activeMenu,
    isDayMode,
    versionList,
    currentPage,
    pageSize,
    total,
    hasUploaded,
    totalPages,
    displayPages,
    handleMenuClick,
    loadVersions,
    handleVersionUpload,
    handleRecover,
    toggleMode,
    initTheme,
    prevPage,
    nextPage,
    goToPage,
    handleJump,
    resetPagination
  }
}
