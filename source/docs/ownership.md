###  Rust入门到劝退？？我在学`ownership`!

在说`Rust`中的`ownership`之前那就要说说计算机内存和程序在运行的时候是怎么管理内存的，如果不把这些搞清楚，就去写一些`ownership`的文章我个人感觉简直就是扯淡。如果能将语言分类的话可以按照`解释型`和`编译型`或者看他们各自的内存模型来进行分类，如果要按照内存的管理方式的话，听过一句话：`汇编和C、C++...`才算一门真正意义的编程语言，有`GC`的和`脚本语言`只是帮助了初级程序员更容易写程序，加速了内卷罢了（各位不喜勿喷哦😯）。


### 不同的管理方式
内存管理的方式有很多种例如`JVM`带`GC`的，`Swift`中`ARC`的...... 

`Java`众所周知，`JVM` 虚拟机有自动内存管理机制，如果出现内存泄漏和溢出方面的问题，排查错误就必须要了解虚拟机是怎样使用内存的，内存分配的所有内容都是由一些称为垃圾收集的`process`处理的也称之为`garbage collection process`，垃圾回收♻️不是这篇文章的重点，如果你感兴趣可以看本文后面`Brian Goetz `的文章链接，我继续写其他的了。


![JVM内存布局](https://tva1.sinaimg.cn/large/008i3skNgy1gstf5rkpm8j30yg0g7775.jpg)

另外一种就是`swift`中使用的`Automatic Reference Counting`，自动引用计数来跟踪和管理程序的内存使用情况，每次创建类的新实例时，`ARC` 都会分配一块内存来存储有关该实例的信息。该内存保存有关实例类型的信息，以及与该实例相关联的任何存储属性的值，只有引用类型变量所引用的对象才需要使用引用计数器进行管理，对于枚举、结构体等，他们都是值类型的，(会发现和`Rust`中的`value semantic`和`reference semantic`有点类似)，因此不需要使用引用计数进行管理。


### 堆栈
如果连这两种数据结构都不太熟悉，去扯内存管理，我个人觉得简直就是™在扯淡。


> 操作系统会为`进程`（正在运行的应用程序）分配`内存空间`用于存放程序在执行过程中需要的代码和数据。根据内存的使用方式不同，会把内存划分成几个具有不同功能的区域。其中一块区域叫做`堆栈`（也被称为栈），它和数据结构中的栈一样具有`后进先出`的性质。`堆栈`用于记录函数在调用过程中产生的信息，比如函数局部变量和参数等信息。本文后面提到的`栈`均指的是内存中的`堆栈`。

CPU提供了对栈内存进行`压栈`（`push`）和`出栈`（`pop`）的指令，同时还有一个叫做`栈指针`（`sp`）的寄存器用来保存`栈顶`位置的`内存地址`。`栈内存`是从`高地址`向`低地址`空间发展，这一点跟正常的思维习惯有点不一样，也就是说当你向`栈`中`push`一个新的数据时，栈的地址会变小。

**为了方便表示本文后面的所有栈结构图中的每个格子都是8个字节 ，同时我们也假设push和pop指令每次操作8个字节**。

下图是一个大小为`80`个字节（图中每个格子是`8`个字节）的`栈`，地址范围是`0~79`。

`栈指针`指向栈顶的位置：



![stack](https://tva1.sinaimg.cn/large/008i3skNgy1gsxw94dx7sj30cy09eglm.jpg)


**后面提到的指令均是类似于C语言的伪代码，只是用来描述栈的变化过程。**

**1. 压栈**

压栈时把`栈指针`往`低地址`移动也就是减小栈指针，然后把数据写入到以`栈指针`开始的内存中。

例如要把数值`123`压入到栈中，对应的指令就是：

```c
push(123);
```

它的效果等价于下面这两条指令：

```c
sp = sp - 8;
*sp = 123;
```

由于我们假设push指令每次操作8个字节，所以第1条指令先把`sp`（栈指针）向低地址移动8个字。然后第2条指令再把数据写入到以`sp`开始的那8个字节的内存中。`*sp`表示的是`栈指针`所指向的那块内存空间，而不是`栈指针`本身。



![栈变化过程](https://tva1.sinaimg.cn/large/008i3skNgy1gsxw9w2x05j30p609ajrm.jpg)


**2. 出栈**

出栈时先取出以`栈指针`开头的8个字节（我们假设pop每次操作8个字节）的数据，再把`栈指针`向高地址移动8个字节也就是增加栈指针。

把压栈例子中`栈顶`的数据出栈至变量`rax`中，对应的指令：

```c
pop(rax);
```

它的效果等价于下面这两条指令：

```c
rax = *sp;
sp = sp + 8;
```

先把以`栈指针`开始的`8`个字节的数据放入变量`rax`中，由于压栈例子中压入的是`123`，所以此时出栈的数据也是`123`，最后把`栈指针`向高地址移动`8`个字节。

![栈变化过程](https://tva1.sinaimg.cn/large/008i3skNgy1gstgrhktm5j30q709a74l.jpg)

### 函数栈帧

当一个函数在运行时，需要为它在`堆栈`中创建一个栈帧（`stack frame`）用来记录运行时产生的相关信息，因此每个函数在执行前都会创建一个栈帧，在它返回时会销毁该栈帧。

![stack frame准确来说应该是call stack](https://tva1.sinaimg.cn/large/008i3skNgy1gqrl88ooaej30sz0hj75z.jpg)


通常用一个叫做栈基址（`bp`）的寄存器来保存正在运行函数栈帧的开始地址，由于栈指针（`sp`）始终保存的是栈顶的地址，所以栈指针保存的也就是正在运行函数栈帧的结束地址。

销毁时先把栈指针（`sp`）移动到此时栈基址（`bp`）的位置，此时栈指针和栈基址都指向同样的位置。

![销毁栈帧](https://tva1.sinaimg.cn/large/008i3skNgy1gqrlmmv9i3j30mc0ait94.jpg)

现在栈顶刚好是我们在创建栈帧时保存的调用者栈帧的栈基址，现在把它出栈至栈基址（`bp`），得到下图中的栈结构：

![](https://tva1.sinaimg.cn/large/008i3skNgy1gsth1wvtw0j307c09a3yf.jpg)


![](https://files.mdnice.com/user/8699/fffe92f6-6509-4ad7-a7ca-ec99d8c23cba.png)

`被调用者`的`栈帧`已经被销毁空间得到释放，但是函数的返回步骤并没有完，调用者的栈帧中还保存者返回地址，那么如果分配在`栈`是的零时数据就会被一起销毁，那在写的程序的时候程序员就要自己管理内存分配了，我变得有点担心，处理记忆管理的责任是否应该压在我身上？



### Rust 所有权

`所有权`可以说是`Rust`中`核心特性`，有了`所有权概念`才能够使的`Rust`能在没有垃圾回收机制的前提下保障内存安全因此，正确地理解所有权概念及其在`Rust`中的实现方式，对于所有`Rust`开发者来说都是非常重要的。

在我们写的代码的编译到二进制机器码的时候，一些数据的大小都是已经固定的会被分配在栈上，栈的特性就是`FILO`，数据存储速度相比堆来说要快的多。

堆存储的数据是程序在编译的时候不能确定的，只能在运行时得以确定，`Rust`所有权要干的事情就是跟踪这些数据的动向或者叫寿命吧，然后清理的早了就出问题，如果不清理或者数据重复多分占内存...

写`Rust`程序要记住`3点`就是:

1. `Rust`中的每个值都有一个称为其所有者的变量名。
2. 同一时间只能有一个所有者。
3. 当所有者超出作用域时，该值将被删除。


怎么证明第一句话？可以把`Rust`中的变量声明看做为申请一块内存空间绑定到一个变量名上，如下图：

![let 绑定变量](https://tva1.sinaimg.cn/large/008i3skNgy1gsti3j6wcdj30hj0hn0tc.jpg)

而这块内存空间的所有权就属于这个变量，默认这块内存就是来存放变量的数据的，只能读。

```rust

fn main(){
    let var = "Hello";
    println!("{}",var);
}
// 作用域到这里结束，变量var再次不可用
```
所有权在作用域结束就会被删除，这里的变量`var`指向了一个字符串，它的值被硬编码到了当前的程序中，变量从声明的位置开始直到当前作用域结束都是有效的。

而如果修改一下代码将类型改为`String`这个时候问题就出现了。

```rust
use std::collections::HashMap;

fn main() {
    
    let k = String::from("foo");
    
    let v = String::from("bar");
    
    let mut  map = HashMap::new();
    
    map.insert(k,v);
    
    v.replace("bar","BAR");
    
    println!("{}",v)
}
```
编译运行一下提示：

```rust
   Compiling playground v0.0.1 (/playground)
error[E0382]: borrow of moved value: `v`
    --> src/main.rs:35:5
     |
29   |     let v = String::from("bar");
     |         - move occurs because `v` has type `String`, which does not implement the `Copy` trait
...
33   |     map.insert(k,v);
     |                  - value moved here
34   |     
35   |     v.replace("bar","BAR");
     |     ^^^^^^^^^^^^^^^^^^^^^^ value borrowed here after move
     |
     = note: borrow occurs due to deref coercion to `str`
note: deref defined here

error: aborting due to previous error
```
可以看到提示`move occurs because`发生了所有权转移，在后面就不能进行对`v`进行操作了，原因`String`是`reference semantic`，`String`在内存存储的布局如下：


![内存布局](https://tva1.sinaimg.cn/large/008i3skNgy1gsxwazzoa0j60la0aoaa902.jpg)

`String`的内存布局，它实际上由`3`部分组成，一个指向存放字符串内容的指针（`ptr`），一个长度（`len`）及一个容量（`capacity`），这部分的数据存放在了栈中，右侧显示了字符串存储在堆上的文本内容。

上面的代码将`v`的所有权交给了`map`中了，此时左边部分的`v`就没有其所有权了，`v`会被废弃掉，如果在后面代码中进行操作则出`value borrowed here after move`。

其他语言中接触过`shallow copy`和深度拷贝`deep copy`这两个术语，那么你也许会将这里复制指针，长度以及容量字段行为视作浅度拷贝，但由于`Rust`同时使第一个变量无效了，所以使用了新的术语移动`move`来描述这一行为，而不再使用浅度拷贝，同时指向`heap`上的数据，在`rust`中是不被允许的！！

那么问题来了这么搞？有经验的老司机可能想着`deep copy`来解决问题，那这样带来的过多的内存开销，可能还会出现其他问题。

🤔 : 那有木有好的解决办法？？？解决办法是有的`引用与借用`新的概念！本文先写到这！

## 补充
- **JSR 133 JMM:** http://www.cs.umd.edu/~pugh/java/memoryModel/jsr-133-faq.html
- **ARC:**  https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.html