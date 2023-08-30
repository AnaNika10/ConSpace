FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Services/User/User.Domain/User.Domain.csproj", "Services/User/User.Domain/"]
RUN dotnet restore "Services/User/User.Domain/User.Domain.csproj"
COPY . .
WORKDIR "/src/Services/User/User.Domain"
RUN dotnet build "User.Domain.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "User.Domain.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "User.Domain.dll"]
