## 概 述

> 每个编程语言都离开不`变量`这个概念，`Rust`也一样，今天就说说`Rust`中的变量。

## 概 念

- 不可变的变量
- 可变的变量
- 变量的重影`Shadowing`


> `Rust`首先是一门强类型的语言并且具备自动判断变量类型的能力。有了这种能力之后，使得开发者在编码的过程中会产生一种自己在使用一门类似于`JavaScript`弱类型语言的假想。

![wtf ？？？](https://tva1.sinaimg.cn/large/008eGmZEgy1gmyzfrz1g1j30g10giq9j.jpg)


**当然`Rust`不是这样的，`Rust`强类型的!`Rust`强类型的!，`Rust`强类型的! 说3遍，如果是上面👆图片这样我不会入坑的。。** [感兴趣的可以去看看`v8`引擎。。](https://chromium.googlesource.com/v8/v8.git)


## 不可变的变量

在`Rust`中声明一个变量要使用`let`关键字，看下面代码

```rust linenums="1" 
fn main(){
    // 通过let 声明的变量是不可变的
    let v = "variable";
    println!("这是一个不可变的变量: {}",v);
    //unexpected token
    v = "var 2" 
    println!("{}",v)
}
```

编译这段代码编译器会报错:

```bash linenums="1" hl_lines="4" 
error[E0384]: cannot assign twice to immutable variable `v`
  --> variable.rs:13:5
   |
10 |     let v = "variable";
   |         -
   |         |
   |         first assignment to `v`
   |         help: make this binding mutable: `mut v`
...
13 |     v = "var 2" ;
   |     ^^^^^^^^^^^ cannot assign twice to immutable variable

error: aborting due to previous error

For more information about this error, try `rustc --explain E0384`.
```
**关键消息:** 不能两次分配不变的变量! ❎错误在于`v`这个变量是不可变的变量，不能进行第二次进行赋值修改。由于个人之前写过`Java`和`Go`感觉有点类似于`Java`语言中的`final`关键字修饰的变量，看这句话的之前你得先了解`java`相关的编译机制。如果我们编写的程序的一部分在假设值永远不会改变的情况下运行，而我们代码的另一部分在改变该值，那么代码的第一部分可能就不会按照设计的意图去运转，由于这种原因造成的错误很难在事后找到。这是 `Rust` 语言设计这种机制的原因。

> 这就牵扯到了 `Rust` 语言为了高并发安全而做的设计：在语言层面尽量少的让变量的值可以改变。所以 `v` 的值不可变。

## 可变变量

如果想声明一个可被修改的变量这时我们就使用`mut`关键字:

```rust linenums="1"
    // 通过mut关键字声明的变量可以被修改
    let mut m = 123;
    //println!("m assigned value is {}",m);
    m = 666 + m;
    println!("这是一个可变变量: {}",m);
    // OUTPUT： 789
```

## 重影 & Shadowing

看看代码，按照之前我说的`let`声明的变量是不可变的，下面代码会编译出错吗？？？

```RUST linenums="1"
    let s = 32;
    let s = 32 + s;
    println!("s value is {}",s);
    let s = s - 32;
    println!("s value assigned value is {}",s);
```

**答案是:** 可以✅

编译代码编译器没有报错，很多人就奇怪了，`let`声明的变量不是不可变吗？
对的，`let`关键字重新声明的相同变量的名的变量会砍掉之前的变量
并且如果需要之前变量的值就会拿到值然后在删除掉，重新分配，可以通过查看地址查看变化。

```rust linenums="1"
    // 可以通过查看内存地址就查看
    println!("old s pointer is {:p}",&s);
    let s = s;
    println!("new s pointer is {:p}",&s);
```

> 重影的概念与其他面向对象语言里的"重写"（`Override`）或"重载"（`Overload`）是不一样的，重影就是指变量的名称可以被重新使用的机制。


## 常量与不可变变量的区别

在`Rust`想声明常量可以使用`const`关键字:

```Rust linenums="1"
    const MY_AGE:u64 = 22;
    println!("my age is {}",MY_AGE) // 22
```

- 常量名的命名规则可变量的命名规则一样，但常量名一般都是`大写`字母。

- 定义常量时必须指定数据类型，而定义变量时数据类型可以省略。

- 虽然声明变量时使用 `let` 关键字也会导致 变量不可以重新赋值，但我们可以加上 `mut` 关键字来让变量可以被重新赋值。然而常量却没有这种机制，常量一旦定义就永远不可变更和重新赋值。

- 常量只能 被赋值为 `常量表达式/数学表达式`，不能是 `函数返回值` 或者其它只有在运行时才能确定的值。

- 这是因为 常量 只是一个符号，会在 编译时 替换为具体的值，这个有点类似于 `C` 语言中的 `#define` 定义的符号。

- 常量与变量的另一个不同点是：` 常量不能被屏蔽/遮挡/重影，也不能被重复定义`。

```rust linenums="1" 
fn main() {
   const NAME:&str = "Jarvib Ding";
   const NAME:usize = NAME.len(); 
   //Error : `NAME` already defined  已经被定义了 不能重复
   println!("name: {}",NAME);
}
```

## 小 结
通过这几段代码例子就能看出来`Rust`设计者对程序安全的重视，还有很多人说`Rust`对程序员要求很高，就这么简单几个例子，新手上来估计要和编译器斗争几把，才能成功编译。在你和编译器斗争的时候你已经得到了进化了，好了，以上是我个人学习总结，有问题`call`我在`github`上联系我，后面如果有时间的话，文章还会继续跟进。

## 相关资料
- https://chromium.googlesource.com/v8/v8.git
- https://github.com/higker/learning-rust-zh
- https://cloud.tencent.com/developer/article/1379380