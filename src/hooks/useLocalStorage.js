import { useEffect, useState } from 'react'

const PREFIX = 'codepen-clone-'

export default function useLocalStorage(key, initialValue) {
  const prefixKey = PREFIX + key

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixKey)
    if (jsonValue != null) return JSON.parse(jsonValue)

    // if (typeof initialValue === 'function') {
    //   return initialValue()
    // } else {
    //   return initialValue
    // }
    return initialValue
  })

  useEffect(() => {
    localStorage.setItem(prefixKey, JSON.stringify(value))
  }, [prefixKey, value])

  return [value, setValue]
}