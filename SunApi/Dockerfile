# 1단계: Maven을 사용해 빌드하는 단계
FROM maven:3.8.1-openjdk-17 AS build
WORKDIR /app

# 소스 코드 복사 및 빌드
COPY . .
RUN mvn clean package -DskipTests

# 2단계: 빌드된 JAR 파일을 실행하는 단계
FROM eclipse-temurin:17-jre-focal
WORKDIR /app

# 빌드 단계에서 생성된 JAR 파일을 복사
COPY --from=build /app/target/*.jar app.jar

# 포트 8787 노출
EXPOSE 8787

# 애플리케이션 실행 명령어
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
