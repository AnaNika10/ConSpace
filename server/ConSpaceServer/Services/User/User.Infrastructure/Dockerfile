FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Services/User/User.Infrastructure/User.Infrastructure.csproj", "Services/User/User.Infrastructure/"]
RUN dotnet restore "Services/User/User.Infrastructure/User.Infrastructure.csproj"
COPY . .
WORKDIR "/src/Services/User/User.Infrastructure"
RUN dotnet build "User.Infrastructure.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "User.Infrastructure.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "User.Infrastructure.dll"]
