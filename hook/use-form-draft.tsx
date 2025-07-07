import { useEffect } from 'react'
import { FieldValues, Path, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { LOCAL_STORAGE_KEY } from 'config/cache.config'
import { useDebounce } from 'use-debounce'

type LocaleStorageKey = (typeof LOCAL_STORAGE_KEY)[keyof typeof LOCAL_STORAGE_KEY]

function useFormDraft<T extends FieldValues>(watch: UseFormWatch<T>, setValue: UseFormSetValue<T>, key: LocaleStorageKey, options?: { shouldRestore?: boolean, excludeKeys: (keyof T)[]}) {
  useEffect(() => {
    if (options?.shouldRestore === false) return
    const cached = localStorage.getItem(key)
    if (!cached) return

    try {
      const values = JSON.parse(cached)
      Object.keys(values).forEach(k => {
        if (!options?.excludeKeys?.includes(k as keyof T)) {
          setValue(k as Path<T>, values[k])
        }})
    } catch (error) {
      console.warn('invalid cache draft', error)
      localStorage.removeItem(key)
    }
  }, [key, setValue, options?.shouldRestore, options?.excludeKeys])

  const values = watch()
  const [debouncedValues] = useDebounce(values, 300)

  useEffect(() => {
    const valuesToSave = { ...debouncedValues }
    options?.excludeKeys?.forEach((k) => delete valuesToSave[k as string])
    localStorage.setItem(key, JSON.stringify(valuesToSave))
  }, [debouncedValues, key, options?.excludeKeys])
}

export default useFormDraft