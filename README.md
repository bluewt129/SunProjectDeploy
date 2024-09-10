# SunProjectManager <br><br>
주제 : 회사 인트라넷 구축을 위한 그룹웨어 구현 <br>
기간 : 2024.07.30~2024.09.06(6주)




----------------------

## 목차

### 1. [프로젝트 아키텍쳐](##1-프로젝트-아키텍쳐)
### 2. [개발 환경](#2-개발-환경)
### 3. [ERD](##3-erd)
### 4. [주요 기능](#4-주요-기능)
### 5. [배포 흐름](#5-배포-흐름)




----------------------
## 1. 프로젝트 아키텍쳐
<br><br>
![스크린샷 2024-09-08 203358](https://github.com/user-attachments/assets/55a519a7-49d3-45c3-b325-c24f2496a492)
<br><br>

----------------------




## 2. 개발 환경


#### Back-end
![Java](https://img.shields.io/badge/Java-17-brightgreen?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.8-brightgreen?style=for-the-badge&logo=springboot&logoColor=white)

#### 통신
![Web Socket](https://img.shields.io/badge/Web%20Socket-Enabled-blue?style=for-the-badge)
![STOMP](https://img.shields.io/badge/STOMP-Enabled-blue?style=for-the-badge)

#### 데이터 처리
![JPA](https://img.shields.io/badge/JPA-Enabled-yellow?style=for-the-badge)
![myBatis](https://img.shields.io/badge/myBatis-Enabled-blue?style=for-the-badge)
![Gson](https://img.shields.io/badge/Gson-Enabled-green?style=for-the-badge)
![Commons FileUpload](https://img.shields.io/badge/Commons%20FileUpload-Enabled-orange?style=for-the-badge)

#### 로깅/유틸
![Lombok](https://img.shields.io/badge/Lombok-Enabled-green?style=for-the-badge)
![AOP](https://img.shields.io/badge/AOP-Enabled-red?style=for-the-badge)


#### Front-end
![JavaScript](https://img.shields.io/badge/JavaScript-Enabled-yellow?style=for-the-badge)
![React](https://img.shields.io/badge/React-Enabled-blue?style=for-the-badge&logo=react)
![Axios Ajax](https://img.shields.io/badge/Axios%20Ajax-Enabled-lightblue?style=for-the-badge)
![Bootstrap](https://img.shields.io/badge/Bootstrap-Enabled-purple?style=for-the-badge)


#### DB
![Oracle 19c](https://img.shields.io/badge/Oracle%2019c-Enabled-red?style=for-the-badge)

#### DB 관리
![Oracle Shell Script](https://img.shields.io/badge/Oracle%20Shell%20Script-Enabled-orange?style=for-the-badge)

#### 캐시 서버
![Redis](https://img.shields.io/badge/Redis-Enabled-red?style=for-the-badge)


#### CI/CD
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-Enabled-blue?style=for-the-badge&logo=githubactions&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue?style=for-the-badge&logo=docker&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu%2024.04%20LTS-Enabled-orange?style=for-the-badge&logo=ubuntu&logoColor=white)

#### 네트워크
![ngrok](https://img.shields.io/badge/ngrok-Enabled-blue?style=for-the-badge)


#### 테스트 도구
![JUnit 5.10.3](https://img.shields.io/badge/JUnit-5.10.3-red?style=for-the-badge)
![SpringBootTest](https://img.shields.io/badge/SpringBootTest-3.2.8-brightgreen?style=for-the-badge)
![Postman](https://img.shields.io/badge/Postman-Enabled-orange?style=for-the-badge&logo=postman&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-Enabled-green?style=for-the-badge&logo=swagger&logoColor=white)


#### 형상 관리
![GitHub](https://img.shields.io/badge/GitHub-Enabled-black?style=for-the-badge&logo=github&logoColor=white)




----------------------

## 3. ERD

![image](https://github.com/user-attachments/assets/6d42da66-2e0a-4794-a86d-09cb2610b7a0)




----------------------

## 4. 주요 기능



1. Next.js와 Spring Boot를 활용한 RESTful API 기반 북마크 관리 시스템
  -  북마크 리스트에 대한 CRUD 기능을 구현하여 사용자 편의성 제공. <br><br>

2. Flyway를 이용한 DB 버전 관리 및 유연한 DB 환경 전환
  -  Flyway를 통해 데이터베이스 스키마의 버전 관리를 수행, 테스트, 개발, 배포 환경에 따라 DB 벤더(PostgreSQL, H2)를 유연하게 전환 및 관리.  <br><br>


3. Next.js 서버 컴포넌트와 클라이언트 컴포넌트의 역할 분리
  -  Next.js에서 서버 컴포넌트와 클라이언트 컴포넌트를 분리하여, 요청 처리의 효율성을 높이고 사용자 인터페이스를 최적화.  <br><br>


4. Docker Compose 기반 프로젝트 배포 및 관리
  -  docker-compose up을 통해 컨테이너 기반의 프로젝트 배포 및 관리를 자동화하여 개발 환경과 프로덕션 환경의 일관성을 유지.  <br><br>


5. GitHub Actions를 통한 CI/CD 자동화 파이프라인 구축
  -  GitHub Actions를 사용해 빌드, 테스트, 배포 과정의 자동화 구현. 지속 가능한 CI/CD 파이프라인을 구축하여 프로젝트의 효율적인 관리와 배포를 보장.  <br><br>

----------------------

