# GitHub User Search

[![CI](https://github.com/DEV-Pierre-ROMAN/tehnical-test-fulll/actions/workflows/ci.yml/badge.svg)](https://github.com/DEV-Pierre-ROMAN/tehnical-test-fulll/actions/workflows/ci.yml)

Application React permettant de rechercher et de gerer des utilisateurs GitHub.

## Approche et choix techniques

### TDD et separation logique metier / affichage

Le developpement a demarre par une approche TDD sur le code metier (hooks). L'objectif etait de separer clairement la logique metier de l'affichage : les hooks contiennent toute l'intelligence applicative et sont testes unitairement de maniere isolee, tandis que les composants React ne sont responsables que du rendu.

### Integration continue

Une CI a ete mise en place pour executer les tests automatiquement a chaque push, garantissant la non-regression du code metier tout au long du developpement.

### Hooks

- **`useFetch`** : Hook generique de data fetching, palliatif a `useQuery` de TanStack Query dans un contexte sans librairie externe. Il integre un systeme de cache pour eviter les requetes redondantes et utilise un `AbortController` pour annuler automatiquement les requetes en cours lorsqu'une nouvelle est declenchee, conformement aux bonnes pratiques modernes de fetching.

- **`useUserSearch`** : Specialisation de `useFetch` dediee a la recherche d'utilisateurs GitHub. Ce hook fait le pont avec un error handler specifique qui gere les erreurs propres a l'API GitHub (rate limiting, reponses inattendues, etc.). Il transforme egalement les reponses brutes de l'API en objets metier `User` via un mapper, decoupalant ainsi le modele externe du modele interne. Le hook est concu pour etre extensible grace a un systeme d'options, pensee pour accueillir de futures fonctionnalites comme la pagination.

- **`useUserList`** : Gestion de la liste d'utilisateurs en local (ajout, suppression, duplication).

- **`useSelection`** : Gestion de la selection d'utilisateurs parmi la liste. Utilise un `Set` pour gerer nativement les doublons d'ID sans logique supplementaire.

- **`useUserManager`** : Hook de composition qui lie `useUserList` et `useSelection` en une interface unifiee. Il gere aussi la synchronisation entre la source externe (resultats de recherche) et l'etat local, en suivant la methode preconisee par React : mise a jour du state via une condition dans le render plutot qu'un `useEffect`, evitant ainsi un cycle de rendu supplementaire inutile.

- **`useDebounce`** : Debounce classique applique a la saisie de recherche, permettant de ne declencher la requete qu'apres un delai d'inactivite. Cela evite de solliciter l'API a chaque frappe et offre une experience fluide sans necessite de bouton de validation.

- **`useTheme`** : Gestion du mode light/dark. Detecte la preference systeme, persiste le choix dans le `localStorage`, et applique le theme via un attribut `data-theme` sur le DOM.

- **`useDelayedUnmount`** : Retarde le demontage d'un composant le temps de jouer son animation de sortie. Permet d'avoir des transitions fluides (fade out, slide up) avant que React ne retire l'element du DOM.

### Contextes

N'ayant pas acces a des librairies de state management comme Zustand, la gestion d'etat partagee repose sur l'API native `useContext` de React.

- **`SelectionContext`** : Fournit les fonctions et l'etat lies a la selection d'utilisateurs (toggle, verification, nettoyage) a l'ensemble de l'arbre de composants, evitant ainsi le props drilling.

- **`EditModeContext`** : Contexte separe gerant l'etat du mode edition (on/off). Il est volontairement decouple du `SelectionContext` car le mode edition pourrait a terme concerner d'autres fonctionnalites que la seule selection d'utilisateurs.

### Styles et composants UI

A defaut de pouvoir utiliser Tailwind et shadcn/ui, le styling repose sur des **CSS Modules** : une approche legere et bien adaptee a la taille du projet, qui garantit le scoping des styles et une separation claire par composant.

Une petite bibliotheque de **composants UI reutilisables** (`Button`, `CheckBox`, `Toggle`, `Typography`, `Icon`) a ete creee en s'inspirant de shadcn/ui et Radix UI. Ces composants ne contiennent aucune logique metier et exposent un systeme de **variants** precodees, permettant une utilisation declarative et coherente a travers l'application.

Les icones proviennent de **Lucide Icons**, importees en tant que fichiers SVG et rendues inline via des imports Vite `?raw`, ce qui permet de les styliser nativement avec `currentColor` et d'assurer leur compatibilite avec le mode sombre.
