package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Todo struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Body  string `json:"body"`
	Done  bool   `json:"done"`
}

func main() {
	fmt.Println("starting")
	var app = fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
	}))
	todos := []Todo{}
	app.Get("", func(c *fiber.Ctx) error {
		return c.SendString("API for todo app")
	})
	app.Get("healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})
	app.Get("api/todos", func(c *fiber.Ctx) error {
		return c.JSON(todos)
	})
	app.Post("api/todos", func(c *fiber.Ctx) error {
		todo := &Todo{}
		if err := c.BodyParser(todo); err != nil {
			return err
		}

		if len(todos) > 0 {
			todo.ID = todos[len(todos)-1].ID + 1
		} else {
			todo.ID = 0
		}

		todos = append(todos, *todo)
		return c.JSON(todo)
	})
	app.Patch("api/todos/:id/done", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")
		if err != nil {
			return c.Status(401).SendString("Invalid id")
		}
		for i, t := range todos {
			if t.ID == id {
				todos[i].Done = true
				return c.JSON(todos[i])
			}
		}
		return c.Status(500).SendString("Not implement")
	})
	app.Delete("api/todos/:id", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")
		if err != nil {
			return c.Status(401).SendString("Invalid id")
		}
		for i, t := range todos {
			if t.ID == id {
				id = i
				break
			}
		}
		todos = append(todos[:id], todos[id+1:]...)
		return c.JSON(fiber.Map{
			"message": "Deleted success",
			"data":    todos[id],
		})
	})
	app.Listen(":5001")
}
