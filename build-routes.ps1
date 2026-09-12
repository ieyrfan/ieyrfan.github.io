$ErrorActionPreference = 'Stop'

$siteRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$sourceIndex = Join-Path $siteRoot 'index.html'
$routes = @(
  'cloud',
  'about',
  'stack',
  'projects',
  'projects/funcloudsoc',
  'projects/pantalk',
  'projects/neuronote',
  'journey',
  'lab',
  'contact'
)

foreach ($route in $routes) {
  $routeDirectory = Join-Path $siteRoot $route
  New-Item -ItemType Directory -Path $routeDirectory -Force | Out-Null
  Copy-Item -LiteralPath $sourceIndex -Destination (Join-Path $routeDirectory 'index.html') -Force
}

Write-Output "Generated $($routes.Count) GitHub Pages routes from index.html."
