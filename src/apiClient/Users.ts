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

import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Users<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Получение пользователей
   *
   * @tags users
   * @name UsersList
   * @request GET:/users/
   */
  usersList = (params: RequestParams = {}) =>
    this.request<
      {
        id?: number;
        firstName?: string;
        lastName?: string;
        email?: string;
        createdAt?: string;
      }[],
      any
    >({
      path: `/users/`,
      method: "GET",
      ...params,
    });
  /**
   * @description Создание пользователя
   *
   * @tags users
   * @name UsersCreate
   * @request POST:/users/
   */
  usersCreate = (
    body: {
      /** @minLength 2 */
      firstName: string;
      /** @minLength 2 */
      lastName: string;
      /** @format email */
      email: string;
      /** @minLength 3 */
      password: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        firstName?: string;
        lastName?: string;
        email?: string;
      },
      any
    >({
      path: `/users/`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Редактирование пользователя
   *
   * @tags users
   * @name UsersPartialUpdate
   * @request PATCH:/users/{id}
   */
  usersPartialUpdate = (
    id: string,
    body: {
      /** @minLength 2 */
      firstName: string;
      /** @minLength 2 */
      lastName: string;
      /** @format email */
      email: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        firstName?: string;
        lastName?: string;
        email?: string;
      },
      any
    >({
      path: `/users/${id}`,
      method: "PATCH",
      body: body,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Удаление пользователя
   *
   * @tags users
   * @name UsersDelete
   * @request DELETE:/users/{id}
   */
  usersDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/users/${id}`,
      method: "DELETE",
      ...params,
    });
}
