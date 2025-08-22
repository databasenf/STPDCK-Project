# Rockchip 机型破解教程

这里我只能列个思路，因为瑞芯微官方的工具根本没法提取镜像（死人镜像大小限制），而且还无法正常使用

哪怕使用xrock这种基于MaskROM的工具仍然无济于事

**适用机型：T20和T30的Pro系列和T30 Ultra**

# 获取boot镜像

方法自己想，拆机或者找别人要都可以，就不一一列举方法了

如果你早期通过直装包漏洞破解那么就装个[DSU Sideloader](https://github.com/VegaBobo/DSU-Sideloader/releases)再找个bvs后缀的GSI装上去提取boot

提取教程可以看看[承重墙的某期视频](https://www.bilibili.com/video/BV1WbokYVEXC/?spm_id_from=333.1387.upload.video_card.click&vd_source=c79281fc1237ff589f2bc88222e43b2a)，把视频拉到后面就有了

# 获得root

找个不低于安卓10的手机或者你的学习机假如早年用直装包破解了也行

装个Magisk，想隐藏试试Magisk Alpha或者APatch，两个都能用

扔进去修补然后传到电脑上

电脑下好[瑞芯微驱动和瑞芯微开发工具](https://meta.box.lenovo.com/v/link/view/02755469abfe4930a3425742d8d31ea2)，驱动选DriverAssitant，开发工具选RKDevTool_v3.30那个，两个都解压安装好

学习机关机，长按离电源键最近的那个音量键的同时连接电脑，直到开发工具有提示**发现一个loader设备**

读取分区表，更新下载地址选**是**，后面报错先不用管

找到boot那一行的最右边点一下选择修补好的boot文件（只是那一块区域，不要**超过输出日志的地方**）

再回去勾选boot那一行，点下面执行，稍等片刻就直接进入系统

再想个办法把面具装上去就大功告成了
