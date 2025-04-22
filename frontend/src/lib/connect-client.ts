import { createConnectTransport } from "@connectrpc/connect-web";
import {createPromiseClient} from "@connectrpc/connect";
import { CalculatorService } from "@/gen/calculator/v1/calculator_connect";

const transport = createConnectTransport({
  baseUrl: typeof window === "undefined" ? "" : "http://localhost:8080",
  useBinaryFormat: true, // 使用二进制协议
});

export const connectClient = createPromiseClient(CalculatorService, transport);