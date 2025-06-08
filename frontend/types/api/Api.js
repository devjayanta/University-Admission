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

import { ContentType, HttpClient } from "./http-client";
export class Api extends HttpClient {
  /**
   * No description
   *
   * @tags Announcement
   * @name AnnouncementList
   * @request GET:/api/Announcement
   */
  announcementList = (params = {}) =>
    this.request({
      path: `/api/Announcement`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Announcement
   * @name AnnouncementCreate
   * @request POST:/api/Announcement
   */
  announcementCreate = (data, params = {}) =>
    this.request({
      path: `/api/Announcement`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Announcement
   * @name AnnouncementUpdate
   * @request PUT:/api/Announcement
   */
  announcementUpdate = (data, query, params = {}) =>
    this.request({
      path: `/api/Announcement`,
      method: "PUT",
      query: query,
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Announcement
   * @name AnnouncementDelete
   * @request DELETE:/api/Announcement
   */
  announcementDelete = (query, params = {}) =>
    this.request({
      path: `/api/Announcement`,
      method: "DELETE",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Announcement
   * @name AnnouncementGetByIdList
   * @request GET:/api/Announcement/GetById
   */
  announcementGetByIdList = (query, params = {}) =>
    this.request({
      path: `/api/Announcement/GetById`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthenticationRegisterCreate
   * @request POST:/api/Authentication/register
   */
  authenticationRegisterCreate = (data, params = {}) =>
    this.request({
      path: `/api/Authentication/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthenticationLoginCreate
   * @request POST:/api/Authentication/login
   */
  authenticationLoginCreate = (data, params = {}) =>
    this.request({
      path: `/api/Authentication/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthenticationCreateAdminUserList
   * @request GET:/api/Authentication/createAdminUser
   */
  authenticationCreateAdminUserList = (params = {}) =>
    this.request({
      path: `/api/Authentication/createAdminUser`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Common
   * @name CommonGetAllCountriesList
   * @request GET:/api/Common/GetAllCountries
   */
  commonGetAllCountriesList = (params = {}) =>
    this.request({
      path: `/api/Common/GetAllCountries`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags File
   * @name FileCreate
   * @request POST:/api/File
   */
  fileCreate = (data, params = {}) =>
    this.request({
      path: `/api/File`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags File
   * @name FileList
   * @request GET:/api/File
   */
  fileList = (query, params = {}) =>
    this.request({
      path: `/api/File`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Program
   * @name ProgramList
   * @request GET:/api/Program
   */
  programList = (query, params = {}) =>
    this.request({
      path: `/api/Program`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Program
   * @name ProgramCreate
   * @request POST:/api/Program
   */
  programCreate = (data, params = {}) =>
    this.request({
      path: `/api/Program`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Program
   * @name ProgramUpdate
   * @request PUT:/api/Program
   */
  programUpdate = (data, query, params = {}) =>
    this.request({
      path: `/api/Program`,
      method: "PUT",
      query: query,
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Program
   * @name ProgramDelete
   * @request DELETE:/api/Program
   */
  programDelete = (query, params = {}) =>
    this.request({
      path: `/api/Program`,
      method: "DELETE",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Program
   * @name ProgramGetAllList
   * @request GET:/api/Program/GetAll
   */
  programGetAllList = (params = {}) =>
    this.request({
      path: `/api/Program/GetAll`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Program
   * @name ProgramGetByUniversityIdList
   * @request GET:/api/Program/GetByUniversityId
   */
  programGetByUniversityIdList = (query, params = {}) =>
    this.request({
      path: `/api/Program/GetByUniversityId`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Student
   * @name StudentList
   * @request GET:/api/Student
   */
  studentList = (params = {}) =>
    this.request({
      path: `/api/Student`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Student
   * @name StudentGetStudentByIdList
   * @request GET:/api/Student/GetStudentById
   */
  studentGetStudentByIdList = (query, params = {}) =>
    this.request({
      path: `/api/Student/GetStudentById`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags University
   * @name UniversityList
   * @request GET:/api/University
   */
  universityList = (query, params = {}) =>
    this.request({
      path: `/api/University`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags University
   * @name UniversityCreate
   * @request POST:/api/University
   */
  universityCreate = (data, params = {}) =>
    this.request({
      path: `/api/University`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags University
   * @name UniversityUpdate
   * @request PUT:/api/University
   */
  universityUpdate = (data, query, params = {}) =>
    this.request({
      path: `/api/University`,
      method: "PUT",
      query: query,
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags University
   * @name UniversityDelete
   * @request DELETE:/api/University
   */
  universityDelete = (query, params = {}) =>
    this.request({
      path: `/api/University`,
      method: "DELETE",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags University
   * @name UniversityGetAllList
   * @request GET:/api/University/GetAll
   */
  universityGetAllList = (params = {}) =>
    this.request({
      path: `/api/University/GetAll`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags UserProcess
   * @name UserProcessList
   * @request GET:/api/UserProcess
   */
  userProcessList = (query, params = {}) =>
    this.request({
      path: `/api/UserProcess`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags UserProcess
   * @name UserProcessCreate
   * @request POST:/api/UserProcess
   */
  userProcessCreate = (data, params = {}) =>
    this.request({
      path: `/api/UserProcess`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags UserProcess
   * @name UserProcessUpdate
   * @request PUT:/api/UserProcess
   */
  userProcessUpdate = (data, query, params = {}) =>
    this.request({
      path: `/api/UserProcess`,
      method: "PUT",
      query: query,
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags UserProcess
   * @name UserProcessDelete
   * @request DELETE:/api/UserProcess
   */
  userProcessDelete = (query, params = {}) =>
    this.request({
      path: `/api/UserProcess`,
      method: "DELETE",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags UserProcess
   * @name UserProcessGetAllList
   * @request GET:/api/UserProcess/GetAll
   */
  userProcessGetAllList = (params = {}) =>
    this.request({
      path: `/api/UserProcess/GetAll`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags UserProcess
   * @name UserProcessGetByUserIdList
   * @request GET:/api/UserProcess/GetByUserId
   */
  userProcessGetByUserIdList = (params = {}) =>
    this.request({
      path: `/api/UserProcess/GetByUserId`,
      method: "GET",
      format: "json",
      ...params,
    });
}
