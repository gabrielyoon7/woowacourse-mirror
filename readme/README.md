# 우아한테크코스 미션 미러링 레포

원본 최종 미션 커밋 이력을 그대로 이식 후, 별도의 폴더로 정리하는 방식으로 기록


### 미러링 방식

```
git remote add 레포이름 https://github.com/gabrielyoon7/레포이름.git
```

```
git fetch 레포이름 step2
```

```
git merge 레포이름/step2 --allow-unrelated-histories
```

이후 폴더 및 파일들 원하는 위치에 옮겨주기 (정리)

다시 커밋 및 푸쉬
