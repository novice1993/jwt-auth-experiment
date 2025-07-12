# PRD – JWT 기반 인증 실험 프로젝트

## 1. 목적
React + Express + PostgreSQL + Docker 스택을 활용하여 JWT 기반 인증 전체 흐름을 설계 및 구현한다. 인증 흐름의 구조적 이해를 목적으로 하며, 실제 서비스를 위한 완성도보다는 학습 및 설계 실험 중심으로 진행한다.

## 2. 주요 기능
- 회원가입 UI 및 백엔드 연동
- 로그인 UI 및 백엔드 연동
- JWT 토큰 발급 및 FE 저장 (LocalStorage vs Cookie)
- JWT 검증을 위한 Express 미들웨어
- PostgreSQL과 연동된 사용자 테이블
- Docker Compose를 활용한 FE/BE/DB 통합 환경 구성

## 3. 기술 스택
- 프론트엔드: React + Vite
- 백엔드: Express + TypeScript
- DB: PostgreSQL
- 인프라: Docker, Docker Compose
- 기타: Cursor IDE 또는 Gemini CLI 활용

## 4. 비고
- AI는 보조 도구로 사용하며, 직접 구현은 최소화
- 주요 학습 포인트는 JWT 흐름과 저장 전략 비교, 전체 인증 시스템의 설계 이해
