# ☀️ SunProjectManager ☀️


### 주제 : 회사 인트라넷 구축을 위한 그룹웨어 구현

### 기간 : 2024.07.30~2024.09.06(6주)

### 인원 : 3명

----------------------

# 목차

### [1.프로젝트 아키텍쳐](#1-프로젝트-아키텍쳐)
### [2.개발 환경](#2-개발-환경)
### [3.ERD](#3-erd)
   - [3.1 Oracle ShellScript](#31-oracle-shellscript)
### [4.주요 기능(담당한 기능 ☀️)](#4-주요-기능) 
   - [4.1로그인/로그아웃](#41-로그인-로그아웃)
   - [4.2마이페이지](#42-마이페이지)
   - [4.3채팅](#43-채팅)
   - [4.4인사관리](#44-인사관리)
   - [4.5공지사항 게시판](#45-공지사항-게시판)
   - [4.6전자결재](#46-전자결재)
   - [4.7시설예약](#47-시설예약) 
   - [4.8차량관리](#48-차량관리) ☀️
   - [4.9협력사관리](#49-협력사관리) ☀️
   - [4.10출장/배차관리](#410-출장-배차관리) ☀️
   - [4.11공휴일 관리](#411-공휴일-관리) ☀️
   - [4.12회의록 관리](#412-회의록-관리) ☀️
   - [4.13화면제어](#413-화면제어) ☀️
### [5.성능 개선](#5-성능-개선)



----------------------


# 1. 프로젝트 아키텍쳐
<br><br>
![스크린샷 2024-09-08 203358](https://github.com/user-attachments/assets/55a519a7-49d3-45c3-b325-c24f2496a492)
<br><br>

----------------------


# 2. 개발 환경


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

# 3. ERD
![image](https://github.com/user-attachments/assets/6d42da66-2e0a-4794-a86d-09cb2610b7a0)




### 3.1 Oracle ShellScript
[DummyData](https://github.com/bluewt129/SunProjectDeploy/raw/OracleData/sun_main_database.sql)




----------------------


## 4. 주요 기능

### 4.1 로그인 로그아웃
(로그인/로그아웃 내용)

### 4.2 마이페이지
(마이페이지 내용)

### 4.3 채팅
(채팅 내용)

### 4.4 인사관리
(인사관리 내용)

### 4.5 공지사항 게시판
(공지사항 게시판 내용)

### 4.6 전자결재
(전자결재 내용)

### 4.7 시설예약
(시설예약 내용)



### 4.8 차량관리
##### ☀️ 담당기능
08:01 차량관리 페이지입니다. 전체 목록을 등록번호 역순으로 출력하고 있습니다. 필터를 통해 원하는 조건으로 조회 가능합니다.
08:11 차량 상세 페이지입니다. 차량에 대한 기본적인 정보와 수리 내역을 확인할 수 있습니다. 
08:19 차량 이미지를 등록/수정할 수 있습니다.
08:24 수리 내역을 등록할 수 있습니다.
08:42 수리 내역을 수리중으로 등록 시, 차량 상태가 빨간색 표시의 수리 상태로 변경되며 수리 내역 목록에 즉각 반영됩니다. 
08:45 수리 중인 항목은 드랍다운을 통해 상태 변경을 지정할 수 있습니다. 저장하면 드랍다운이 사라지고 현재 상태가 반영됩니다.
09:06 차량 삭제 시 차량의 정보가 더 이상 조회되지 않습니다. DB에는 정보가 남아있으나 사용자에게는 삭제된 것처럼 보입니다.
09:23 신규차량 등록입니다. 정보를 입력하고 이미지를 선택하면 차량 정보가 새로 등록, 목록이 갱신됩니다.



### 4.9 협력사관리
##### ☀️ 담당기능
10:08 협력사 정보 페이지입니다. 주소와 이름을 통해 검색을 할 수 있으며 협력사 주소를 클릭 시 좌측의 지도에 해당하는 위치가 출력됩니다. 동시에 하단에 협력사 상세 정보가 출력됩니다.
10:33 협력사 신규 등록입니다. 주소창을 클릭하면 카카오 주소 API를 호출합니다. 선택 시 주소 창에 자동 입력됩니다.


### 4.10 출장 배차관리
##### ☀️ 담당기능
11:20 출장목록 페이지입니다. 사용자의 출장 목록을 출력합니다. 하단에 협력사 정보를 제공하여 사용자 의성을 추가하였습니다.
11:30 출장 목록을 달력 형식으로 출력한 페이지입니다. 탭을 통해 글 형식과 달력 형식을 변경할 수 있습니다. 달력 ui는 FullCalendar Api이고 출력된 공휴일 정보는 GoogleCalendar Api에서 정보를 받아와 Redis 서버를 거쳐 전송된 데이터입니다.
11:58 달력에서 일정을 클릭하면 해당하는 출장 상제 정보로 이동합니다.
12:03 경로보기 버튼을 클릭하면 출발지에서 출장지까지의 경로를 선으로 출력합니다.
12:15 출장 신청서 페이지입니다. 고정 값으로 사용자의 정보가 자동 입력됩니다. 날짜 유효성 검사가 설정되어 있습니다.
12:27 출발지 직접 입력버튼 클릭 시 카카오 주소 API를 호출하여 주소 값을 받아옵니다.
12:37 출장지 위치로 협력사 선택을 누르면 모달 창이 출력되며 등록된 협력사 주소 클릭 시 해당 주소 정보를 가져옵니다.
12:59 추가적인 배차신청여부 버튼입니다. 버튼을 누르지 않으면 배차신청서는 제출되지 않습니다. 날짜 유효성 검사가 설정되어 있습니다.
13:14 해당하는 날짜에 사용 가능한 영업 차량 정보를 모두 불러옵니다.
13:29 작성한 신청서는 목록에 즉시 반영되며 배차 승인 여부를 확인 가능합니다.
13:42 배차관리 페이지입니다. 배차 신청서가 들어오면 관리자가 상세 정보를 조회할 수 있습니다.
13:50 반려 시에는 반려 사유를 입력해야합니다. 빨간색 반려 상태표시가 변경됩니다.
14:10 배차신청서가 반려되었을 때 재신청 버튼이 활성화 되며 클릭시 재신청 작성창이 모달로 출력됩니다. 재신청 완료시 재신청 버튼은 노출되지 않습니다.
14:41 배차 승인 시 배차상태가 승인으로 변경됩니다.
14:46 배차 신청 정보는 날짜와 배차 현황을 통해 필터 조회할 수 있습니다. 




### 4.11 공휴일 관리
##### ☀️ 담당기능
15:02 공휴일 관리 페이지입니다. 사내 캘린더 전체에 반영되는 휴일을 지정할 수 있습니다. 
15:05 사용자가 입력한 정보는 Redis 서버에 즉시 입력됩니다.
15:20 사내 캘린더 전체에 공통 반영됩니다.




### 4.12 회의록 관리
##### ☀️ 담당기능
15:30 회의록 관리 페이지입니다.
15:36 AI 요약보기 버튼 클릭 시 CLOVA Summary Api로 요약된 회의 내용을 세 줄로 요약된 정보를 출력합니다.
15:43 신규 회의록 작성 페이지입니다.
16:15 CLOVA 정책에 따라 최대 2000자 까지 요약 가능하며 AI 요약하기 버튼을 클릭 시 Summary Api를 호출합니다. 하단에 요약된 정보가 출력됩니다. 
16:28 등록버튼 클릭 시 회의록이 저장되며, 상세보기에서 AI 요약보기 버튼을 통해 조금 전 요약했던 정보를 다시 확인할 수 있습니다.




### 4.13 화면제어
##### ☀️ 담당기능
07:41 일반 사용자 계정으로 관리시스템에 접근해보겠습니다.
07:45 관리자 권한이 없는 경우, 알림 페이지를 출력 후 메인 화면으로 강제 이동시킵니다.
07:50 동일한 페이지를 관리자 계정으로 진입하겠습니다.
07:57 Spring Security의 인가 시스템을 통해 관리자 계정을 판단하고 페이지에 접근 가능합니다.




----------------------


## 5. 성능 개선
### 캘린더 데이터 송수신 속도 개선


#### 1) 기존: 사용자가 페이지 진입 시 프론트 서버에서 컴포넌트 마운트 후 GoogleCalendar API 호출, 화면에 최종 출력 **2.46초** 소요.




#### 2) 1차 개선: 서버에서 1년치 데이터를 미리 요청하여 **0.9초**로 단축.
![image](https://github.com/user-attachments/assets/6858bb65-a5ac-45b0-942d-b1841b172772)




#### 3) 2차 개선: Redis 서버를 이용한 데이터 캐싱으로 **0.4초**로 성능 개선, 과도한 외부 API 호출 방지.
![image](https://github.com/user-attachments/assets/2b811485-1168-4fc8-8a1e-a35129bbcba1)








