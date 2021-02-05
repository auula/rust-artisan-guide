## 概 述

`运算符`是用于对数据执行一些操作，被`运算符`执行的数据称为`操作数`。

例如我们常见的加法运算，那么` 加号 （ + ）` 就是一个运算符，例如：

```rust linenums='1'
fn main() {
    let result = 11 + 11;
    println!("11 + 11 = {}", result)
}
```
上面的`11 + 11`的运算符就是`+`，`result`就是运算结果。

## Rust 语言支持以下四种运算符

- 算术运算符
- 位运算符
- 关系运算符
- 逻辑运算符
- `Rust` 语言不支持自增自减运算符 `++` 和`--`
`加减乘除求余` 五则运算：

```rust linenums='1'
fn main() {
    // 加减乘除
    let result = 11 + 11;
    println!("11 + 11 = {}", result);
    println!("11 - 11 = {}", 11 - 11);
    println!("11 * 11 = {}", 11 * 11);
    println!("11 / 11 = {}", 11 / 11);
    println!("11 % 11 = {}", 11 % 11);
}

```

## 关系运算


关系运算符测试或定义两个实体之间的关系类型，关系运算符用于比较两个或多个值之间的关系，是大于，是等于还是小于，关系运算符的返回结果为 `布尔类型`。

![关系运算](https://tva1.sinaimg.cn/large/008eGmZEgy1gncyqiugmej30lm0blmyv.jpg)

```rust linenums='1'
    // 关系运算
    println!("1 > 0 {}", 1 > 0);
    println!("0 < 1 {}", 0 < 1);
    println!("21 >= 21 {}", 21 >= 21);
    println!("21 <= 21 {}", 21 <= 21);
    println!("0 == 0 {}", 0 == 0);
    println!("0 != 0 {}", 0 != 0);
```

## 逻辑运算符

逻辑运算符，用于组合两个或者多个条件，逻辑运算符的返回结果也是`布尔类型`。

![逻辑运算符](https://tva1.sinaimg.cn/large/008eGmZEgy1gncygkb6pgj30jd08zmyi.jpg)

```rust linenums='1'
    // 逻辑与  逻辑或 逻辑非 (取反)
    println!("1 == 1 && 0 != 1 {}", 1 == 1 && 0 != 1);
    println!("1 == 1 || 0 != 1 {}", 1 == 1 || 0 != 1);
    println!("!(1 == 1) {}", !(1 == 1));
    let a = 20;
    let b = 30;

    if (a > 10) && (b > 10) {
        println!("true");
    }
    let c = 0;
    let d = 30;

    if (c > 10) || (d > 10) {
        println!("true");
    }
    let is_elder = false;

    if !is_elder {
        println!("Not Elder");
    }
```

output：

```rust linenums='1'
1 == 1 && 0 != 1 true
1 == 1 || 0 != 1 true
!(1 == 1) false
true
true
Not Elder
```

## 位运算符
对数据的二进制位进行`位运算` 例如下面的例子：

![位运算符](https://tva1.sinaimg.cn/large/008eGmZEgy1gncygkb6pgj30jd08zmyi.jpg)

```rust linenums='1'
    //  位运算符
    let a: i32 = 2; // 二进制表示为 0 0 0 0 0 0 1 0
    let b: i32 = 3; // 二进制表示为 0 0 0 0 0 0 1 1

    let mut result: i32;

    result = a & b;
    println!("(a & b) => {} ", result); // 0 0 0 0 0 0 1 0 = 2

    result = a | b;
    println!("(a | b) => {} ", result); // 0 0 0 0 0 0 1 1 = 3

    result = a ^ b;
    println!("(a ^ b) => {} ", result);

    result = !b;
    println!("(!b) => {} ", result);

    result = a << b;
    println!("(a << b) => {}", result);

    result = a >> b;
    println!("(a >> b) => {}", result);
```
output：
```rust linenums='1'
(a & b) => 2
(a | b) => 3
(a ^ b) => 1
(!b) => -4
(a << b) => 16
(a >> b) => 0
```