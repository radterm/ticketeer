
## Description

A simple issue tracker webapp written in Django, modelled as a no-frills version of Jira.
Epics are created to track particular features.
Every issue is created under some epic.

## How to run

### The backend server

First setup the virtualenv

```sh
make virenv
. virenv/bin/activate
```

Then run the server.

```sh
cd jira-min
python manage.py runserver <port>
```
If port is not specified, it runs on port 8000 by default.

### The frontend server

```sh
cd frontend
npm start
```
