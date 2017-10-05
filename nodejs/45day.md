# AWS - EC2
아마존 웹서비스의 EC2(Elastic Compute Cloud)는 리눅스 및 Windows 가상 서버를 제공하는 AWS 서비스입니다. 서버를 사용한 시간만큼만 과금되고, 필요에 따라 서버의 갯수를 늘였다가 줄였다가 하는 일을 자유롭게 할 수 있다. 또한 서버를 다시 구축할 필요 없이 서버의 사양을 높이거나 낮출 수도 있습니다.

EC2 인스턴스에 접속하기 위해 키 페어를 사용한다. 키분실을 주의해야한다.

```
$ ssh -i "wpsn-ec2-key.pem" ubuntu@ec2-13-124-201-145.ap-northeast-2.compute.amazonaws.com
```

리눅스 명령
```
# 권한설정
ubuntu@ip-172-31-13-215:~$ chomd u-x myfile
ubuntu@ip-172-31-13-215:~$ chmod 400 myfile

# ls 권한 뷰
ubuntu@ip-172-31-13-215:~$ ls -l
total 0
-r-------- 1 ubuntu ubuntu 0 Sep 26 03:01 myfile

# tee 입출력 같이
ubuntu@ip-172-31-13-215:~$ echo 'hello' > hello
ubuntu@ip-172-31-13-215:~$ cat hello
hello
ubuntu@ip-172-31-13-215:~$ echo 'hello' >> hello
ubuntu@ip-172-31-13-215:~$ cat hello
hello
hello
ubuntu@ip-172-31-13-215:~/wpsn-socketio$ which caddy
/usr/local/bin/caddy
```
 
```
# 심볼릭 링크
ubuntu@ip-172-31-13-215:~$ ls
hello  myfile
ubuntu@ip-172-31-13-215:~$ ln -s hello hello-link
ubuntu@ip-172-31-13-215:~$ ls -l
total 4
-rw-rw-r-- 1 ubuntu ubuntu 12 Sep 26 03:15 hello
lrwxrwxrwx 1 ubuntu ubuntu  5 Sep 26 03:19 hello-link -> hello
-r-------- 1 ubuntu ubuntu  0 Sep 26 03:01 myfile
```

> 심볼릭 링크 할경우 링크폴더가 옮겨질것을 고려하여 절대경로로 설정하는것이 좋다.
 

```
# 시스템정보 관련
ubuntu@ip-172-31-13-215:~$ who
ubuntu   pts/0        2017-09-26 02:34 (220.75.211.169)
ubuntu@ip-172-31-13-215:~$ whoami
ubuntu
ubuntu@ip-172-31-13-215:~$ date
Tue Sep 26 03:36:22 UTC 2017
UTC시간대 +9
 
ubuntu@ip-172-31-13-215:~$ top
top - 03:37:39 up  1:10,  1 user,  load average: 0.00, 0.00
Tasks: 104 total,   1 running, 103 sleeping,   0 stopped,
%Cpu(s):  0.3 us,  0.0 sy,  0.0 ni, 99.7 id,  0.0 wa,  0.0
KiB Mem :  1014660 total,   637820 free,    45084 used,   3
KiB Swap:        0 total,        0 free,        0 used.   8
 
  PID USER      PR  NI    VIRT    RES    SHR S %CPU %MEM
    1 root      20   0   37888   5964   4012 S  0.0  0.6
    2 root      20   0       0      0      0 S  0.0  0.0
    3 root      20   0       0      0      0 S  0.0  0.0
    4 root      20   0       0      0      0 S  0.0  0.0
    5 root       0 -20       0      0      0 S  0.0  0.0
    6 root      20   0       0      0      0 S  0.0  0.0
    7 root      20   0       0      0      0 S  0.0  0.0
    8 root      20   0       0      0      0 S  0.0  0.0
    9 root      rt   0       0      0      0 S  0.0  0.0
   10 root      rt   0       0      0      0 S  0.0  0.0
 
ubuntu@ip-172-31-13-215:~$ free
              total        used        free      shared  buff/cache   available
Mem:        1014660       44936      637960        3148      331764      812456
Swap:             0           0           0
ubuntu@ip-172-31-13-215:~$ free -h
              total        used        free      shared  buff/cache   available
Mem:           990M         43M        623M        3.1M        324M        793M
Swap:            0B          0B          0B
 
ubuntu@ip-172-31-13-215:~$ df -h
Filesystem      Size  Used Avail Use% Mounted on
udev            488M     0  488M   0% /dev
tmpfs           100M  3.1M   97M   4% /run
/dev/xvda1      7.7G  964M  6.8G  13% /
tmpfs           496M     0  496M   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
tmpfs           496M     0  496M   0% /sys/fs/cgroup
tmpfs           100M     0  100M   0% /run/user/1000
```

```
# 인스톨
ubuntu@ip-172-31-13-215:~$ sudo apt update
ubuntu@ip-172-31-13-215:~$ sudo apt install htop
..
..
# 모니터링 외부 툴
ubuntu@ip-172-31-13-215:~$ htop

# 폴더별 용량
ubuntu@ip-172-31-13-215:~$ du
8        ./.config/htop
12        ./.config
8        ./.ssh
4        ./.cache
40        .
 
$ du -s Documents
41778912        Documents
 
$ du -sh Documents
 20G        Documents
 
# 모든 프로세스
ubuntu@ip-172-31-13-215:~$ ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.5  37888  5964 ?        Ss   02:26   0:02 /sbin/init
root         2  0.0  0.0      0     0 ?        S    02:26   0:00 [kthreadd]
root         3  0.0  0.0      0     0 ?        S    02:26   0:00 [ksoftirqd/0]
root         4  0.0  0.0      0     0 ?        S    02:26   0:00 [kworker/0:0]
root         5  0.0  0.0      0     0 ?        S<   02:26   0:00 [kworker/0:0H]
root         7  0.0  0.0      0     0 ?        S    02:26   0:00 [rcu_sched]
root         8  0.0  0.0      0     0 ?        S    02:26   0:00 [rcu_bh]
root         9  0.0  0.0      0     0 ?        S    02:26   0:00 [migration/0]
root        10  0.0  0.0      0     0 ?        S    02:26   0:00 [watchdog/0]
root        11  0.0  0.0      0     0 ?        S    02:26   0:00 [kdevtmpfs]
root        12  0.0  0.0      0     0 ?        S<   02:26   0:00 [netns]
root        13  0.0  0.0      0     0 ?        S<   02:26   0:00 [perf]
 
ubuntu@ip-172-31-13-215:~$ ps
  PID TTY          TIME CMD
 1400 pts/0    00:00:00 bash
11766 pts/0    00:00:00 vim
11768 pts/0    00:00:00 vim
11771 pts/0    00:00:00 ps
# 프로세스 kill
ubuntu@ip-172-31-13-215:~$ kill -9 11768
[2]+  Killed                  vim
ubuntu@ip-172-31-13-215:~$ ps
  PID TTY          TIME CMD
 1400 pts/0    00:00:00 bash
11766 pts/0    00:00:00 vim
11772 pts/0    00:00:00 ps
 
# sleep(초)
ubuntu@ip-172-31-13-215:~$ sleep 1
ubuntu@ip-172-31-13-215:~$ sleep 10
 
ubuntu@ip-172-31-13-215:~$ sleep 10
^Z
[1]+  Stopped                 sleep 10
ubuntu@ip-172-31-13-215:~$ bg
[1]+ sleep 10 &
ubuntu@ip-172-31-13-215:~$ ps
  PID TTY          TIME CMD
11924 pts/1    00:00:00 bash
11947 pts/1    00:00:00 ps
[1]+  Done                    sleep 10
 
ubuntu@ip-172-31-13-215:~$ sleep 10
^Z
# 실행중인 작업
ubuntu@ip-172-31-13-215:~$ jobs
[1]+  Stopped                 sleep 10
 
# 텍스트에디터
ubuntu@ip-172-31-13-215:~$ vim txtxt
ubuntu@ip-172-31-13-215:~$ nano newfile
 
# Ctrl + z 로 잠시 빠져나올수있다.(백그라운드)
ubuntu@ip-172-31-13-215:~$ vim
 
[1]+  Stopped                 vim
ubuntu@ip-172-31-13-215:~$ nano
Use "fg" to return to nano.
 
[2]+  Stopped                 nano

# 현재 쉘 에서 실행되고 있는 것들
ubuntu@ip-172-31-13-215:~$ jobs 
[1]-  Stopped                 vim
[2]+  Stopped                 nano
 
# 중지되었거나 백그라운드에서 실행되고 있는 작업을 포그라운드로 표시.
ubuntu@ip-172-31-13-215:~$ fg
nano
Use "fg" to return to nano.
 
[2]+  Stopped                 nano
ubuntu@ip-172-31-13-215:~$ fg %1
vim
 
[1]+  Stopped                 vim

# & 백그라운드에서 실행되어 진행 
ubuntu@ip-172-31-13-215:~$ sleep 60 &

[3] 11980
ubuntu@ip-172-31-13-215:~$ jobs
[1]+  Stopped                 vim
[2]-  Stopped                 nano
[3]   Running                 sleep 60 &
```

```
# URL통신
ubuntu@ip-172-31-13-215:~$ curl http://google.com | less
 
ubuntu@ip-172-31-13-215:~$ echo 'asdf'
asdf
ubuntu@ip-172-31-13-215:~$ echo 'hello ubuntu' > hello-file
ubuntu@ip-172-31-13-215:~$ ls
hello-file  nanofile  newfile  nohup.out  txtxt
 
ubuntu@ip-172-31-13-215:~$ echo 'hello linux' | tee hello-linux2
hello linux
ubuntu@ip-172-31-13-215:~$ ls
hello-file  hello-linux2  nanofile  newfile  nohup.out  txtxt
ubuntu@ip-172-31-13-215:~$ cat hello-linux2
hello linux
```

### 리눅스 파이프라인
- stdin 표준입력
- stdout 표준출력
- stderr 표준에러

`>` 왼쪽의 표준출력을, 오른쪽 표준입력으로 저장한다.

`>>` 표준입력으로 추가하여 저장한다.

`|` 왼쪽의 '표준출력'을, 오른쪽 '표준입력'으로 연결한다.


``` 
ubuntu@ip-172-31-13-215:~$ echo 'hahaha'
hahaha
ubuntu@ip-172-31-13-215:~$ echo 'hahaha' | tee hahaha
hahaha
ubuntu@ip-172-31-13-215:~$ ls
hahaha
 
ubuntu@ip-172-31-13-215:~$ wc hahaha
1 1 7 hahaha
ubuntu@ip-172-31-13-215:~$ cat hahaha | wc
      1       1       7
 
ubuntu@ip-172-31-13-215:~$ cat teetest
aksjdlfa
asdfas
fdfewf
wefw
fwe
sdffj
eeeeel
# grep 파일내용 필터링
ubuntu@ip-172-31-13-215:~$ grep eee teetest
eeeeel
ubuntu@ip-172-31-13-215:~$ grep dfa teetest
asdfas
```

```
# 프로세스의 정보
ubuntu@ip-172-31-13-215:~$ ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.5  37888  5964 ?        Ss   02:26   0:02 /sbin
root         2  0.0  0.0      0     0 ?        S    02:26   0:00 [kthr
root         3  0.0  0.0      0     0 ?        S    02:26   0:00 [ksof
root         5  0.0  0.0      0     0 ?        S<   02:26   0:00 [kwor
root         7  0.0  0.0      0     0 ?        S    02:26   0:00 [rcu_
root         8  0.0  0.0      0     0 ?        S    02:26   0:00 [rcu_
root         9  0.0  0.0      0     0 ?        S    02:26   0:00 [migr
root        10  0.0  0.0      0     0 ?        S    02:26   0:00 [watc
..
...
..
 
ubuntu@ip-172-31-13-215:~$ ps aux | grep bash
ubuntu   12117  0.0  0.5  21392  5340 pts/1    Ss   05:45   0:00 -bash
ubuntu   18413  0.0  0.1  12944  1088 pts/1    S+   06:33   0:00 grep

```

```
# grep활용
ubuntu@ip-172-31-13-215:~$ curl -o google.html https://www.google.co.kr
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:100 10970    0 10970    0     0  31141      0 --:--:-- --:--:-- --:--:-- 31076
ubuntu@ip-172-31-13-215:~$ less google.html
```

 
## nvm 설치
https://github.com/creationix/nvm/blob/master/README.md

```
ubuntu@ip-172-31-13-215:~$ sudo apt list

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh | bash
```
 
# Cyberduck
Cyberduck은 SSH를 통해 파일을 전송할 수 있는 프로토콜인 SFTP을 지원하는 파일 브라우저이다. Cyberduck같은 툴을 사용하여 파일을 전송할수있다.

# AWS RDS
RDS는 클라우드에서 관계형 데이터베이스를 제공하는 AWS 서비스입니다. EC2처럼 유연한 배포 및 확장이 가능하다. MySQL, PostgreSQL, Oracle, MS SQL 등 다양한 RDBMS를 지원.
 
# AWS Route53
도메인 등록관련 서비스. 도메인등록대행을 신청할수있고, DNS설정들을 할 수 있다.

# AWS github 배포
일단 서버에서 Github 저장소를 복제하기 위해서는 SSH key 생성과 등록이 필요하다. ssh등록후 보안그룹을 설정하여 확인할수있다.
```
ubuntu@ip-172-31-13-215:~$ ssh-keygen
Generating public/private rsa key pair.
ubuntu@ip-172-31-13-215:~$ cat .ssh/id_rsa.pub
ssh-rsa A~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ubuntu@ip-172-31-13-215
```