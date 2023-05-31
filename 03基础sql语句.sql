-- 查users表所有内容
-- select * from users

-- 向users表中插入内容
-- insert into users (username,password) values ('tony stark','098123')

-- 更新id=3的password
-- update users set password="888888" where id = 3

-- 更新id=2的password和status
-- update users set password="qixiangquan",status=1 where id =2

-- 删除id=3的内容
-- delete from users where id = 3

-- 查询status=0且username=zs的
-- select * from users where status = 0 and username = zs

-- 查询status=0
-- select * from users where status = 0 

-- 添加
-- insert into users (username,password) values ('qxq',18204675822)

-- 添加
-- insert into users (username,password,status) values ('qxq2',18204675822,1)

-- 排序 asc	升序
-- select * from users order by status

-- 排序 desc 降序
-- select * from users order by status desc

-- 排序先以status在以username
-- select * from users order by status,username desc

-- 计算表中status的条数总和
-- select count(*) from users where status = 0

-- 修改查出表中相应列的名称
-- select username as name,status as age from users