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

export class Auth<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Авторизация
   *
   * @tags auth
   * @name SignUpCreate
   * @request POST:/auth/sign-up
   */
  signUpCreate = (
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
      path: `/auth/sign-up`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      ...params,
    });
}
