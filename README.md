
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
  
  ![Screenshot from 2022-08-14 21-04-08](https://user-images.githubusercontent.com/42782646/184549843-f70a390b-3597-4515-94f0-9b8b458caa22.png)
  
![Screenshot from 2022-08-14 21-04-44](https://user-images.githubusercontent.com/42782646/184549845-2ea2545a-e974-47e0-8cc2-e769fac13eb0.png)

![Screenshot from 2022-08-14 23-04-41](https://user-images.githubusercontent.com/42782646/184549846-2799cd93-f24d-4bfa-a3a9-bd00c1ba3827.png)

![Screenshot from 2022-08-14 23-05-04](https://user-images.githubusercontent.com/42782646/184549850-27752ad9-900b-49d9-b733-ab1bb79ed15a.png)

![Screenshot from 2022-08-14 23-05-45](https://user-images.githubusercontent.com/42782646/184549851-7876512b-3574-4135-a4f1-b8f63121f364.png)

![Screenshot from 2022-08-14 23-06-53](https://user-images.githubusercontent.com/42782646/184549857-8fdc11bb-e8f0-4f73-96a7-a64995c04f00.png)

  
</details>

<details>
  <summary>On Mobile screen</summary>
  
  
![Screen Shot 2022-08-14 at 23 35 37](https://user-images.githubusercontent.com/42782646/184549919-26131933-ca46-4328-b30e-930a0ecaab9a.png)

![Screen Shot 2022-08-14 at 23 36 06](https://user-images.githubusercontent.com/42782646/184549923-29fbab1d-6ae9-4bc9-9838-3d0234395d15.png)

![Screen Shot 2022-08-14 at 23 37 03](https://user-images.githubusercontent.com/42782646/184549924-7640e778-8ab1-4507-8fda-1f0b79c881d5.png)

![Screen Shot 2022-08-14 at 23 40 27](https://user-images.githubusercontent.com/42782646/184549926-383e00d1-d318-4cad-980f-1e5831836a24.png)

![Screen Shot 2022-08-14 at 23 40 50](https://user-images.githubusercontent.com/42782646/184549927-650dda3e-9a4d-41eb-ae26-a01ade09728d.png)

![Screen Shot 2022-08-14 at 23 40 58](https://user-images.githubusercontent.com/42782646/184549929-7733d5b9-dee1-4efc-846c-7b04c6f7c46c.png)

![Screen Shot 2022-08-14 at 23 42 37](https://user-images.githubusercontent.com/42782646/184549933-9500b9ad-f634-4492-a9aa-a7d830bc3e8c.png)

![Screen Shot 2022-08-14 at 23 42 58](https://user-images.githubusercontent.com/42782646/184549934-9648c499-de81-4d3e-a8ae-aa1c7c56d903.png)

  
</details>
