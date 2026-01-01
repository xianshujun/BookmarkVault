import { ref, computed } from 'vue'
import { uploadJsonFile } from '@/api/bookmark'
import { ElMessage } from 'element-plus'

export function useBookmarkStore() {
  const activeMenu = ref('书签管理')
  const searchKeyword = ref('')
  const isDayMode = ref(true)
  const uploadedFiles = ref([])
  const currentPage = ref(1)
  const pageSize = ref(100)
  const total = ref(0)
  const bookmarkList = ref([])
  const addDialogVisible = ref(false)
  const bookmarkForm = ref({
    title: '',
    url: ''
  })

  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

  function handleMenuClick(menu) {
    activeMenu.value = menu
  }

  async function handleFileUpload(file) {
    if (!file) return

    if (!file.name.endsWith('.json')) {
      ElMessage.error('请选择JSON格式的文件')
      return
    }

    try {
      const result = await uploadJsonFile(file)
      
      uploadedFiles.value.push({ name: file.name })
      
      if (result && result.data) {
        bookmarkList.value = result.data
        total.value = result.data.length
        ElMessage.success('文件上传并解析成功')
      }
    } catch (error) {
      console.error('Upload error:', error)
      ElMessage.error('文件上传失败')
    }
  }

  function deleteFile(index) {
    uploadedFiles.value.splice(index, 1)
    ElMessage.success('文件删除成功')
  }

  function toggleMode() {
    isDayMode.value = !isDayMode.value
    localStorage.setItem('themeMode', isDayMode.value ? 'day' : 'night')
  }

  function openAddDialog() {
    bookmarkForm.value = {
      title: '',
      url: ''
    }
    addDialogVisible.value = true
  }

  function submitBookmark() {
    if (!bookmarkForm.value.title || !bookmarkForm.value.url) {
      ElMessage.warning('请填写完整信息')
      return
    }
    
    bookmarkList.value.push({
      title: bookmarkForm.value.title,
      url: bookmarkForm.value.url,
      dateAdded: new Date().toLocaleString()
    })
    
    total.value = bookmarkList.value.length
    addDialogVisible.value = false
    ElMessage.success('添加成功')
  }

  function editBookmark(row) {
    bookmarkForm.value = {
      title: row.title,
      url: row.url
    }
    addDialogVisible.value = true
  }

  function deleteBookmark(row) {
    const index = bookmarkList.value.findIndex(item => item.url === row.url)
    if (index > -1) {
      bookmarkList.value.splice(index, 1)
      total.value = bookmarkList.value.length
      ElMessage.success('删除成功')
    }
  }

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

  function handleRefresh() {
    location.reload()
  }

  function initTheme() {
    const savedMode = localStorage.getItem('themeMode')
    if (savedMode) {
      isDayMode.value = savedMode === 'day'
    }
  }

  return {
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
    handleRefresh,
    initTheme
  }
}