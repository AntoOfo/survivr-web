/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.survivr.controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.bind.annotation.GetMapping;
import reactor.core.publisher.Mono;

/**
 *
 * @author anton
 */
@RestController
public class SurvivrController {
    
    @Value("${groq.api.key")
    private String groqApiKey;
    
    private final WebClient webClient = WebClient.create();
    
    @GetMapping("/lifehacks")
    public Mono<String> getLife() {
        String request = """
        {
          "model": "llama-3.3-70b-versatile",
          "messages": [{
            "role": "user",
            "content": "Give me 9 life-saving survival tips in JSON format, each with a title, bio (159-170 characters), and a relating image link."
          }]
        }
        """;
    }
    
}
