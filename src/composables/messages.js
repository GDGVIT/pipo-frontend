import { computed, ref } from 'vue'
import { sha256 } from 'js-sha256'

const messages = ref([])

const toastify = () => {
  const addMessage = (data) => {
    if (data.message) {
      const message = {
        mid: sha256(data.message),
        time: data.time ? data.time : 1000,
        ...data
      }
      messages.value.push(message)
    }
  }

  const notifications = computed(() => messages.value)

  return { addMessage, notifications }
}

export { toastify }
