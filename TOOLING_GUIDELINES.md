# 개발 도구 가이드라인 (Tooling Guidelines)

이 문서는 현대적인 웹 프로젝트에서 코드 품질을 일관되게 유지하고 개발 생산성을 향상시키기 위한 필수 개발 도구들의 설정 및 사용법을 안내합니다.

## 1. 핵심 도구 소개

-   **ESLint**: 코드의 문법 오류나 잠재적인 버그를 찾아내고, 정해진 코딩 스타일을 따르도록 강제하는 **Linter**입니다.
-   **Prettier**: 코드의 스타일(들여쓰기, 줄 바꿈, 따옴표 등)을 정해진 규칙에 따라 자동으로 통일시켜주는 **Code Formatter**입니다.
-   **Husky**: Git hook(예: `pre-commit`, `pre-push`)을 간편하게 관리하고, 특정 이벤트 발생 시 원하는 스크립트를 실행할 수 있게 해주는 도구입니다.
-   **lint-staged**: Git에 `commit` 되기 전, **Staging area에 올라온 파일들만을 대상으로** ESLint나 Prettier 같은 도구를 실행시켜주는 역할을 합니다. 전체 프로젝트가 아닌 변경된 파일에만 검사를 적용하여 검사 속도를 크게 향상시킵니다.

이 도구들을 조합하면 **"커밋하기 전에, 변경된 파일에 한해 자동으로 코드 스타일을 정리하고 문법 오류를 검사"**하는 강력한 워크플로우를 구축할 수 있습니다.

## 2. 설치 및 설정

프로젝트의 `devDependencies`로 아래 패키지들을 설치합니다.

```bash
npm install --save-dev eslint prettier husky lint-staged eslint-config-prettier
# eslint-config-prettier: Prettier와 충돌하는 ESLint 규칙을 비활성화합니다.
```

### 2.1. Husky 설정

Husky를 활성화하고 `pre-commit` hook을 설정합니다.

```bash
# Husky 설치 및 활성화
npx husky init

# pre-commit hook 생성 및 lint-staged 실행 명령어 추가
# 이 명령은 .husky/pre-commit 파일에 'npx lint-staged'를 추가합니다.
echo "npx lint-staged" > .husky/pre-commit
```

### 2.2. lint-staged 설정

`package.json` 파일에 `lint-staged` 설정을 추가합니다. 이 설정은 특정 확장자를 가진 파일이 스테이징될 때 어떤 명령을 실행할지 정의합니다.

```json
// package.json
{
  // ... other settings
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,css}": [
      "prettier --write"
    ]
  }
}
```

### 2.3. ESLint 및 Prettier 설정

프로젝트 루트에 `.eslintrc.js` (또는 `.json`)와 `.prettierrc.js` (또는 `.json`) 파일을 생성하여 각 도구의 규칙을 상세하게 정의합니다.

**`.eslintrc.js` 예시:**

```javascript
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier', // 항상 마지막에 추가
  ],
  rules: {
    // 프로젝트에 맞는 규칙 추가
    'react/react-in-jsx-scope': 'off',
  },
};
```

**`.prettierrc.js` 예시:**

```javascript
module.exports = {
  singleQuote: true, // 작은따옴표 사용
  semi: true, // 세미콜론 사용
  tabWidth: 2, // 탭 너비 2
  trailingComma: 'all', // 후행 쉼표 사용
  printWidth: 80, // 한 줄의 최대 너비
};
```

## 3. 워크플로우

위 설정이 모두 완료되면, 개발자는 평소처럼 코드를 작성하고 `git add` 명령어로 변경된 파일을 스테이징한 후 `git commit`을 실행하기만 하면 됩니다. 커밋 직전에 Husky가 `lint-staged`를 실행하여 스테이징된 파일들을 대상으로 코드 검사 및 포맷팅을 자동으로 수행하고, 문제가 없어야만 커밋이 완료됩니다.
