extern crate rand;

use std::io;
use std::cmp::Ordering;
use rand::Rng;

fn main() {
    println!("Welcom Up & Down Game!");
    println!("Generating random number...");
    let _rand_num = rand::thread_rng().gen_range(1, 51);
    
    let mut count = 0;

    loop {
        if count == 5 {
            println!("You Lose!");
            break;
        }

        count += 1;

        println!("Input your number");
        let mut your_num = String::new();

        io::stdin().read_line(&mut your_num).expect("Failed to read line.");
        
        let your_num: u8 = match your_num.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };
        
        match your_num.cmp(&_rand_num) {
            Ordering::Less => {
                println!("Up, avaliable count is {}", 5 - count);
            },
            Ordering::Greater => {
                println!("Down, avaliable count is {}", 5 - count);
            },
            Ordering::Equal => {
                println!("Rand number is {}", _rand_num);
                println!("Your number is {}", your_num);
                println!("You Win!");
                break;
            },
        };
    }
}
