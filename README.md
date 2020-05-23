# Coding Blocks IDE  
Coding Blocks IDE is an online IDE which supports compilation of multiple programming languages. 

## Deployment

[![Netlify](https://www.netlify.com/img/global/badges/netlify-color-accent.svg)](https://app.netlify.com/sites/cb-ide)  
Commits to master and PRs are automatically built and deployed by Netlify

![image](https://user-images.githubusercontent.com/22571395/40135873-ffe73618-5963-11e8-85db-01c103688f4a.png)

## Table of Contents
- [Build Setup](#build-setup)
- [Features](#features)
- [Functions](#functions)
- [API](#api)
  
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Features
This responsive online code editor and compiler have the following features.

|Feature|Details|
|-------|-------|
|**Multiple Language Support**|Java, C++, C, NodeJS, Python, C#, Ruby, Rust, GO, Java, Kotlin, Javascript.|
|**Upload Code**|Code can be uploaded from local system.|
|**Download Code**|Code can be downloaded with the name specified by the user.|
|**Custom Input**|A custom input box available for the user where user can enter inputs required by the program to run.|
|**Import Input file**|User can import input file required by the program from local system.|
|**Download Output**|User can download or copy output of the program.|
|**FullScreen Mode**|Editor can go fullscreen.|
|**Toggle View**|User can toggle dockside view of input-output box.|
|**Save and Auto Save**|Code and editor settings gets auto-saved after every 10 seconds to prevent loss of code on closing the window accidentally. User can also save the code manually by clicking the save button.|
|**Share Code**|User can also share the code .|
|**Themes**|There are 3 editor themes available to choose from.|
|**Fonts**|7 different fonts for the editor.|
|**Font Size**|User can also set font size for the editor.|


## Functions
|Button|Function|
|------|--------|
|**RUN**|Use the button to compile the code.|
|**INPUT**|Use to toggle custom input-ouput box.|
|**SAVE**| Manually save all the content in localStorage.|
|**UPLOAD**|Use to button and choose the file from local system to upload.|
|**DOWNLOAD**|Use the button to download the code in the editor into a file.|
|**VIEW**|Use the button to change editor settings and show keyboard shortcuts.|
|**Reset Defaults**| Reset all the editor settings.|
|**SHARE**|Use the button to share code.|
|**LOGIN**|Use the button to log into your account and view saved codes.|


## API 
This hits the Coding Blocks Judge API, which you can find documented here

<https://codingblocks.com/judge-blocks-docs/>

