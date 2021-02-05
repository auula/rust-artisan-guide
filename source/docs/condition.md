## 概 念

在计算机科学中，`条件表达式`又称条件运算式、`条件表示式`，是一种编程语言的功能，它可以用来决定当程序指定的布尔运算值为真或假时，程序接下来将会采取的行动。

计算机之所以能做很多自动化的任务，因为它可以自己做条件判断。

![条件判断](https://tva1.sinaimg.cn/large/008eGmZEgy1gnd106bi2oj30by0cn0su.jpg)

计算机程序会根据条件不同执行不同的代码。

![条件判断](https://tva1.sinaimg.cn/large/008eGmZEgy1gnd11rkek3j30jy06s0tk.jpg)

## `if` 语句语法

`Rust` 语言中使用` if `语句来模拟现实生活中这种` 如果...就` 的情况.

```rust linenums='1'
fn main() {
    let age = 22;
    if age > 18 {
        println!("你已经成年了！")
    }
}
// OUT
// 你已经成年了！
```

## `if else` 语句

1. 在 `if else` 语句中，`if` 语句才是最主要的。如果 `条件` 为真，就没 `else` 语句啥事了。

2. 其实 `if` 语句后面的 `else` 语句是可选的。就像我们所说的，如果`条件`为假就什么都不做，那要 `else `语句有什么用呢？`else` 语句的唯一作用，就是 `if` 语句中的 `条件` 为假时做些什么，执行些什么。
   
![if else 语句](https://tva1.sinaimg.cn/large/008eGmZEgy1gnd27tb2orj306z08xglo.jpg)

我们写一段代码，使用 `if else` 语句来判断一个数是否偶数或奇数，如果是偶数则输出 `偶数`，如果是奇数则输出 `奇数`。

```rust linenums='1'
fn main() {
   let num = 12;
   if num % 2==0 {
      println!("偶数"); //√
   } else {
      println!("奇数");
   }
}
```
## `if...else if...` 语句

`if...else if...`特点是那个条件先满足就执行那块代码。

我们使用嵌套 `if` 语句来写一段代码，判断某个值是 `大于、小于、等于 0`。

```rust linenums='1'
fn main() {
   let num = 2 ;
   if num > 0 {
      println!("{} is positive",num); // √
   } else if num < 0 {
      println!("{} is negative",num);
   } else {
      println!("{} is neither positive nor negative",num) ;
   }
}
```
## `match` 语句

`match` 语句用于检查 某个当前的值 是否匹配` 一组/列值` 中的某一个。

如果你会` C `语言，那么 `Rust` 中的 `match` 表达式则类似于 `C` 语言中的 `switch` 语句。

```rust linenums='1'
// match 语句有返回值，它把 匹配值 后执行的最后一条语句的结果当作返回值。
let expressionResult = match variable_expression {
   constant_expr1 => {
      // 语句;
   },
   constant_expr2 => {
      // 语句;
   },
   _ => {
      // 默认
      // 其它语句
   }
};
```

首先要说明的是 `match` 关键字后面的表达式不必括在括号中。也就是 `variable_expression` 不需要用一对 括号(`()`) 括起来。

其次，`match` 语句在执行的时候，会计算 `variable_expression `表达式的值，然后把计算后的结果和每一个 `constant_exprN` 匹配，使用的是 全等于 也就是 `===` 来匹配。如果匹配成功则执行 `=> {}` 里面的语句。

如果 `variable_expression` 表达式的值没有和任何一个 `constant_exprN` 匹配，那么它会默认匹配 _。

因此，当没有匹配时，默认会执行 `_ => {}` 中的语句。

`match` 语句有返回值，它把 匹配值 后执行的最后一条语句的结果当作返回值。

`_ => {}` 语句是可选的，也就是说 `match` 语句可以没有它。

```rust linenums='1'
    let month = "二月";

    let english_month = match month {
        "一月" => "January",
        "二月" => "February", // ✅
        "三月" => "March",
        "四月" => "April",
        _ => "Unknown",
    };
    println!("{}", english_month)
```
