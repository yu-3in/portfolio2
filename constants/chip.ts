import { WorkTagType } from '@/features/work/types/WorkTagType'

export const CHIP_STYLE: Record<WorkTagType, string> = {
  default: 'bg-gray-300 text-black',
  award: 'bg-yellow-400 text-black',
  event: 'bg-sky-200 text-black',
}

export const CHIP_STYLE_OUTLINED: Record<WorkTagType, string> = {
  default: 'border-gray-300 text-black',
  award: 'border-yellow-400 text-black',
  event: 'border-sky-200 text-black',
}
