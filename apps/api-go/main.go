package main

import (
	"log"
	"os"

	"github.com/Hepri/gin-jsonschema"
	"github.com/gin-gonic/gin"
)

type Item struct {
  Title string `json:"title" binding:"required"`
  Year int `json:"year" binding:"required"`
}

type ItemList struct {
  Items []Item
}

func (itemList *ItemList) AddItem(item Item) []Item {
  itemList.Items = append(itemList.Items, item)
  return itemList.Items
}

func readJsonSchema() string {
  jsonFile, err := os.ReadFile("jsonschema.json")
  if err != nil {
    log.Fatal(err)
  }

  return string(jsonFile)
}

func setupRouter() *gin.Engine {
  var reqSchema = readJsonSchema()
  var items ItemList

	r := gin.Default()

  r.POST("/", func(ctx *gin.Context) {
    var item Item
    // Check schema
    if schema.BindJSON(ctx, reqSchema, &item) == nil {
      ctx.ShouldBindJSON(&item)
      items.AddItem(item)
      ctx.JSON(200, gin.H{ "message": "Success add item"})
    }
  })


  r.GET("/", func(ctx *gin.Context) {
    ctx.JSON(200, items)
  })

  return r
}


func main() {
  r := setupRouter()
	r.Run(":8080")
}
