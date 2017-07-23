## 강의자료
https://github.com/ulgoon/wps-se

## 과제
'til' repo 생성 하여 학습내용 업로드
https://try.github.io/levels/1/challenges/1 과제 수행

---

# 컴퓨터
> 계산을 통해 시스템을 구성하는것. 
- Computer vs Calculator
  - 컴퓨터 : 연산을 기반으로 시스템을 구성 (저장, 로드)
  - 연산 : 단순 연산
 
## 컴퓨터사이언스, 엔지니어링 
소프트웨어 학문 연구

# CPU
## 기본 구조
- 프로그램카운터  
다음에 실행될 명령어의 주소를 가지고 있어 실행할 기계어 코드의 위치를 지정한다.

## CISC&RISC 
CISC (Complex Instruction Set Computers)  
	- 복잡한 명력, 고성능 ,  intel x86 amd64  

RISC (Reduced Instruction Set Computers)  
	- 단순화. 메모리접근 횟수 감소, 저전력, ARM  
	
# 메모리
## 메모리
컴퓨터에서 사용되는 정보들을 저장하는 공간

## RAM (Random Access Memory)
- 자유롭게 읽고 쓰는 주기억장치
- 메모리의 주소로 그 위치에 접근
- RAM의 어떤 위치로든 같은 시간에 접근(Random Access)
- 컴퓨터가 느려지면 재부팅! 전기가 끊어지면 초기화

## ROM (Read Only Memory)
- 전원이 공급되지 않아도 그 정보를 유지하는 주기억장치
- 비싸거나 느려서 안정적인 정보를 저장해야 할 때 사용
- BIOS, OS, Firmware 정보 저장에 쓰임

# OS (Operating System)
## 운영체제
hardware <=> OS <=> application Software  
하드웨어와 응용프로그램 의 리소스를 관리하는 시스템소프트웨어

## unix
os시작. AT&T. 네임드개발자

## 유니스 기반 like
Solaris BSD MacOS

## Linux
유닉스를 클론하여 수정하여 만듬
GNU/Linux 
우분투 페도라 centOS 
## Linux 기반 like
Android, Tizen, ChromeOS

## windows
- MS-DOS
- Windows 1
- Windows 95 98 XP 7 10
- 커널
  - MS-DOS based -> 
  - 16bit WindwosNT Kernel(3.1) based -> 
  - 32bit WindwosNT Kernel(6.1) based -> 
  - x86-64(AMD64)

# 패치, 디버그

패치 : 수정된 기능을 업데이트
디버그 : 프로그램을 수정하는것

# GIT 깃

## VCS (version Control System) 버전관리 시스템
== SCM (Source Code Management) 
< SCM (Software Configuration Management: 형상관리)  

SCM : 개발코드 이외의 것들도 다 포함

## 만든이
리누스 토발즈 : Subversion SVN의 불편함을 인지후 git을 개발

## 특징
 - 단순한구조, 빠른속도
 - 분산형저장소
 - 브랜치를 활용한 여러 방향으로 개발가능

## 장점
 - 버전관리 편의
 - 소스코드 주고받기 없이 동시작업이 가능해져 생산성이 증가
 - 수정내용은 commit 단위로 관리, 배포 뿐 아니라 원하는 시점으로 Checkout 가능
 - 새로운 기능 추가는 Branch로 개발하여 편안한 실험이 가능하며, 성공적으로 개발이 완료되면 Merge하여 반영
 - 오프라인 개발

## 용어
 - Blob 각각 파일의 단위
 - Tree 블록들의 모음
 - Commit 블록의 변경사항 정보

## 흐름


## install
### 홈브류를 이용한 설치 
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
(https://brew.sh/index_ko.html)

brew install git

git --version
git version 2.13.3
```

### git 설정
```
~ downmix$ git config --global user.name "downmix"
~ downmix$ git config --global user.email "downmix@downmix.net"
~ downmix$ git config --list
credential.helper=osxkeychain
user.name=downmix
user.email=downmix@downmix.net
```

### 폴더에 git 초기화
```
my-first-repo downmix$ git init
Initialized empty Git repository in /Users/downmix/Documents/dev/my-first-repo/.git/
my-first-repo downmix$ ls
my-first-repo downmix$ ls -all
total 0
drwxr-xr-x  3 downmix  staff  102  7 21 14:08 .
drwxr-xr-x  3 downmix  staff  102  7 21 14:07 ..
drwxr-xr-x  9 downmix  staff  306  7 21 14:08 .git
```
### 파일 ADD
```
ogtaeg-im-ui-MacBook-Pro:my-first-repo downmix$ ls
index.html
ogtaeg-im-ui-MacBook-Pro:my-first-repo downmix$ git status
On branch master

Initial commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)

index.html

nothing added to commit but untracked files present (use "git add" to track)
my-first-repo downmix$ git add index.html
my-first-repo downmix$ git status
On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

new file:   index.html
```

### 파일 커밋
```
my-first-repo downmix$ git commit -m "Creat index.html
I Created index.html while I'm doing my lecture.
And I want caffeine."
[master (root-commit) d9302ca] Creat index.html I Created index.html while I'm doing my lecture. And I want caffeine.
 1 file changed, 13 insertions(+)
 create mode 100644 index.html
my-first-repo downmix$ git status
On branch master
nothing to commit, working tree clean

my-first-repo downmix$ git remote add origin https://github.com/downmix/my-first-repo.git
my-first-repo downmix$ git push origin master
Username for 'https://github.com': downmix
Password for 'https://downmix@github.com': 
Counting objects: 3, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 455 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/downmix/my-first-repo.git
 * [new branch]      master -> master
```

## Github 블로그
### 만들기 : github 에서 clone
```
dev downmix$ git clone https://github.com/downmix/downmix.github.io.git
Cloning into 'downmix.github.io'...
remote: Counting objects: 4, done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 4 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (4/4), done.
```

### branch 확인
```
downmix.github.io downmix$ git branch -a
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
```

### branch 생성, 변경
```
downmix.github.io downmix$ git branch stem
downmix.github.io downmix$ git branch
* master
  stem
downmix.github.io downmix$ git checkout stem
Switched to branch 'stem'
downmix.github.io downmix$ git branch
  master
* stem
```

### branch 변경 상태에서 commit push
> 브랜치 변경시 파일들도 브랜치 기준으로 변경됨을 확인할수있다.    
```
downmix.github.io downmix$ git status
On branch stem
Untracked files:
  (use "git add <file>..." to include in what will be committed)

        about.html

nothing added to commit but untracked files present (use "git add" to track)
downmix.github.io downmix$ git add about.html
downmix.github.io downmix$ git commit -m "add about.html"
[stem 90fd748] add about.html
 1 file changed, 14 insertions(+)
 create mode 100644 about.html
downmix.github.io downmix$ git push origin stem
Counting objects: 3, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 558 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/downmix/downmix.github.io.git
 * [new branch]      stem -> stem
downmix.github.io downmix$ git checkout master
Switched to branch 'master'
Your branch is up-to-date with 'origin/master'.
```

### 브랜치 merge
```
downmix.github.io downmix$ git merge stem
Updating af03192..90fd748
Fast-forward
 about.html | 14 ++++++++++++++
 1 file changed, 14 insertions(+)
 create mode 100644 about.html
```

## git 협업
 - 콜라보레이션 (Collaborate) : 현재 git에 권한 부여 동일하게 작업.
 - 포크 (Fork and Merge) : 포크를 받아 수정 > add > commit >push > pull리퀘스트.


stage

로컬저장소

원격저장소

원격지 당겨받기
