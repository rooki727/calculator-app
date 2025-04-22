package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"

	"connectrpc.com/connect"
	calculatorv1 "github.com/rooki727/calculator/gen/calculator/v1"
	"github.com/rooki727/calculator/gen/calculator/v1/v1connect"
	"github.com/rs/cors"
)

type CalculatorServer struct{}

func (s *CalculatorServer) Calculate(
	ctx context.Context,
	req *connect.Request[calculatorv1.CalculateRequest],
) (*connect.Response[calculatorv1.CalculateResponse], error) {
	// 保持原有计算逻辑不变
	op1 := req.Msg.FirstNumber
	op2 := req.Msg.SecondNumber
	op := req.Msg.Operation

	var result float64
	var err error

	switch op {
	case "+":
		result = op1 + op2
	case "-":
		result = op1 - op2
	case "*":
		result = op1 * op2
	case "/":
		if op2 == 0 {
			err = connect.NewError(connect.CodeInvalidArgument, errors.New("division by zero"))
		} else {
			result = op1 / op2
		}
	default:
		err = connect.NewError(connect.CodeInvalidArgument, fmt.Errorf("unknown operation: %s", op))
	}

	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&calculatorv1.CalculateResponse{
		Result: result,
	}), nil
}

func main() {
	calculator := &CalculatorServer{}
	mux := http.NewServeMux()
	path, handler := v1connect.NewCalculatorServiceHandler(calculator)
	mux.Handle(path, handler)

	// 配置CORS（开发环境）
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Connect-Protocol-Version"},
		AllowCredentials: true,
	})

	log.Println("Server started on :8080")
	log.Fatal(http.ListenAndServe(":8080", corsHandler.Handler(mux)))
}
