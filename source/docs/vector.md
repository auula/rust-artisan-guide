## Vector

在`Rust`中的`Vector` 类型是一个动态数组`容器类型`，如果写过其他语言的话`Vector`和`Java`中`Vector`类的功能是很相似，也可以把它看作为`Go`中的切片类型。

## 创建
`Vector`是有大小限制的，在创建的时候可以通过`with_capacity(n)`来指定大小，也可以显示指定程序会自动推导出元素个数，如果当后面`Vector`添加新的元素的时候容量满了就会自动触发扩容机制。

1. 通过`new`创建，`push`方法会往尾巴添加元素值，`len`获取元素个数。

```rust
fn main() {
    // 通过new创建
    let mut vector:Vec<u8> = Vec::new();
    
    for v in 0..10 {
        vector.push(v);
    }
    
    // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    println!("{:?}",vector);
    
     // `len` 方法获得一个 vector 的当前大小
    println!("Vector size: {}", vector.len());
}
```

2. 通过`with_capacity(n)`来指定容量。

```rust
// 指定了容量大小
let mut vector_wcap:Vec<usize> = Vec::with_capacity(5);
    
    for v in 0..=5 {
        vector_wcap.push(v);
        // 看看什么时候触发扩容？？？
        if vector_wcap.len() > 5 {
            println!("index {}, Trigger expansion new len =  {}",v,vector_wcap.len())
        }
    }
    
    println!("{:?}",vector_wcap);
```
很明显在索引为`5`的时候触发了扩容。
```rust
index 5, Trigger expansion new len =  6
[0, 1, 2, 3, 4, 5]
```

## 修改和删除

`Vector`是一个动态的数组类型那么就应该支持`修改和删除`等操作。`Vector`访问支持通过索引和`get(i)`方法进行操作。

```rust
let mut vector:Vec<u8> = Vec::new();
    
    for v in 0..10 {
        vector.push(v);
    }
    
    // 通过索引访问
    vector[5] = 255;
    
    // [0, 1, 2, 3, 255, 5, 6, 7, 8, 9]
    println!("{:?}",vector);
```
也可以通过`get`函数进行获取某一个下标元素的值，但是返回的是一个`Option<T>`的类型，如果没有值返回的是`None`，`Option<T>`类型`Rust`中的一个特殊的类型，后面文章深入。

```rust
    // index 4 value is Some(255)
    println!("index 4 value is {:?}",vector.get(4));
    match vector.get(2) {
        Some(third) => println!("The third element is {}", third),
        None => println!("There is no third element."),
    }
```

还有一种访问方式就是使用`pop`方法，返回最后一个元素并且在`vec`中删除该返回的元素。

```rust
    
    let v = vector.pop();
    // pop return value is Some(9)
    println!("pop return value is {:?}",v);
```

删除元素则通过`remove(index)`进行删除元素。

```rust
    // 删除第一个元素
    vector.remove(1);
    // [0, 2, 3, 255, 5, 6, 7, 8]
    println!("{:?}",vector);
```

## 遍历


因为是可变的`vec`这里在`for`的时候也要加上`&mut`然后进行遍历。
```rust
    
    let mut vector_wcap:Vec<usize> = Vec::with_capacity(5);
    
    for v in 0..=5 {
        vector_wcap.push(v);
        if vector_wcap.len() > 5 {
            println!("index {}, Trigger expansion new len =  {}",v,vector_wcap.len())
        }
    }
    
    println!("{:?}",vector_wcap);
    
    let mut arr:[usize;10] = [0;10];
    let mut index = 0;
    // 可变引用
    for v in &mut vector_wcap {
        // 解引用
        arr[index] = *v;
        index+=1
    }
    // 
    println!("{:?}",arr);
```

## 小结
`vector`也支持通过`vec![]`宏进行创建和使用，本篇就学习一下和总结了一下`vector`的`crud`操作!

## 其他
- https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=a7f387f27832208d3b2d0727f476447e