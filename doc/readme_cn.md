# Quick-Spawn

> [English](../README.md)  
> ChangeLog: [English](./changeLog_en.md) | [中文](./changeLog_cn.md)
## API
使用方法参见下方代码段：
```
  import {quickSpawn,quickSpawnPromise} in 'quick-spawn';
  //  or const {quickSpawn,quickSpawnPromise} =require('quick-spawn');

  quickSpawn('command line',callback)
  quickSpawn('command line',params,callback)
  quickSpawn('command line',opts,callback)
  quickSpawn('command line',params, opts,  callback)

  quickSpawnPromise('command line',params(optional), opts(optional))
  .then((err,stdout,stderr)=>{
    if(err) throw err;
    console.log(stdout)
  })  
```

### Command Line
在命令行工具或终端中执行的 __字符串__

### params (optional)
__数组__，用于命令参数的传递

### opts (optional)
对象，用于传递spawn执行时的一些控制变量。
```
silent:  默认为 false ，用于关闭命令执行时输出到默认窗体的行为  
... : 其他 child_process.spawn 中的配置。
```

### callback
```
function(err,stdout,stderr){

}
```


## 感谢以下包的作者:
[easy-spawn](https://github.com/ddliu/node-easy-spawn)  
[create-spawn](https://github.com/nneutrinno/create-spawn)  
[exec-sh](https://github.com/tsertkov/exec-sh)