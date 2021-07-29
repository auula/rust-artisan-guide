## VecDeque
`VecDeque`是`Rust`内置的一个容器类型，`VecDeque`它的特性就是元素可以`FIFO`和`FILO`进行操作，添加元素支持从头部添加和尾巴追加，同样取元素也是一样的支持，特性和`Golang`中的`container/list`接近，废话不多说，直接上`Example Code`。

## 创建

首先如果需要使用`VecDeque`的话就需要导入`std::collections::VecDeque`模块，这个就和其他语言导包一样，同和支持创建的时候就指定大小`with_capacity(n)`或者直接`new`。

```rust
// 导入VecDeque模块
use std::collections::VecDeque;

fn main() {
    // 通过new创建
    let mut buf:VecDeque<u8> = VecDeque::new();
    
    // 从屁股后面插入
    for v in (1..=3).rev() {
        buf.push_back(v);
    }
    
    // [3, 2, 1]
    println!("{:?}",buf);
    
}
```
通过`with_capacity(n)`指定容量创建。

```rust
    // 通过with_capacity指定容量
    let mut buf_wcap:VecDeque<u8> = VecDeque::with_capacity(5);
    
    for v in &mut buf {
        // 从头部插入
        buf_wcap.push_front(*v);
    }
    
    // [1, 2, 3]
    println!("{:?}",buf_wcap);
```

## 获取元素

`VecDeque`获取元素同样也可以通过`get(index)`访问或者直接`vq[index]`进行操作。

```rust
// 导入模块
use std::collections::VecDeque;

fn main() {
    // 通过new创建
    let mut buf:VecDeque<u8> = VecDeque::new();
    
    // 从屁股后面插入
    for v in (1..=3).rev() {
        buf.push_back(v);
    }
    
    // [3, 2, 1]
    println!("{:?}",buf);
    
    // 通过with_capacity指定容量
    let mut buf_wcap:VecDeque<u8> = VecDeque::with_capacity(5);
    
    for v in &mut buf {
        // 从头部插入
        buf_wcap.push_front(*v);
    }
    
    // [1, 2, 3]
    println!("{:?}",buf_wcap);
    
    // 交换一下
    buf_wcap[2] = buf[0];
    
    // 断言如果相等没有错误则无提示 √
    assert_eq!(buf_wcap.get(2),Some(&buf[0]));
}
```
上面使用到了`Some`是代表有值，这个是`Option<T>`类型，还没有到写的时候，在后面会写。

如果需要按照`FIFO`和`FILO`这种规则可以使用内置的`pop_back`和`pop_front`进行操作。

```rust
    // 从buf头部取一个元素插到buf_wcap屁股上
    if let Some(elem) = buf.pop_front(){
        // 如果有值不为空则插入
        buf_wcap.push_back(elem);
    }
    // [1, 2, 3, 3]
    println!("{:?}",buf_wcap);
```
至于`remove`这种操作大家都是有经验的开发者了，闭着眼睛都能写吧。ok？？？？

## VecDeque Docs

- https://doc.rust-lang.org/std/collections/struct.VecDeque.html
- https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=3219a1391031f70a0fe221a6f837f884

