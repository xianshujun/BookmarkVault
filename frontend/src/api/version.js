import request from '@/utils/request'

export function getVersions() {
  return request({
    url: '/api/versions',
    method: 'get',
    data: 'versions'
  })
}

export function getVersionDetail(id) {
  return request({
    url: `/api/version/${id}`,
    method: 'get'
  })
}

export function recoverVersion(id) {
  return request({
    url: `/api/recover/${id}`,
    method: 'post'
  })
}

export function uploadJsonFile(file) {
  const formData = new FormData()
  formData.append('file', file)
  
  return request({
    url: '/api/resolution',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
