import { readonly, ref } from 'vue'

const shouldFocus = ref(true)

const focusSearch = () => {
  const focus = readonly(shouldFocus)

  const updateShouldFocusSearch = (bool) => {
    shouldFocus.value = bool
  }

  return { focus, updateShouldFocusSearch }
}

export { focusSearch }
