# Quick-Spawn

> [中文](./doc/readme_cn.md)  
> ChangeLog: [English](./doc/changeLog_en.md) | [中文](./doc/changeLog_cn.md)
## API
You can use this lib just like below:
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
such a string that be executable in terminal or cmd window

### params (optional)
Array，which are transfer to program that declared in command line

### opts (optional)
Object, declare some parameters for spawn process:
```
silent:  default is false, control whether the output info will be print on the default output stream
... : other configuration in child_process.spawn
```

### callback
```
function(err,stdout,stderr){

}
```


## Thank you for these package authors:
[easy-spawn](https://github.com/ddliu/node-easy-spawn)  
[create-spawn](https://github.com/nneutrinno/create-spawn)  
[exec-sh](https://github.com/tsertkov/exec-sh)