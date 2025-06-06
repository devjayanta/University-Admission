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

import { HttpClient } from "./http-client";
export class WeatherForecast extends HttpClient {
  /**
   * No description
   *
   * @tags WeatherForecast
   * @name GetWeatherForecast
   * @request GET:/WeatherForecast
   */
  getWeatherForecast = (params = {}) =>
    this.request({
      path: `/WeatherForecast`,
      method: "GET",
      format: "json",
      ...params,
    });
}
