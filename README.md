# default

## Project setup

```
nvm list
nvm proxy 10.0.24.52:3128
nvm install lts
nvm use lts

npm config rm cafile
npm config set proxy http://10.0.24.52:3128
npm config set https-proxy http://10.0.24.52:3128
npm config set strict-ssl false

npm install

git config --global http.proxy http://10.0.24.52:3128
git config --global user.name 'smirka'
git config --global user.email 'smirka.n.u@gmail.com'

npm run dev
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).
