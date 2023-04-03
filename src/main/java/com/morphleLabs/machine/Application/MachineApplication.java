package com.morphleLabs.machine.Application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan("com.morphleLabs.machine")
@SpringBootApplication
public class MachineApplication {

    public static void main(String[] args) {
        SpringApplication.run(com.morphleLabs.machine.Application.MachineApplication.class, args);
    }

}
