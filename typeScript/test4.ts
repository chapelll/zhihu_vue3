//function
function add(x: number, y: number, z?: number): number {
    if (typeof z === 'number') {
        return x + y + z
    } else {
        return x + y
    }
}
//函数声明时需要声明它的参数的类型，同时可以设置可选参数

//使用interface可以定义函数的类型
interface Isum {
    (x: number, y: number, z?: number): number
}
let add1: Isum = add
// let arr: string = add