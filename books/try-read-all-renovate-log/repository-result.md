---
title: "リポジトリ: 結果"
---

## `DEBUG: GitHub failure: Resource not accessible by integration (repository=korosuke613/homepage-2nd, branch=renovate/npm-tools)`

[#L2229](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2229)

:::details 中身

```json
       "err": {
         "name": "HTTPError",
         "code": "ERR_NON_2XX_3XX_RESPONSE",
         "timings": {
           "start": 1673586971786,
           "socket": 1673586971786,
           "lookup": 1673586971789,
           "connect": 1673586971791,
           "secureConnect": 1673586971795,
           "upload": 1673586971796,
           "response": 1673586971896,
           "end": 1673586971897,
           "phases": {
             "wait": 0,
             "dns": 3,
             "tcp": 2,
             "tls": 4,
             "request": 1,
             "firstByte": 100,
             "download": 1,
             "total": 111
           }
         },
         "message": "Response code 403 (Forbidden)",
         "stack": "HTTPError: Response code 403 (Forbidden)\n    at Request.<anonymous> (/home/runner/.npm/_npx/05eeecd92f4e18e0/node_modules/got/dist/source/as-promise/index.js:118:42)\n    at runMicrotasks (<anonymous>)\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)",
         "options": {
           "headers": {
             "user-agent": "RenovateBot/34.100.1 (https://github.com/renovatebot/renovate)",
             "accept": "application/json, application/vnd.github.machine-man-preview+json",
             "authorization": "***********",
             "accept-encoding": "gzip, deflate, br"
           },
           "url": "https://api.github.com/repos/korosuke613/homepage-2nd/branches/main/protection",
           "hostType": "github",
           "username": "",
           "password": "",
           "method": "GET",
           "http2": false
         },
         "response": {
           "statusCode": 403,
           "statusMessage": "Forbidden",
           "body": {
             "message": "Resource not accessible by integration",
             "documentation_url": "https://docs.github.com/rest/branches/branch-protection#get-branch-protection"
           },
           "headers": {
             "server": "GitHub.com",
             "date": "Fri, 13 Jan 2023 05:16:11 GMT",
             "content-type": "application/json; charset=utf-8",
             "transfer-encoding": "chunked",
             "x-github-media-type": "github.v3; param=machine-man-preview",
             "x-github-api-version-selected": "2022-11-28",
             "x-ratelimit-limit": "1000",
             "x-ratelimit-remaining": "752",
             "x-ratelimit-reset": "1673590303",
             "x-ratelimit-used": "248",
             "x-ratelimit-resource": "core",
             "access-control-expose-headers": "ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Used, X-RateLimit-Resource, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, X-GitHub-SSO, X-GitHub-Request-Id, Deprecation, Sunset",
             "access-control-allow-origin": "*",
             "strict-transport-security": "max-age=31536000; includeSubdomains; preload",
             "x-frame-options": "deny",
             "x-content-type-options": "nosniff",
             "x-xss-protection": "0",
             "referrer-policy": "origin-when-cross-origin, strict-origin-when-cross-origin",
             "content-security-policy": "default-src 'none'",
             "vary": "Accept-Encoding, Accept, X-Requested-With",
             "content-encoding": "gzip",
             "x-github-request-id": "1C02:28A6:7EB540F:102220AB:63C0E91B",
             "connection": "close"
           },
           "httpVersion": "1.1",
           "retryCount": 0
         }
       }
```

:::

## `DEBUG: Branch protection: Do not have permissions to detect branch protection (repository=korosuke613/homepage-2nd, branch=renovate/npm-tools)`

[#L2305](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2305)

## `DEBUG: Skipping behind base branch check due to rebaseWhen=auto (repository=korosuke613/homepage-2nd, branch=renovate/npm-tools)`

[#L2306](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2306)

## `DEBUG: Branch lists (repository=korosuke613/homepage-2nd)`

[#L2721](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2721)

```json
       "branchList": [
         "renovate/commitlint-monorepo",
         "renovate/major-npm-root",
         "renovate/major-npm-tools",
         "renovate/node-18.x",
         "renovate/npm-root",
         "renovate/npm-tools",
         "renovate/typescript-eslint-monorepo"
       ],
       "renovateBranches": [
         "renovate/major-npm-tools",
         "renovate/node-18.x",
         "renovate/npm-root",
         "renovate/npm-tools"
       ]
```

## `DEBUG: Branch summary (repository=korosuke613/homepage-2nd)`

[#L2741](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2741)

```json
       "cacheModified": undefined,
       "baseBranches": [{"branchName": "main", "sha": "8f149fe592fe36cbb3fd61d895e62c369d113789"}],
       "branches": [
         {
           "automerge": false,
           "baseBranch": "main",
           "baseBranchSha": "8f149fe592fe36cbb3fd61d895e62c369d113789",
           "branchName": "renovate/npm-tools",
           "branchSha": "b741f794ffb461ea26c5adb54efe3b3c68d18be7",
           "isModified": false,
           "isPristine": false
         },
         {
           "automerge": false,
           "baseBranch": "main",
           "baseBranchSha": "8f149fe592fe36cbb3fd61d895e62c369d113789",
           "branchName": "renovate/npm-root",
           "branchSha": "f1ed0f9946e4e3c6f7d45310ddda804ae6fdc9ab",
           "isModified": false,
           "isPristine": false
         },
         {
           "automerge": false,
           "baseBranch": "main",
           "baseBranchSha": "8f149fe592fe36cbb3fd61d895e62c369d113789",
           "branchName": "renovate/node-18.x",
           "branchSha": "97ca1aab753b9bbb545d09392d114a61f4f32cce",
           "isModified": false,
           "isPristine": false
         },
         {
           "automerge": false,
           "baseBranch": "main",
           "baseBranchSha": "8f149fe592fe36cbb3fd61d895e62c369d113789",
           "branchName": "renovate/major-npm-tools",
           "branchSha": "61c8e2e8f6ee19bf3719ca1a27c34ccd9376bebc",
           "isModified": false,
           "isPristine": false
         }
       ],
       "inactiveBranches": [
         "renovate/typescript-eslint-monorepo",
         "renovate/commitlint-monorepo",
         "renovate/major-npm-root"
       ]
```

## `DEBUG: Renovate repository PR statistics (repository=korosuke613/homepage-2nd)`

[#L2787](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2787)

```json
       "stats": {"total": 17, "open": 4, "closed": 2, "merged": 11}
```

## `DEBUG: Repository result: done, status: activated, enabled: true, onboarded: true (repository=korosuke613/homepage-2nd)`

[#L2789](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2789)

## `DEBUG: Repository timing splits (milliseconds) (repository=korosuke613/homepage-2nd)`

[#L2790](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2790)

```json
       "splits": {
         "init": 1232,
         "extract": 2323,
         "lookup": 17213,
         "onboarding": 2,
         "update": 31906
       },
       "total": 52992
```

## `DEBUG: Package cache statistics (repository=korosuke613/homepage-2nd)`

[#L2799](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2799)

```json
       "get": {"count": 133, "avgMs": 13, "medianMs": 1, "maxMs": 227},
       "set": {"count": 120, "avgMs": 243, "medianMs": 62, "maxMs": 4140}
```

## `DEBUG: http statistics (repository=korosuke613/homepage-2nd)`

[#L2802](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2802)

```json
       "urls": {
         "https://api.github.com/graphql (POST,200)": 12,
         "https://api.github.com/repos/alextim/astro-lib (GET,200)": 1,
         "https://api.github.com/repos/alextim/astro-lib/git/blobs/76bbc47f373c18f3b245ff81f82a337fa451caec (GET,200)": 1,
         "https://api.github.com/repos/alextim/astro-lib/git/trees/main (GET,200)": 1,
         "https://api.github.com/repos/alextim/astro-lib/tags (GET,200)": 1,
         "https://api.github.com/repos/algolia/docsearch (GET,200)": 1,
         "https://api.github.com/repos/algolia/docsearch/git/blobs/df2d78c08a16bfa6f7c154bf04ced1613eb0a451 (GET,200)": 1,
         "https://api.github.com/repos/algolia/docsearch/git/trees/main (GET,200)": 1,
         "https://api.github.com/repos/algolia/docsearch/tags (GET,200)": 1,
         "https://api.github.com/repos/astro-community/astro-compress (GET,200)": 1,
         "https://api.github.com/repos/astro-community/astro-compress/git/blobs/bfdfe5bdb39e6da30f51f98b7e48b0383db62fce (GET,200)": 1,
         "https://api.github.com/repos/astro-community/astro-compress/git/trees/main (GET,200)": 1,
         "https://api.github.com/repos/astro-community/astro-compress/tags (GET,200)": 1,
         "https://api.github.com/repos/import-js/eslint-plugin-import (GET,200)": 1,
         "https://api.github.com/repos/import-js/eslint-plugin-import/git/blobs/48bf738e0b31defbac5bdb9b189c0df5ca5dfcb8 (GET,200)": 1,
         "https://api.github.com/repos/import-js/eslint-plugin-import/git/trees/main (GET,200)": 1,
         "https://api.github.com/repos/import-js/eslint-plugin-import/tags (GET,200)": 1,
         "https://api.github.com/repos/jsdom/jsdom (GET,200)": 1,
         "https://api.github.com/repos/jsdom/jsdom/git/blobs/db09a302eaa0ba986d987c593ec3b07848661816 (GET,200)": 1,
         "https://api.github.com/repos/jsdom/jsdom/git/trees/master (GET,200)": 1,
         "https://api.github.com/repos/jsdom/jsdom/tags (GET,200)": 1,
         "https://api.github.com/repos/jsx-eslint/eslint-plugin-jsx-a11y (GET,200)": 1,
         "https://api.github.com/repos/jsx-eslint/eslint-plugin-jsx-a11y/git/blobs/d6badd6e1e5369ea0fb07cb297209a5df0497e9a (GET,200)": 1,
         "https://api.github.com/repos/jsx-eslint/eslint-plugin-jsx-a11y/git/trees/main (GET,200)": 1,
         "https://api.github.com/repos/jsx-eslint/eslint-plugin-jsx-a11y/tags (GET,200)": 1,
         "https://api.github.com/repos/jsx-eslint/eslint-plugin-react (GET,200)": 1,
         "https://api.github.com/repos/jsx-eslint/eslint-plugin-react/git/blobs/73fe1726c96201debc5a6014ecdc6e8ae17117df (GET,200)": 1,
         "https://api.github.com/repos/jsx-eslint/eslint-plugin-react/git/trees/master (GET,200)": 1,
         "https://api.github.com/repos/jsx-eslint/eslint-plugin-react/tags (GET,200)": 1,
         "https://api.github.com/repos/korosuke613/homepage-2nd/branches/main/protection (GET,403)": 1,
         "https://api.github.com/repos/korosuke613/homepage-2nd/issues/47 (GET,200)": 2,
         "https://api.github.com/repos/korosuke613/homepage-2nd/pulls (GET,200)": 1,
         "https://api.github.com/repos/nodejs/node (GET,200)": 1,
         "https://api.github.com/repos/nodejs/node/git/blobs/4b5d9904dc9b6044126e64328ca46ab73262e223 (GET,200)": 1,
         "https://api.github.com/repos/nodejs/node/git/trees/main (GET,200)": 1,
         "https://api.github.com/repos/nodejs/node/releases (GET,200)": 1,
         "https://api.github.com/repos/nodejs/node/tags (GET,200)": 1,
         "https://api.github.com/repos/ota-meshi/astro-eslint-parser (GET,200)": 1,
         "https://api.github.com/repos/ota-meshi/astro-eslint-parser/git/blobs/20038d15d81dcdb6bc10643b03a4632a048b82b4 (GET,200)": 1,
         "https://api.github.com/repos/ota-meshi/astro-eslint-parser/git/trees/main (GET,200)": 1,
         "https://api.github.com/repos/ota-meshi/astro-eslint-parser/tags (GET,200)": 1,
         "https://api.github.com/repos/prettier/prettier (GET,200)": 1,
         "https://api.github.com/repos/prettier/prettier/git/blobs/df1b8030f0418ccf92e994c7d3e92520733e3b15 (GET,200)": 1,
         "https://api.github.com/repos/prettier/prettier/git/trees/main (GET,200)": 1,
         "https://api.github.com/repos/prettier/prettier/tags (GET,200)": 1,
         "https://api.github.com/repos/tailwindcss/typography (GET,200)": 1,
         "https://api.github.com/repos/tailwindcss/typography/git/blobs/bcffe48bde801302e83545af4a9a4d02dbabbea4 (GET,200)": 1,
         "https://api.github.com/repos/tailwindcss/typography/git/trees/master (GET,200)": 1,
         "https://api.github.com/repos/tailwindcss/typography/tags (GET,200)": 1,
         "https://api.github.com/repos/textlint/textlint (GET,200)": 1,
         "https://api.github.com/repos/textlint/textlint/git/blobs/c088eb4f85788dcef7005aa7252d11bece7bf9f2 (GET,200)": 1,
         "https://api.github.com/repos/textlint/textlint/git/trees/master (GET,200)": 1,
         "https://api.github.com/repos/textlint/textlint/tags (GET,200)": 1,
         "https://api.github.com/repos/withastro/astro (GET,200)": 1,
         "https://api.github.com/repos/withastro/astro/git/blobs/b7387a0281daaa351de899160e749de42e7cf39e (GET,200)": 1,
         "https://api.github.com/repos/withastro/astro/git/trees/main (GET,200)": 1,
         "https://api.github.com/repos/withastro/astro/releases (GET,200)": 1,
         "https://api.github.com/repos/withastro/astro/tags (GET,200)": 1,
         "https://api.github.com/repos/withastro/prettier-plugin-astro (GET,200)": 1,
         "https://api.github.com/repos/withastro/prettier-plugin-astro/git/blobs/4cb73bee88378030ff8ebc44e08d6cdff14a36cc (GET,200)": 1,
         "https://api.github.com/repos/withastro/prettier-plugin-astro/git/trees/main (GET,200)": 1,
         "https://api.github.com/repos/withastro/prettier-plugin-astro/tags (GET,200)": 1,
         "https://api.github.com/repositories/27193779/releases (GET,200)": 3,
         "https://api.github.com/repositories/27193779/tags (GET,200)": 7,
         "https://api.github.com/repositories/28061676/tags (GET,200)": 1,
         "https://api.github.com/repositories/28478929/tags (GET,200)": 9,
         "https://api.github.com/repositories/32238354/tags (GET,200)": 1,
         "https://api.github.com/repositories/348060227/releases (GET,200)": 8,
         "https://api.github.com/repositories/348060227/tags (GET,200)": 9,
         "https://api.github.com/repositories/478584/tags (GET,200)": 2,
         "https://api.github.com/repositories/523625263/pulls (GET,200)": 1,
         "https://api.github.com/repositories/75104123/tags (GET,200)": 1,
         "https://nodejs.org/dist/index.json (GET,200)": 1,
         "https://registry.npmjs.org/@astrojs%2Fimage (GET,200)": 1,
         "https://registry.npmjs.org/@astrojs%2Fpartytown (GET,200)": 1,
         "https://registry.npmjs.org/@astrojs%2Freact (GET,200)": 1,
         "https://registry.npmjs.org/@astrojs%2Frss (GET,200)": 1,
         "https://registry.npmjs.org/@astrojs%2Fsitemap (GET,200)": 1,
         "https://registry.npmjs.org/@astrojs%2Ftailwind (GET,200)": 1,
         "https://registry.npmjs.org/@commitlint%2Fcli (GET,200)": 1,
         "https://registry.npmjs.org/@commitlint%2Fconfig-conventional (GET,200)": 1,
         "https://registry.npmjs.org/@cybozu%2Feslint-config (GET,200)": 1,
         "https://registry.npmjs.org/@docsearch%2Fcss (GET,200)": 1,
         "https://registry.npmjs.org/@docsearch%2Freact (GET,200)": 1,
         "https://registry.npmjs.org/@proofdict%2Ftextlint-rule-proofdict (GET,200)": 1,
         "https://registry.npmjs.org/@tailwindcss%2Faspect-ratio (GET,200)": 1,
         "https://registry.npmjs.org/@tailwindcss%2Ftypography (GET,200)": 1,
         "https://registry.npmjs.org/@types%2Fjsdom (GET,200)": 1,
         "https://registry.npmjs.org/@types%2Freact (GET,200)": 1,
         "https://registry.npmjs.org/@typescript-eslint%2Feslint-plugin (GET,200)": 1,
         "https://registry.npmjs.org/@typescript-eslint%2Fparser (GET,200)": 1,
         "https://registry.npmjs.org/astro (GET,200)": 1,
         "https://registry.npmjs.org/astro-compress (GET,200)": 1,
         "https://registry.npmjs.org/astro-eslint-parser (GET,200)": 1,
         "https://registry.npmjs.org/astro-imagetools (GET,200)": 1,
         "https://registry.npmjs.org/astro-robots-txt (GET,200)": 1,
         "https://registry.npmjs.org/axios (GET,200)": 1,
         "https://registry.npmjs.org/date-fns (GET,200)": 1,
         "https://registry.npmjs.org/eastasianwidth (GET,200)": 1,
         "https://registry.npmjs.org/emoji-regex (GET,200)": 1,
         "https://registry.npmjs.org/eslint (GET,200)": 1,
         "https://registry.npmjs.org/eslint-config-airbnb-base (GET,200)": 1,
         "https://registry.npmjs.org/eslint-config-airbnb-typescript (GET,200)": 1,
         "https://registry.npmjs.org/eslint-config-prettier (GET,200)": 1,
         "https://registry.npmjs.org/eslint-plugin-import (GET,200)": 1,
         "https://registry.npmjs.org/eslint-plugin-jsx-a11y (GET,200)": 1,
         "https://registry.npmjs.org/eslint-plugin-prettier (GET,200)": 1,
         "https://registry.npmjs.org/eslint-plugin-react (GET,200)": 1,
         "https://registry.npmjs.org/eslint-plugin-react-hooks (GET,200)": 1,
         "https://registry.npmjs.org/eslint-plugin-simple-import-sort (GET,200)": 1,
         "https://registry.npmjs.org/eslint-plugin-tailwindcss (GET,200)": 1,
         "https://registry.npmjs.org/eslint-plugin-unused-imports (GET,200)": 1,
         "https://registry.npmjs.org/fast-xml-parser (GET,200)": 1,
         "https://registry.npmjs.org/glob (GET,200)": 1,
         "https://registry.npmjs.org/husky (GET,200)": 1,
         "https://registry.npmjs.org/jsdom (GET,200)": 1,
         "https://registry.npmjs.org/lint-staged (GET,200)": 1,
         "https://registry.npmjs.org/prettier (GET,200)": 1,
         "https://registry.npmjs.org/prettier-plugin-astro (GET,200)": 1,
         "https://registry.npmjs.org/react (GET,200)": 1,
         "https://registry.npmjs.org/react-dom (GET,200)": 1,
         "https://registry.npmjs.org/react-icons (GET,200)": 1,
         "https://registry.npmjs.org/rehype-external-links (GET,200)": 1,
         "https://registry.npmjs.org/rehype-stringify (GET,200)": 1,
         "https://registry.npmjs.org/remark-extract-frontmatter (GET,200)": 1,
         "https://registry.npmjs.org/remark-frontmatter (GET,200)": 1,
         "https://registry.npmjs.org/remark-gfm (GET,200)": 1,
         "https://registry.npmjs.org/remark-parse (GET,200)": 1,
         "https://registry.npmjs.org/remark-rehype (GET,200)": 1,
         "https://registry.npmjs.org/rimraf (GET,200)": 1,
         "https://registry.npmjs.org/rss-parser (GET,200)": 1,
         "https://registry.npmjs.org/strip-ansi (GET,200)": 1,
         "https://registry.npmjs.org/tailwindcss (GET,200)": 1,
         "https://registry.npmjs.org/textlint (GET,200)": 1,
         "https://registry.npmjs.org/textlint-filter-rule-comments (GET,200)": 1,
         "https://registry.npmjs.org/textlint-rule-preset-ja-spacing (GET,200)": 1,
         "https://registry.npmjs.org/textlint-rule-preset-ja-technical-writing (GET,200)": 1,
         "https://registry.npmjs.org/textlint-rule-spellcheck-tech-word (GET,200)": 1,
         "https://registry.npmjs.org/ts-node (GET,200)": 1,
         "https://registry.npmjs.org/typescript (GET,200)": 1,
         "https://registry.npmjs.org/unified (GET,200)": 1
       },
       "hostStats": {
         "api.github.com": {"requestCount": 116, "requestAvgMs": 276, "queueAvgMs": 0},
         "nodejs.org": {"requestCount": 1, "requestAvgMs": 42, "queueAvgMs": 1},
         "registry.npmjs.org": {
           "requestCount": 68,
           "requestAvgMs": 620,
           "queueAvgMs": 0
         }
       },
       "totalRequests": 185
```

## `DEBUG: dns cache (repository=korosuke613/homepage-2nd)`

[#L2956](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2956)

```json
       "hosts": []
```

##  `INFO: Repository finished (repository=korosuke613/homepage-2nd)`
[#L2958](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2958)

```json
       "cloned": true,
       "durationMs": 52992
```

## `DEBUG: Renovate exiting`

[#L2961](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2961)
