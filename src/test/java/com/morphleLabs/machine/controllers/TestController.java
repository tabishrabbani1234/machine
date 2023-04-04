package com.morphleLabs.machine.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @RequestMapping("/morphleLabs")
    public String welcomepage() {
        return "Hello Boy";
    }
}
