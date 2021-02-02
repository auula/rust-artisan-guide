![Rust吉祥物](https://tva1.sinaimg.cn/large/008eGmZEgy1gmj018vmi6j30og0gbjsd.jpg)

## 前 言

> 由于个人原因决定再学习一门语言，那这个语言就是`rust`的了，另外我还把我学习笔记通过`github`开源的方式进行整理开源，那今天我们就从`rust`环境搭建到第一个程序开始。

## Rust介绍

- `Rust` 是一门系统级别的编程语言。

- `Rust` 由 `Graydon Hoare` 开发并在被 `Mozilla` 实验室收购后发扬光大。

[Rust](https://www.rust-lang.org/ "Rust") 是一门系统级编程语言，被设计为保证内存和线程安全，防止段错误产生。作为系统级编程语言，它的基本理念是“零开销抽象”。理论上来说，它的速度与 C/C++ 同级。Rust 可以被归为通用的、多范式、编译型的编程语言，类似 C/C++。与这两门编程语言不同的是，Rust 是线程安全的！Rust 编程语言的目标是，创建一个安全和并发的软件系统。它强调安全性、并发和内存控制。尽管 Rust 借用了 C/C++ 的语法，却杜绝了空指针和悬挂指针，而这二者是 C/C++ 中系统崩溃、内存泄露和不安全代码的根源。

那我为什么要学习`rust`，这个问题我觉得官方网站就有答案😜。

## 对比其他语言

这里我们比较的是相关语言在处理一些函数的速度，数据来源`debian`的[benchmarksgame](https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/rust.html "benchmarksgame")，如下图:

![rust对比c](https://tva1.sinaimg.cn/large/008eGmZEgy1gmiz2z37j7j30ti0sen0l.jpg)

## 为什么选择 Rust ?

正如 `Rust` 语言自己说的那样，`Rust` 语言有三大愿景：

- 高安全
- 高性能
- 高并发
  
`Rust` 语言旨在以简单的方式开发高度可靠和快速的软件。

`Rust` 语言支持用现代语言特性来写一些系统级别乃至机器级别的程序。

### 高性能
高性能是所有语言的最高追求，`Rust` 也不例外。

为了追求极致的性能，`Rust` 抛弃了 `C/C++` 之外的语言都有的 垃圾回收器（ `Garbage Collector` ）。

也就是消除了垃圾回收机制带来的性能损耗。

### 编译时内存安全
`Rust` 虽然也有指针的概念，但这个概念被大大的弱化，因此它没有 `C/C++` 那种悬空指针，缓冲区溢出和内存泄漏等等问题。

### 天生多线程安全运行程序
`Rust` 是为多线程高并发而设计的系统级别语言，`Rust` 的 拥有者(`ownership`) 概念和 内存安全 规则使得它天生支持高并发，而且是支持没有数据竞争的高并发。

### `Rust` 语言支持 `Web Assembly (WASM)` 语言
`Rust` 的目标是成为高并发且高安全的系统级语言，但这并不代表它就不能开发 `Web` 应用，`Rust` 支持通过把代码编译成 `Web Assembly (WASM)` 语言从而能够在浏览器端以实现快速，可靠的运行。

`Web Assembly (WASM)` 语言是被设计用来在浏览器端/嵌入式设别上运行的，用于执行 `CPU` 计算密集型的语言，也就是说 `Web Assembly (WASM)` 语言 的目标是和 `Javascript` 一样能够在浏览器里运行，但因为是编译型，所以更高效。

