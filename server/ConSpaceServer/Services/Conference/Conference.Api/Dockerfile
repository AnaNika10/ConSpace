#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Services/Conference/Conference.Api/Conference.Api.csproj", "Services/Conference/Conference.Api/"]
COPY ["Common/EventBus/EventBus.Messages/EventBus.Messages.csproj", "Common/EventBus/EventBus.Messages/"]
RUN dotnet restore "Services/Conference/Conference.Api/Conference.Api.csproj"
COPY . .
WORKDIR "/src/Services/Conference/Conference.Api"
RUN dotnet build "Conference.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Conference.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Conference.Api.dll"]