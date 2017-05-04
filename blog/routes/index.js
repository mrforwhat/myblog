var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('frame');
});

router.get('/loadindex',function(req, res){
	res.render('index');
});
// 获取动态页
router.get('/loaddynamic',function(req,res){
	res.render('dynamic');
})
// 获取文章列表
router.post('/loadEssayList', function(req, res) {
    var filePath = "./resource/static_db/essay.json";
    var essayList = readStaticFile(filePath);
    res.json({ essayList: essayList });
});

router.post('/publishComment', function(req, res) {
    var params = req.body;
    var reviewers = {};
    
    reviewers['ip'] = params.ip;
    reviewers['id'] = params.id;
    reviewers['content'] = params.content;
    reviewers['targetUser'] = params.targetUser;
    reviewers['messageTime'] = params.messageTime;
  
    var userFilePath = "./resource/static_db/user.json";
    var essayPath = "./resource/static_db/essay.json";
    // 读取用户文件
    var users = readStaticFile(userFilePath);
    // 读取文章列表
    var essayList = readStaticFile(essayPath);
    var commentEssay = essayList["essay"];

    if (users[params.ip]) {
        reviewers.nickname = users[params.ip];
    } else {
        reviewers.nickname = '路人' + params.ip;
        users[params.ip] = reviewers.nickname;
        var userStr = JSON.stringify(users);
        writeStaticFile(userFilePath, userStr);
    }

    // 找到当前评论的那一条
    commentEssay.map(function(data) {
        if (data.id == reviewers['id']) {
        	console.info('---:'+reviewers);
        	data.reviewers.push(reviewers);
        }
        return data;
    });
    essayList["essay"] = commentEssay;
    writeStaticFile(essayPath,JSON.stringify(essayList));
    res.json(reviewers);
});
function getCurrentComment(id){
	
}
//读取文件
function readStaticFile(filePath) {
    var fs = require('fs');
    var result = JSON.parse(fs.readFileSync(filePath));
    return result;
}
//写文件
function writeStaticFile(filePath, data) {
    var fs = require('fs');
    fs.writeFile(filePath, data, function(err) {
        console.info(err);
    });
}
// 获取客户端IP
function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};
module.exports = router;
