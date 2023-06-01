# Simple Scrumboard With Tauri

Simple Scrumboard is a Desktop personal project application that designed to help you manage your project tasks and organize your work using the Scrum methodology. It built by using

* React JS.
* Supabase.
* Tauri.

From this code you can view how to
\* Make Simple React Js Application
\* Convert React Js Web Application to Desktop with Electron
\* Use Serverless Supabase Service

# How To Install

* Install Javascript Library

```
npm install
```

* setting .env

```
cp .env.example .env
```

* Create Tables on Supabase

Boards
\|\-\-\- id bigint
\|\-\-\- name text
\|\-\-\- created\_at timestamp
\|\-\-\- updated\_at timestamp

Boards
\|\-\-\- id bigint
\|\-\-\- title text
\|\-\-\- description text
\|\-\-\- color text
\|\-\-\- board\_id text
\|\-\-\- created\_at timestamp
\|\-\-\- updated\_at
\|\-\-\- user\_id

* run react app

```
npm run dev
```

* run tauri

```
npm run tauri dev
```

* build tauri to windows

```
npm run tauri build
```