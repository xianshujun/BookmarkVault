import { ref } from 'vue'
import { uploadJsonFile } from '@/api/bookmark'
import { useTheme } from '@/hooks/useTheme'
import { usePagination } from '@/hooks/usePagination'
import { useDialog } from '@/hooks/useDialog'
import { useFileUpload } from '@/hooks/useFileUpload'
import { ElMessage } from 'element-plus'

export function useBookmarkStore() {
  const activeMenu = ref('书签管理')
  const searchKeyword = ref('')
  const bookmarkList = ref([])
  const bookmarkForm = ref({
    title: '',
    url: ''
  })

  const { isDayMode, initTheme, toggleMode } = useTheme()
  const { currentPage, pageSize, total, totalPages, displayPages, prevPage, nextPage, goToPage, handleJump, resetPagination } = usePagination(100)
  const { dialogVisible: addDialogVisible, openDialog: openAddDialog, closeDialog: closeAddDialog } = useDialog()
  const { uploadedFiles, fileInput, handleFileUpload, deleteFile, triggerFileUpload } = useFileUpload(uploadJsonFile)

  function handleMenuClick(menu) {
    activeMenu.value = menu
  }

  function editBookmark(row) {
    bookmarkForm.value = {
      title: row.title,
      url: row.url
    }
    openAddDialog()
  }

  function deleteBookmark(row) {
    const index = bookmarkList.value.findIndex(item => item.url === row.url)
    if (index > -1) {
      bookmarkList.value.splice(index, 1)
      total.value = bookmarkList.value.length
      ElMessage.success('删除成功')
    }
  }

  return {
    activeMenu,
    searchKeyword,
    isDayMode,
    uploadedFiles,
    fileInput,
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
    triggerFileUpload,
    toggleMode,
    openAddDialog,
    closeAddDialog,
    editBookmark,
    deleteBookmark,
    prevPage,
    nextPage,
    goToPage,
    handleJump,
    initTheme,
    resetPagination
  }
}