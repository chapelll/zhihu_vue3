//类型推断指变量在定义时ts会推测给它加上的类型
let str1 = 'string'
// str1 = 123

//联合类型是指在变量定义时不明确它的类型时可以指明多个类型
//此时只能访问这些类型共有的方法
let sss: number | string = 123
sss = 'string'

//类型断言指断言它的类型 as关键字
function getLength(input: string | number): number {
    const str = input as string  //断言input为string
    if (str.length) {
        return str.length
    } else {
        return str.toString().length
    }
}

//类型守卫 当联合类型中通过条件语句排除出一个类型后，ts会自动判断另一个类型
function getLength2(input: string | number): number {
    if (typeof input === 'string') {
        return input.length
    } else {
        return input.toString().length
    }
}
