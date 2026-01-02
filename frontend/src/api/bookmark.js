import request from '@/utils/request'

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

export function refreshBookmarks() {
  return request({
    url: '/api/refresh',
    method: 'post',
    data: 'refresh'
  })
}

export function getBookmarks() {
  return request({
    url: '/api/bookmarks',
    method: 'get'
  })
}

export function addBookmark(data) {
  return request({
    url: '/api/add',
    method: 'post',
    data: data
  })
}

export function searchBookmarks(keyword) {
  return request({
    url: '/api/search',
    method: 'post',
    data: {
      keyword: keyword
    }
  })
}
