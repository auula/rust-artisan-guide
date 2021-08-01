## 泛型
泛型可以帮助程序员提高编写程序的通用性和开发效率，在运行的时指定数据类型的机制，一个代码模板可以适配多种常见，`Rust`中也具备这种特性，在`Rust`泛型是通过`<T>`这样的泛型语法来表示任意的数据类型。

下面的代码定义了一个矩形他的`width`和`hight`是不确定的类型，所有使用泛型来代替。

```rust linenums='1'
// 矩形 泛型
#[derive(Debug)]
struct Rectangle<T> {
    width: T,
    hight: T,
}
```
使用的时候则编译器会根据上下文我们传入的类型进行推断出来具体的类型。

```rust linenums='1'
fn main() {
    let rtl = Rectangle {
        width: 6,
        hight: 12,
    };

    println!("{:?}", rtl);
}
```
我们还可以通过泛型为其特定的数据类型编写特有的函数。

```rust linenums='1'
// 为rectangle实现i32方法
impl Rectangle<f32> {
    pub fn area(&self) -> f32 {
        self.width * self.hight
    }
}

// 实现泛型trait
impl<T> Rectangle<T> {
    pub fn widht(&self) -> &T {
        &self.width
    }
    pub fn hight(&self) -> &T {
        &self.hight
    }
}

```

## 特性`trait`

`trait`类似于其他语言里面的接口，可以把一些类型共有的函数抽象成一个`trait`，然后去实现特定的`trait`即可。

下面第一个`Geometry`的特性里面有一个`area`纯虚函数，然后我们去实现它。

```rust linenums='1'
// 接口特性
trait Geometry {
    fn area(&self) -> i32;
}

// 为i32类型的实现求面积特性
impl Geometry for Rectangle<i32> {
    fn area(&self) -> i32 {
        self.width * self.hight
    }
}

// 为rectangle实现i32方法
impl Rectangle<f32> {
    pub fn area(&self) -> f32 {
        self.width * self.hight
    }
}
```
然后我们通过一个闭包函数来测试是否正确。

```rust linenums='1'
fn main() {
    let rtl = Rectangle {
        width: 6,
        hight: 12,
    };

    // method `area` not found for this
    println!("area = {}", rtl.area());
    println!("widht = {}", rtl.widht());
    println!("hight = {}", rtl.hight());
    println!("{:?}", rtl);

    let area_func = |g: &dyn Geometry| println!("area_func = {}", g.area());

    area_func(&rtl);
}
```

**下面是一个综合例子，一个计算机实现了USB协议！**

```rust linenums='1'
struct Computer {
    brand: String,
}

trait USB2 {
    fn usb_2(&self);
}

trait USB3 {
    fn usb_3(&self);
}

impl USB2 for Computer {
    fn usb_2(&self) {
        println!("{} impl usb2.0 ", &self.brand)
    }
}

impl USB3 for Computer {
    fn usb_3(&self) {
        println!("{} impl usb3.0 ", &self.brand)
    }
}

// usb(pc:impl USB3+USB2)
fn usb<T>(pc: T)
where
    T: USB3 + USB2,
{
    pc.usb_2();
    pc.usb_3();
}

fn main() {
    usb(Computer {
        brand: "Dell".to_string(),
    })
}
```
## 代码例子
- [https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=01247d98e555d76b0db7ba64f9f1d5af](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=01247d98e555d76b0db7ba64f9f1d5af)