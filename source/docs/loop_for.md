## 概念
`循环语句`一般是只在程序重复执行某块代码逻辑的词语，`循环 `其实就是一种重复，在`满足指定的条件`下，`重复的做某些事情`。就好比如只要时间没到 18:30，那么我们一直在重复的上班。

![循环](https://tva1.sinaimg.cn/large/008eGmZEgy1gnd3ygx486j30fa0fa0sz.jpg)

`Rust`循环语句有三种：

- `loop` 语句。一种重复执行且永远不会结束的循环。
- `while` 语句。一种在某些条件为真的情况下就会永远执行下去的循环。
- `for` 语句。一种有确定次数的循环。


1. 能确定次数的循环，比如 `for` 循环。
2. 满足条件就是永动机的循环，比如 `while` 循环。
3. 死循环，比如 `loop` 循环。


## `for` 循环语句

`for` 语句用于执行代码块指定的次数，可能和其它语言有所不同，`Rust` 中的 `for` 循环只有 `for..in` 这种格式，常用于迭代一组固定的值，例如`数组、向量`等。

```rust linenums='1'
fn main() {
    let mut sum: u16 = 0;
    for i in 1..100 {
        sum += i;
    }
    println!("sum = {}", sum)
}
// sum = 4950
```


## `while` 循环语句

`while` 循环会在每次重复执行前先判断条件是否满足，满足则执行，不满足则退出。



```rust linenums='1'
    sum = 0;
    while sum < 100 {
        sum += 1;
    }
    println!("sum = {}", sum); //100
```

## `loop` 循环语句

`loop` 语句代表着一种死循环。它没有循环条件，也没有循环次数，它就是一个永动机。

```rust linenums='1'
loop {
    // action 要重复执行的代码
}
```
真正意义上的死循环，这里就不做演示！

## `break` 循环控制语句 

`break` 语句的出现，就是为了在 `action` 语句块中可以退出循环语句。

```rust linenums='1'
    let mut n = 0;
    loop {
        if n == 100 {
            // stop action
            break;
        }
        n += 1;
    }
    println!("n = {}", n);  // 100
```


## `continue` 循环控制语句 

`continue` 语句，简单的说，就是停止执行剩下的语句，直接进入下一个循环。


```rust linenums='1'
    // 100以内偶数
    n = 0;
    loop {
        n += 1;
        if n == 100 {
            // stop action
            break;
        }
        if n % 2 == 0 {
            // stop action
            println!("偶数 {}", n);
            continue;
        }
    }
```
