import { ref } from 'vue'

const audiences = ref<string[]>([
  'No audience',
  '1MCT',
  '2MCT',
  '3MCT',
  'MCT',
  'AI',
  'Next Web',
  'XR',
  'IOT',
])

export default function useAudiences() {
  return {
    audiences,
  }
}
