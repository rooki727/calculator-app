// @generated by protoc-gen-es v1.10.1 with parameter "target=ts"
// @generated from file calculator/v1/calculator.proto (package calculator.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message calculator.v1.CalculateRequest
 */
export class CalculateRequest extends Message<CalculateRequest> {
  /**
   * @generated from field: double first_number = 1;
   */
  firstNumber = 0;

  /**
   * @generated from field: double second_number = 2;
   */
  secondNumber = 0;

  /**
   * "+", "-", "*", "/"
   *
   * @generated from field: string operation = 3;
   */
  operation = "";

  constructor(data?: PartialMessage<CalculateRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "calculator.v1.CalculateRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "first_number", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 2, name: "second_number", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 3, name: "operation", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CalculateRequest {
    return new CalculateRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CalculateRequest {
    return new CalculateRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CalculateRequest {
    return new CalculateRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CalculateRequest | PlainMessage<CalculateRequest> | undefined, b: CalculateRequest | PlainMessage<CalculateRequest> | undefined): boolean {
    return proto3.util.equals(CalculateRequest, a, b);
  }
}

/**
 * @generated from message calculator.v1.CalculateResponse
 */
export class CalculateResponse extends Message<CalculateResponse> {
  /**
   * @generated from field: double result = 1;
   */
  result = 0;

  constructor(data?: PartialMessage<CalculateResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "calculator.v1.CalculateResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "result", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CalculateResponse {
    return new CalculateResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CalculateResponse {
    return new CalculateResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CalculateResponse {
    return new CalculateResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CalculateResponse | PlainMessage<CalculateResponse> | undefined, b: CalculateResponse | PlainMessage<CalculateResponse> | undefined): boolean {
    return proto3.util.equals(CalculateResponse, a, b);
  }
}

