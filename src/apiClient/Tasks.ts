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

export class Tasks<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Список задач
   *
   * @tags tasks
   * @name TasksList
   * @request GET:/tasks/
   */
  tasksList = (
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
      path: `/tasks/`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Создание новой задачи
   *
   * @tags tasks
   * @name TasksCreate
   * @request POST:/tasks/
   */
  tasksCreate = (
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
      path: `/tasks/`,
      method: "POST",
      body: body,
      ...params,
    });
  /**
   * @description Деталка задачи
   *
   * @tags tasks
   * @name TasksDetail
   * @request GET:/tasks/{id}
   */
  tasksDetail = (id: string, params: RequestParams = {}) =>
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
      path: `/tasks/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Редактирование задачи
   *
   * @tags tasks
   * @name TasksPartialUpdate
   * @request PATCH:/tasks/{id}
   */
  tasksPartialUpdate = (
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
      path: `/tasks/${id}`,
      method: "PATCH",
      body: body,
      ...params,
    });
  /**
   * @description Удаление задачи
   *
   * @tags tasks
   * @name TasksDelete
   * @request DELETE:/tasks/{id}
   */
  tasksDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/tasks/${id}`,
      method: "DELETE",
      ...params,
    });
}
