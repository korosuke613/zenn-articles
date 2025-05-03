---
title: "リポジトリ: 依存関係の更新"
---


## `DEBUG: Setting npmrc (repository=korosuke613/homepage-2nd)`

[#L286](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L286)

## `DEBUG: PackageFiles.add() - Package file saved for base branch (repository=korosuke613/homepage-2nd, baseBranch=main)`

[#L287](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L287)

## `DEBUG: Package releases lookups complete (repository=korosuke613/homepage-2nd, baseBranch=main)`


[#L288](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L288)

## `DEBUG: branchifyUpgrades (repository=korosuke613/homepage-2nd)`

[#L289](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L289)

## `DEBUG: Using group branchName template (repository=korosuke613/homepage-2nd)`

下の見出しとセット。

## `DEBUG: Dependency @docsearch/css is part of group npm-root (repository=korosuke613/homepage-2nd)`

[#L290-L329](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L290-L329)

## `DEBUG: detectSemanticCommits() (repository=korosuke613/homepage-2nd)`

[#L330](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L330)

## `DEBUG: getCommitMessages (repository=korosuke613/homepage-2nd)`

[#L331](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L331)

## `DEBUG: semanticCommits: detected "angular" (repository=korosuke613/homepage-2nd)`

[#L332](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L332)

## `DEBUG: semanticCommits: enabled (repository=korosuke613/homepage-2nd)`

[#L333]([#L333])

## `DEBUG: 21 flattened updates found: node, @docsearch/css, @docsearch/react, @commitlint/cli, @commitlint/config-conventional, @tailwindcss/typography, @typescript-eslint/eslint-plugin, @typescript-eslint/parser, astro, astro-compress, astro-eslint-parser, astro-robots-txt, eslint-plugin-import, eslint-plugin-jsx-a11y, eslint-plugin-react, prettier, prettier-plugin-astro, rimraf, textlint, jsdom, prettier (repository=korosuke613/homepage-2nd)`

[#L334](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L334)

## `DEBUG: Returning 7 branch(es) (repository=korosuke613/homepage-2nd)`

[#L335](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L335)

## `DEBUG: config.repoIsOnboarded=true (repository=korosuke613/homepage-2nd)`

[#L336](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L336)

## `DEBUG: packageFiles with updates (repository=korosuke613/homepage-2nd, baseBranch=main)`

[#L337](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L337)

:::details 中身

```json
       "config": {
         "asdf": [
           {
             "packageFile": ".tool-versions",
             "deps": [
               {
                 "currentValue": "18.12.1",
                 "depName": "node",
                 "datasource": "node",
                 "packageName": "node",
                 "versioning": "node",
                 "depIndex": 0,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "v18.13.0",
                     "newValue": "18.13.0",
                     "releaseTimestamp": "2023-01-05T00:00:00.000Z",
                     "newMajor": 18,
                     "newMinor": 13,
                     "updateType": "minor",
                     "branchName": "renovate/node-18.x"
                   }
                 ],
                 "warnings": [],
                 "sourceUrl": "https://github.com/nodejs/node",
                 "registryUrl": "https://nodejs.org/dist",
                 "homepage": "https://nodejs.org",
                 "currentVersion": "18.12.1",
                 "isSingleVersion": true,
                 "fixedVersion": "18.12.1"
               }
             ]
           }
         ],
         "github-actions": [
           {
             "packageFile": ".github/workflows/ci.yaml",
             "deps": [
               {
                 "depName": "actions/checkout",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/checkout@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 0,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/checkout",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "actions/setup-node",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/setup-node@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 1,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/setup-node",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "actions/checkout",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/checkout@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 2,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/checkout",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "actions/setup-node",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/setup-node@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 3,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/setup-node",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "actions/checkout",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/checkout@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 4,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/checkout",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "actions/setup-node",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/setup-node@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 5,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/setup-node",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               }
             ]
           },
           {
             "packageFile": ".github/workflows/compare-renovate.yaml",
             "deps": [
               {
                 "depName": "korosuke613/actions",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "korosuke613/actions/.github/workflows/renovate.yaml@main",
                 "autoReplaceStringTemplate": "{{depName}}/.github/workflows/renovate.yaml@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "main",
                 "skipReason": "invalid-version",
                 "depIndex": 0,
                 "updates": []
               }
             ]
           },
           {
             "packageFile": ".github/workflows/dry-renovate.yaml",
             "deps": [
               {
                 "depName": "actions/checkout",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/checkout@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 0,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/checkout",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "korosuke613/renovate-dry-run-action",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "korosuke613/renovate-dry-run-action@v1",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v1",
                 "depIndex": 1,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/korosuke613/renovate-dry-run-action",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v1",
                 "fixedVersion": "v1"
               }
             ]
           },
           {
             "packageFile": ".github/workflows/pages.yml",
             "deps": [
               {
                 "depName": "actions/checkout",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/checkout@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 0,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/checkout",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "actions/setup-node",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/setup-node@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 1,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/setup-node",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "actions/upload-pages-artifact",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/upload-pages-artifact@v1",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v1",
                 "depIndex": 2,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/upload-pages-artifact",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v1",
                 "fixedVersion": "v1"
               },
               {
                 "depName": "actions/checkout",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/checkout@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 3,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/checkout",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "actions/configure-pages",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/configure-pages@v2",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v2",
                 "depIndex": 4,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/configure-pages",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v2",
                 "fixedVersion": "v2"
               },
               {
                 "depName": "actions/deploy-pages",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/deploy-pages@main",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "main",
                 "skipReason": "invalid-version",
                 "depIndex": 5,
                 "updates": []
               },
               {
                 "depName": "korosuke613/actions",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "korosuke613/actions/.github/workflows/notify-to-slack.yaml@main",
                 "autoReplaceStringTemplate": "{{depName}}/.github/workflows/notify-to-slack.yaml@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "main",
                 "skipReason": "invalid-version",
                 "depIndex": 6,
                 "updates": []
               }
             ]
           },
           {
             "packageFile": ".github/workflows/scraping.yaml",
             "deps": [
               {
                 "depName": "actions/checkout",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/checkout@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 0,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/checkout",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               }
             ]
           },
           {
             "packageFile": ".github/workflows/update-blogs-data.yaml",
             "deps": [
               {
                 "depName": "actions/checkout",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/checkout@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 0,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/checkout",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "actions/setup-node",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/setup-node@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 1,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/setup-node",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "korosuke613/actions",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "korosuke613/actions/.github/workflows/notify-to-slack.yaml@main",
                 "autoReplaceStringTemplate": "{{depName}}/.github/workflows/notify-to-slack.yaml@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "main",
                 "skipReason": "invalid-version",
                 "depIndex": 2,
                 "updates": []
               }
             ]
           }
         ],
         "npm": [
           {
             "packageFile": "package.json",
             "deps": [
               {
                 "depType": "dependencies",
                 "depName": "@astrojs/image",
                 "currentValue": "0.12.1",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "0.12.1",
                 "depIndex": 0,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/withastro/astro",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/integrations/image",
                 "homepage": "https://docs.astro.build/en/guides/integrations-guide/image/",
                 "currentVersion": "0.12.1",
                 "fixedVersion": "0.12.1"
               },
               {
                 "depType": "dependencies",
                 "depName": "@docsearch/css",
                 "currentValue": "3.3.1",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "3.3.1",
                 "depIndex": 1,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "3.3.2",
                     "newValue": "3.3.2",
                     "releaseTimestamp": "2023-01-10T11:06:42.433Z",
                     "newMajor": 3,
                     "newMinor": 3,
                     "updateType": "patch",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/algolia/docsearch",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://docsearch.algolia.com/",
                 "currentVersion": "3.3.1",
                 "isSingleVersion": true,
                 "fixedVersion": "3.3.1"
               },
               {
                 "depType": "dependencies",
                 "depName": "@docsearch/react",
                 "currentValue": "3.3.1",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "3.3.1",
                 "depIndex": 2,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "3.3.2",
                     "newValue": "3.3.2",
                     "releaseTimestamp": "2023-01-10T11:06:43.917Z",
                     "newMajor": 3,
                     "newMinor": 3,
                     "updateType": "patch",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/algolia/docsearch",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://docsearch.algolia.com/",
                 "currentVersion": "3.3.1",
                 "isSingleVersion": true,
                 "fixedVersion": "3.3.1"
               },
               {
                 "depType": "dependencies",
                 "depName": "astro-imagetools",
                 "currentValue": "0.7.0",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "0.7.0",
                 "depIndex": 3,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/RafidMuhymin/astro-imagetools",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "0.7.0",
                 "fixedVersion": "0.7.0"
               },
               {
                 "depType": "dependencies",
                 "depName": "date-fns",
                 "currentValue": "2.29.3",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "2.29.3",
                 "depIndex": 4,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/date-fns/date-fns",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "2.29.3",
                 "fixedVersion": "2.29.3"
               },
               {
                 "depType": "dependencies",
                 "depName": "eastasianwidth",
                 "currentValue": "0.2.0",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "0.2.0",
                 "depIndex": 5,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/komagata/eastasianwidth",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "0.2.0",
                 "fixedVersion": "0.2.0"
               },
               {
                 "depType": "dependencies",
                 "depName": "emoji-regex",
                 "currentValue": "10.2.1",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "10.2.1",
                 "depIndex": 6,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/mathiasbynens/emoji-regex",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://mths.be/emoji-regex",
                 "currentVersion": "10.2.1",
                 "fixedVersion": "10.2.1"
               },
               {
                 "depType": "dependencies",
                 "depName": "glob",
                 "currentValue": "8.0.3",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "8.0.3",
                 "depIndex": 7,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/isaacs/node-glob",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "8.0.3",
                 "fixedVersion": "8.0.3"
               },
               {
                 "depType": "dependencies",
                 "depName": "react",
                 "currentValue": "18.2.0",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "18.2.0",
                 "depIndex": 8,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/facebook/react",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/react",
                 "homepage": "https://reactjs.org/",
                 "currentVersion": "18.2.0",
                 "fixedVersion": "18.2.0"
               },
               {
                 "depType": "dependencies",
                 "depName": "react-dom",
                 "currentValue": "18.2.0",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "18.2.0",
                 "depIndex": 9,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/facebook/react",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/react-dom",
                 "homepage": "https://reactjs.org/",
                 "currentVersion": "18.2.0",
                 "fixedVersion": "18.2.0"
               },
               {
                 "depType": "dependencies",
                 "depName": "react-icons",
                 "currentValue": "4.7.1",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "4.7.1",
                 "depIndex": 10,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/react-icons/react-icons",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "4.7.1",
                 "fixedVersion": "4.7.1"
               },
               {
                 "depType": "dependencies",
                 "depName": "rehype-external-links",
                 "currentValue": "2.0.1",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "2.0.1",
                 "depIndex": 11,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/rehypejs/rehype-external-links",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "2.0.1",
                 "fixedVersion": "2.0.1"
               },
               {
                 "depType": "dependencies",
                 "depName": "rehype-stringify",
                 "currentValue": "9.0.3",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "9.0.3",
                 "depIndex": 12,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/rehypejs/rehype",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "9.0.3",
                 "fixedVersion": "9.0.3"
               },
               {
                 "depType": "dependencies",
                 "depName": "remark-extract-frontmatter",
                 "currentValue": "3.2.0",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "3.2.0",
                 "depIndex": 13,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/mrzmmr/remark-extract-frontmatter",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "3.2.0",
                 "fixedVersion": "3.2.0"
               },
               {
                 "depType": "dependencies",
                 "depName": "remark-frontmatter",
                 "currentValue": "4.0.1",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "4.0.1",
                 "depIndex": 14,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/remarkjs/remark-frontmatter",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "4.0.1",
                 "fixedVersion": "4.0.1"
               },
               {
                 "depType": "dependencies",
                 "depName": "remark-gfm",
                 "currentValue": "3.0.1",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "3.0.1",
                 "depIndex": 15,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/remarkjs/remark-gfm",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "3.0.1",
                 "fixedVersion": "3.0.1"
               },
               {
                 "depType": "dependencies",
                 "depName": "remark-parse",
                 "currentValue": "10.0.1",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "10.0.1",
                 "depIndex": 16,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/remarkjs/remark",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://remark.js.org",
                 "currentVersion": "10.0.1",
                 "fixedVersion": "10.0.1"
               },
               {
                 "depType": "dependencies",
                 "depName": "remark-rehype",
                 "currentValue": "10.1.0",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "10.1.0",
                 "depIndex": 17,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/remarkjs/remark-rehype",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "10.1.0",
                 "fixedVersion": "10.1.0"
               },
               {
                 "depType": "dependencies",
                 "depName": "strip-ansi",
                 "currentValue": "7.0.1",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "7.0.1",
                 "depIndex": 18,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/chalk/strip-ansi",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "7.0.1",
                 "fixedVersion": "7.0.1"
               },
               {
                 "depType": "dependencies",
                 "depName": "unified",
                 "currentValue": "10.1.2",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "10.1.2",
                 "depIndex": 19,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/unifiedjs/unified",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://unifiedjs.com",
                 "currentVersion": "10.1.2",
                 "fixedVersion": "10.1.2"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@astrojs/partytown",
                 "currentValue": "1.0.2",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "1.0.2",
                 "depIndex": 20,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/withastro/astro",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/integrations/partytown",
                 "homepage": "https://docs.astro.build/en/guides/integrations-guide/partytown/",
                 "currentVersion": "1.0.2",
                 "fixedVersion": "1.0.2"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@astrojs/react",
                 "currentValue": "1.2.2",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "1.2.2",
                 "depIndex": 21,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/withastro/astro",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/integrations/react",
                 "homepage": "https://docs.astro.build/en/guides/integrations-guide/react/",
                 "currentVersion": "1.2.2",
                 "fixedVersion": "1.2.2"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@astrojs/rss",
                 "currentValue": "2.0.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "2.0.0",
                 "depIndex": 22,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/withastro/astro",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/astro-rss",
                 "homepage": "https://astro.build",
                 "currentVersion": "2.0.0",
                 "fixedVersion": "2.0.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@astrojs/sitemap",
                 "currentValue": "1.0.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "1.0.0",
                 "depIndex": 23,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/withastro/astro",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/integrations/sitemap",
                 "homepage": "https://docs.astro.build/en/guides/integrations-guide/sitemap/",
                 "currentVersion": "1.0.0",
                 "fixedVersion": "1.0.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@astrojs/tailwind",
                 "currentValue": "2.1.3",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "2.1.3",
                 "depIndex": 24,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/withastro/astro",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/integrations/tailwind",
                 "homepage": "https://docs.astro.build/en/guides/integrations-guide/tailwind/",
                 "currentVersion": "2.1.3",
                 "fixedVersion": "2.1.3"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@commitlint/cli",
                 "currentValue": "17.3.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "17.3.0",
                 "depIndex": 25,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "17.4.2",
                     "newValue": "17.4.2",
                     "releaseTimestamp": "2023-01-12T14:37:19.866Z",
                     "newMajor": 17,
                     "newMinor": 4,
                     "updateType": "minor",
                     "branchName": "renovate/commitlint-monorepo"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/conventional-changelog/commitlint",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "@commitlint/cli",
                 "homepage": "https://commitlint.js.org/",
                 "currentVersion": "17.3.0",
                 "isSingleVersion": true,
                 "fixedVersion": "17.3.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@commitlint/config-conventional",
                 "currentValue": "17.3.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "17.3.0",
                 "depIndex": 26,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "17.4.2",
                     "newValue": "17.4.2",
                     "releaseTimestamp": "2023-01-12T14:37:20.468Z",
                     "newMajor": 17,
                     "newMinor": 4,
                     "updateType": "minor",
                     "branchName": "renovate/commitlint-monorepo"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/conventional-changelog/commitlint",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "@commitlint/config-conventional",
                 "homepage": "https://commitlint.js.org/",
                 "currentVersion": "17.3.0",
                 "isSingleVersion": true,
                 "fixedVersion": "17.3.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@proofdict/textlint-rule-proofdict",
                 "currentValue": "3.1.2",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "3.1.2",
                 "depIndex": 27,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/proofdict/proofdict",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://github.com/proofdict/proofdict/tree/master/packages/%40proofdict/textlint-rule-proofdict",
                 "currentVersion": "3.1.2",
                 "fixedVersion": "3.1.2"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@tailwindcss/aspect-ratio",
                 "currentValue": "0.4.2",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "0.4.2",
                 "depIndex": 28,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/tailwindlabs/tailwindcss-aspect-ratio",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "0.4.2",
                 "fixedVersion": "0.4.2"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@tailwindcss/typography",
                 "currentValue": "0.5.8",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "0.5.8",
                 "depIndex": 29,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "0.5.9",
                     "newValue": "0.5.9",
                     "releaseTimestamp": "2023-01-10T16:14:23.354Z",
                     "newMajor": 0,
                     "newMinor": 5,
                     "updateType": "patch",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/tailwindcss/typography",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "0.5.8",
                 "isSingleVersion": true,
                 "fixedVersion": "0.5.8"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@types/react",
                 "currentValue": "18.0.26",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "18.0.26",
                 "depIndex": 30,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/DefinitelyTyped/DefinitelyTyped",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "types/react",
                 "homepage": "https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react",
                 "currentVersion": "18.0.26",
                 "fixedVersion": "18.0.26"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@typescript-eslint/eslint-plugin",
                 "currentValue": "5.48.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "5.48.0",
                 "depIndex": 31,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "5.48.1",
                     "newValue": "5.48.1",
                     "releaseTimestamp": "2023-01-09T17:19:12.478Z",
                     "newMajor": 5,
                     "newMinor": 48,
                     "updateType": "patch",
                     "branchName": "renovate/typescript-eslint-monorepo"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/typescript-eslint/typescript-eslint",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/eslint-plugin",
                 "currentVersion": "5.48.0",
                 "isSingleVersion": true,
                 "fixedVersion": "5.48.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@typescript-eslint/parser",
                 "currentValue": "5.48.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "5.48.0",
                 "depIndex": 32,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "5.48.1",
                     "newValue": "5.48.1",
                     "releaseTimestamp": "2023-01-09T17:18:38.891Z",
                     "newMajor": 5,
                     "newMinor": 48,
                     "updateType": "patch",
                     "branchName": "renovate/typescript-eslint-monorepo"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/typescript-eslint/typescript-eslint",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/parser",
                 "currentVersion": "5.48.0",
                 "isSingleVersion": true,
                 "fixedVersion": "5.48.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "astro",
                 "currentValue": "1.8.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "1.8.0",
                 "depIndex": 33,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "1.9.2",
                     "newValue": "1.9.2",
                     "releaseTimestamp": "2023-01-11T18:38:16.700Z",
                     "newMajor": 1,
                     "newMinor": 9,
                     "updateType": "minor",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/withastro/astro",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/astro",
                 "homepage": "https://astro.build",
                 "currentVersion": "1.8.0",
                 "isSingleVersion": true,
                 "fixedVersion": "1.8.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "astro-compress",
                 "currentValue": "1.1.24",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "1.1.24",
                 "depIndex": 34,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "1.1.25",
                     "newValue": "1.1.25",
                     "releaseTimestamp": "2023-01-07T10:53:09.154Z",
                     "newMajor": 1,
                     "newMinor": 1,
                     "updateType": "patch",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/astro-community/astro-compress",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "1.1.24",
                 "isSingleVersion": true,
                 "fixedVersion": "1.1.24"
               },
               {
                 "depType": "devDependencies",
                 "depName": "astro-eslint-parser",
                 "currentValue": "0.9.2",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "0.9.2",
                 "depIndex": 35,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "0.9.4",
                     "newValue": "0.9.4",
                     "releaseTimestamp": "2023-01-12T01:32:30.374Z",
                     "newMajor": 0,
                     "newMinor": 9,
                     "updateType": "patch",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/ota-meshi/astro-eslint-parser",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "0.9.2",
                 "isSingleVersion": true,
                 "fixedVersion": "0.9.2"
               },
               {
                 "depType": "devDependencies",
                 "depName": "astro-robots-txt",
                 "currentValue": "0.3.10",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "0.3.10",
                 "depIndex": 36,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "0.3.11",
                     "newValue": "0.3.11",
                     "releaseTimestamp": "2023-01-09T18:21:56.317Z",
                     "newMajor": 0,
                     "newMinor": 3,
                     "updateType": "patch",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/alextim/astro-lib",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/astro-robots-txt",
                 "homepage": "https://github.com/alextim/astro-lib/tree/main/packages/astro-robots-txt#readme",
                 "currentVersion": "0.3.10",
                 "isSingleVersion": true,
                 "fixedVersion": "0.3.10"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint",
                 "currentValue": "8.31.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "8.31.0",
                 "depIndex": 37,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/eslint/eslint",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://eslint.org",
                 "currentVersion": "8.31.0",
                 "fixedVersion": "8.31.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-config-airbnb-base",
                 "currentValue": "15.0.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "15.0.0",
                 "depIndex": 38,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/airbnb/javascript",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "15.0.0",
                 "fixedVersion": "15.0.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-config-airbnb-typescript",
                 "currentValue": "17.0.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "17.0.0",
                 "depIndex": 39,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/iamturns/eslint-config-airbnb-typescript",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "17.0.0",
                 "fixedVersion": "17.0.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-config-prettier",
                 "currentValue": "8.6.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "8.6.0",
                 "depIndex": 40,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/prettier/eslint-config-prettier",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "8.6.0",
                 "fixedVersion": "8.6.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-plugin-import",
                 "currentValue": "2.26.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "2.26.0",
                 "depIndex": 41,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "2.27.4",
                     "newValue": "2.27.4",
                     "releaseTimestamp": "2023-01-12T07:16:54.707Z",
                     "newMajor": 2,
                     "newMinor": 27,
                     "updateType": "minor",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/import-js/eslint-plugin-import",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "2.26.0",
                 "isSingleVersion": true,
                 "fixedVersion": "2.26.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-plugin-jsx-a11y",
                 "currentValue": "6.6.1",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "6.6.1",
                 "depIndex": 42,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "6.7.1",
                     "newValue": "6.7.1",
                     "releaseTimestamp": "2023-01-12T04:19:36.937Z",
                     "newMajor": 6,
                     "newMinor": 7,
                     "updateType": "minor",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "6.6.1",
                 "isSingleVersion": true,
                 "fixedVersion": "6.6.1"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-plugin-prettier",
                 "currentValue": "4.2.1",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "4.2.1",
                 "depIndex": 43,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/prettier/eslint-plugin-prettier",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "4.2.1",
                 "fixedVersion": "4.2.1"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-plugin-react",
                 "currentValue": "7.31.11",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "7.31.11",
                 "depIndex": 44,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "7.32.0",
                     "newValue": "7.32.0",
                     "releaseTimestamp": "2023-01-11T06:32:23.127Z",
                     "newMajor": 7,
                     "newMinor": 32,
                     "updateType": "minor",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/jsx-eslint/eslint-plugin-react",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "7.31.11",
                 "isSingleVersion": true,
                 "fixedVersion": "7.31.11"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-plugin-react-hooks",
                 "currentValue": "4.6.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "4.6.0",
                 "depIndex": 45,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/facebook/react",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/eslint-plugin-react-hooks",
                 "homepage": "https://reactjs.org/",
                 "currentVersion": "4.6.0",
                 "fixedVersion": "4.6.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-plugin-simple-import-sort",
                 "currentValue": "8.0.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "8.0.0",
                 "depIndex": 46,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/lydell/eslint-plugin-simple-import-sort",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "8.0.0",
                 "fixedVersion": "8.0.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-plugin-tailwindcss",
                 "currentValue": "3.8.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "3.8.0",
                 "depIndex": 47,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/francoismassart/eslint-plugin-tailwindcss",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "3.8.0",
                 "fixedVersion": "3.8.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-plugin-unused-imports",
                 "currentValue": "2.0.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "2.0.0",
                 "depIndex": 48,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/sweepline/eslint-plugin-unused-imports",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "2.0.0",
                 "fixedVersion": "2.0.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "husky",
                 "currentValue": "8.0.3",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "8.0.3",
                 "depIndex": 49,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/typicode/husky",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://typicode.github.io/husky",
                 "currentVersion": "8.0.3",
                 "fixedVersion": "8.0.3"
               },
               {
                 "depType": "devDependencies",
                 "depName": "lint-staged",
                 "currentValue": "13.1.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "13.1.0",
                 "depIndex": 50,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/okonet/lint-staged",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "13.1.0",
                 "fixedVersion": "13.1.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "prettier",
                 "currentValue": "2.8.1",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "2.8.1",
                 "depIndex": 51,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "2.8.2",
                     "newValue": "2.8.2",
                     "releaseTimestamp": "2023-01-07T11:19:41.659Z",
                     "newMajor": 2,
                     "newMinor": 8,
                     "updateType": "patch",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/prettier/prettier",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://prettier.io",
                 "currentVersion": "2.8.1",
                 "isSingleVersion": true,
                 "fixedVersion": "2.8.1"
               },
               {
                 "depType": "devDependencies",
                 "depName": "prettier-plugin-astro",
                 "currentValue": "0.7.1",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "0.7.1",
                 "depIndex": 52,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "0.7.2",
                     "newValue": "0.7.2",
                     "releaseTimestamp": "2023-01-04T14:48:04.415Z",
                     "newMajor": 0,
                     "newMinor": 7,
                     "updateType": "patch",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/withastro/prettier-plugin-astro",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "0.7.1",
                 "isSingleVersion": true,
                 "fixedVersion": "0.7.1"
               },
               {
                 "depType": "devDependencies",
                 "depName": "rimraf",
                 "currentValue": "3.0.2",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "3.0.2",
                 "depIndex": 53,
                 "updates": [
                   {
                     "bucket": "major",
                     "newVersion": "4.0.4",
                     "newValue": "4.0.4",
                     "releaseTimestamp": "2023-01-13T01:41:09.677Z",
                     "newMajor": 4,
                     "newMinor": 0,
                     "updateType": "major",
                     "branchName": "renovate/major-npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/isaacs/rimraf",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "3.0.2",
                 "isSingleVersion": true,
                 "fixedVersion": "3.0.2"
               },
               {
                 "depType": "devDependencies",
                 "depName": "tailwindcss",
                 "currentValue": "3.2.4",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "3.2.4",
                 "depIndex": 54,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/tailwindlabs/tailwindcss",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://tailwindcss.com",
                 "currentVersion": "3.2.4",
                 "fixedVersion": "3.2.4"
               },
               {
                 "depType": "devDependencies",
                 "depName": "textlint",
                 "currentValue": "12.4.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "12.4.0",
                 "depIndex": 55,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "12.5.1",
                     "newValue": "12.5.1",
                     "releaseTimestamp": "2023-01-04T11:51:49.604Z",
                     "newMajor": 12,
                     "newMinor": 5,
                     "updateType": "minor",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/textlint/textlint",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "12.4.0",
                 "isSingleVersion": true,
                 "fixedVersion": "12.4.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "textlint-filter-rule-comments",
                 "currentValue": "1.2.2",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "1.2.2",
                 "depIndex": 56,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/textlint/textlint-filter-rule-comments",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "1.2.2",
                 "fixedVersion": "1.2.2"
               },
               {
                 "depType": "devDependencies",
                 "depName": "textlint-rule-preset-ja-spacing",
                 "currentValue": "2.2.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "2.2.0",
                 "depIndex": 57,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/textlint-ja/textlint-rule-preset-ja-spacing",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "2.2.0",
                 "fixedVersion": "2.2.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "textlint-rule-preset-ja-technical-writing",
                 "currentValue": "7.0.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "7.0.0",
                 "depIndex": 58,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "7.0.0",
                 "fixedVersion": "7.0.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "textlint-rule-spellcheck-tech-word",
                 "currentValue": "5.0.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "5.0.0",
                 "depIndex": 59,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/azu/textlint-rule-spellcheck-tech-word",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "5.0.0",
                 "fixedVersion": "5.0.0"
               }
             ],
             "packageJsonName": "korosuke613-homepage",
             "packageFileVersion": "1.0.0",
             "npmrc": "***********",
             "npmLock": "package-lock.json",
             "managerData": {"yarnZeroInstall": false, "hasPackageManager": false},
             "skipInstalls": true,
             "constraints": {"npm": "<9"},
             "lockFiles": ["package-lock.json"]
           },
           {
             "packageFile": "tools/package.json",
             "deps": [
               {
                 "depType": "dependencies",
                 "depName": "axios",
                 "currentValue": "^1.0.0",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "1.1.3",
                 "depIndex": 0,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/axios/axios",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://axios-http.com",
                 "currentVersion": "1.1.3",
                 "fixedVersion": "1.1.3"
               },
               {
                 "depType": "dependencies",
                 "depName": "fast-xml-parser",
                 "currentValue": "^4.0.9",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "4.0.9",
                 "depIndex": 1,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/NaturalIntelligence/fast-xml-parser",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "4.0.9",
                 "fixedVersion": "4.0.9"
               },
               {
                 "depType": "dependencies",
                 "depName": "jsdom",
                 "currentValue": "^20.0.0",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "20.0.0",
                 "depIndex": 2,
                 "updates": [
                   {
                     "bucket": "major",
                     "newVersion": "21.0.0",
                     "newValue": "^21.0.0",
                     "releaseTimestamp": "2023-01-07T14:04:09.668Z",
                     "newMajor": 21,
                     "newMinor": 0,
                     "updateType": "major",
                     "isRange": true,
                     "branchName": "renovate/major-npm-tools"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/jsdom/jsdom",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "20.0.0",
                 "isSingleVersion": false,
                 "fixedVersion": "20.0.0"
               },
               {
                 "depType": "dependencies",
                 "depName": "rss-parser",
                 "currentValue": "^3.12.0",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "3.12.0",
                 "depIndex": 3,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/bobby-brennan/rss-parser",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "3.12.0",
                 "fixedVersion": "3.12.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@cybozu/eslint-config",
                 "currentValue": "18.0.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "18.0.0",
                 "depIndex": 4,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/cybozu/eslint-config",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "18.0.0",
                 "fixedVersion": "18.0.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@types/jsdom",
                 "currentValue": "20.0.1",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "20.0.1",
                 "depIndex": 5,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/DefinitelyTyped/DefinitelyTyped",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "types/jsdom",
                 "homepage": "https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jsdom",
                 "currentVersion": "20.0.1",
                 "fixedVersion": "20.0.1"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint",
                 "currentValue": "8.31.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "8.31.0",
                 "depIndex": 6,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/eslint/eslint",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://eslint.org",
                 "currentVersion": "8.31.0",
                 "fixedVersion": "8.31.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "prettier",
                 "currentValue": "2.8.1",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "2.8.1",
                 "depIndex": 7,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "2.8.2",
                     "newValue": "2.8.2",
                     "releaseTimestamp": "2023-01-07T11:19:41.659Z",
                     "newMajor": 2,
                     "newMinor": 8,
                     "updateType": "patch",
                     "branchName": "renovate/npm-tools"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/prettier/prettier",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://prettier.io",
                 "currentVersion": "2.8.1",
                 "isSingleVersion": true,
                 "fixedVersion": "2.8.1"
               },
               {
                 "depType": "devDependencies",
                 "depName": "ts-node",
                 "currentValue": "10.9.1",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "10.9.1",
                 "depIndex": 8,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/TypeStrong/ts-node",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://typestrong.org/ts-node",
                 "currentVersion": "10.9.1",
                 "fixedVersion": "10.9.1"
               },
               {
                 "depType": "devDependencies",
                 "depName": "typescript",
                 "currentValue": "4.9.4",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "4.9.4",
                 "depIndex": 9,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/Microsoft/TypeScript",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://www.typescriptlang.org/",
                 "currentVersion": "4.9.4",
                 "fixedVersion": "4.9.4"
               }
             ],
             "packageJsonName": "tools",
             "packageFileVersion": "1.0.0",
             "npmLock": "tools/package-lock.json",
             "managerData": {"yarnZeroInstall": false, "hasPackageManager": false},
             "skipInstalls": true,
             "constraints": {"npm": "<9"},
             "lockFiles": ["tools/package-lock.json"]
           }
         ]
       }
```

## `DEBUG: detectSemanticCommits() (repository=korosuke613/homepage-2nd)`

[#L2165](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2165)

## `DEBUG: semanticCommits: returning "enabled" from cache (repository=korosuke613/homepage-2nd)`

[#L2166](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2166)

## `DEBUG: processRepo() (repository=korosuke613/homepage-2nd)`

[#L2167](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2167)

## `DEBUG: Processing 7 branches: renovate/commitlint-monorepo, renovate/major-npm-root, renovate/major-npm-tools, renovate/node-18.x, renovate/npm-root, renovate/npm-tools, renovate/typescript-eslint-monorepo (repository=korosuke613/homepage-2nd)`

[#L2168](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2168)

## `DEBUG: Calculating hourly PRs remaining (repository=korosuke613/homepage-2nd)`

[#L2169](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2169)

## `DEBUG: getPrList success (repository=korosuke613/homepage-2nd)`

[#L2170](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2170)

```json
       "pullsTotal": 17,
       "requestsTotal": 1,
       "apiQuotaAffected": true
```

## `DEBUG: currentHourStart=2023-01-13T05:00:00.000+00:00 (repository=korosuke613/homepage-2nd)`

[#L2174](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2174)

## `DEBUG: PR hourly limit remaining: 2 (repository=korosuke613/homepage-2nd)`

[#L2175](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2175)

## `DEBUG: Calculating prConcurrentLimit (10) (repository=korosuke613/homepage-2nd)`

[#L2176](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2176)

## `DEBUG: getBranchPr(renovate/npm-tools) (repository=korosuke613/homepage-2nd)`

[#L2177](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2177)

## `DEBUG: findPr(renovate/npm-tools, undefined, open) (repository=korosuke613/homepage-2nd)`

[#L2178](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2178)

## `DEBUG: Found PR #107 (repository=korosuke613/homepage-2nd)`

[#L2179](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2179)

## `DEBUG: 4 PRs are currently open (repository=korosuke613/homepage-2nd)`

[#L2198](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2198)

## `DEBUG: PR concurrent limit remaining: 6 (repository=korosuke613/homepage-2nd)`

[#L2199](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2199)

## `DEBUG: Calculated maximum PRs remaining this run: 2 (repository=korosuke613/homepage-2nd)`

[#L2200](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2200)

## `DEBUG: PullRequests limit = 2 (repository=korosuke613/homepage-2nd)`

[#L2201](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2201)

## `DEBUG: Calculating hourly PRs remaining (repository=korosuke613/homepage-2nd)`

[#L2202](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2202)

## `DEBUG: currentHourStart=2023-01-13T05:00:00.000+00:00 (repository=korosuke613/homepage-2nd)`

[#L2203](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2203)

## `DEBUG: PR hourly limit remaining: 2 (repository=korosuke613/homepage-2nd)`

[#L2204](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2204)

## `DEBUG: Calculating branchConcurrentLimit (10) (repository=korosuke613/homepage-2nd)`
