module.exports = function(app, gfs) {
  var gm = gm = require('gm').subClass({
    imageMagick: true
  })
  var operations=require(__dirname+'/gm.json')
  var op = [{
    name: 'border',
    args: [30, 40]
  }, {
    name: 'flip',
    args: []
  }]

  app.get('/file', function(req, res) {
    /*  if(!req.body.operation)
        return res.status(400).send()

      let op=req.body.operation

      let current= gm('/path')
      for (var i = 0; i < array.length; i++) {
        let op=array[i].funcName
        let args=array[i].args
        current=current[op].apply(null,args)

      }
      current.pipe(res)
*/
    var ctx = gm('/tmp/1.jpg')
    for (var i = 0; i < op.length; i++) {
      var currentOp = op[i]
      ctx = ctx[op[i].name].apply(ctx, op[i].args)
    }
    ctx.write('test.jpg', function(err) {
      console.log(err)
    })
  })
  app.get('/gmOperations',function(req,res){
    res.send(operations)

  })
  app.post('/upload', function(req, res) {
    if (!req.files)
      return res.status(400).send()

    let file = req.files.file;
    file.mv('/tmp/filename.jpg', function(err) {
      if (err)
        return res.status(500).send(err)
      res.send('File uploaded!')
    })
  })


}
