# ecProgress
Make Progress of Asynchronous Processes Detection Easy

## Installing
```shell
npm install ecprogress
```

## Usage
Quick Test
```node
var ecProgress = require('./ecProgress.js');
var p = new ecProgress();
p.on('change', console.log);
p.on('end', console.log);
p.add().add().add().done().done().add().done().add().done().done();
```
