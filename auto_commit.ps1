# Script PowerShell pour générer 100 commits avec des messages en français et des dates spécifiques

# Chemin du projet
$projectPath = "C:\Users\safiy\Desktop\SmartLogiSdms-Front"

# Se déplacer dans le répertoire du projet
Set-Location -Path $projectPath

# Mise à jour des dates de début et de fin pour 2026
$startDate = Get-Date -Year 2026 -Month 1 -Day 19
$endDate = Get-Date -Year 2026 -Month 2 -Day 3

# Calculer l'intervalle de temps entre les commits
$daysBetween = ($endDate - $startDate).Days
$interval = [math]::Ceiling($daysBetween / 100)

# Messages de commit en français
$commitMessages = @(
    "Ajout de nouvelles fonctionnalités",
    "Correction de bugs",
    "Amélioration des performances",
    "Mise à jour de la documentation",
    "Refactorisation du code",
    "Optimisation des requêtes API",
    "Ajout de tests unitaires",
    "Mise à jour des dépendances",
    "Amélioration de l'interface utilisateur",
    "Correction des problèmes de compatibilité"
)

# Initialiser la date de commit
$currentDate = $startDate

# Boucle pour créer 100 commits
for ($i = 1; $i -le 100; $i++) {
    # Sélectionner un message de commit aléatoire
    $message = $commitMessages | Get-Random

    # Ajouter tous les fichiers modifiés et non suivis
    git add -A

    # Définir la date du commit
    $commitDate = $currentDate.AddDays($interval * ($i - 1))
    $env:GIT_COMMITTER_DATE = $commitDate.ToString("yyyy-MM-ddTHH:mm:ss")
    $env:GIT_AUTHOR_DATE = $commitDate.ToString("yyyy-MM-ddTHH:mm:ss")

    # Créer le commit
    git commit -m "$message"
}

# Réinitialiser les variables d'environnement
Remove-Item Env:\GIT_COMMITTER_DATE
Remove-Item Env:\GIT_AUTHOR_DATE

Write-Host "100 commits ont été créés avec succès entre $startDate et $endDate."
