FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Services/User/User.csproj", "Services/User/"]
RUN dotnet restore "Services/UserService/User.csproj"
COPY . .
WORKDIR "/src/Services/User"
RUN dotnet build "User.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "User.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "User.dll"]
