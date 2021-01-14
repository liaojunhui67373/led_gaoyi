var http = require('http');               //引入http模块
var fs = require('fs');
var url = require('url');
var server = http.createServer();         //创建服务器
var request = require('request');

server.on('request', function (req, res) {    //res相当于httpservletrequest

  //开灯组
  var openMap = new Map(
    [
      ['32425', 'https://mobi.ydsyb123.com/api/send2sb.php?us_id=507&openid=12345678901234567890abcdefg12abc&dev_id=32425&msg=e1 04 01 01 0000'],
      ['32422', 'https://mobi.ydsyb123.com/api/send2sb.php?us_id=507&openid=12345678901234567890abcdefg12abc&dev_id=32422&msg=e1 04 01 01 0000'],
      ['32411', 'https://mobi.ydsyb123.com/api/send2sb.php?us_id=507&openid=12345678901234567890abcdefg12abc&dev_id=32411&msg=e1 04 01 01 0000'],
      ['32426', 'https://mobi.ydsyb123.com/api/send2sb.php?us_id=507&openid=12345678901234567890abcdefg12abc&dev_id=32426&msg=e1 04 01 01 0000'],
      ['32428', 'https://mobi.ydsyb123.com/api/send2sb.php?us_id=507&openid=12345678901234567890abcdefg12abc&dev_id=32428&msg=e1 04 01 01 0000'],
      ['32429', 'https://mobi.ydsyb123.com/api/send2sb.php?us_id=507&openid=12345678901234567890abcdefg12abc&dev_id=32429&msg=e1 04 01 01 0000'],
      ['32430', 'https://mobi.ydsyb123.com/api/send2sb.php?us_id=507&openid=12345678901234567890abcdefg12abc&dev_id=32430&msg=e1 04 01 01 0000'],
      ['32431', 'https://mobi.ydsyb123.com/api/send2sb.php?us_id=507&openid=12345678901234567890abcdefg12abc&dev_id=32431&msg=e1 04 01 01 0000'],
      ['32432', 'https://mobi.ydsyb123.com/api/send2sb.php?us_id=507&openid=12345678901234567890abcdefg12abc&dev_id=32432&msg=e1 04 01 01 0000'],
      ['32433', 'https://mobi.ydsyb123.com/api/send2sb.php?us_id=507&openid=12345678901234567890abcdefg12abc&dev_id=32433&msg=e1 04 01 01 0000']

    ]);

  //关灯组
  var closeMap = new Map(
    [
      ['32425', 'https://mobi.ydsyb123.com/api/send2sb.php?us_id=507&openid=12345678901234567890abcdefg12abc&dev_id=32425&msg=e1 04 01 00 0000'],
      ['32422', 'https://mobi.ydsyb123.com/api/send2sb.php?us_id=507&openid=12345678901234567890abcdefg12abc&dev_id=32422&msg=e1 04 01 00 0000'],
      ['32411', 'https://mobi.ydsyb123.com/api/send2sb.php?us_id=507&openid=12345678901234567890abcdefg12abc&dev_id=32411&msg=e1 04 01 00 0000'],
      ['32426', 'https://mobi.ydsyb123.com/api/send2sb.php?us_id=507&openid=12345678901234567890abcdefg12abc&dev_id=32426&msg=e1 04 01 00 0000'],
      ['32428', 'https://mobi.ydsyb123.com/api/send2sb.php?us_id=507&openid=12345678901234567890abcdefg12abc&dev_id=32428&msg=e1 04 01 00 0000'],
      ['32429', 'https://mobi.ydsyb123.com/api/send2sb.php?us_id=507&openid=12345678901234567890abcdefg12abc&dev_id=32429&msg=e1 04 01 00 0000'],
      ['32430', 'https://mobi.ydsyb123.com/api/send2sb.php?us_id=507&openid=12345678901234567890abcdefg12abc&dev_id=32430&msg=e1 04 01 00 0000'],
      ['32431', 'https://mobi.ydsyb123.com/api/send2sb.php?us_id=507&openid=12345678901234567890abcdefg12abc&dev_id=32431&msg=e1 04 01 00 0000'],
      ['32432', 'https://mobi.ydsyb123.com/api/send2sb.php?us_id=507&openid=12345678901234567890abcdefg12abc&dev_id=32432&msg=e1 04 01 00 0000'],
      ['32433', 'https://mobi.ydsyb123.com/api/send2sb.php?us_id=507&openid=12345678901234567890abcdefg12abc&dev_id=32433&msg=e1 04 01 00 0000']
    ]);

  var urls = req.url;
  var arg = url.parse(urls).query;
  var arg = url.parse(urls, true).query;
  var arg = arg.id;

  if (urls == '/') {
    res.setHeader('Content-type', 'text/html;charset=utf-8');
    fs.readFile('./html/index.html', 'utf-8', function (err, data) {
      res.end(data);
    });

    //开灯函数
  } else if (urls.indexOf('/open') != -1) {
    console.log(openMap.get(arg));
    request(openMap.get(arg), function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.setHeader('Content-type', 'text/html;charset=utf-8');
        console.log(arg + ' 开灯');
        res.end(body);
      }
    });
    //关灯函数
  } else if (urls.indexOf('/close') != -1) {
    console.log(closeMap.get(arg));
    request(openMap.get(arg), function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.setHeader('Content-type', 'text/html;charset=utf-8');
        console.log(arg + ' 关灯');
        res.end(body);
      }
    });
    //开启所有
  } else if (urls.indexOf('/allON') != -1) {
    for (var key of openMap.keys()) {
      request(openMap.get(key));
      console.log(key + ' 开灯')
    }
    res.end();
    //关闭所有
  } else if (urls.indexOf('/allOFF') != -1) {
    for (var key of openMap.keys()) {
      request(closeMap.get(key));
      console.log(key + ' 关灯')
    }
    res.end();
  }
  //读取首页
  else {
    fs.readFile('.' + urls, function (err, data) {
      res.end(data);
    })
  }

});

server.listen(8082, function () {
  console.log('服务器已启动:8082')
});