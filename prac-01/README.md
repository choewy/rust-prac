# INTRO

rust 파일의 확장자는 `.rs`이다.
파일명을 지을 때, 공백은 `_`로 표기한다.

# COMPILE

아래 명령어로 컴파일한다.

```
$ rustc main.rs
```

- 그러면 작업 폴더에 `main`(Linux, MacOS) 또는 `main.exe`(Windows) 파일이 생성된다.

# RUN

아래 명렁어로 프로그램을 실행시킨다.

- Linux, MacOS

```
$ ./main
```

- Windows

```
> ./main.exe
```

# ADVANCED

shell script를 통해 컴파일과 실행 과정을 한 번에 수행할 수 있다.

- `run.sh`

```sh
#!bash/bin

rustc main.rs && ./main
```

```
$ sh run.sh
```
