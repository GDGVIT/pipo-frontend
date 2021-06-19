import { ref, watch } from 'vue'

const generalFilter = ref('All Badges')
const myPostsFilter = ref('All Badges')

const filter = () => {
  watch(generalFilter, () => {
    console.log('General filter changed! => ', generalFilter.value)
  })

  return { generalFilter, myPostsFilter }
}

export { filter }
