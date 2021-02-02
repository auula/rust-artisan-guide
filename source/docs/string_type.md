
## 概 述

`Rust`语言提供了两种字符串，第一种`&str`是核心内置的数据类型，第二种`String`是字符串对象，是标准库中的一个公开的结构体。


## `&str`字符串面量

字符串面量在编译的时候就知道值的字符串类型，核心代码在`std:str`中就可以找得到，如果你感兴趣就看看源代码。

使用例子：


```rust linenums='1'
    // 字符串字面量模式是 静态的 这就意味着字符串字面量从创建时开始会一直保存到程序结束
    let city = "上海";
    let programmer = "rust coder";
    println!("city {0} programmer = {1}", city, programmer);
```

字符串面量默认就是“静态”的 你可以通过`static`关键字显示声明

```rust linenums='1'
    let name: &'static str = "Jarvib Ding";
    println!("my name is {name}", name = name);
```

## `String`对象

字符串是标准库提供的，字符串对象是是一个 `长度可变的集合`，它是 `可变` 的而且使用 `UTF-8` 作为底层数据编码格式，字符串对象在 `heap` 中分配的，在运行的时候可以对其进行操作。



- 一种是创建一个新的空字符串，使用 `String::new()` 静态方法。
- 另一种是根据指定的字符串字面量来创建字符串对象，使用 `String::from()` 方法。

简单使用示例:


```rust linenums='1'
    // 字符串对象
    let mut phone = String::new();
    phone.push_str("Apple iPhone 11");
    let iphone = String::from(phone);
    println!("{}", iphone);

    // 1 {{Hello}}
    let mut hello_string = String::new();
    hello_string.push_str("{");
    hello_string.push_str("Hello");
    hello_string.push_str("}");
    println!("{}", hello_string);
    
    let hello = String::from("Hello, world!");

    println!("{}",hello)

```

如果需要将字符串面量转成`Sting`对象你就需要使用`to_string()`，字符串面量是没有任何操作方法的，只能存储`字符串的内容`。

```rust linenums='1'
    let url = "https://getrust.tech";
    let mut domain = url.to_string();
    domain = domain.replace("https://", "");
    println!("domain is {}", domain);
```

output:

```bash
domain is getrust.tech
```

- 相关API文档:[https://doc.rust-lang.org/std/string/struct.String.html](https://doc.rust-lang.org/std/string/struct.String.html)
