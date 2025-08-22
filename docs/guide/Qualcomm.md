## 版权信息
请参考目录下的`NAFPL1.1.md`


# 高通系机型教程

## X1Pro

## X3 5G或者P30 5G

### 具体过程

#### 解BL

* 装[9008驱动](https://www.thecustomdroid.com/qualcomm-hs-usb-qdloader-9008-drivers/)
* 进入9008模式(关机完，按住音量上再插上数据线，然后就进去了)
* 使用[酷安@某贼 开发的《高通工具箱》](https://syxz.lanzoue.com/b01g1c7ve "（密码bulf）")读取出boot相关分区及vbmeta分区，将[本仓库主分支Qualcomm目录下](https://github.com/databasenf/STPDCK-Project/tree/main/Qualcomm)的frp.img刷入到frp分区，misc.img刷入到misc分区，然后重启板子
  重启后会默认进入fastbootd，你需要用adb工具或者各种工具箱重启到bootloader，或者输入 `fastboot reboot bootloader` 然后再执行 `fastboot flashing unlock`就进入了经典的高通解锁选择题。自行翻译自行选择就行，我相信你能做到。

#### 刷回联想官方系统养老

去[这个网站](https://mirrors-obs-1.lolinet.com/firmware/lenowow/2021/Tab_P11_5G/TB-J607Z/)下载原版的9008包，拿高通工具箱先把全机除cache/userdata以外的所有分区全部备份，然后把9008包里面那一堆分区刷进去再重启就行了，如果砖了刷回你备份的分区。
