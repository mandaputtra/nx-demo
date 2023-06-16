package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestAddRoute(t *testing.T) {
	router := setupRouter()

  mcPostBody := map[string]interface{}{
    "title": "Title would be great",
    "year": 1001,
  }
  body, _ := json.Marshal(mcPostBody)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/", bytes.NewReader(body))
	router.ServeHTTP(w, req)

  fmt.Println(w.Body.String())

	assert.Equal(t, 200, w.Code)
}
