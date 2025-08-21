# 1.早期老ud710(chip0)机型通解

此破解方法基于将学习机的system分区备份并替换为破解完成或官方解锁之后的system分区以达到删除学习功能并自由安装软件的目的，理论上使用ud710-chip0芯片的机型应该能通刷

## 1.0 该方案适用机型情况

* X2/Z1/Q1/老版本课堂版(C6/C8)且不带Pro或S等字样的机型/X2Pro

## 1.1 下载您需要的文件
* 驱动：在**本教程仓库-配套文件/展讯**下有"紫光驱动_R4.21.3201.zip"，在计算机上下载下来并解压，进入带Win10字样的目录，如果你是Win7/8，请进入带Win7/Win8字样的目录，然后点击双击打开DriverSetup.exe并无脑下一步完成安装过程
* spd_dump（刷机工具）：去[nightly.link](https://nightly.link/TomKing062/spreadtrum_flash/workflows/build/main)下载最新x86的Dev_custdebug版本并**将zip文件解压到桌面或者其他位置的SPRD目录(目录等会要考)**
* fdl文件：在**本教程仓库-配套文件/展讯/fdls/ud710**中存放了备份，两个文件全部下载下来即可
* **酷安/Bilibili@某贼**整的半自动化公版Bootloader解锁脚本(windows):在**本教程仓库-配套文件/展讯/**中可以找到我在此基础上做的`BL_Unlock_tool_and_chip2_file.7z`，下载下来解压备用

## 1.2 展讯spd_dump工具的使用

1.按住音量减(离电源键最远的那个音量键)连接电脑

设备关机，打开深刷工具spd_dump.exe，在关机之后摁住设备音量减，并将设备插入计算机，如能看到BROM＞字样，可松开按钮，如没有，请重启你的计算机和平板或者尝试在插入计算机前，将设备所有按键(电源+音量加减)按住

2.初始化读写模式(FDL2)模式
在`BROM>`出现后：
输入
`loadfdl 0x5500_ud710`
回车，如果此时出现什么**usb send failed**那你就可以放弃使用本方法了
如果没有出现`usb send failed`并正常显示`FDL1>`，请输入
`loadfdl 0x9efffe00_ud710`
回车接着输入
`exec`
进入读写模式(显示`FDL2>`)，并会展示分区表方便我们下一步操作.
3.其他操作
请前往[spd_dump官方中文版文档](https://github.com/TomKing062/spreadtrum_flash/blob/main/README_zh.md)了解更多
## 1.3备份全盘
您先需要备份全盘分区并妥善保存，输入
`r all`
意为读取全盘
如果软件闪退，可以从头再来，在r all时加入目标地址 ，但是不管怎样，文件都会保存SPRD文件夹内
等文件读取完毕，你应该去把文件妥善保存并记住存储位置
## 1.4 刷入预先获得的无限制系统(C6-v99)
假设你得到的无限制系统文件名为`system_c6_v99.bin`，位于`D:\android\kdxf\`
在刷机工具spd_dump.exe窗口内输入

`w system D:\android\kdxf\system_c6_v99.bin`

（注意文件名不能有空格）

等待刷写完毕

刷写完成后

输入

`e userdata`

以清除用户数据分区，如果不清除的话可能会导致卡第一屏

输入

`reset`

以重启

## 1.5恢复备份系统

若您的设备在启动时一直停止响应，并显示此屏幕，那您的设备可能无法使用此方法或者没有找到对的刷机包。

请使用上文的`w`方法将原备份的系统刷回去就行，具体命令是： `w system 备份好的镜像（可以直接拖进窗口）`

## c6系统注意事项

开Adb:自行安装爱玩机工具箱，并去`导航-系统相关-USB调试`打开adb(我个人更推荐这种)

# 2.后期ud710(chip1/2,及部分同时期的chip0)方法

## 2.0 阅读要求

1. 学习机系统底层是android9系统

2. 熟练掌握[1.0教程](#1紫光展锐处理器部分机型深刷破解)所有内容

3. ~~[system法root](#22-修改systemvendorroot)~~（已过时，现统一用Magisk-boot法进行Root）与`替换安装器`(可用模块法替代，且被反映不适用于现课堂版)

## 2.1 思路
1. 使用spd_dump或**其他方式(仅Chip2)**提取原system及boot分区
2. 删除目前所有与科大相关的组件，修改安装器文件(可用C6或C8-v99提取物),并内置自由的桌面与浏览器【得到可独立使用的"底座系统"】
3. 刷入开机
4. (选)利用被删除的文件造一个模块以重新启用学习机内置功能并确保与"底座系统"相互隔离(需要额外获取Root权限)

## 2.2 实操
### 2.2.0 解锁BL锁(展讯安卓9通用，V2版本)
下载并解压`BL_Unlock_tool_and_chip2_file.7z`(在 本教程仓库-配套文件-展讯 文件夹下可找到)

执行一下里面的spd_dump和openssl.exe，如果不出现报错弹窗则继续，否则请去微软运行库[发布地址](https://wwa.lanzout.com/b0b8rs19a#9527 "密码9527")下载并安装最新版微软常用运行库

执行里面`Drivers`文件夹/你系统的版本/DriverSetup.exe并傻瓜式安装一遍驱动

然后执行0开头的bat脚本，并按照其提示进行操作

在0成功完成后，接着执行1，正常执行完成后会弹出记事本，能得到两串数字，请把第二串数字（通常为一个两位数）接在第一串数字的后面并复制这整串数字.执行2时，如果你在执行1后正确的复制了那个数值，鼠标右键窗口可以粘贴

然后去执行3，三出现Unlock且一直卡在那里时请看向你平板的屏幕，按一下`音量-`然后等10-20分钟后平板屏幕上显示`Unlock Bootloader Success`即为解锁成功，此时可以按住重启键(即音量+和电源)来强制重启，如果你是Chip2机型，请打开`命令行.bat`执行`fastboot reboot bootloader`并进行[后续操作](#222-chip2)

### 2.2.1 chip2以外的机型
**注：如需进行模块制作来保留学习功能，请保留除`修改安装器`以外部分删除的文件**

基于[1.2展讯spd_dump工具的使用](#12展讯spd_dump工具的使用)，提取system,(如果需要进行学习功能的恢复、或者刷Magisk模块的话)boot分区

下载[MIO-KITCHEN](https://github.com/ColdWindScholar/MIO-KITCHEN-SOURCE/releases/latest)，并新建一个项目，将你提取出的system分区镜像后缀名改成img并拖入工具主界面，然后在生成的新项目里面选择img后缀并解包镜像

解包完删除`项目名/system/system/app下所有除IFlyIME以外的IFly开头的文件夹`，并且删除`项目名/system/system下两个ifly开头的文件夹(iflytek_npu,iflytek_readonly_res)`

下载你想要的桌面(必须能在安卓9上运行)安装包，并建一个文件夹(文件夹和安装包的名称必须是纯英文字母组成的)放入安装包，将此文件夹放入原来那个app目录下，再下一个浏览器进行相同操作，这样你就新建了两个文件夹（内置了两个应用进去）
去`项目名/system/system`能找到build.prop文件并在文件末尾加上这几行并保存：
```
service.adb.tcp.port=5555
persist.service.adb.enable=1
persist.sys.usb.config=diag,adb
ro.sys.usb.default.config=diag,adb
```
下载`教程目录-配套文件-展讯 下的 安卓9安装器.zip`并解压，删除掉原本`项目名/system/system/priv-app`下的IFlytekServer，PackageInstaller以及**DefContainerService里除lib文件夹外的其他东西**

压缩包中的PackageInstaller文件夹直接拖进`项目名/system/system/priv-app`目录，DefContainerService需点进压缩包中的同名文件夹，把里面oat文件夹和DefContainerService.apk拖入`项目名/system/system/priv-app/DefContainerService`目录

这样就算是完成了系统的修改
然后去MIO-KITCHEN中，该项目下选择`打包-system-大小：自动识别，方式：e2fsdroid+make_ext4fs`的参数进行打包

打包完的镜像可使用`w`命令刷入机器system分区即算完成破解
### 2.2.2 Chip2
这里就比较复杂了，大概有两种情况（已有可用镜像或者还没有）

- 有可用的情况：去问LEAKING群群主或者等级最高的群管理要修补好的boot和system文件（完全免费），并且使用fastboot命令刷入修改后的分区即可

- 无可用的情况（即：如何给新机型适配）：
1. 刷入chip2-sGSI-v2版本镜像
2. 安装`fucktheeng_com.sammy.systools.apk`并[利用unisoc-su(CVE-2025-31710)漏洞]()成功后使用cp或者dd命令得到vendor镜像
3. 修改/vendor/etc/selinux下的plat_pub_versioned.cil并且删除同文件夹的`.md5sum`和`precompiled_selinux`文件，使cmd_services_28_0能拿到所有install_recovery_28_0有的权限
4. 刷入修改好的vendor镜像，回到system，使用dd提取除system,vendor,cache,userdata以外的所有分区并打包，丢给LEAKING的群主或者等级最高的管理员
5. 找到一个与你同机型且未刷过机的人，让他去找你丢文件过去的人
6. 完成适配，文件(包括Magisk模块+改好的系统+修补好的boot文件)下发
7. 用Fastboot刷入，开机即可

## 2.3 如何自行修补boot以Root
### 2.3.0 大纲
1. 得到boot文件
2. 上传到bashupload.com/transfer.sh来得到直链文件地址
3. GithubAction自动化签名boot镜像
4. 刷入镜像
### 2.3.1 得到boot文件
* ums9620方案、ums312方案，非Chip2且为ud710方案机型：参考[1.2 展讯spd_dump工具的使用](#12-展讯spd_dump工具的使用) 自行读取boot分区
* Chip2：你通过unisoc-su提取vendor并修改刷入后再卡一次unisoc-su能提取到boot
### 2.3.2 得到直链文件地址
访问[bashupload](https://bashupload.com)，点`choose file(s)`然后选择你提取出的boot文件,过一会会出现一个链接，旁边跟着一个`XXX(数字) bytes`，只要这个数字不为0你就可以复制这个链接给后面的步骤用。
你还可以使用catbox.moe，transfer.sh,那两个与bashupload使用方式差不多，极端情况下甚至可以使用QQ闪传（浏览器打开链接，点到文件下载，然后复制那个正在下载的文件的下载链接） 
### 2.3.3 Github Action自动化修补Magisk并签名boot镜像(by [@Tomking062](https://github.com/TomKing062))
注册一个Github账号（不会请自行Bing/Google搜一下），去Fork [这个仓库](https://github.com/TomKing062/action_big_resign_with_magisk)并进入你Fork好的仓库-Actions（会有一个警告，自己看。你点击绿色的就可以启用这个仓库的Actions功能了）

这里自动化修补要用的是最后一个，点进 `sign-one-partition-only-magisk`，输入好镜像上传后得到的直链地址，第二个空是填写分区名称的，这里是boot，然后再点 `Run Workflow`，即可在两分钟后在本仓库Releases下找到修补好的镜像文件，名称为image.img(Tips:记得看文件大小，小的不自然，比如就几百Bytes。那说明链接错了，重新获取直链再重新跑)

### 2.3.4 ums9620芯片方案Root的额外步骤
去FDL2模式下执行`verifly 0`命令，然后就可以正常开机了
