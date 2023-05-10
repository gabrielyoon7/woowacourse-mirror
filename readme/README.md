# 우아한테크코스 미션 미러링 레포

원본 최종 미션 커밋 이력을 그대로 이식 후, 별도의 폴더로 정리하는 방식으로 기록


### 미러링 방식

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
