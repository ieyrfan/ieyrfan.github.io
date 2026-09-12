$ErrorActionPreference = 'Stop'

$siteRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$sourceIndex = Join-Path $siteRoot 'index.html'
$routes = @(
  'cloud',
  'about',
  'experience',
  'projects',
  'projects/pantalk',
  'projects/threat-nexus',
  'projects/omniverse',
  'projects/cspm',
  'projects/data-governance',
  'projects/aegis',
  'projects/niyyah',
  'projects/smartchef',
  'projects/funtechpay',
  'stack',
  'security',
  'journey',
  'certifications',
  'lab',
  'contact'
)

foreach ($route in $routes) {
  $routeDirectory = Join-Path $siteRoot $route
  New-Item -ItemType Directory -Path $routeDirectory -Force | Out-Null
  Copy-Item -LiteralPath $sourceIndex -Destination (Join-Path $routeDirectory 'index.html') -Force
}

Write-Output "Generated $($routes.Count) GitHub Pages routes from index.html."
