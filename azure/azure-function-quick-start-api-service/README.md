# azure-function-quick-start-api-service

This is a sample for quick start a API development based on Azure Function.
Azure Function is a easy-to-use service, however, as a developer you should also know the constraints such as `cold start` and consider `pricing` as well.

# how-to
follow the commands below to run the sample:
```shell
# noted that your node version should align to your Azure Function's configuration, in this case, you should use `14.x`
npm i
npm run build
npm run start
# once it start, you should be capable to access `localhost:7071`
# you can access the api at `localhost:7071/api/service/{operation:alpha}
# operation can be specify such as create, retrieve, delete, or update.
```
