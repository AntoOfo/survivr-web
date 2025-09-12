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
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import java.time.LocalDate;
import java.util.List;
import java.util.Arrays;
import java.util.Collections;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 *
 * @author anton
 */
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class SurvivrController {
    
    @Value("${groq.api.key}")
    private String groqApiKey;
    
    @Value("${pexels.api.key}")
    private String pexelsApiKey;
    
    private final WebClient webClient = WebClient.create();
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    // cached list n date
    private List<LifeHack> cachedHacks = null;
    private LocalDate lastFetchDate = null;
            
    public static class LifeHack {
        public String title;
        public String bio;
        public String image;
        public String category;
        public String didYouKnow;
    }
    
    @GetMapping("/lifehacks")
    public Mono<List<LifeHack>> getLife() {
        LocalDate today = LocalDate.now();
        
        // if alr fetched tday, just return cached
        if (lastFetchDate != null && lastFetchDate.equals(today) && cachedHacks != null) {
            return Mono.just(cachedHacks);
        }
        
        // otherwise, call api for new ones
        String request = """
        {
          "model": "llama-3.3-70b-versatile",
          "messages": [{
            "role": "user",
            "content": "Return ONLY a JSON array (starting with []) containing 9 unique, practical, and situation-specific survival tips in strict JSON format. Each must include: 1. title, 2. bio (24 - 35 words ONLY, no shorter, no longer. Add a FULL STOP at the end of the bio.), 3. image (use a realistic URL), 4. category (choose from 'Survival', 'Health', 'City Safety', 'Prep'), 5. didYouKnow (a fact with 30 - 40  words ONLY, must relate to the hack). Rules: 1. DO NOT repeat tips or rephrase the same advice. Every entry must be a distinct situation. 2. Vary the environments (wilderness, urban, disaster, home, weather extremes, medical emergencies, the body). 3. Focus on specific situations, not generic survival themes. 4. Do NOT include a 'content' field. Make sure that the bio itself contains the actual tip, not a tagline. No wrapper objects, just the array."
          }]
        }
        """;
        
        return webClient
                .post()
                .uri("https://api.groq.com/openai/v1/chat/completions")
                .header("Authorization", "Bearer " + groqApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(response -> {
                    try{
                       String aiJson = objectMapper.readTree(response)
                            .path("choices").get(0)
                            .path("message").path("content")
                            .asText().replaceAll("```(json)?", "").trim();

                    LifeHack[] tips = objectMapper.readValue(aiJson, LifeHack[].class);
                    
                    // for each tip, call pexels api (function will be made)
                    List<Mono<LifeHack>> newTips = Arrays.stream(tips)
                            .map(tip -> webClient.get()
                                    .uri(uriBuilder -> uriBuilder
                                            .scheme("https")
                                            .host("api.pexels.com")
                                            .path("/v1/search")
                                            .queryParam("query", tip.title)
                                            .queryParam("per_page", 1)
                                            .build())
                                    .header("Authorization", pexelsApiKey)
                                    .retrieve()
                                    .bodyToMono(String.class)
                                    .map(pexelsResponse -> {
                                        try {
                                            JsonNode imgNode = objectMapper.readTree(pexelsResponse)
                                                    .path("photos").get(0)
                                                    .path("src")
                                                    .path("medium");
                                            tip.image = imgNode.asText();
                                        } catch (Exception e) {
                                            tip.image = ""; // will add placeholder img here for fallbacks
                                        }
                                        return tip;
                                    })
                            ).toList();
                    
                    // merge em all into one list
                    return Mono.zip(newTips, results -> {
                        List<LifeHack> hacks = Arrays.stream(results)
                                    .map(obj -> (LifeHack) obj)
                                    .toList();
                        
                        // update the cache
                        cachedHacks = hacks;
                        lastFetchDate = today;
                        return hacks;
                      });

                } catch (Exception e) {
                    e.printStackTrace();
                    return Mono.just(Collections.emptyList());
                }
            });
}
    }
