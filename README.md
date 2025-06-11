# University-Admission
This project is about to help international students manage their university admission processes and upload required documents. The system enables students to select the universities they wish to apply to, upload relevant documents, and allows admins to track and manage this data.

## Environment Setup
1. Download and Install PostgreSQL from [here](https://www.postgresql.org/download/).
2. Download and Install NodeJS from [here](https://nodejs.org/en/download). Version >18.18 is required.
3. Download and Install .NET8 SDK from [here](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)

## Running Project
1. To start .NET backend, connection string for PostgreSQL should be configured first. To do so, open `backend/University_Admission/appsettings.json` file and replace 
```
{host} => PostgreSQL server host name (localhost in case of locally hosted)
{port} => PostgreSQL server port no 
{username} => PostgreSQL server username (this user should have create/alter/drop table permission)
{password} => password for above username
```
 - Example: `Host=localhost;Port=5432;Password=P4ssw0rd;Persist Security Info=True;Username=pguser;Database=SIT_DEMO`
2. Run .NET backend with either `dotnet run --project backend/University_Admission` from project root folder or go to backend/University_Admission folder and with `dotnet run`.
3. To start frontend server, go to frontend folder, create `.env` file. Provide env values mentioned in env reference table below
4. Install frontend dependencies with `npm i` and then run `npm run dev`. Then the application will be availabe at [http://localhost:3000](http://localhost:3000)

## ENV Reference Table
|env Name|Description|Example Value|
|--------|-----------|-------------|
|NEXT_PUBLIC_API_BASE_URL|Url of backend server|http://localhost:5224/|

## ER Diagram
![ER diagram screenshot](./SIT_DEMO%20-%20public.png)