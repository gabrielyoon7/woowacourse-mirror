# 우아한테크코스 미션 미러링 레포 (우테코 기간 끝난 후 메인으로 이동 예정)

원본 최종 미션 커밋 이력을 그대로 이식 후, 별도의 폴더로 정리하는 방식으로 기록

## 프리코스
|   | 미션명 | 기간 | 저장소 | PR |
|---|---|---|---|---|
| 1 | 온보딩 | '22.10.26 ~ '22.11.01 | [백업](https://github.com/gabrielyoon7/woowacourse-mirror/tree/main/precourse/javascript-onboarding) | [PR](https://github.com/woowacourse-precourse/javascript-onboarding/pull/150) |
| 2 | 숫자 야구 | '22.11.02 ~ '22.11.08 | [백업](https://github.com/gabrielyoon7/woowacourse-mirror/tree/main/precourse/javascript-basball) | [PR](https://github.com/woowacourse-precourse/javascript-baseball/pull/6) |
| 3 | 로또 | '22.11.09 ~ '22.11.15 | [백업](https://github.com/gabrielyoon7/woowacourse-mirror/tree/main/precourse/javascript-lotto-precourse) | [PR](https://github.com/woowacourse-precourse/javascript-lotto/pull/27) |
| 4 | 다리 건너기 | '22.11.16 ~ '22.11.22 | [백업](https://github.com/gabrielyoon7/woowacourse-mirror/tree/main/precourse/javascript-bridge) | [PR](https://github.com/woowacourse-precourse/javascript-bridge/pull/124) |

- [[회고] 우아한테크코스 5기 프리코스 (FE)](https://leirbag.tistory.com/125)
- [우아한테크코스 5기 프리코스 (FE) 1차 합격!](https://leirbag.tistory.com/126)

## 프리코스(최종)
|   | 미션명 | 기간 | 저장소 | PR |
|---|---|---|---|---|
| 1 | 점심 메뉴 추천 | '22.12.17 | [백업](https://github.com/gabrielyoon7/woowacourse-mirror/tree/main/precourse/javascript-menu) | [PR](https://github.com/woowacourse-precourse/javascript-menu/pull/101) |

- [우아한테크코스 5기 (FE) 최종 코딩테스트 후기](https://leirbag.tistory.com/127)

---

## 레벨 1
|   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |

## 레벨 2
|   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |

---

## 미러링 방식

이름이 겹칠만한 파일이나 폴더를 생성하지 않고, 프로젝트 수신 이후에 옮겨 줄 백업용 폴더만을 생성한다.

```
git remote add <REPO_NAME> https://github.com/<USER_NAME>/<REPO_NAME>.git
```

```
git fetch <REPO_NAME> <BRANCH_NAME>
```

```
git merge <REPO_NAME>/<BRANCH_NAME> --allow-unrelated-histories
```

파일 수신 이후 폴더 및 파일들 원하는 위치(백업용 폴더)에 옮겨주기 (정리)

전체 커밋 및 푸쉬
