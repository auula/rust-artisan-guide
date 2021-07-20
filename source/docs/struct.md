## enum

枚举类型，如果你之前从事过`Java`相关的开发应该不陌生，在`Rust`里面也有`枚举`类型，枚举类型是一个自定义数据类型，通过`enum`关键字来声明，`body`里面可以包含多个自定义的枚举值，枚举可以用来限制某个值或者类型范围。

```rust
    #[derive(Debug)]
    enum Gender {
        Boy,
        Girl,
    }
```
上面就定义一了个类型名字为`Gender`的枚举，`Boy`和`Girl`是枚举可供使用的值，`#[derive(Debug)]`注释是让`Gender`自动实现`Debug tarit`后面文章将深入。

## struct

结构体可以把一些自定义的数据类型通过已有的类型组装成一个新的自定义数据类型，通过`struct`关键字就可以创建一个结构体，结构体字段格式`name:type`，`name`是结构体字段名，`type`是字段的类型，默认是不可变的。

```rust
fn main() {

    // 枚举现在取值范围
    #[derive(Debug)]
    enum Gender {
        Boy,
        Girl,
    }
    
    // 定义一个结构体
    #[derive(Debug)]
    struct Programmer<'skill> {
        name: String,
        skill: [&'skill str; 3],
        sex: Gender,
    }
    
    // 创建一个实例
    let engineer = Programmer {
        name: String::from("Jaco Ding"), // String类型内容可变
        skill: ["Java","Go","Rust"], // 一个长度为3的字符串面量类型的数组
        sex:Gender::Boy, // 通过枚举限制参数类型
    };
    
    println!("engineer = {:?}",engineer);
}
```
有了自定义的类型了也就是`struct`就可以通过自定义的类型来处理一些特殊的需求了，例如下面的代码定义了一个元素类型为`Programmer`长度为`2`的数组。

```rust
    let Doris = Programmer {
        name: String::from("Doris"),
        skill: ["Vue","TypeScript","JavaScript"],
        sex:Gender::Girl,
    };
    
    let Jaco = Programmer {
        name: String::from("Jaco"),
        skill: ["Java","Go","Rust"],
        sex:Gender::Boy,
    };
    
    let employees:[Programmer;2] = [Doris,Jaco];
    
    for e in employees.iter() {
        println!("{:?}",e)
    }
```

结构体`Programmer`上的`<'skill>` 解决`skill`数组的生命周期问题`undeclared lifetime`，所有权问题，所有权是`Rust`语言核心的知识点，这些在后面文章中慢慢更新。

## 给结构体添加方法

结构体(`struct`)支持组合不同的数据类型，但不同于元组，结构体需要给每一部分数据命名以标志其含义，因而结构体比元组更加灵活，不依赖顺序来指定或访问实例中的值。

1. 定义结构体
```rust
struct User {
    name: String,
    age: u8,
    is_man: bool,
    weight: f32,
}
```
2. 创建实例
```rust
let mut user1 = user {
      // 根据指定的字符串字面量来创建字符串对象，使用 String::from() 方法。
      name: String::form("Jarvib Ding"),
      age: 0x16,
      is_man: true,
      weight: 67.8,
};
```
3. 实现方法
```Rust
struct User {
    name: String,
    age: u8,
    is_man: bool,
    weight: f32,
}

impl User {
    // gender 返回性别字符串
    fn gender(&self) -> &'static str {
        if self.is_man {
            return "is it a boy.";
        }
        "is a girl"
    }
    // say_hi 打招呼函数
    fn say_hi(&self) {
        println!(
            "Hi, my name is {},age is {} and weight is {} kg,{}",
            self.name,
            self.age,
            self.weight,
            self.gender()
        );
    }
}

fn main() {
    let user1 = User {
        name: String::from("Jarvib Ding"),
        age: 0x16,
        is_man: true,
        weight: 67.8,
    };
    user1.say_hi()
}
```
`impl`是`implementation`的缩写，后面加结构体名，表示为该结构体实现方法，要实现的方法包在`impl`块中，依然使用`fn`关键字。类似`Java`中的`this`关键字。

好了，运行这个`say_hi`函数:
```bash
cargo run
    Finished dev [unoptimized + debuginfo] target(s) in 0.00s
     Running `target/debug/demo`
     
Hi, my name is Jarvib Ding,age is 22 and weight is 67.8 kg,is it a boy.
```

## 小结

`Rust`中的结构体还有两种特殊结构：`元组结构体`、`单结构体`，枚举也有`带有参数`的枚举。。。本文就学习总结了一下常见复合类型的使用，未深入。
