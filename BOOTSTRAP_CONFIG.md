# Configuration Bootstrap

## Installation effectuée

Bootstrap 5.3.8 a été installé et configuré dans ce projet Angular.

## Ce qui a été fait

1. ✅ **Désinstallation de Tailwind CSS**
   - Suppression de `tailwindcss`, `@tailwindcss/postcss`, `autoprefixer`, et `postcss`
   - Suppression du fichier `tailwind.config.js`

2. ✅ **Installation de Bootstrap**
   - Bootstrap 5.3.8 (déjà présent)
   - Bootstrap Icons 1.13.1 (déjà présent)

3. ✅ **Configuration**
   - `src/styles.css` : Import de Bootstrap CSS et Bootstrap Icons
   - `angular.json` : Ajout du script Bootstrap bundle (inclut Popper.js)

## Utilisation

### CSS Bootstrap
Les classes Bootstrap sont maintenant disponibles dans tous vos composants :

```html
<button class="btn btn-primary">Bouton Bootstrap</button>
<div class="container">
  <div class="row">
    <div class="col-md-6">Colonne 1</div>
    <div class="col-md-6">Colonne 2</div>
  </div>
</div>
```

### Icônes Bootstrap
Utilisez les icônes Bootstrap Icons :

```html
<i class="bi bi-heart-fill"></i>
<i class="bi bi-star"></i>
```

### Composants JavaScript
Les composants JavaScript de Bootstrap (modals, dropdowns, tooltips, etc.) sont disponibles :

```typescript
// Dans votre composant TypeScript
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

declare var bootstrap: any;

@Component({
  // ...
})
export class MyComponent implements AfterViewInit {
  @ViewChild('myModal') myModal!: ElementRef;

  ngAfterViewInit() {
    const modal = new bootstrap.Modal(this.myModal.nativeElement);
    modal.show();
  }
}
```

## Ressources

- [Documentation Bootstrap 5](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Exemples Bootstrap](https://getbootstrap.com/docs/5.3/examples/)

## Note sur la taille du bundle

Le build affiche un avertissement concernant la taille du bundle (598 kB > 500 kB). 
C'est normal avec Bootstrap. Vous pouvez :
- Augmenter la limite dans `angular.json` si nécessaire
- Ou importer uniquement les composants Bootstrap dont vous avez besoin (configuration avancée)

