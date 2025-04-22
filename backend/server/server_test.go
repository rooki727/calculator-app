package main

import (
	"context"
	"net/http"
	"testing"

	"connectrpc.com/connect"
	calculatorv1 "github.com/rooki727/calculator/gen/calculator/v1"
	"github.com/rooki727/calculator/gen/calculator/v1/v1connect"
)

func TestCalculatorServer(t *testing.T) {
	// server := &CalculatorServer{}
	client := v1connect.NewCalculatorServiceClient(
		http.DefaultClient,
		"http://localhost:8080",
	)

	tests := []struct {
		name     string
		op1      float64
		op2      float64
		operator string
		want     float64
		wantErr  bool
	}{
		{"addition", 5, 3, "+", 8, false},
		{"subtraction", 5, 3, "-", 2, false},
		{"multiplication", 5, 3, "*", 15, false},
		{"division", 6, 3, "/", 2, false},
		{"division by zero", 6, 0, "/", 0, true},
		{"unknown operator", 6, 3, "x", 0, true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			res, err := client.Calculate(context.Background(), connect.NewRequest(&calculatorv1.CalculateRequest{
				FirstNumber:  tt.op1,
				SecondNumber: tt.op2,
				Operation:    tt.operator,
			}))

			if tt.wantErr {
				if err == nil {
					t.Errorf("expected error, got nil")
				}
				return
			}

			if err != nil {
				t.Fatalf("Calculate() error = %v", err)
			}
			if res.Msg.Result != tt.want {
				t.Errorf("Calculate() got = %v, want %v", res.Msg.Result, tt.want)
			}
		})
	}
}
