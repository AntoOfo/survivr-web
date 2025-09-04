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
            "content": "Give me 9 life-saving survival tips in strict JSON format. Each must include: 1. title, 2. bio (170 - 185 characters ONLY, no shorter, no longer), 3. image (use a realistic URL), 4. category (choose from 'Survival', 'Health', 'City Safety', 'Prep'). Do NOT include a 'content' field. Make sure that the bio itself contains the actual tip, not a tagline."
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
