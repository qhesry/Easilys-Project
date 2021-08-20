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
	npm install

Puis dans le dossier clientServerMock :

	cd clientServerMock
	npm install
	
Ensuite, nous allons définir les variables de notre environnement. Pour cela, il y a 4 fichiers potentiels qu'il est nécessaire de modifier.

 * Dans le dossier clientServerMock, fichier server.js : On peut modifier le port d'écoute du serveur via la variable "Port". Par défaut, le port est 8080.
 * Dans le dossier server : 
	 * fichier utils.js : On peut modifier le port d'écoute du serveur via la variable "Port". Par défaut, le port est 3000.
	 * fichier database.config.json : On peut modifier tous les paramètres permettant la connexion a la base postgreSQL.
* Dans le dossier js, fichier socketFunctions.js : On peut modifier le port sur lequel nous allons faire nos requêtes (ce port doit être le même que dans le fichier utils.js précédemment cité). Par défaut, le port est 3000.

Il ne manque plus qu'a utiliser les scripts SQL situé dans le dossier SQL afin de pouvoir créer notre base de donnée avec toutes les tables nécessaires a l'application.

Une fois que tout le nécessaire a été fait, nous pouvons lancer l'application.
On démarre le service de la base de donnée si requis via la commande suivante :

	sudo service postgresql start

On démarre ensuite le server back en se mettant a la racine du projet via la commande suivante : 

	node server/server.js

On peut ensuite démarrer le serveur mock de la même manière via la commande : 
	
	node clientServerMock/server.js

Il nous suffit ensuite d'aller sur l'url : 

	http://localhost: + le port défini dans le fichier server.js du dossier clientServerMock

## Utilisation
L'application se présente de la façon suivante :

![Application](https://i2.paste.pics/DKX38.png)
* Une barre d'ajout de partie. On peut ajouter une partie grâce au bouton "Add"
* Un ecran d'affichage des parties en cours ou terminés.
* Un chat ou l'on peut se connecter pour discuter avec les autres utilisateurs. La connexion ne necessite que de rentrer un pseudo.

Lorsque l'on se connecte au chat, l'interface se modifie pour apparaitre comme tel : 

![ImageTchat](https://i2.paste.pics/DKX46.png)

On peut ainsi : 
* Lire les messages envoyés sur le tchat dans l'onglet "Tchat".
* Voir les utilisateurs connectés dans l'onglet "User Connected".
* Se deconnecter.
* Envoyer des messages dans le tchat.

Si l'on ajoute une partie, l'interface l'ajoute a l'ecran d'affichage celle-ci. Cela apparait comme tel : 

![ImagePartie](https://i2.paste.pics/DKX9K.png)

* On peut terminer la partie en cliquant sur la checkbox. Celle-ci passera alors en rouge.
* On voit le nom de la partie. Ici : test.
* On peut supprimer la partie via le bouton "Remove".
