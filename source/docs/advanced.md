## 高阶函数
在函数式编程里面有一个编程方式叫作`advanced function`，函数也可以看作为一个一种类型。函数的参数和返回值类型可以是函数，高阶函数本身就是一个函数指针，也就是函数在内存的地址，然后通过地址进行调用。

## `Rust`中的高阶函数

可以使用`type`关键字定义一个类型别名，`fn(i32, i32) -> i32`参数和返回值都是`i32`类型，并定义了一个`math(op: MathOp, x: i32, y: i32) -> i32`函数，参数和返回值都是`i32`类型，然后`add` 和`sub`的函数签名和`MathOp` 类型一样即可使用，而`let hi: fn(&str) = say_hi;`是把一个函数绑定到一个变量上，方便后面进行调用。

```rust linenums='1'
// type定义别名
type MathOp = fn(i32, i32) -> i32;


fn add(x: i32, y: i32) -> i32 {
    x + y
}

fn sub(x: i32, y: i32) -> i32 {
    x - y
}

// 高阶函数
fn math(op: MathOp, x: i32, y: i32) -> i32 {
    op(x, y)
}

fn say_hi(name: &str) {
    println!("Hello {}！", name)
}

fn main() {
    // rust 函数式编程
    let hi: fn(&str) = say_hi;
    hi("Jarvib");
    println!("{}", math(add, 1, 5));
    println!("{}", math(sub, 10, 5));
    
}

```

## 闭包

闭包可以捕获作用域上的其他变量，在闭包函数体里使用！下面的`|x| x/div_num`就是一个闭包的函数体，`||`是函数类型，`x/div_num `是函数体。

```rust linenums='1'
fn main() {
    let div_num = 2;
    
    // 闭包
    let div = |x| x/div_num ;
    
    println!("10 / 2 = {}",div(10)); 
}   
```