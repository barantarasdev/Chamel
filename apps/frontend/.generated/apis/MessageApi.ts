/* tslint:disable */
/* eslint-disable */
/**
 * Chamel
 * The Chamel API description
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from '../runtime'
import type { CreateMessageDTO, CMessage, UpdateMessageDTO } from '../models/index'
import {
  CreateMessageDTOFromJSON,
  CreateMessageDTOToJSON,
  MessageCFromJSON,
  MessageCToJSON,
  UpdateMessageDTOFromJSON,
  UpdateMessageDTOToJSON,
} from '../models/index'

export interface MessageControllerCreateMessageRequest {
  createMessageDTO: CreateMessageDTO
}

export interface MessageControllerDeleteMessageRequest {
  messageId: string
}

export interface MessageControllerGetMessageRequest {
  messageId: string
}

export interface MessageControllerUpdateMessageRequest {
  messageId: string
  updateMessageDTO: UpdateMessageDTO
}

/**
 *
 */
export class MessageApi extends runtime.BaseAPI {
  /**
   * Create message
   */
  async messageControllerCreateMessageRaw(
    requestParameters: MessageControllerCreateMessageRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<CMessage>> {
    if (requestParameters['createMessageDTO'] == null) {
      throw new runtime.RequiredError(
        'createMessageDTO',
        'Required parameter "createMessageDTO" was null or undefined when calling messageControllerCreateMessage().',
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    const response = await this.request(
      {
        path: `/message`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: CreateMessageDTOToJSON(requestParameters['createMessageDTO']),
      },
      initOverrides,
    )

    return new runtime.JSONApiResponse(response, (jsonValue) => MessageCFromJSON(jsonValue))
  }

  /**
   * Create message
   */
  async messageControllerCreateMessage(
    requestParameters: MessageControllerCreateMessageRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<CMessage> {
    const response = await this.messageControllerCreateMessageRaw(requestParameters, initOverrides)
    return await response.value()
  }

  /**
   * Remove message
   */
  async messageControllerDeleteMessageRaw(
    requestParameters: MessageControllerDeleteMessageRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<CMessage>> {
    if (requestParameters['messageId'] == null) {
      throw new runtime.RequiredError(
        'messageId',
        'Required parameter "messageId" was null or undefined when calling messageControllerDeleteMessage().',
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    const response = await this.request(
      {
        path: `/message/{messageId}`.replace(
          `{${'messageId'}}`,
          encodeURIComponent(String(requestParameters['messageId'])),
        ),
        method: 'DELETE',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    )

    return new runtime.JSONApiResponse(response, (jsonValue) => MessageCFromJSON(jsonValue))
  }

  /**
   * Remove message
   */
  async messageControllerDeleteMessage(
    requestParameters: MessageControllerDeleteMessageRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<CMessage> {
    const response = await this.messageControllerDeleteMessageRaw(requestParameters, initOverrides)
    return await response.value()
  }

  /**
   * Get message
   */
  async messageControllerGetMessageRaw(
    requestParameters: MessageControllerGetMessageRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<CMessage>> {
    if (requestParameters['messageId'] == null) {
      throw new runtime.RequiredError(
        'messageId',
        'Required parameter "messageId" was null or undefined when calling messageControllerGetMessage().',
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    const response = await this.request(
      {
        path: `/message/{messageId}`.replace(
          `{${'messageId'}}`,
          encodeURIComponent(String(requestParameters['messageId'])),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    )

    return new runtime.JSONApiResponse(response, (jsonValue) => MessageCFromJSON(jsonValue))
  }

  /**
   * Get message
   */
  async messageControllerGetMessage(
    requestParameters: MessageControllerGetMessageRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<CMessage> {
    const response = await this.messageControllerGetMessageRaw(requestParameters, initOverrides)
    return await response.value()
  }

  /**
   * Update message
   */
  async messageControllerUpdateMessageRaw(
    requestParameters: MessageControllerUpdateMessageRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<CMessage>> {
    if (requestParameters['messageId'] == null) {
      throw new runtime.RequiredError(
        'messageId',
        'Required parameter "messageId" was null or undefined when calling messageControllerUpdateMessage().',
      )
    }

    if (requestParameters['updateMessageDTO'] == null) {
      throw new runtime.RequiredError(
        'updateMessageDTO',
        'Required parameter "updateMessageDTO" was null or undefined when calling messageControllerUpdateMessage().',
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    const response = await this.request(
      {
        path: `/message/{messageId}`.replace(
          `{${'messageId'}}`,
          encodeURIComponent(String(requestParameters['messageId'])),
        ),
        method: 'PUT',
        headers: headerParameters,
        query: queryParameters,
        body: UpdateMessageDTOToJSON(requestParameters['updateMessageDTO']),
      },
      initOverrides,
    )

    return new runtime.JSONApiResponse(response, (jsonValue) => MessageCFromJSON(jsonValue))
  }

  /**
   * Update message
   */
  async messageControllerUpdateMessage(
    requestParameters: MessageControllerUpdateMessageRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<CMessage> {
    const response = await this.messageControllerUpdateMessageRaw(requestParameters, initOverrides)
    return await response.value()
  }
}
