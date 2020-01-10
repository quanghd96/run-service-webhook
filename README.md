# Provice webhook to run command

## How to use

```
    docker run -d -v path/data:/app/data -p 3000:3000 --name restart_service -it quanghd96/run-service-webhook
```

- Add command to run in data/commands. (per command per line)

- Use username, password in data/auth.json to authen webhook