package com.yiftach.TheProjectPart2.app.core.tests;

import com.yiftach.TheProjectPart2.app.core.tasks.LoginManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Scanner;

// A menu to test all the functions in the program,
// currently not in use.

//@Component
public class MainMenu implements CommandLineRunner {

    private int menu = 0;
    private Scanner scanner = new Scanner(System.in);
    private boolean running = true;
    @Autowired
    private LoginMenu loginMenu = new LoginMenu();

    @Override
    public void run(String... args) throws Exception {
        while (running) {
            switch (menu) {
                case 0:
                    System.out.println("Main menu:\n" +
                            "1.Login\n" +
                            "2.Exit\n");
                    menu = scanner.nextInt();
                    break;
                case 1:
                    loginMenu.loginMenu();
                    break;
                case 2:
                    System.out.println("Closing program");
                    running = false;
                    break;
            }
        }
    }
}
