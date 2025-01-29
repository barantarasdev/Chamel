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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface UpdateMessageDTO
 */
export interface UpdateMessageDTO {
    /**
     * Message text
     * @type {string}
     * @memberof UpdateMessageDTO
     */
    text: string;
}

/**
 * Check if a given object implements the UpdateMessageDTO interface.
 */
export function instanceOfUpdateMessageDTO(value: object): value is UpdateMessageDTO {
    if (!('text' in value) || value['text'] === undefined) return false;
    return true;
}

export function UpdateMessageDTOFromJSON(json: any): UpdateMessageDTO {
    return UpdateMessageDTOFromJSONTyped(json, false);
}

export function UpdateMessageDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateMessageDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'text': json['text'],
    };
}

export function UpdateMessageDTOToJSON(json: any): UpdateMessageDTO {
    return UpdateMessageDTOToJSONTyped(json, false);
}

export function UpdateMessageDTOToJSONTyped(value?: UpdateMessageDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'text': value['text'],
    };
}

