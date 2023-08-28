function echo<T>(arg: T): T {
    return arg
}

const result = echo(true)

// 交换数组位置
function swap<T, U>(arr: [T, U]): [U, T] {
    return [arr[1], arr[0]]
}

const res = swap(['1', 123])
let aa = res[0]
//泛型，相当于一个对参数的声明，使用它来明确了类型

//约束泛型,用于对泛型的类型约束
// function echoWithLength<T>(arg: T): T {
//     console.log(arg.length);
//     return arg
// }

//新定义一个接口，要求必须有length字段且类型为数组
interface haveLength {
    length: number
}
function echoWithLength<T extends haveLength>(arg: T): T {
    console.log(arg.length);
    return arg
}
//泛型T被haveLength接口约束了，它必须有length字段
echoWithLength('str')   //正确，字符串有length
echoWithLength([1, 2, 3]) //正确，数组有length
// echoWithLength(123)     //错误，数字没有length


//泛型也可以用于class和interface，来约束参数
interface KeyPair<T, U> {
    label: T,
    value?: U
}

let obj1: KeyPair<Number, String> = {
    label: 123,
    value: 'str'
}
let obj2: KeyPair<String, Boolean> = {
    label: 'xxxa',
    value: false
}