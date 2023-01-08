# Foodie
Foodie è un servizio per la gestione delle merende!<br>
La roadmap è disponibile [qui](https://trello.com/b/NAWL0RyX/foodie)

![Project](https://img.shields.io/badge/Project-School-brightgreen)
![License](https://img.shields.io/github/license/Pippopad/Foodie)

## Setup
Come primo passaggio bisogna installare le librerie necessarie con il seguente comando:
```shell
$ yarn install
```

Poi si devono impostare le variabili di sistema necessarie. Per poterlo fare basta creare un file con nome `.env` e metterci il seguente codice modificandone i valori:
```
PGHOST = <indirizzo_db>
PGPORT = <porta_db>
PGUSER = <username_db>
PGPASSWORD = <password_db>
PGDATABASE = <nome_db>
```

Nel caso si desideri usare il database (container docker) compreso nel repository, i valori da inserire sono i seguenti:
```
PGHOST = 127.0.0.1
PGPORT = 5432
PGUSER = postgres
PGPASSWORD = postgres
PGDATABASE = main
```

## Run
Per poter far partire Foodie basterà eseguire il seguente comando:
```shell
$ yarn start
```