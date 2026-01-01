import request from '@/utils/request'

export function uploadJsonFile(file) {
  const formData = new FormData()
  formData.append('file', file)
  
  return request({
    url: '/resolution',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
