## `Rust` 函数

`函数`是一组可以执行的任务代码块，函数是一段可读的，可维护的和可重用的代码语句块。每个 `Rust` 程序都至少有一个函数，即主函数 `main()`，除了使用 `Rust` 核心和标准库提供的函数外，我们还可以自己定义自己的函数。


## 函数声明

`函数说明`就是告诉编译器一个`函数的名称`、`变量`、和`返回值类型`。这三个合在一起组成了`函数的签名`，`函数签名`的作用就是防止出现两个相同的函数。

![函数说明](https://tva1.sinaimg.cn/large/008eGmZEgy1gnlxm78bqrj30e306fdgg.jpg)

## 函数定义

`函数`可以帮我们把可以复用的代码组装到一个函数块里面，方便在其他地方进行调用。我们可以把代码划分到不同的函数中，这样可以使得代码可读性更强，逻辑更简单。

因此，定义函数时首先想的并不是我要定义一个函数，而是我这个任务要怎么做，要定义哪些函数来完成。

定义函数时必须以 `fn` 关键字开头，`fn` 关键字是 `function` 的缩写，函数内部必须包含函数要执行的具体代码，我们把这些代码称之为 `函数体`。

定义函数的语法如下，定义函数时必须使用 `fn`关键字开头，后面跟着要定义的`函数名`。

```rust linenums='1'
fn funcation_name(parma:data_type){
    // 函数代码
}
```

下面的代码，我们定义了一个函数名为 `say_hi` 的函数，用于输出一些信息

```rust linenums='1'
fn say_hi() {
    println!("👋 Hello!");
}
// 👋 Hello!
```
为了运行一个函数首先必须调用它。函数不像普通的语句，写完了会自动执行，函数需要调用才会被执行。

👇下面，函数 `main()` 就是 `调用者函数`，也就是 `调用者`。

```rust linenums='1' hl_lines='3'
fn main() {
    //调用函数 out: 👋 Hello!
    say_hi(); 
}

fn say_hi() {
    println!("👋 Hello!");
}
```

## 函数返回值

在我们的函数代码块可能需要处理一些逻辑，然后把处理的结果返回给调用者，我们将这些值称为 `函数返回值`。

Rust 语言的返回值定义语法与其它语言有所不同，它是通过在 `()小括号后面`使用 箭头` -> `加上数据类型 来定义的。

有 `return` 语句:

```rust linenums='1'
fn main() {
    assert_eq!(10,sum());
}

// 有返回值的函数
fn sum() -> i8 {
    return 5 + 5;
}
```

没有 `return` 语句则使用最后一条语句的结果作为返回值：

```rust linenums='1'
fn main() {
    assert_eq!(assert_sum(),sum());
}

fn sum() -> i8 {
    return 5 + 5;
}

fn assert_sum() -> i8 {
    5 + 5 // 最后一条语句返回 并且没有‘;’
}
```
## 函数参数

`函数参数` 是一种将外部变量和值带给函数内部代码的一种机制，函数参数是函数签名的一部分，函数签名的最大作用，就是防止定义两个相同的签名的函数。

- 我们把函数定义时指定的参数名叫做 `形参`
- 把调用函数时传递给函数的变量值叫做 `实参`

函数参数有两种传值方法，一种是把`值的值接传递`给函数，另一种是把`值在内存上的保存位置`传递给函数。

## 传值调用

`传值调用` 就是简单的把传递的变量的值传递给函数的 `形参`，从某些方面说了，就是把函数参数也赋值为传递的值。

因为是赋值，所以函数参数和传递的变量其实是各自保存了相同的值，`互不影响`，因此函数内部修改函数参数的值并不会影响外部变量的值。

```rust linenums='1'
fn main() {
    let name = "Jarvib";
    edit_name(name);
    println!("main() Your name is {}",name);
    // edit_name() Your name is Jarvib Ding
    // main() Your name is Jarvib
}

fn edit_name(mut name:&'static str){
    name = "Jarvib Ding";
    println!("edit_name() Your name is {}",name)
}
```

## 引用传递

值传递只是会重新创建一个变量，但引用传递则不会，引用传递把当前变量的内存位置传递给函数。

上面的代码中，星号`（*）` 用于访问变量 `param_no` 指向的内存位置上存储的变量的值，这种操作也称为 `解引用`。

```rust linenums='1'
fn main() {
    let mut no:i32 = 22;
    println!("The value of no is:{}",no);
    mutate_no_to_zero(&mut no);
    println!("The value of no is:{}",no);
    // The value of no is:22
    // The value of no is:0
}

fn mutate_no_to_zero(param_no:&mut i32){
   *param_no = 0; //解引用操作
}
```