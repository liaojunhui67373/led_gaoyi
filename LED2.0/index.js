let http = require('http');               //引入http模块
let fs = require('fs');
let url = require('url');
let server = http.createServer();         //创建服务器
let request = require('request');

server.on('request', function (req, res) {    //res相当于httpservletrequest

  //开灯组
  let openMap = new Map(
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

  //关灯组
  let closeMap = new Map(
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

  let urls = req.url;
  let arg = url.parse(urls).query;
  arg = url.parse(urls, true).query;
  let devKey = arg.id;
  let devName = arg.devName;
  let updateName = arg.name;

  if (urls == '/') {
    res.setHeader('Content-type', 'text/html;charset=utf-8');
    fs.readFile('./html/index.html', 'utf-8', function (err, data) {
      res.end(data);
    });

    //开灯函数
  } else if (urls.indexOf('/open') != -1) {
    console.log(openMap.get(devKey));
    request(openMap.get(devKey));
    console.log(devKey + ' 开灯');
    res.end();

    //关灯函数
  } else if (urls.indexOf('/close') != -1) {
    console.log(openMap.get(devKey));
    request(closeMap.get(devKey));
    console.log(devKey + ' 关灯');
    res.end();

    //开启所有
  } else if (urls.indexOf('/allON') != -1) {
    for (let key of openMap.keys()) {
      request(openMap.get(key));
      console.log(openMap.get(key));
      console.log(key + ' 开灯')
    }
    res.end();

    //关闭所有
  } else if (urls.indexOf('/allOFF') != -1) {
    for (let key of openMap.keys()) {
      request(closeMap.get(key));
      console.log(closeMap.get(key));
      console.log(key + ' 关灯')
    }
    res.end();

    //添加设备
  } else if (urls.indexOf('/addDev') != -1) {
    let addDevUrl = 'https://mobi.ydsyb123.com/api/get_wifi_mac.php?us_id=507&dev_name=' + devName + '&sblx=';
    console.log(devName);
    let addResCode = '';
    let addResObj = '';
    request(encodeURI(addDevUrl), function (error, response, body) {      //当url中带有中文时，要加encodeURI

      res.setHeader('Content-type', 'text/html;charset=utf-8');

      addResObj = eval("(" + body + ")");

      console.log(addResObj);

      addResCode = addResObj.recode;

      console.log(addResCode);

      if (addResCode == 'success') {
        res.end("success")
      } else {
        res.end("fail")
      }
    });

    //获得所有设备json集合
  } else if (urls.indexOf('/showAllDev') != -1) {
    request('https://mobi.ydsyb123.com/api/get_alldev.php?us_id=507&openid=12345678901234567890abcdefg12abc', function (error, response, body) {
      res.setHeader('Content-type', 'text/html;charset=utf-8');
      res.end(body);
    });

    //修改设备名称
  } else if (urls.indexOf('/updateName') != -1) {

    let updateUrl = 'https://mobi.ydsyb123.com/api/updevname.php?us_id=507&dev_id=' + devKey + '&dev_name=' + updateName + '&device_name1=1&device_name2=2';

    console.log(updateUrl);

    let updateCode;

    let updateObj;

    request(encodeURI(updateUrl), function (error, response, body) {

      res.setHeader('Content-type', 'text/html;charset=utf-8');

      updateObj = eval("(" + body + ")");

      updateCode = updateObj.recode

      if (updateCode == 'success') {
        res.end("success")
      } else {
        res.end("fail")
      }
    })
  }
  //读取首页
  else {
    fs.readFile('.' + urls, function (err, data) {
      res.end(data);
    })
  }

});

server.listen(8083, function () {
  console.log('服务器已启动:8083')
});