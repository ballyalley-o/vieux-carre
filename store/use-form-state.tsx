import { create } from 'zustand'

interface FormState {
  isDirty: boolean
  setDirty: (dirty: boolean) => void
}

export const useFormState = create<FormState>((set) => ({
  isDirty: false,
  setDirty: (dirty) => set({ isDirty: dirty })
}))