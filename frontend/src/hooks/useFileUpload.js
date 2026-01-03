import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export function useFileUpload(uploadApi, acceptedExtensions = ['.json']) {
  const uploadedFiles = ref([])
  const fileInput = ref(null)

  async function handleFileUpload(file) {
    if (!file) return

    const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
    
    if (!acceptedExtensions.includes(fileExtension)) {
      ElMessage.error(`请选择 ${acceptedExtensions.join(' 或 ')} 格式的文件`)
      return false
    }

    try {
      const result = await uploadApi(file)
      
      uploadedFiles.value.push({ name: file.name })
      
      if (result && result.data) {
        ElMessage.success('文件上传并解析成功')
        return result.data
      }
    } catch (error) {
      console.error('Upload error:', error)
      ElMessage.error('文件上传失败')
      return null
    }
  }

  function deleteFile(index) {
    uploadedFiles.value.splice(index, 1)
    ElMessage.success('文件删除成功')
  }

  function triggerFileUpload() {
    if (fileInput.value) {
      fileInput.value.click()
    }
  }

  function resetUploadedFiles() {
    uploadedFiles.value = []
  }

  return {
    uploadedFiles,
    fileInput,
    handleFileUpload,
    deleteFile,
    triggerFileUpload,
    resetUploadedFiles
  }
}
