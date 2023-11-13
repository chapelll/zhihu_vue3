
interface checkCondition {
    format?: string[],
    size?: number
}

type errorType = 'format' | 'size' | null

export function beforeUploadCheck(file: File, condition: checkCondition) {
    const { format, size } = condition
    const isValidFormat = format ? format.includes(file.type) : true
    const isValidSize = size ? (file.size / 1024 / 1024) < size : true
    let error: errorType = null
    if (!isValidFormat) {
        error = 'format'
    }
    if (!isValidSize) {
        error = 'size'
    }
    return {
        passed: isValidFormat && isValidSize,
        error
    }
}