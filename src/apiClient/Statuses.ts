/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { HttpClient, RequestParams } from "./http-client";

export class Statuses<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Получение списка статусов
   *
   * @tags statuses
   * @name StatusesList
   * @request GET:/statuses/
   */
  statusesList = (params: RequestParams = {}) =>
    this.request<
      {
        id?: number;
        name?: string;
      }[],
      any
    >({
      path: `/statuses/`,
      method: "GET",
      ...params,
    });
  /**
   * @description Создание статуса
   *
   * @tags statuses
   * @name StatusesCreate
   * @request POST:/statuses/
   */
  statusesCreate = (
    body: {
      /** @minLength 3 */
      name: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        name?: string;
      },
      any
    >({
      path: `/statuses/`,
      method: "POST",
      body: body,
      ...params,
    });
  /**
   * @description Редактирование статуса
   *
   * @tags statuses
   * @name StatusesPartialUpdate
   * @request PATCH:/statuses/{id}
   */
  statusesPartialUpdate = (
    id: string,
    body: {
      /** @minLength 3 */
      name: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        name?: string;
      },
      any
    >({
      path: `/statuses/${id}`,
      method: "PATCH",
      body: body,
      ...params,
    });
  /**
   * @description Удаление статуса
   *
   * @tags statuses
   * @name StatusesDelete
   * @request DELETE:/statuses/{id}
   */
  statusesDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/statuses/${id}`,
      method: "DELETE",
      ...params,
    });
}
