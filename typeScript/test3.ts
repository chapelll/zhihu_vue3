// interface
// interface用作描绘一个对象的类型，一般用与对对象的属性约束

interface Person {
    name: string,
    readonly age: number, //只读属性
    id?: number, //可选属性
}

let p: Person = {
    name: '1',
    age: 132
}

p.name = 'zs'
p.id = 123
//p.age = 456 只读属性只能在定义的时候赋值，以后无法修改