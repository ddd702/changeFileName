##说明
前几天一个妹纸在朋友圈求救如何批量修改2000多个文件的文件名，于是写下了如此脚本......
这是一个用于批量修改文件名的nodejs小脚本，所以你的电脑首先要安装node环境。不需要安装其他包或插件，只需用到node的fs即可。
##适用环境
类如‘1224345455_姓名.jpg’的文件名改为'1224345455.jpg';即把后面的姓名去掉，更多修改规则自行修改代码
##使用
下载本项目，把要修改的文件放进images文件夹，打开命令窗口，cd到项目路径，即index.js所在路径，输入'node index.js'即可，片刻便把修改后的文件转移到newimages里，ps：不符合改名条件的文件仍然留在images
运行效果图：
