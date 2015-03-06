# includereplace & usemin workflow

随着 Grunt 在项目中的不断使用，Workflow 也不断地在改善。

## 未加入 usemin

以前我的大致流程是，从 include 里先逐步拆分出来 `head`，`footer` 等公共部分，然后再按需加入相应的页面中来充当模板。

以前开发过程中的流程：
* 编辑模板文件（直接引入css，js 的打包版本）
* 输出成品页面 (watch，includereplace，sass，compass **这一步就要输出 css，js 的打包版本**)
* 拷贝到 dist 目录（copy）
* 合并、压缩等（cssmin，imagemin）

## 分析

之前在 `head` 部分，最初加入的就是最终的打包的 `<link href="../css/style.css" rel="stylesheet">` 样式文件，打包这步按照个人习惯方式就不说了。后来接触了 Yeoman 之后，看到有他们团队做的 `grunt-usemin`，其中在 html 页面中加入的 block 部分转换为单独的一行，其实和我刚才提到的最终结果是一致的。

但是在模板文件里，可以分开书写，个人感官上比较接受这种。

```html
<!-- build:css ../css/style.css -->
  <link href="../css/style.css" rel="stylesheet">
  <link href="../css/flexslider.css" rel="stylesheet">
  <link href="../css/jquery.fancybox.css" rel="stylesheet">
<!-- endbuild -->
```

将此部分最终转化为

```html
<link href="../css/style.css" rel="stylesheet">
```

usemin 大致的任务就是：
* useminPrepare 给指定文件中的 block 转化为输出版本做好配置，其实质还是由 concat、uglify 等相应的插件处理。
* usemin 就是替换 block 块，revisioned 版本。

## 现在

所以现在的工作流程：
* 编辑模板文件**（没有优化的 script、stylesheets）**
* 输出成品页面 (watch，includereplace，sass，compass)
* 拷贝到 dist 目录（copy）
* 优化、合并、压缩等（cssmin，imagemin，**usemin**）

## 疑问

说了这么多下面才开始重点了。最初测试时随手搭的项目，完全没有任何问题的。记忆中的目录结构也是这样。

但是，就在我这次在构建新项目时，打算使用 usemin，才发现在配置中存在了很大的问题。和文档里的对比过，还是没发现我这边的问题。

下面说下目录结构

```html
/.
├─html
│  └─*.html
├─css
│  └─*.css
├─img
│  └─*.{jpg,png}
│
├─dist
│  └─html
│  │  └─*.html
│  └─css
│  │  └─*.min.css
│  └─img
└───  └─*.{jpg,png}
```
## 问题

就在最终 `build` 之后，html 文件里的 block 并没有被替换掉 :-(

**但是发现个微妙的地方，就是在 `build` 之后，再打开 `./html/a.html` 里的文件，任意编辑一下保存，再次 `grunt useminPrepare` `grunt usemin` ，就会看到 `./dist/html/a.html` 里的 block 块已经被替换。**

个人把 `build` 里的顺序改过好多次，把 `useminPrepare`，`usemin` 里的配置项也尝试过很多，没有解决，感觉问题就出在 `useminPrepare` 这里。不然做了任意改动保存，再次执行为什么是好的！

先放到这里，不知道有没有人遇到相应的问题。若不能解决，就在流程上做改动，毕竟这只是个人的尝试，不一定就是科学的方法。

THX :-)
