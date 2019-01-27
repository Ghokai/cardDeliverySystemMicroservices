FROM microsoft/aspnetcore:2.0 AS base
WORKDIR /app

FROM microsoft/aspnetcore-build:2.0 AS builder
ARG Configuration=Release
WORKDIR /src
COPY orderService/*.sln ./
COPY orderService/.vs/ /.vs/

COPY orderService/orderService/orderService.csproj orderService/

RUN dotnet restore
COPY . .
WORKDIR /src/orderService
RUN dotnet build -c $Configuration -o /app

FROM builder AS publish
ARG Configuration=Release
RUN dotnet publish -c $Configuration -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "orderService.dll"]