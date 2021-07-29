`hashmap`这种数据结构大多数语言都支持的，是一种特殊的数据结构，它由`key`和`value`进行存储操作，也就是键值对结构。


## 使用API
`hashmap`是在`std::collections::HashMap;`下的，所以使用的时候需要导入改模块，导入之后可以使用`new`关联函数来创建一个实例。

插入操作就是使用`insert`函数，获取元素使用`get`进行操作。

```rust
fn main() {
    let mut map = HashMap::new();
    
    map.insert("foo","bar");
    
    println!("{:?}",map.get("foo"));
}
```
也可以通过泛型的方式进行创建。

```rust
    //通过泛型创建一个map
    let mut map: HashMap<&str, i32> = HashMap::new();

    map.insert("Java", 100);
    map.insert("Golang", 80);
    map.insert("Rust", 70);

    println!("{:?}", map);
```
`key`有值的话不做操作，反之插入值。

```rust
    map.entry("JavaScript").or_insert(86);

    //遍历map
    for (i, v) in map.iter_mut() {
        println!("index = {}  value = {}", i, v);
    }
```

上面的`map.iter_mut()`函数会生成一个迭代器，查看`key`是否存在和移除指定的`key`。

```rust
    if map.contains_key("Java") {
        map.remove("Java");
    }
    println!("{:#?}", map);
```