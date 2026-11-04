package com.example.careconnect.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
@Controller 
public class PortalController {
    @GetMapping("/login")
    public String login() {

        return "login";
    }
}
