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

import {
  AnnouncementDto,
  AnnouncementViewModelListResponse,
  AnnouncementViewModelResponse,
  AuthViewModelResponse,
  CountryViewModelListResponse,
  DocumentViewModelListResponse,
  FileContentResultResponse,
  LoginDto,
  RegisterDto,
  StringResponse,
  StudentViewModelListResponse,
  StudentViewModelResponse,
  UniversityDto,
  UniversityProgramDto,
  UniversityProgramViewModelListResponse,
  UniversityProgramViewModelResponse,
  UniversityViewModelListResponse,
  UniversityViewModelResponse,
  UserDocumentDto,
  UserDocumentViewModelListResponse,
  UserDocumentViewModelResponse,
  UserProcessDto,
  UserProcessViewModelListResponse,
  UserProcessViewModelResponse,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export declare class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Announcement
   * @name AnnouncementList
   * @request GET:/api/Announcement
   */
  announcementList: (params?: RequestParams) => Promise<AxiosResponse<AnnouncementViewModelListResponse>>;
  /**
   * No description
   *
   * @tags Announcement
   * @name AnnouncementCreate
   * @request POST:/api/Announcement
   */
  announcementCreate: (
    data: AnnouncementDto,
    params?: RequestParams,
  ) => Promise<AxiosResponse<AnnouncementViewModelResponse>>;
  /**
   * No description
   *
   * @tags Announcement
   * @name AnnouncementUpdate
   * @request PUT:/api/Announcement
   */
  announcementUpdate: (
    data: AnnouncementDto,
    query?: {
      /** @format int32 */
      Id?: number;
    },
    params?: RequestParams,
  ) => Promise<AxiosResponse<AnnouncementViewModelResponse>>;
  /**
   * No description
   *
   * @tags Announcement
   * @name AnnouncementDelete
   * @request DELETE:/api/Announcement
   */
  announcementDelete: (
    query?: {
      /** @format int32 */
      Id?: number;
    },
    params?: RequestParams,
  ) => Promise<AxiosResponse<AnnouncementViewModelResponse>>;
  /**
   * No description
   *
   * @tags Announcement
   * @name AnnouncementGetByIdList
   * @request GET:/api/Announcement/GetById
   */
  announcementGetByIdList: (
    query?: {
      /** @format int32 */
      Id?: number;
    },
    params?: RequestParams,
  ) => Promise<AxiosResponse<AnnouncementViewModelResponse>>;
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthenticationRegisterCreate
   * @request POST:/api/Authentication/register
   */
  authenticationRegisterCreate: (
    data: RegisterDto,
    params?: RequestParams,
  ) => Promise<AxiosResponse<AuthViewModelResponse>>;
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthenticationLoginCreate
   * @request POST:/api/Authentication/login
   */
  authenticationLoginCreate: (data: LoginDto, params?: RequestParams) => Promise<AxiosResponse<AuthViewModelResponse>>;
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthenticationCreateAdminUserList
   * @request GET:/api/Authentication/createAdminUser
   */
  authenticationCreateAdminUserList: (params?: RequestParams) => Promise<AxiosResponse<AuthViewModelResponse>>;
  /**
   * No description
   *
   * @tags Common
   * @name CommonGetAllCountriesList
   * @request GET:/api/Common/GetAllCountries
   */
  commonGetAllCountriesList: (params?: RequestParams) => Promise<AxiosResponse<CountryViewModelListResponse>>;
  /**
   * No description
   *
   * @tags Common
   * @name CommonGetAllDocumentTypesList
   * @request GET:/api/Common/GetAllDocumentTypes
   */
  commonGetAllDocumentTypesList: (params?: RequestParams) => Promise<AxiosResponse<DocumentViewModelListResponse>>;
  /**
   * No description
   *
   * @tags File
   * @name FileCreate
   * @request POST:/api/File
   */
  fileCreate: (
    data: {
      /** @format binary */
      File?: File;
    },
    params?: RequestParams,
  ) => Promise<AxiosResponse<StringResponse>>;
  /**
   * No description
   *
   * @tags File
   * @name FileList
   * @request GET:/api/File
   */
  fileList: (
    query?: {
      FileName?: string;
    },
    params?: RequestParams,
  ) => Promise<AxiosResponse<FileContentResultResponse>>;
  /**
   * No description
   *
   * @tags Program
   * @name ProgramList
   * @request GET:/api/Program
   */
  programList: (
    query?: {
      /** @format int32 */
      Id?: number;
    },
    params?: RequestParams,
  ) => Promise<AxiosResponse<UniversityProgramViewModelResponse>>;
  /**
   * No description
   *
   * @tags Program
   * @name ProgramCreate
   * @request POST:/api/Program
   */
  programCreate: (
    data: UniversityProgramDto,
    params?: RequestParams,
  ) => Promise<AxiosResponse<UniversityProgramViewModelResponse>>;
  /**
   * No description
   *
   * @tags Program
   * @name ProgramUpdate
   * @request PUT:/api/Program
   */
  programUpdate: (
    data: UniversityProgramDto,
    query?: {
      /** @format int32 */
      Id?: number;
    },
    params?: RequestParams,
  ) => Promise<AxiosResponse<UniversityProgramViewModelResponse>>;
  /**
   * No description
   *
   * @tags Program
   * @name ProgramDelete
   * @request DELETE:/api/Program
   */
  programDelete: (
    query?: {
      /** @format int32 */
      Id?: number;
    },
    params?: RequestParams,
  ) => Promise<AxiosResponse<UniversityProgramViewModelResponse>>;
  /**
   * No description
   *
   * @tags Program
   * @name ProgramGetAllList
   * @request GET:/api/Program/GetAll
   */
  programGetAllList: (
    query?: {
      status?: string;
    },
    params?: RequestParams,
  ) => Promise<AxiosResponse<UniversityProgramViewModelListResponse>>;
  /**
   * No description
   *
   * @tags Program
   * @name ProgramGetByUniversityIdList
   * @request GET:/api/Program/GetByUniversityId
   */
  programGetByUniversityIdList: (
    query?: {
      /** @format int32 */
      UniversityId?: number;
    },
    params?: RequestParams,
  ) => Promise<AxiosResponse<UniversityProgramViewModelListResponse>>;
  /**
   * No description
   *
   * @tags Student
   * @name StudentList
   * @request GET:/api/Student
   */
  studentList: (params?: RequestParams) => Promise<AxiosResponse<StudentViewModelListResponse>>;
  /**
   * No description
   *
   * @tags Student
   * @name StudentGetStudentByIdList
   * @request GET:/api/Student/GetStudentById
   */
  studentGetStudentByIdList: (
    query?: {
      /** @format int32 */
      Id?: number;
    },
    params?: RequestParams,
  ) => Promise<AxiosResponse<StudentViewModelResponse>>;
  /**
   * No description
   *
   * @tags University
   * @name UniversityList
   * @request GET:/api/University
   */
  universityList: (
    query?: {
      /** @format int32 */
      Id?: number;
    },
    params?: RequestParams,
  ) => Promise<AxiosResponse<UniversityViewModelResponse>>;
  /**
   * No description
   *
   * @tags University
   * @name UniversityCreate
   * @request POST:/api/University
   */
  universityCreate: (
    data: UniversityDto,
    params?: RequestParams,
  ) => Promise<AxiosResponse<UniversityViewModelResponse>>;
  /**
   * No description
   *
   * @tags University
   * @name UniversityUpdate
   * @request PUT:/api/University
   */
  universityUpdate: (
    data: UniversityDto,
    query?: {
      /** @format int32 */
      Id?: number;
    },
    params?: RequestParams,
  ) => Promise<AxiosResponse<UniversityViewModelResponse>>;
  /**
   * No description
   *
   * @tags University
   * @name UniversityDelete
   * @request DELETE:/api/University
   */
  universityDelete: (
    query?: {
      /** @format int32 */
      Id?: number;
    },
    params?: RequestParams,
  ) => Promise<AxiosResponse<UniversityViewModelResponse>>;
  /**
   * No description
   *
   * @tags University
   * @name UniversityGetAllList
   * @request GET:/api/University/GetAll
   */
  universityGetAllList: (params?: RequestParams) => Promise<AxiosResponse<UniversityViewModelListResponse>>;
  /**
   * No description
   *
   * @tags User
   * @name UserGetAllUserDocumentsList
   * @request GET:/api/User/GetAllUserDocuments
   */
  userGetAllUserDocumentsList: (params?: RequestParams) => Promise<AxiosResponse<UserDocumentViewModelListResponse>>;
  /**
   * No description
   *
   * @tags User
   * @name UserCreateUserDocumentCreate
   * @request POST:/api/User/CreateUserDocument
   */
  userCreateUserDocumentCreate: (
    data: UserDocumentDto,
    params?: RequestParams,
  ) => Promise<AxiosResponse<UserDocumentViewModelResponse>>;
  /**
   * No description
   *
   * @tags User
   * @name UserUpdateUserDocumentUpdate
   * @request PUT:/api/User/UpdateUserDocument
   */
  userUpdateUserDocumentUpdate: (
    data: UserDocumentDto,
    query?: {
      /** @format int32 */
      Id?: number;
    },
    params?: RequestParams,
  ) => Promise<AxiosResponse<UserDocumentViewModelResponse>>;
  /**
   * No description
   *
   * @tags User
   * @name UserDeleteUserDocumentDelete
   * @request DELETE:/api/User/DeleteUserDocument
   */
  userDeleteUserDocumentDelete: (
    query?: {
      /** @format int32 */
      Id?: number;
    },
    params?: RequestParams,
  ) => Promise<AxiosResponse<UserDocumentViewModelResponse>>;
  /**
   * No description
   *
   * @tags UserProcess
   * @name UserProcessList
   * @request GET:/api/UserProcess
   */
  userProcessList: (
    query?: {
      /** @format int32 */
      Id?: number;
    },
    params?: RequestParams,
  ) => Promise<AxiosResponse<UserProcessViewModelResponse>>;
  /**
   * No description
   *
   * @tags UserProcess
   * @name UserProcessCreate
   * @request POST:/api/UserProcess
   */
  userProcessCreate: (
    data: UserProcessDto,
    params?: RequestParams,
  ) => Promise<AxiosResponse<UserProcessViewModelResponse>>;
  /**
   * No description
   *
   * @tags UserProcess
   * @name UserProcessUpdate
   * @request PUT:/api/UserProcess
   */
  userProcessUpdate: (
    data: UserProcessDto,
    query?: {
      /** @format int32 */
      Id?: number;
    },
    params?: RequestParams,
  ) => Promise<AxiosResponse<UserProcessViewModelResponse>>;
  /**
   * No description
   *
   * @tags UserProcess
   * @name UserProcessDelete
   * @request DELETE:/api/UserProcess
   */
  userProcessDelete: (
    query?: {
      /** @format int32 */
      Id?: number;
    },
    params?: RequestParams,
  ) => Promise<AxiosResponse<UserProcessViewModelResponse>>;
  /**
   * No description
   *
   * @tags UserProcess
   * @name UserProcessGetAllList
   * @request GET:/api/UserProcess/GetAll
   */
  userProcessGetAllList: (params?: RequestParams) => Promise<AxiosResponse<UserProcessViewModelListResponse>>;
  /**
   * No description
   *
   * @tags UserProcess
   * @name UserProcessGetByUserIdList
   * @request GET:/api/UserProcess/GetByUserId
   */
  userProcessGetByUserIdList: (params?: RequestParams) => Promise<AxiosResponse<UserProcessViewModelListResponse>>;
}
