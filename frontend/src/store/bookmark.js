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

  const displayPages = computed(() => {
    const pages = []
    const total = totalPages.value
    const current = currentPage.value
    
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i)
      }
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(total)
      } else if (current >= total - 3) {
        pages.push(1)
        pages.push('...')
        for (let i = total - 4; i <= total; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(total)
      }
    }
    
    return pages
  })

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
    displayPages,
    handleMenuClick,
    handleFileUpload,
    deleteFile,
    toggleMode,
    openAddDialog,
    editBookmark,
    deleteBookmark,
    prevPage,
    nextPage,
    goToPage,
    initTheme
  }
}