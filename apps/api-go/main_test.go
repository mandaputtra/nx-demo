package main

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func performRequest(r http.Handler, method, path string, body io.Reader) *httptest.ResponseRecorder {
   req, _ := http.NewRequest(method, path, body)
   w := httptest.NewRecorder()
   r.ServeHTTP(w, req)
   return w
}

func TestAddRoute(t *testing.T) {
	router := setupRouter()

  itemPostBody := map[string]interface{}{
    "title": "Title would be great",
    "year": 1992,
  }
  body, _ := json.Marshal(itemPostBody)
  wAdd := performRequest(router, "POST", "/", bytes.NewReader(body))

	assert.Equal(t, 200, wAdd.Code)

  wGet := performRequest(router, "GET", "/", nil)
  assert.Equal(t, 200, wGet.Code)
}

func TestJSONSchemaFail(t *testing.T) {
	router := setupRouter()

  itemPostBody := map[string]interface{}{
    "title": "Title would be great",
    "year": 10,
  }
  body, _ := json.Marshal(itemPostBody)
  w := performRequest(router, "POST", "/", bytes.NewReader(body))
	assert.Equal(t, 400, w.Code)
}
