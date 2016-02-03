var path = require("path");
var fs = require("fs");
var rootPath = __filename;
var changePath = path.dirname(rootPath) + '\\newimages';
var dealCount=0;
var D={};
renameFilesInDir(path.dirname(rootPath) + '\\images');
D.utils = { //工具类
        version: '1.0.0',
        parent: this,
        dateFormat: function(timestamp, format) {
            var date = new Date(parseInt(timestamp, 10)),
                o = {
                    "M+": date.getMonth() + 1,
                    "d+": date.getDate(),
                    "h+": date.getHours(),
                    "m+": date.getMinutes(),
                    "s+": date.getSeconds(),
                    "q+": Math.floor((date.getMonth() + 3) / 3),
                    "S": date.getMilliseconds()
                };

            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }

            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        },
        extend: function(obj1, obj2) { //浅度合并obj1，obj2并返回新对象
            var obj = {};
            var o1 = obj1;
            var o2 = this.clone(obj2);
            for (var prop in o1) {
                if (o2.hasOwnProperty(prop)) {
                    obj[prop] = o2[prop];
                    delete o2[prop];
                } else {
                    obj[prop] = o1[prop];
                }
            }
            for (var prop in o2) {
                obj[prop] = o2[prop];
            }
            return obj;
        },
        clone: function(obj) { //返回一个克隆的对象  
            var newObj = {};
            for (var prop in obj) {
                newObj[prop] = obj[prop];
            }
            return newObj;
        }
    };
function changeFileName(filepath) {
    fs.stat(filepath,function(err,stats){
        if(stats.isFile()){
            //console.log("isFile,chaning filename...");
            var filename = path.basename(filepath);
            var fileExt=path.extname(filepath);//后缀名
            var filenameOutExt=path.basename(filepath,fileExt);
            var parentDir =path.dirname(filepath);
            var parentDirname = path.basename(path.dirname(filepath)); 
            var thisFilename = path.basename(__filename);
            var reg = /(-)?(_)?([\u4E00-\u9FA5])+$/;//正则匹配要改名的文件
            //console.log(thisFilename);
            //这个if就是进行更改文件名的逻辑,可以自行定义,这里定义为将文件命名为当前文件夹的名字加"-文件自身名"
            if(filename!=thisFilename&&reg.test(filenameOutExt)){
                var newName = filenameOutExt.replace(reg,'')+fileExt;
                var newFile =changePath+"\\"+newName;
                fs.rename(filepath,newFile,function(){
                    dealCount++;
                    console.log('序号：'+dealCount+'-----时间：'+D.utils.dateFormat(new Date().getTime(),'hh:mm:ss')+"：成功修改"+filename+" 为 "+newName+'\n');
                });    
            }else{
                console.log(filename+'------不需要修改！');
            }
         }
    });
}

function renameFilesInDir(dir) {
    console.log('开始处理，请稍后');
    fs.readdir(dir, function(error, files) {
        var len = files.length;
        var file = null;
        console.log('\n---------------发现' + len + '个文件------------------------------\n');
        for (var i = 0; i < len; i++) {
            file = files[i];
            changeFileName(dir+"\\"+file);
        }
    });
}
