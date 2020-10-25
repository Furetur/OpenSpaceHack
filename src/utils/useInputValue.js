import { useCallback, useState } from 'react'

const useInputValue = (defaultValue = '') => {
    const [value, setValue] = useState(defaultValue)
    const onChange = useCallback((event) => setValue(event.target.value), [])
    return [value, onChange]
}

export default useInputValue
