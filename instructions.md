# instructions.md – 개발 지침

## 1. 디렉토리 구조
```
jwt-auth-experiment/
├── client/       # React FE
├── server/       # Express BE
├── db/           # PostgreSQL 초기화 스크립트
├── docker-compose.yml
├── README.md
├── PRD.md
└── instructions.md
```

## 2. Git 전략
- GitHub 저장소 이름: jwt-auth-experiment
- 기본 브랜치: main
- 커밋 컨벤션: Conventional Commits (feat:, fix:, chore: 등)
- 루트에 반드시 PRD.md, instructions.md 유지

## 3. 초기 설정 가이드
- 로컬에 다음이 설치되어 있어야 함:
  - Docker
  - PostgreSQL CLI (psql)
- 설치 여부는 `docker --version`, `psql --version` 으로 확인
- 설치되지 않은 경우: 설치 안내 메시지 출력

## 4. 개발 환경
- 클라이언트: Vite + React + TypeScript
- 서버: Express + TypeScript
- PostgreSQL은 기본 포트(5432) 사용, 환경변수는 .env 파일로 관리
