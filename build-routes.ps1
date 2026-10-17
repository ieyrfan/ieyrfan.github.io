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
  $routeUrl = "https://irfanrizal.my/$route/"
  $routeDocument = (Get-Content -Raw -LiteralPath $sourceIndex).
    Replace('<link rel="canonical" href="https://irfanrizal.my/">', "<link rel=`"canonical`" href=`"$routeUrl`">").
    Replace('<meta property="og:url" content="https://irfanrizal.my/">', "<meta property=`"og:url`" content=`"$routeUrl`">")
  $routeDocument = $routeDocument.TrimEnd("`r", "`n") + "`n"
  [System.IO.File]::WriteAllText(
    (Join-Path $routeDirectory 'index.html'),
    $routeDocument,
    [System.Text.UTF8Encoding]::new($false)
  )
}

Write-Output "Generated $($routes.Count) GitHub Pages routes from index.html."
