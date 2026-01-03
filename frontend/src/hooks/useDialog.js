import { ref } from 'vue'

export function useDialog(initialVisible = false) {
  const dialogVisible = ref(initialVisible)

  function openDialog() {
    dialogVisible.value = true
  }

  function closeDialog() {
    dialogVisible.value = false
  }

  function toggleDialog() {
    dialogVisible.value = !dialogVisible.value
  }

  return {
    dialogVisible,
    openDialog,
    closeDialog,
    toggleDialog
  }
}
