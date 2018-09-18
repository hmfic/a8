# A8

Make sure you have NPM installed and updated:
```npm install -g npm``` to update

Angular 6 (et al) installation notes

### one time stuff …
get the extension for sublime…
    ```git clone --depth 1 https://github.com/Microsoft/TypeScript-Sublime-Plugin.git TypeScript```
```brew install node```
node -v and npm -v should work

```sudo npm install -g @angular/cli```
```sudo chown -R $USER:$(id -gn $USER) /Users/bubba/.config```

create a new project…
cd to your directory
```ng new test-app (add -- routing to create a routing file)```
```ng serve```


create service …
```cd test-app/src/app```
create a directory called services
```ng g service services/data```
add ```import {DataService} from “./services/data.service’``` to app.module.ts…doesn’t do it automatically
add DataService to provider in app.module.ts … doesn’t do it automatically

add service to each component that needs it … 
   e.g. add ```“import {DataService} from ‘../../services/data.service’``` to user.component.ts
then inject dependency into the constructor in the user.component.ts file … 
   e.g. ’constructor(private dataService:DataService) { ‘
add your service code after the constructor and don’t forget to return the value

### create component …
create directory called components
```ng g component components/user``` (these create the correct entry in the app.module.ts for you)
```ng g component components/about```
NOTE: if you don’t like the components subdirectory, consider running directly from src/app

to add the component to the main html, edit app.component.html to add component selector
(selector is found in user.component.ts file):
```<app-user></app-user>```

### to add a new module (http, etc)
go to the app.module.ts and add a new import
  e.g. ```import { HttpModule } from “@angular/http’```
then add to the imports in the app.module.ts file
  e.g. imports: […,..,HttpModule]
go to each service that needs the module and import
  e.g. import {Http} from ‘@angular/http’
and for each service, inject the service as a dependency in the constructor
  e.g. constructor(public http:Http) { …


### important directory/files
src/app/app.module.ts - MAIN: imports, components and services/providers plus bootstrap
src/app/app.component.ts - 
src/app/app.component.html - main html
src/app/components/<component>.component.html - component html

example:
```ng new a6 --routing``` or 
```ng new a8 --style=scss --routing```
```cd a6```
```ng g component users```
```ng g component details```

```ng g service data```

### GIT
```git init```
```git add .```
```git commit -m “ “```
```git remote add origin https://github.com/hmfic/a6.git```
```git push -u origin master```

### Update:
```npm outdated```
```npm install tslint@latest --save``` (etc)
```npm install typescript@'>=2.7.2 <2.10'```

( Please run the following command to install a compatible version of TypeScript.
    npm install typescript@'>=2.7.2 <2.10' )

### MATERIAL
```npm install --save @angular/material @angular/cdk @angular/animations```
```ng add @angular/material```

```npm install ngx-cookie-service --save```

### maps
```npm install @agm/core --save```

then add to app.modules:
```import { AgmCoreModule } from '@agm/core';```

### D3
```npm install d3```
```npm i @types/d3 @types/socket.io-client -D``` this is optional in case you want sockets
```import * as d3 from "d3";``` iin your app.config.ts
```npm install --save-dev @types/d3```

or 
```npm install @types/d3-array --save```

### D3 tips

```npm install ngx-d3-tooltip```

need typiing? ```npm install --save-dev @types/node```

then add to app modules

don't forget encapsulation in d3 modules to avoid rewriting the styles
