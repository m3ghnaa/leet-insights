package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

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
	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		fmt.Println("❌ Error: GEMINI_API_KEY is not set")
		return "", fmt.Errorf("GEMINI_API_KEY is missing")
	}
	fmt.Println("✅ API Key loaded successfully")

	url := "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-002:generateContent?key=" + apiKey

	// Updated Gemini prompt
	promptText := fmt.Sprintf(`For LeetCode problem %s, provide a structured response including:

1. A brief summary of the problem.
2. Real-world applications categorized by industry (e.g., finance, healthcare, AI).
3. Common techniques and algorithms used to solve it (e.g., sliding window, dynamic programming).
4. Tips for approaching the problem efficiently (without giving the full solution).
`, problemNumber),

	// Construct request payload
	requestBody, err := json.Marshal(map[string]interface{}{
		"contents": []map[string]interface{}{
			{
				"parts": []map[string]string{
					{
						"text": promptText,
					},
				},
			},
		},
	})
	if err != nil {
		fmt.Println("❌ Error marshaling JSON:", err)
		return "", err
	}
	fmt.Println("✅ JSON request body created successfully")

	// Create HTTP request
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(requestBody))
	if err != nil {
		fmt.Println("❌ Error creating request:", err)
		return "", err
	}

	req.Header.Set("Content-Type", "application/json")
	fmt.Println("✅ Request headers set successfully")

	// Send request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("❌ Error sending request:", err)
		return "", err
	}
	defer resp.Body.Close()
	fmt.Println("✅ Request sent successfully, status code:", resp.StatusCode)

	// Read response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("❌ Error reading response:", err)
		return "", err
	}
	fmt.Println("✅ Response received successfully")

	// Print raw response body
	fmt.Println("📜 Raw Response Body:", string(body))

	// Parse response
	var response GeminiResponse
	err = json.Unmarshal(body, &response)
	if err != nil {
		fmt.Println("❌ Error parsing JSON response:", err)
		return "", err
	}
	fmt.Println("✅ Response parsed successfully")

	// Extract text from response
	if len(response.Candidates) > 0 && len(response.Candidates[0].Content.Parts) > 0 {
		fmt.Println("✅ Successfully extracted response")
		return response.Candidates[0].Content.Parts[0].Text, nil
	}

	fmt.Println("❌ No response received from Gemini API")
	return "", fmt.Errorf("no response received")

	if len(response.Candidates) > 0 && len(response.Candidates[0].Content.Parts) > 0 {
		text := response.Candidates[0].Content.Parts[0].Text
		cache[problemNumber] = text // save to cache
		return text, nil
	}
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

	fmt.Println("🚀 Server is running on port 8080...")
	router.Run(":8080")
}
