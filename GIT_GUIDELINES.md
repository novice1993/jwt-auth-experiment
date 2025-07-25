# Git & GitHub 워크플로우 가이드라인

이 문서는 Git과 GitHub를 사용한 프로젝트 관리 및 협업을 위한 표준 가이드라인을 제공합니다. 일관성 있는 워크플로우를 통해 프로젝트 히스토리를 명확하게 유지하고 협업 효율성을 높이는 것을 목표로 합니다.

## 1. 원격 저장소 (Remote Repository) 설정

새로운 프로젝트를 시작할 때, 다음 절차에 따라 GitHub 원격 저장소를 생성하고 로컬 환경과 연결합니다.

### 1.1. GitHub CLI (`gh`) 설치 확인 및 설치

터미널에서 `gh --version` 명령어를 실행하여 `gh`가 설치되어 있는지 확인합니다. 만약 설치되어 있지 않다면, Homebrew (macOS) 또는 다른 패키지 매니저를 사용하여 설치합니다.

```bash
# 설치 확인
gh --version

# Homebrew로 설치 (macOS)
brew install gh
```

### 1.2. GitHub 인증

`gh`가 로컬 환경에서 당신의 GitHub 계정에 접근할 수 있도록 인증 절차를 진행합니다. 이 과정은 웹 브라우저를 통해 완료됩니다.

```bash
gh auth login
```

### 1.3. 저장소 생성 및 로컬 프로젝트 연결

로컬 프로젝트 디렉토리에서 다음 명령어를 실행하여 Git을 초기화하고, GitHub에 새로운 원격 저장소를 생성하며, 로컬 저장소를 원격에 연결합니다.

```bash
# 1. 로컬 Git 저장소 초기화
git init

# 2. GitHub에 원격 저장소 생성 및 연결
# <repository-name>을 실제 프로젝트 이름으로 변경하세요.
# --public 또는 --private 플래그를 사용하여 공개 범위를 설정합니다.
gh repo create <repository-name> --public --source=. --remote=origin
```

### 1.4. 초기 파일 푸시

프로젝트의 초기 파일들을 원격 저장소에 푸시합니다.

```bash
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 1.5. Git 무시 파일 (`.gitignore`) 및 속성 (`.gitattributes`) 설정

프로젝트에 불필요한 파일(예: 빌드 결과물, 의존성 모듈, IDE 설정 파일 등)이 Git 저장소에 포함되지 않도록 `.gitignore` 파일을 설정하고, OS 간의 줄바꿈 문제를 방지하기 위해 `.gitattributes` 파일을 설정합니다.

#### 1.5.1. `.gitignore` 파일

`.gitignore` 파일은 Git이 추적하지 않을 파일이나 디렉토리를 지정합니다. 프로젝트 루트에 생성하며, 일반적으로 다음과 같은 내용을 포함합니다.

```
# Dependencies
/node_modules
/backend/node_modules
/frontend/node_modules

# Build artifacts
/dist
/build

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDEs and editors
.idea
.vscode/
*.swp

# OS-generated files
.DS_Store
Thumbs.db
```

#### 1.5.2. `.gitattributes` 파일

`.gitattributes` 파일은 Git이 특정 파일에 대해 어떻게 동작할지 정의합니다. 특히 OS 간의 줄바꿈(Line Ending) 문제를 해결하는 데 유용합니다. 프로젝트 루트에 생성하며, 모든 텍스트 파일의 줄바꿈을 LF(`\n`)로 통일하도록 설정하는 것을 권장합니다.

```
# Set default behavior for all files to be text
* text=auto eol=lf
```

## 2. 커밋 메시지 컨벤션

프로젝트의 모든 커밋 메시지는 **한글**로 작성하는 것을 원칙으로 하며, **Conventional Commits** 명세에 따라 구성합니다. 이는 커밋 히스토리의 가독성을 높이고, 변경 사항을 쉽게 추적하며, 버전 관리를 자동화하는 데 도움이 됩니다.

### 2.1. 커밋 메시지 구조

```
<타입>(<스코프>): <제목>
<본문>
<꼬리말>
```

-   **타입 (type)**: 커밋의 종류를 나타냅니다. (필수)
-   **스코프 (scope)**: 커밋이 영향을 미치는 범위를 나타냅니다. (선택, 예: `auth`, `profile`)
-   **제목 (subject)**: 커밋에 대한 짧은 요약 설명입니다. (필수)
-   **본문 (body)**: 커밋에 대한 자세한 설명이 필요할 경우 작성합니다. (선택)
-   **꼬리말 (footer)**: 이슈 트래커 ID 등 추가적인 메타데이터를 포함합니다. (선택, 예: `Fixes: #123`)

### 2.2. 주요 커밋 타입 (`type`)

-   **feat**: 새로운 기능 추가
-   **fix**: 버그 수정
-   **docs**: 문서 변경 (README, 가이드라인 등)
-   **style**: 코드 스타일 변경 (포맷팅, 세미콜론 추가 등; 로직 변경 없음)
-   **refactor**: 코드 리팩토링 (기능 추가나 버그 수정 없는 코드 구조 변경)
-   **test**: 테스트 코드 추가 또는 수정
-   **chore**: 빌드 프로세스, 패키지 매니저 설정 등 기타 변경
-   **ci**: CI/CD 관련 설정 변경
-   **perf**: 성능 개선

### 2.3. 커밋 메시지 작성 규칙

-   제목은 **명령문**으로, **동사 원형**으로 시작합니다. (예: `추가함`, `수정함`이 아닌 `추가`, `수정`)
-   제목의 길이는 50자를 넘지 않도록 간결하게 작성합니다.
-   본문은 어떻게(how) 보다는 **무엇을(what) 왜(why)** 변경했는지 위주로 설명합니다.

### 2.4. 커밋 메시지 예시

**예시 1: 새로운 기능 추가**

```
feat(auth): 사용자 로그인 기능 추가

- POST /api/login 엔드포인트 구현
- 로그인 성공 시 JWT 토큰 생성 로직 추가
```

**예시 2: 버그 수정**

```
fix(profile): 프로필 이미지 표시 오류 수정

대시보드에서 프로필 이미지가 잘못된 URL 경로로 인해 렌더링되지 않던 문제를 해결합니다.
경로 생성 로직을 올바르게 수정했습니다.

Fixes: #123
```

**예시 3: 문서만 변경**

```
docs(readme): 프로젝트 초기 설정 방법 업데이트
```

### 2.5. 커밋 단위 (Commit Unit)

커밋은 **작고 논리적인 하나의 작업 단위**로 구성하는 것을 원칙으로 합니다. 이는 코드 리뷰를 용이하게 하고, 문제 발생 시 특정 변경 사항을 추적하고 되돌리는 작업을 단순화합니다.

-   **원자성 (Atomic)**: 하나의 커밋은 하나의 문제 해결 또는 하나의 기능 개발과 같이 단일 목적을 가져야 합니다. 예를 들어, 버그 수정과 새로운 기능 추가를 하나의 커밋에 포함해서는 안 됩니다.
-   **기능적 분리**: 큰 기능을 개발할 때는 여러 개의 작은 커밋으로 분리하여 진행합니다. 예를 들어, '사용자 인증 기능 구현'이라는 큰 작업은 아래와 같이 여러 커밋으로 나눌 수 있습니다.
    1.  `feat(auth): User 모델 및 데이터베이스 스키마 추가`
    2.  `feat(auth): 회원가입 API 엔드포인트 구현`
    3.  `feat(auth): 로그인 및 JWT 발급 기능 구현`
    4.  `test(auth): 인증 관련 테스트 코드 작성`
-   **리팩토링과 기능 변경 분리**: 코드 리팩토링과 기능적인 변경(버그 수정, 기능 추가)은 반드시 별개의 커밋으로 분리해야 합니다.

## 3. 브랜칭 전략 (Branching Strategy)

기능 개발, 버그 수정 등 모든 작업은 별도의 브랜치에서 진행하는 것을 원칙으로 합니다.

### 3.0.1. `main` 브랜치 직접 푸시 금지 (엄격)

**`main` 브랜치에는 어떠한 경우에도 직접 커밋(push)할 수 없습니다.** 모든 변경 사항은 반드시 별도의 기능/수정 브랜치에서 작업한 후, Pull Request (PR)를 통해 코드 리뷰를 거쳐 `main` 브랜치로 병합되어야 합니다. 이는 코드의 안정성과 품질을 보장하기 위한 핵심 원칙입니다.

1.  **`main` 브랜치**: 항상 안정적이고 배포 가능한 상태를 유지합니다. 직접적인 커밋은 금지하며, 모든 기능 및 수정 사항은 PR을 통해 병합됩니다.

1.  **`main` 브랜치**: 항상 안정적이고 배포 가능한 상태를 유지합니다. 직접적인 커밋은 금지하며, 모든 기능 및 수정 사항은 PR을 통해 병합됩니다.
2.  **기능 브랜치 (`feat/<feature-name>`)**: 새로운 기능을 개발할 때 사용합니다. `main` 브랜치에서 분기하며, 기능 개발이 완료되면 `main` 브랜치로 PR을 생성합니다. (예: `feat/user-signup`)
3.  **수정 브랜치 (`fix/<bug-description>`)**: 버그를 수정할 때 사용합니다. `main` 브랜치에서 분기하며, 버그 수정이 완료되면 `main` 브랜치로 PR을 생성합니다. (예: `fix/login-error`)

### 3.1. Pull Request (PR) 워크플로우

작업 브랜치에서 개발을 완료한 후, 다음 절차에 따라 PR을 생성하고 병합합니다.

1.  **작업 브랜치 생성 및 이동**:
    ```bash
    git checkout -b feat/my-new-feature
    ```
2.  **코드 작성 및 커밋**: 작업 단위별로 커밋 메시지 컨벤션을 지켜 커밋합니다.
    ```bash
    git add .
    git commit -m "feat(scope): 새로운 기능 구현"
    ```
3.  **원격 저장소에 푸시**:
    ```bash
    git push origin feat/my-new-feature
    ```
4.  **Pull Request 생성 (`gh` CLI 사용)**:
    ```bash
    gh pr create --base main --head feat/my-new-feature --title "feat(scope): 새로운 기능 구현" --body "이 PR은 새로운 기능을 구현합니다. 상세 내용은 다음과 같습니다..."
    ```
    -   `--base`: PR이 병합될 대상 브랜치 (일반적으로 `main`)
    -   `--head`: PR을 생성할 소스 브랜치 (현재 작업 브랜치)
    -   `--title`: PR 제목 (커밋 메시지 제목과 동일하게 작성)
    -   `--body`: PR 본문 (자세한 설명, 관련 이슈 링크 등)

5.  **코드 리뷰 및 승인**: 팀원들의 코드 리뷰를 받고, 필요한 경우 수정 사항을 반영합니다.

6.  **Pull Request 병합 (`gh` CLI 사용)**:
    리뷰가 완료되고 승인되면, PR을 병합합니다. `gh pr merge` 명령은 다양한 병합 옵션을 제공합니다.
    ```bash
    # Squash and merge (가장 권장되는 방식: 여러 커밋을 하나의 커밋으로 합쳐서 병합)
    gh pr merge <PR-NUMBER> --squash

    # Merge commit (기존 커밋 히스토리를 유지하며 병합)
    # gh pr merge <PR-NUMBER> --merge

    # Rebase and merge (리베이스 후 병합)
    # gh pr merge <PR-NUMBER> --rebase
    ```
    -   `<PR-NUMBER>`: GitHub에서 생성된 Pull Request 번호

7.  **로컬 브랜치 삭제**: 병합이 완료된 작업 브랜치는 로컬 및 원격에서 삭제합니다.
    ```bash
    git branch -d feat/my-new-feature
    git push origin --delete feat/my-new-feature
    ```
