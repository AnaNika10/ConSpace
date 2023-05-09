FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["SPAGateway/SPAGateway.csproj", "SPAGateway/"]
RUN dotnet restore "SPAGateway/SPAGateway.csproj"
COPY . .
WORKDIR "/src/SPAGateway"
RUN dotnet build "SPAGateway.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SPAGateway.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SPAGateway.dll"]
