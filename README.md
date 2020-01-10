# Provice webhook to run command

## Required
- NodeJS
- Yarn
- PM2

## How to use

```
    yarn
    pm2 start --name run-service-webhook index.js
```

- Add command to run in data/commands. (per command per line)

- Use username, password in data/auth.json to authen webhook
