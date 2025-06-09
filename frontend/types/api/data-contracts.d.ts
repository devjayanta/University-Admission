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

export interface AnnouncementDto {
  /** @minLength 1 */
  title: string;
  description?: string | null;
}
export interface AnnouncementViewModel {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  entryById?: number;
  entryByName?: string | null;
  /** @format date-time */
  createdAt?: string;
  title?: string | null;
  description?: string | null;
}
export interface AnnouncementViewModelListResponse {
  success?: boolean;
  message?: string | null;
  data?: AnnouncementViewModel[] | null;
}
export interface AnnouncementViewModelResponse {
  success?: boolean;
  message?: string | null;
  data?: AnnouncementViewModel;
}
export interface AuthViewModel {
  /** @format int32 */
  userId?: number;
  token?: string | null;
}
export interface AuthViewModelResponse {
  success?: boolean;
  message?: string | null;
  data?: AuthViewModel;
}
export interface CountryViewModel {
  /** @format int32 */
  id?: number;
  name?: string | null;
  code?: string | null;
  dialCode?: string | null;
}
export interface CountryViewModelListResponse {
  success?: boolean;
  message?: string | null;
  data?: CountryViewModel[] | null;
}
export interface DocumentViewModel {
  /** @format int32 */
  id?: number;
  name?: string | null;
}
export interface DocumentViewModelListResponse {
  success?: boolean;
  message?: string | null;
  data?: DocumentViewModel[] | null;
}
export interface FileContentResultResponse {
  success?: boolean;
  message?: string | null;
  /** @format binary */
  data?: File | null;
}
export declare enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}
export interface LoginDto {
  /** @minLength 1 */
  username: string;
  /** @minLength 1 */
  password: string;
}
export interface ProgramRequirementDto {
  /** @format int32 */
  id?: number | null;
  /** @minLength 1 */
  name: string;
  isMandatory?: boolean;
  type?: RequirementType;
  value?: string | null;
}
export interface ProgramRequirementViewModel {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  universityProgramId?: number | null;
  universityProgramName?: string | null;
  name?: string | null;
  isMandatory?: boolean;
  type?: RequirementType;
  value?: string | null;
}
export interface RegisterDto {
  /** @minLength 1 */
  username: string;
  /** @minLength 1 */
  firstName: string;
  middleName?: string | null;
  /** @minLength 1 */
  lastName: string;
  /** @minLength 1 */
  password: string;
  /** @minLength 1 */
  passportNo: string;
  /** @format int32 */
  nationalityId: number;
  gender?: Gender;
  /** @format email */
  email?: string | null;
}
export declare enum RequirementType {
  Bool = "Bool",
  Str = "Str",
  Num = "Num",
  File = "File",
}
export interface StringResponse {
  success?: boolean;
  message?: string | null;
  data?: string | null;
}
export interface StudentViewModel {
  /** @format int32 */
  id?: number;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  passportNo?: string | null;
  nationality?: CountryViewModel;
  gender?: Gender;
  email?: string | null;
  processes?: UserProcessViewModel[] | null;
}
export interface StudentViewModelListResponse {
  success?: boolean;
  message?: string | null;
  data?: StudentViewModel[] | null;
}
export interface StudentViewModelResponse {
  success?: boolean;
  message?: string | null;
  data?: StudentViewModel;
}
export interface UniversityDto {
  /** @minLength 1 */
  name: string;
  /** @format int32 */
  countryId?: number;
  /** @minLength 1 */
  addressLine1: string;
  addressLine2?: string | null;
  /** @format uri */
  webSite?: string | null;
}
export interface UniversityProgramDto {
  /** @format int32 */
  universityId?: number;
  /** @minLength 1 */
  name: string;
  level?: string | null;
  /** @format double */
  fee?: number | null;
  currency?: string | null;
  language?: string | null;
  duration?: string | null;
  programRequirements?: ProgramRequirementDto[] | null;
}
export interface UniversityProgramViewModel {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  universityId?: number | null;
  universityName?: string | null;
  name?: string | null;
  level?: string | null;
  /** @format double */
  fee?: number | null;
  currency?: string | null;
  language?: string | null;
  duration?: string | null;
  programRequirements?: ProgramRequirementViewModel[] | null;
}
export interface UniversityProgramViewModelListResponse {
  success?: boolean;
  message?: string | null;
  data?: UniversityProgramViewModel[] | null;
}
export interface UniversityProgramViewModelResponse {
  success?: boolean;
  message?: string | null;
  data?: UniversityProgramViewModel;
}
export interface UniversityViewModel {
  /** @format int32 */
  id?: number;
  name?: string | null;
  country?: CountryViewModel;
  addressLine1?: string | null;
  addressLine2?: string | null;
  webSite?: string | null;
  universityPrograms?: UniversityProgramViewModel[] | null;
}
export interface UniversityViewModelListResponse {
  success?: boolean;
  message?: string | null;
  data?: UniversityViewModel[] | null;
}
export interface UniversityViewModelResponse {
  success?: boolean;
  message?: string | null;
  data?: UniversityViewModel;
}
export interface UserDocumentDto {
  /** @format int32 */
  documentId?: number;
  value?: string | null;
}
export interface UserDocumentViewModel {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  userId?: number;
  /** @format int32 */
  documentId?: number;
  documentName?: string | null;
  value?: string | null;
}
export interface UserDocumentViewModelListResponse {
  success?: boolean;
  message?: string | null;
  data?: UserDocumentViewModel[] | null;
}
export interface UserDocumentViewModelResponse {
  success?: boolean;
  message?: string | null;
  data?: UserDocumentViewModel;
}
export interface UserProcessDto {
  /** @format int32 */
  universityProgramId?: number;
  requirements?: UserRequirementsDto[] | null;
}
export interface UserProcessViewModel {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  userId?: number | null;
  userName?: string | null;
  /** @format int32 */
  universityId?: number | null;
  universityName?: string | null;
  /** @format int32 */
  universityProgramId?: number | null;
  universityProgramName?: string | null;
  requirements?: UserRequirementsViewModel[] | null;
}
export interface UserProcessViewModelListResponse {
  success?: boolean;
  message?: string | null;
  data?: UserProcessViewModel[] | null;
}
export interface UserProcessViewModelResponse {
  success?: boolean;
  message?: string | null;
  data?: UserProcessViewModel;
}
export interface UserRequirementsDto {
  /** @format int32 */
  id?: number | null;
  /** @format int32 */
  programRequirementId?: number;
  value?: string | null;
}
export interface UserRequirementsViewModel {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  userProgramProcessId?: number | null;
  /** @format int32 */
  programRequirementId?: number | null;
  programRequirementName?: string | null;
  value?: string | null;
}
export interface WeatherForecast {
  /** @format date */
  date?: string;
  /** @format int32 */
  temperatureC?: number;
  /** @format int32 */
  temperatureF?: number;
  summary?: string | null;
}
