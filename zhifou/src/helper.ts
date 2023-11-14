import { ColumnProps } from './store'

export function generateFitUrl(column: ColumnProps, width: number, height: number) {
    if (column.avatar) {
        column.avatar.fitUrl = column.avatar.url + `?x-oss-process=image/resize,m_pad,h_${height},w_${width}`
    } else {
        column.avatar = {
            fitUrl: require('@/assets/column.jpg')
        }
    }
}


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