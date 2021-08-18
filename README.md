# Easilys-Project

## Architecture
### clientServerMock
 * contient le necessaire pour simuler la présence de la page HTML sur un serveur distant avec un accès par URL.
### css
* contient la fiche de style de l'application.
### js
* contient les fichiers javascript nécessaires au fonctionnement de l'application.
### server
* contient les fichiers permettant le fonctionnement du serveur back de l'application.*
### SQL
* contient le fichier nécessaire a l'import de la base.
### ui
* contient le fichier ui de la page HTML ainsi qu'un dossier contenant les images utilisés.
## Fonctionnement

/!\ On considère comme prérequis les éléments suivant :
* Système Linux (ou Windows avec le WSL)
* Node.js est installé
* Une base de donnée postgreSQL

Pour commencer a utilisé l'application, il va falloir installer les dépendances nodeJS dans le fichier server via les commandes :

    cd server
    npm init

Ensuite, nous allons définir les variables de notre environnement. Pour cela, il y a 4 fichiers potentiels qu'il est nécessaire de modifier.

 * Dans le dossier clientServerMock, fichier server.js : On peut modifier le port d'écoute du serveur via la variable "Port".
 * Dans le dossier server : 
	 * fichier utils.js : On peut modifier le port d'écoute du serveur via la variable "Port".
	 * fichier database.config.json : On peut modifier tous les paramètres permettant la connexion a la base postgreSQL.
- Dans le dossier js, fichier socketFunctions.js : On peut modifier le port sur lequel nous allons faire nos requêtes (ce port doit être le même que dans le fichier utils.js précédemment cité).

Il ne manque plus qu'a utiliser les scripts SQL situé dans le dossier SQL afin de pouvoir créer notre base de donnée avec toutes les tables nécessaires a l'application.
## Utilisation
![Application](https://pasteboard.co/KgvuqBb.png)
