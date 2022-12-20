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

export class Labels<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Получение списка меток
   *
   * @tags labels
   * @name LabelsList
   * @request GET:/labels/
   */
  labelsList = (params: RequestParams = {}) =>
    this.request<
      {
        id?: number;
        name?: string;
      }[],
      any
    >({
      path: `/labels/`,
      method: "GET",
      ...params,
    });
  /**
   * @description Создание метки
   *
   * @tags labels
   * @name LabelsCreate
   * @request POST:/labels/
   */
  labelsCreate = (
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
      path: `/labels/`,
      method: "POST",
      body: body,
      ...params,
    });
  /**
   * @description Полученние метки
   *
   * @tags labels
   * @name LabelsDetail
   * @request GET:/labels/{id}
   */
  labelsDetail = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/labels/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Редактирование метки
   *
   * @tags labels
   * @name LabelsPartialUpdate
   * @request PATCH:/labels/{id}
   */
  labelsPartialUpdate = (
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
      path: `/labels/${id}`,
      method: "PATCH",
      body: body,
      ...params,
    });
  /**
   * @description Удаление метки
   *
   * @tags labels
   * @name LabelsDelete
   * @request DELETE:/labels/{id}
   */
  labelsDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/labels/${id}`,
      method: "DELETE",
      ...params,
    });
}
