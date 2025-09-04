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
    
    @Value("${groq.api.key}")
    private String groqApiKey;
    
    private final WebClient webClient = WebClient.create();
    
    @GetMapping("/lifehacks")
    public Mono<String> getLife() {
        String request = """
        {
          "model": "llama-3.3-70b-versatile",
          "messages": [{
            "role": "user",
            "content": "Give me 9 life-saving survival tips in JSON format. Each should include a title, bio (159-170 characters), a relating image link and category (choose from 'Survival', 'Health', 'City Safety', 'Prep'). The content of the tip must fit its category."
          }]
        }
        """;
        
        return webClient.post()
                .uri("https://api.groq.com/openai/v1/chat/completions")
                .header("Authorization", "Bearer " + groqApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class);
    }
    
}
