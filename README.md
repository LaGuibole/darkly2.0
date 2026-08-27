# Darkly 2.0 
## Kill chain

### 1 - Unanthenticated information disclore (A01)

**[README.md](./src/A01_BrokenAccessControl/A01_Breach1/README.md)**  
Point de depart : Aucun compte necessaire  

Parcours de decouverte : `Forum -> Wil's post -> View Profile -> Flag`.  

![image](./utils/A01/assets/flag1.png)  

Flag : `FLAG{1d0r_ur_pr0f1l3_1s_m1n3}`  

### 2 - Account takeover

#### 2.1 - Option 1 (sans flag)
**[README.md](./src/BruteForce/README.md)**  
Point de depart : Connaitre le domaine d'une addresse mail user  

- On peut avoir cette info ici : `http://localhost:4942/newsletter`

![image](./utils/A07/assets/newsletter.png)  

- BruteForce le mot de passe de John Doe qui se vante d'un faible mdp sur le forum  

![image](./utils/bruteforce/assets/bruteforce_result.png)

```
email = jdoe@student.42.tech
password = abc123
```

#### 2.2 - Option 2 (avec flag)
**[README.md](./src/A07_Identification_and_Authentication_Failures/A07_Breach1/README.md)**  
Point de depart : Connaitre le domaine d'une addresse mail user. Attaquer Benjamin, c'est cet user qui donne le flag. 

![image](./utils/A07/assets/benjamin.png)  

Flag : `FLAG{r3s3t_t0k3n_w4s_just_md5_lol}`
