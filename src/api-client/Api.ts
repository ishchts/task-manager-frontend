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

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name GetApi
   * @request GET:/api/v1/
   */
  getApi = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/`,
      method: "GET",
      ...params,
    });
  /**
   * @description Список задач
   *
   * @tags tasks
   * @name V1TasksList
   * @request GET:/api/v1/tasks/
   */
  v1TasksList = (
    query?: {
      status?: number;
      executor?: number;
      label?: number;
      isCreator?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        id?: number;
        /** @minLength 3 */
        name: string;
        description?: string;
        /** @format datetime */
        createdAt?: string;
        creator?: {
          firstName?: string;
          lastName?: string;
        };
        status?: {
          name?: string;
        };
        executor?: {
          firstName?: string;
          lastName?: string;
        };
        labels?: {
          id?: number;
          name?: any;
        }[];
      }[],
      any
    >({
      path: `/api/v1/tasks/`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Создание новой задачи
   *
   * @tags tasks
   * @name V1TasksCreate
   * @request POST:/api/v1/tasks/
   */
  v1TasksCreate = (
    body: {
      /** @minLength 3 */
      name: string;
      description?: string;
      creatorId: number;
      statusId: number;
      executorId?: number;
      labelIds?: number[];
    },
    params: RequestParams = {},
  ) =>
    this.request<object, any>({
      path: `/api/v1/tasks/`,
      method: "POST",
      body: body,
      ...params,
    });
  /**
   * @description Деталка задачи
   *
   * @tags tasks
   * @name V1TasksDetail
   * @request GET:/api/v1/tasks/{id}
   */
  v1TasksDetail = (id: string, params: RequestParams = {}) =>
    this.request<
      {
        name?: string;
        description?: string;
        statusId?: number;
        creatorId?: number;
        executorId?: null | number;
        labels?: {
          id?: number;
          name?: string;
        }[];
      },
      any
    >({
      path: `/api/v1/tasks/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Редактирование задачи
   *
   * @tags tasks
   * @name V1TasksPartialUpdate
   * @request PATCH:/api/v1/tasks/{id}
   */
  v1TasksPartialUpdate = (
    id: string,
    body: {
      /** @minLength 3 */
      name: string;
      description?: string;
      creatorId: number;
      statusId: number;
      executorId?: number;
      labelIds?: number[];
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @minLength 3 */
        name?: string;
        description?: string;
        creatorId?: number;
        statusId?: number;
        executorId?: null | number;
      },
      any
    >({
      path: `/api/v1/tasks/${id}`,
      method: "PATCH",
      body: body,
      ...params,
    });
  /**
   * @description Удаление задачи
   *
   * @tags tasks
   * @name V1TasksDelete
   * @request DELETE:/api/v1/tasks/{id}
   */
  v1TasksDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/tasks/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description Получение пользователей
   *
   * @tags users
   * @name V1UsersList
   * @request GET:/api/v1/users/
   */
  v1UsersList = (params: RequestParams = {}) =>
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
      path: `/api/v1/users/`,
      method: "GET",
      ...params,
    });
  /**
   * @description Создание пользователя
   *
   * @tags users
   * @name V1UsersCreate
   * @request POST:/api/v1/users/
   */
  v1UsersCreate = (
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
      path: `/api/v1/users/`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Редактирование пользователя
   *
   * @tags users
   * @name V1UsersPartialUpdate
   * @request PATCH:/api/v1/users/{id}
   */
  v1UsersPartialUpdate = (
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
      path: `/api/v1/users/${id}`,
      method: "PATCH",
      body: body,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Удаление пользователя
   *
   * @tags users
   * @name V1UsersDelete
   * @request DELETE:/api/v1/users/{id}
   */
  v1UsersDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/users/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description Получение списка статусов
   *
   * @tags statuses
   * @name V1StatusesList
   * @request GET:/api/v1/statuses/
   */
  v1StatusesList = (params: RequestParams = {}) =>
    this.request<
      {
        id?: number;
        name?: string;
      }[],
      any
    >({
      path: `/api/v1/statuses/`,
      method: "GET",
      ...params,
    });
  /**
   * @description Создание статуса
   *
   * @tags statuses
   * @name V1StatusesCreate
   * @request POST:/api/v1/statuses/
   */
  v1StatusesCreate = (
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
      path: `/api/v1/statuses/`,
      method: "POST",
      body: body,
      ...params,
    });
  /**
   * @description Редактирование статуса
   *
   * @tags statuses
   * @name V1StatusesPartialUpdate
   * @request PATCH:/api/v1/statuses/{id}
   */
  v1StatusesPartialUpdate = (
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
      path: `/api/v1/statuses/${id}`,
      method: "PATCH",
      body: body,
      ...params,
    });
  /**
   * @description Удаление статуса
   *
   * @tags statuses
   * @name V1StatusesDelete
   * @request DELETE:/api/v1/statuses/{id}
   */
  v1StatusesDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/statuses/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description Авторизация
   *
   * @tags auth
   * @name V1AuthSignUpCreate
   * @request POST:/api/v1/auth/sign-up
   */
  v1AuthSignUpCreate = (
    body: {
      /** @format email */
      email: string;
      /** @minLength 3 */
      password: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        accessToken?: string;
        refreshToken?: string;
      },
      any
    >({
      path: `/api/v1/auth/sign-up`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Получение списка меток
   *
   * @tags labels
   * @name V1LabelsList
   * @request GET:/api/v1/labels/
   */
  v1LabelsList = (params: RequestParams = {}) =>
    this.request<
      {
        id?: number;
        name?: string;
      }[],
      any
    >({
      path: `/api/v1/labels/`,
      method: "GET",
      ...params,
    });
  /**
   * @description Создание метки
   *
   * @tags labels
   * @name V1LabelsCreate
   * @request POST:/api/v1/labels/
   */
  v1LabelsCreate = (
    body: {
      name: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        id?: number;
        name?: string;
      },
      any
    >({
      path: `/api/v1/labels/`,
      method: "POST",
      body: body,
      ...params,
    });
  /**
   * @description Полученние метки
   *
   * @tags labels
   * @name V1LabelsDetail
   * @request GET:/api/v1/labels/{id}
   */
  v1LabelsDetail = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/labels/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Редактирование метки
   *
   * @tags labels
   * @name V1LabelsPartialUpdate
   * @request PATCH:/api/v1/labels/{id}
   */
  v1LabelsPartialUpdate = (
    id: string,
    body: {
      name: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        id?: number;
        name?: string;
      },
      any
    >({
      path: `/api/v1/labels/${id}`,
      method: "PATCH",
      body: body,
      ...params,
    });
  /**
   * @description Удаление метки
   *
   * @tags labels
   * @name V1LabelsDelete
   * @request DELETE:/api/v1/labels/{id}
   */
  v1LabelsDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/labels/${id}`,
      method: "DELETE",
      ...params,
    });
}
