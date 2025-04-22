import { createPromiseClient } from '@connectrpc/connect'
import { CalculatorService } from "@/gen/calculator/v1/calculator_connect";
import { createConnectTransport } from '@connectrpc/connect-web'

describe('Calculator Service', () => {
  const transport = createConnectTransport({ baseUrl: '' })
  const client = createPromiseClient(CalculatorService, transport)

  it('should create client correctly', () => {
    expect(client).toBeDefined()
    expect(typeof client.calculate).toBe('function')
  })
  
  // 可以添加更多API调用测试
})