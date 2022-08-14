
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
## Screenshots
<details>
  <summary>On Laptop screen</summary>

<br>
Home page
<br><br>
<img src="https://user-images.githubusercontent.com/42782646/184549843-f70a390b-3597-4515-94f0-9b8b458caa22.png" width="600">

<br>
Login View
<br><br>
<img src="https://user-images.githubusercontent.com/42782646/184549846-2799cd93-f24d-4bfa-a3a9-bd00c1ba3827.png" width="600">

<br>
Sign up view
<br><br>
<img src="https://user-images.githubusercontent.com/42782646/184549850-27752ad9-900b-49d9-b733-ab1bb79ed15a.png" width="600">

<br>
All epic view
<br><br>
<img src="https://user-images.githubusercontent.com/42782646/184549851-7876512b-3574-4135-a4f1-b8f63121f364.png" width="600">

<br>
Single epic view
<br><br>
<img src="https://user-images.githubusercontent.com/42782646/184549857-8fdc11bb-e8f0-4f73-96a7-a64995c04f00.png" width="600">
  
</details>

<br>

<details>
  <summary>On Mobile screen</summary>

<br>
Issue Edit view
<br><br>
<img src="https://user-images.githubusercontent.com/42782646/184549919-26131933-ca46-4328-b30e-930a0ecaab9a.png" width="300">

<br>
Single Issue View
<br><br>
<img src="https://user-images.githubusercontent.com/42782646/184549923-29fbab1d-6ae9-4bc9-9838-3d0234395d15.png" width="300">

<br>
Single Epic View. Shows all issues under it. Has floating button to add new issues under this epic. 
<br><br>
<img src="https://user-images.githubusercontent.com/42782646/184549924-7640e778-8ab1-4507-8fda-1f0b79c881d5.png" width="300">

<br>
Progressive Navbar
<br><br>
<img src="https://user-images.githubusercontent.com/42782646/184549926-383e00d1-d318-4cad-980f-1e5831836a24.png" width="300">

<br>
Logging out. Redirects to home page.
<br><br>
<img src="https://user-images.githubusercontent.com/42782646/184549927-650dda3e-9a4d-41eb-ae26-a01ade09728d.png" width="300">

<br>
Home page
<br><br>
<img src="https://user-images.githubusercontent.com/42782646/184549929-7733d5b9-dee1-4efc-846c-7b04c6f7c46c.png" width="300">

<br>
Login View
<br><br>
<img src="https://user-images.githubusercontent.com/42782646/184549933-9500b9ad-f634-4492-a9aa-a7d830bc3e8c.png" width="300">

<br>
All epics view. Has floating button to create epics.
<br><br>
<img src="https://user-images.githubusercontent.com/42782646/184549934-9648c499-de81-4d3e-a8ae-aa1c7c56d903.png" width="300">

<br>
All issues view. Has floating button to create issues.
<br><br>
<img src="https://user-images.githubusercontent.com/42782646/184551899-4dfd9e07-4903-4098-bb10-b23b0347492a.png" width="300">

  
</details>
