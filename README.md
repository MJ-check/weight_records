# 体重记录应用程序

## 安装依赖

```shell
npm install
// 或者
cnpm install
```

## 配置MySQL数据库

### 创建数据库 weightrecords

```mysql
create database weightrecords
```

### 创建表 records

```mysql
CREATE TABLE records (
weight_id INT AUTO_INCREMENT,
weight FLOAT,
time VARCHAR(30),
PRIMARY KEY ( weight_id )
)CHARSET=utf8;
```

## 启动项目

```shell
node app.js
// 或者
pm2 start app.js --name weight_records
```

