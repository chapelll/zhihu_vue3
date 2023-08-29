//类型别名
let sum: (x: number, y: number) => number
//每次都这样写很累，所以可以定义一个类型，它是一种模板
type PlusType = (x: number, y: number) => number
let sum1: PlusType

//类型别名支持联合类型
type strAndNumber = string | number
let result2: strAndNumber = '132'
result2 = 123

//字面量
let aaaa: 1 = 1
let bbbb: 'SSS' = 'SSS'

//交叉类型
interface Ixyz {
    name: string
}
type jiaocha = Ixyz & { age: number } //type定义类型时可以和接口自由组合
let person:jiaocha = {
    age: 123,
    name: '456'
}

