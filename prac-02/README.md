# Cargo

Cargo는 node.js의 npm과도 같다. 즉, rust의 빌드 시스템 및 패키지 매니저이다. 아래 명령어를 실행하여 Cargo의 버전을 확인할 수 있다.

```
$ carco --version
cargo 1.65.0 (4bc8f24d3 2022-10-20)
```

# Cargo New

Cargo를 사용하여 새 프로젝트 폴더를 생성해보자.

```
$ cargo new prac-02 --bin
  Created binary (application) package
$ cd prac-02
```

`--bin` 옵션을 통해 실행 가능한 애플리케이션으로 만들어준다. 이와 같은 애플리케이션은 흔히 바이너리(binary)라고 불리우며, 위의 명령어를 통해 `prac-02`라는 실행 가능한 바이너리를 생성한다. `Carco.toml`은 TOML(Tom's Obvious, Minimal Language) 포맷으로 작성된 파일이며, Cargo의 환경설정 포맷이다. 그리고 `src` 폴더에는 `main.rs`가 함께 생성된다.

# Cargo Initialize

또는, prac-02 폴더를 미리 만들어놓고, 해당 폴더에 Cargo를 초기화할 수도 있다.

```
$ mkdir prac-02
$ cd prac-02
$ cargo init
  Created binary (application) package
```

# Cargo Build

아래 명렁어를 통해 Cargo로 생성한 프로젝트를 빌드한다.

```
$ cargo build
  Compiling prac-02 v0.1.0
    Finished dev [unoptimized + debuginfo] target(s) in 0.42s
```

컴파일 후에는 `Cargo.lock` 파일이 생성되는데, 이는 npm의 `package-lock.json`과 같은 역할을 한다. 빌드된 바이너리 파일은 `target/debug` 폴더 안에 생성되며, 파일명은 프로젝트 이름으로 저장되어 있다. 따라서, 아래 명령어로 바이너리를 실행시킬 수 있다.

```
$ ./target/debug/prac-02
Hello, world!
```

# Cargo Run

아래 명령어를 통해 컴파일과 실행 과정을 한 번에 수행할 수 있다.

```
$ cargo run
  Finished dev [unoptimized + debuginfo] target(s) in 0.00s
    Running `target/debug/prac-02`
Hello, world!
```

build 했을 때와는 다르게 컴파일 중이라는 문구(`Compiling`)가 나타나지 않는데, 그 이유는 최초 컴파일 당시 코드의 변화가 없기 때문이다. 만약, `src/main.rs` 파일을 수정 후 다시 `cargo run`을 해보면 다시 컴파일하는 것을 확인할 수 있다.

```
$ cargo run
  Compiling prac-02 v0.1.0
  Finished dev [unoptimized + debuginfo] target(s) in 0.15s
    Running `target/debug/prac-02`
Hello, world!!
```

# Cargo Check

아래 명령어를 통해 rust 코드가 컴파일되는지 확인할 수 있다.

```
$ cargo check
  Checking prac-02 v0.1.0
  Finished dev [unoptimized + debuginfo] target(s) in 0.07s
```

`cargo check`는 코드가 컴파일되는지 확인만 할 뿐, 바이너리를 생성하지는 않는다. 즉, 컴파일 과정을 거치지 않으므로 `cargo run`에 비해 빠르며, 이러한 이유로 인해 주로 코딩 중 코드를 검사하는 용도로 사용한다. 작업이 완료되었고, 컴파일 할 준비가 되었을 때 `cargo build`를 통해 바이너리를 생성한다.

# Release Build

프로젝트를 배포하기 위해 빌드할 때, `--release` 옵션을 사용하면 최적화된 컴파일을 할 수 있다.

```
$ cargo build --release
  Compiling prac-02 v0.1.0
    Finished release [optimized] target(s) in 0.15s
```

배포용 바이너리 파일은 `target/release`에 생성되며, 최적화 과정을 거치므로 `cargo build`로만 컴파일할 때보다 시간이 더 오래 걸릴 수 있다.
