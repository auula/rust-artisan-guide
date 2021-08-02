## 引用和借用

- 引用`reference`在语法上和有点像操作指针一样的感觉，本质上就是`Rust`提供的一种指针语义！
- 借用`borrowing`是对`reference`的行为的描述，在`rust`中变量可以分为可变和不可变，所以指针语义也就是引用也分为不可变引用和可变引用！

## 不可能引用

下面一个例子中我们定义了两个`vec`并且使用`vec_sum`进行求和。

```rust linenums='1'
fn main() {    
    let vec1 = vec![1,2,3];
    let vec2 = vec![4,5,6];
    println!("{}",vec_sum(vec1,vec2));
    println!("{:?} {:?}",vec1,vec2);
}

fn vec_sum(v1:Vec<i32>,v2:Vec<i32>) -> i32{
    let s1:i32 = v1.iter().sum();
    let s2:i32 = v2.iter().sum();
    s1 + s2
}
```

编译运行提示：

```rust linenums='1'
error[E0382]: borrow of moved value: `vec1`
  --> src/main.rs:18:26
   |
15 |     let vec1 = vec![1,2,3];
   |         ---- move occurs because `vec1` has type `Vec<i32>`, which does not implement the `Copy` trait
16 |     let vec2 = vec![4,5,6];
17 |     println!("{}",vec_sum(vec1,vec2));
   |                           ---- value moved here
18 |     println!("{:?} {:?}",vec1,vec2);
   |                          ^^^^ value borrowed here after move
```
可以看到提示`borrow of moved value: vec1`，说我们操作的值发生了移动，也就是所有权转移到函数里面了，外部不能再进行使用了，这里就是所有权转移。
```rust linenums='1'
fn main() {
    let vec1 = vec![1,2,3];
    let vec2 = vec![4,5,6];
    println!("{}",vec_sum(&vec1,&vec2));
    println!("{:?} {:?}",vec1,vec2);
}

fn vec_sum(v1:&Vec<i32>,v2:&Vec<i32>) -> i32{
    let s1:i32 = v1.iter().sum();
    let s2:i32 = v2.iter().sum();
    s1 + s2
}
```
修改之后的代码，我们使用了引用，把`vec`借用在函数里面使用，这样所有权还是属于外部的，只是在函数里面借用了，类似于`go`语言中的值传递值拷贝指针一样了。

## 借用规则

1. 对于一个资源的借用只能在一个作用域中有一个可变引用，或者有多个不可变引用，不能同时存在可变引用和不可变引用。
2. 在可变引用没有释放之前不能操作资源的所有者。
3. 引用的作用域要小于资源所有者的作用域，并且离开引用作用域之后就会得到释放。

下面代码，

```rust linenums='1'
fn main() {
    // 可变
    let mut x = 10;
    // 把x的可变引用赋值给y
    let  y = &mut x;
    
    let z = &mut x;
    // 解引用
    *y += 10;
    // 层层解
    *z += 10;
    println!("{}", z);
}
```
编译就会提示可变引用出现多次！！
```rust linenums='1'
   Compiling playground v0.0.1 (/playground)
error[E0499]: cannot borrow `x` as mutable more than once at a time
  --> src/main.rs:8:13
   |
5  |     let  y = &mut x;
   |              ------ first mutable borrow occurs here
...
8  |     let z = &mut x;
   |             ^^^^^^ second mutable borrow occurs here
9  |     // 解引用
10 |     *y += 10;
   |     -------- first borrow later used here
```

如果我们修改一下代码：

```rust linenums='1'
fn main() {
    // 可变
    let mut x = 10;
    // 把x的可变引用赋值给y
    let  y = &mut x;
    // 解引用
    *y += 10;
    // z是不可变的
    let z = &mut x;
    // 层层解
    *z += 10;
    println!("{}", z);
} 
```
修改完成之后，编译器就没有报错，是因为我们在操作可变之后再进行二次引用的。


下面是一个多层引用的例子：

```rust linenums='1'
fn main() {
    // 可变
    let mut x = 10;
    // 把x的可变引用赋值给y
    let mut y = &mut x;
    // 解引用
    *y += 10;
    // z是不可变的
    let z = &mut y;
    // 层层解
    **z += 10;
    println!("{}", x); // 30
}    
```