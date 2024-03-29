## `array`数组

虽然大部分变量都是基本数据类型，虽然这些基本数据类型可以满足我们一些开发需求，但是他们不是万能的。

- 基本数据类型的变量也有它们的局限性。

- 基本数据类型的变量本质上是`标量`，这意味着每个基本数据类型的变量一次只能存储一个值。

- 如果我们要存储的值非常多，成百上千，这种重复定义变量的方法是行不通的。

## 数组的特性

`数组` 是用来存储一系列数据，但它往往被认为是一系列相同类型的变量，也就是说，数组 是可以存储一个固定大小的相同类型元素的顺序集合。

- 数组的定义其实就是为分配一段`连续的相同数据类型`的内存块。

- 数组是静态的，这意味着一旦定义和初始化，则永远不可更改它的长度。

- 数组的元素有着相同的数据类型，每一个元素都独占者数据类型大小的内存块，也就是说。数组的内存大小等于数组的长度乘以数组的数据类型。
  
- 数组中的每一个元素都按照顺序依次存储，这个顺序号既代表着元素的存储位置，也是数组元素的唯一标识。我们把这个标识称之为`数组下标`。

- 可以更新或修改数组元素的值，但不能删除数组元素。如果要删除功能，你可以将它的值赋值为 0 或其它表示删除的值。

## 声明和初始化数组

1. `Rust`语言为数组的声明和初始化提供了三种语法

```rust linenums='1'
let year: [i32; 4] = [1999, 2019, 2020, 2021];
```
2. 省略数组类型的语法

```rust linenums='1'
let arr = [10,20,30,40];
```

3. 指定默认初始值的语法，这种语法有时候称为 默认值初始化。
   
**如果不想为每一个元素指定初始值，则可以为所有元素指定一个默认的初始值，例如下面的代码为每一个元素指定初始值为 `-1`了。**
```rust linenums='1'
let arr:[i32;4] = [-1;4];
``` 

**综合使用例子:**

```rust 
fn main() {
    let year: [i32; 4] = [1999, 2019, 2020, 2021];
    // let arr = [10,20,30,40];
    println!("array is {:?}", year);
    // len() 数组长度
    println!("array size is :{}", year.len());
}
```
output:
```rust 
array is [1999, 2019, 2020, 2021]
array size is :4
```

## `for in` 循环遍历数组

在其它语言中，一般使用 `for` `循环来遍历数组，Rust` 语言也可以，只不过时使用 `for` 语句的变种 `for ... in ..` 语句。

**因为数组的长度在编译时就时已知的，因此我们可以使用 `for ... in` 语句来遍历数组。**

```rust linenums='2'
for index in 0..year.len() {
        println!("index: {} , value: {}", index, year[index])
}
```

## 迭代数组`iter()`

我们可以使用 `iter()` 函数为数组生成一个迭代器。

```rust linenums='1'
for value in year.iter() {
        println!("value is: {}", value)
}
```

## 数组作为函数参数

数组可以作为函数的参数，而传递方式有 `传值传递` 和 `引用传递` 两种方式。

- `传值传递` 就是传递数组的一个副本给函数做参数，函数对副本的任何修改都不会影响到原来的数组。

- `引用传递` 就是传递数组在内存上的位置给函数做参数，因此函数对数组的任何修改都会影响到原来的数组。

**引用传递例子:**

```rust linenums='1' hl_lines="16"
fn main() {
    let mut year: [i32; 4] = [1999, 2019, 2020, 2021];
    // let arr = [10,20,30,40];
    println!("array is {:?}", year);
    // len() 数组长度
    println!("array size is :{}", year.len());

    for index in 0..year.len() {
        println!("index: {} , value: {}", index, year[index]);
    }

    for value in year.iter() {
        println!("value is: {}", value);
    }
    // updated of [1999, 2019, 2021, 2021]
    updated_by_index(2, 2021, &mut year);
    println!("updated of {:?}", year)
}

// 通过下标修改某个元素的值
fn updated_by_index(index: usize, value: i32, arr: &mut [i32; 4]) {
    arr[index] = value;
}

```

`Rust`中的数组声明是`[T;n]`进行的，`T`是元素类型，`n`是这组元素有多少个坑位，创建的时候可以去掉类型和大小，程序会自动推断出来。

```rust
    // 数组
    let arr:[f32;3] = [1.0,2.2,3.33];
    
    println!("{:?}",arr);
    
    // 类型自动推导
    let arr_infer = ["Hello",",","World!"];
    
    let mut str = String::new();
    // 迭代器
    for v in arr_infer.iter() {
        str.push_str(v);
    }
    
    println!("str = {}",str);
```

[点击查看元组代码案例](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=195d35086371375f182fc67922d81b44)