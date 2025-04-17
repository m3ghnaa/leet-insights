package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/gin-contrib/cors"
)

// Response structure for Gemini API
type GeminiResponse struct {
	Candidates []struct {
		Content struct {
			Parts []struct {
				Text string `json:"text"`
			} `json:"parts"`
		} `json:"content"`
	} `json:"candidates"`
}

var cache = make(map[string]string)

func fetchGeminiData(problemNumber string) (string, error) {
    // 1) Cache lookup
    if text, exists := cache[problemNumber]; exists {
        fmt.Println("⚡ Cache hit for problem", problemNumber)
        return text, nil
    }

    apiKey := strings.TrimSpace(os.Getenv("GEMINI_API_KEY"))
    if apiKey == "" {
        return "", fmt.Errorf("❌ Error: GEMINI_API_KEY is not set")
    }
    fmt.Println("✅ API Key loaded successfully")

    url := "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-002:generateContent?key=" + apiKey

    // 2) Build the prompt (no stray comma here)
    promptText := fmt.Sprintf(`For LeetCode problem %s, provide a structured response including:

1. A brief summary of the problem.
2. Real-world applications categorized by industry (e.g., finance, healthcare, AI).
3. Common techniques and algorithms used to solve it (e.g., sliding window, dynamic programming).
4. Tips for approaching the problem efficiently (without giving the full solution).
`, problemNumber)

    // 3) Marshal the request
    requestBody, err := json.Marshal(map[string]interface{}{
        "contents": []map[string]interface{}{
            {
                "parts": []map[string]string{
                    {"text": promptText},
                },
            },
        },
    })
    if err != nil {
        return "", fmt.Errorf("❌ Error marshaling JSON: %w", err)
    }
    fmt.Println("✅ JSON request body created successfully")

    // 4) Send the HTTP request
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(requestBody))
    if err != nil {
        return "", fmt.Errorf("❌ Error creating request: %w", err)
    }
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return "", fmt.Errorf("❌ Error sending request: %w", err)
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return "", fmt.Errorf("❌ Error reading response: %w", err)
    }
    fmt.Println("📜 Raw Response Body:", string(body))

    // 5) Parse Gemini's JSON
    var gr GeminiResponse
    if err := json.Unmarshal(body, &gr); err != nil {
        return "", fmt.Errorf("❌ Error parsing JSON response: %w", err)
    }

    // 6) Extract the text, cache it, and return
    if len(gr.Candidates) > 0 && len(gr.Candidates[0].Content.Parts) > 0 {
        text := gr.Candidates[0].Content.Parts[0].Text
        cache[problemNumber] = text
        fmt.Println("✅ Successfully extracted and cached response")
        return text, nil
    }

    return "", fmt.Errorf("❌ No response received from Gemini API")
}



func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: No .env file found")
	}
}

func main() {
	loadEnv()

	router := gin.Default()

	router.Use(cors.Default())

	router.GET("/leetcode/:id", func(c *gin.Context) {
		problemID := c.Param("id")

		response, err := fetchGeminiData(problemID)
		if err != nil {
			fmt.Println("❌ Error fetching Gemini data:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch data"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"problem": problemID, "insights": response})
	})

	port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }
    fmt.Println("🚀 Server is running on port", port)
    router.Run(":" + port)
}