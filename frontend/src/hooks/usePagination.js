import { ref, computed } from 'vue'

export function usePagination(initialPageSize = 10) {
  const currentPage = ref(1)
  const pageSize = ref(initialPageSize)
  const total = ref(0)

  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

  const displayPages = computed(() => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages.value <= maxVisible) {
      for (let i = 1; i <= totalPages.value; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage.value <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages.value)
      } else if (currentPage.value >= totalPages.value - 2) {
        pages.push(1, '...', totalPages.value - 3, totalPages.value - 2, totalPages.value - 1, totalPages.value)
      } else {
        pages.push(1, '...', currentPage.value - 1, currentPage.value, currentPage.value + 1, '...', totalPages.value)
      }
    }
    
    return pages
  })

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

  function handleJump(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  function resetPagination() {
    currentPage.value = 1
    total.value = 0
  }

  return {
    currentPage,
    pageSize,
    total,
    totalPages,
    displayPages,
    prevPage,
    nextPage,
    goToPage,
    handleJump,
    resetPagination
  }
}
