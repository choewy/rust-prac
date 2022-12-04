use std::io::prelude::*;
use std::net::TcpStream;
use std::net::TcpListener;
use std::fs::File;

const HOST: &str = "127.0.0.1:30001";

fn main() {
    let listener = TcpListener::bind(HOST).unwrap();

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        handle_connection(stream);
    }
}

const GET: &[u8] = b"GET / HTTP/1.1\r\n";

const HTTP_OK: (&str, &str) = ("200 OK", "index.html");
const HTTP_NOT_FOUND: (&str, &str) = ("404 NOT FOUND", "404.html");

fn handle_connection(mut stream: TcpStream) {
    let mut buffer = [0; 512];

    stream.read(&mut buffer).unwrap();

    println!("request: {}", String::from_utf8_lossy(&buffer[..]));

    let (status, filename) = if buffer.starts_with(GET) {
        HTTP_OK
    } else {
        HTTP_NOT_FOUND
    };

    let mut html = File::open(filename).unwrap();
    let mut contents = String::new();

    html.read_to_string(&mut contents).unwrap();

    let response = format!(
        "HTTP/1.1 {}\r\nContent-Length: {}\r\n\r\n{}", 
        status,
        contents.len(),
        contents
    );

    stream.write(response.as_bytes()).unwrap();
    stream.flush().unwrap();
}
