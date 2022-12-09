package com.yiftach.TheProjectPart2.app.core.tests;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Scanner;

@Component
public class MainMenu implements CommandLineRunner {

    private int menu = 0;
    private Scanner scanner = new Scanner(System.in);
    private boolean running = true;

    @Override
    public void run(String... args) throws Exception {
        while (running) {
            switch (menu) {
                case 0:
                    System.out.println("Main menu:\n" +
                            "1.Login" +
                            "2.Exit");
                    menu = scanner.nextInt();
                    break;
                case 1:

                case 2:
                    running = false;
                    break;
            }
        }
    }
}
