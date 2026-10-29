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

$metadata = @{
  'cloud' = @{ Title = 'Cloud Hub | Muhammad Irfan Bin Rizal'; Description = "Explore Muhammad Irfan's projects, experience, technology, certifications and cloud security focus." }
  'about' = @{ Title = 'About Muhammad Irfan Bin Rizal | Cloud Computing'; Description = 'About Muhammad Irfan bin Rizal, a Cloud Computing & Application student at UTeM.' }
  'experience' = @{ Title = 'Professional Experience | Muhammad Irfan Bin Rizal'; Description = 'Professional IT experience at FTMK UTeM and Port Klang Cruise Terminal.' }
  'projects' = @{ Title = 'Engineering Projects | Muhammad Irfan Bin Rizal'; Description = 'Cloud, security and application projects designed and built by Muhammad Irfan bin Rizal.' }
  'projects/pantalk' = @{ Title = 'PanTalk | Muhammad Irfan Bin Rizal'; Description = 'Privacy-first messaging platform engineering project by Muhammad Irfan bin Rizal.' }
  'projects/threat-nexus' = @{ Title = 'Threat Nexus XDR | Muhammad Irfan Bin Rizal'; Description = 'Cloud-native autonomous security response engineering project by Muhammad Irfan bin Rizal.' }
  'projects/omniverse' = @{ Title = 'Omniverse | Muhammad Irfan Bin Rizal'; Description = 'Multi-cloud disaster recovery and SRE engineering project by Muhammad Irfan bin Rizal.' }
  'projects/cspm' = @{ Title = 'Cloud Security Posture Audit | Muhammad Irfan Bin Rizal'; Description = 'Production-grade CSPM framework engineering project by Muhammad Irfan bin Rizal.' }
  'projects/data-governance' = @{ Title = 'Cloud Data Governance | Muhammad Irfan Bin Rizal'; Description = 'Zero-trust AWS S3 data governance engineering project by Muhammad Irfan bin Rizal.' }
  'projects/aegis' = @{ Title = 'Aegis | Muhammad Irfan Bin Rizal'; Description = 'Cloud-native SOC dashboard engineering project by Muhammad Irfan bin Rizal.' }
  'projects/niyyah' = @{ Title = 'Niyyah | Muhammad Irfan Bin Rizal'; Description = 'Islamic super app engineering project by Muhammad Irfan bin Rizal.' }
  'projects/smartchef' = @{ Title = 'SmartChef | Muhammad Irfan Bin Rizal'; Description = 'Serverless recipe recommendation engine by Muhammad Irfan bin Rizal.' }
  'projects/funtechpay' = @{ Title = 'FunTechPay | Muhammad Irfan Bin Rizal'; Description = 'Neo-banking proof of concept by Muhammad Irfan bin Rizal.' }
  'stack' = @{ Title = 'Technology Stack | Muhammad Irfan Bin Rizal'; Description = 'Cloud, security, networking, programming and operations technologies used by Muhammad Irfan.' }
  'security' = @{ Title = 'Cloud Security | Muhammad Irfan Bin Rizal'; Description = 'Cloud security focus across identity, visibility, detection, posture management and automated response.' }
  'journey' = @{ Title = 'Education Journey | Muhammad Irfan Bin Rizal'; Description = 'Education and progression from network services to cloud computing and cloud security.' }
  'certifications' = @{ Title = 'Certifications | Muhammad Irfan Bin Rizal'; Description = 'AWS, Oracle, Red Hat, Cisco and other technical credentials completed by Muhammad Irfan.' }
  'lab' = @{ Title = 'Cloud Lab | Muhammad Irfan Bin Rizal'; Description = 'Documented AWS, security, networking, automation and server experiments.' }
  'contact' = @{ Title = 'Contact Muhammad Irfan Bin Rizal'; Description = 'Contact Muhammad Irfan bin Rizal about cloud engineering, security, infrastructure, DevOps and automation opportunities.' }
}

foreach ($route in $routes) {
  $routeDirectory = Join-Path $siteRoot $route
  New-Item -ItemType Directory -Path $routeDirectory -Force | Out-Null
  $routeUrl = "https://irfanrizal.my/$route/"
  $pageMeta = $metadata[$route]
  $routeDocument = (Get-Content -Raw -Encoding UTF8 -LiteralPath $sourceIndex).
    Replace('<title>Muhammad Irfan Bin Rizal | Cloud Computing & Cloud Security</title>', "<title>$($pageMeta.Title)</title>").
    Replace('content="Portfolio of Muhammad Irfan bin Rizal, a Cloud Computing & Application student at Universiti Teknikal Malaysia Melaka focused on AWS, cloud security, infrastructure, DevOps and automation."', "content=`"$($pageMeta.Description)`"").
    Replace('content="Muhammad Irfan Bin Rizal | Cloud Computing & Cloud Security"', "content=`"$($pageMeta.Title)`"").
    Replace('content="Cloud Computing & Application student focused on AWS, cloud security, infrastructure, DevOps and automation."', "content=`"$($pageMeta.Description)`"").
    Replace('content="Building secure, resilient and automated cloud systems."', "content=`"$($pageMeta.Description)`"").
    Replace('<link rel="canonical" href="https://irfanrizal.my/">', "<link rel=`"canonical`" href=`"$routeUrl`">").
    Replace('<meta property="og:url" content="https://irfanrizal.my/">', "<meta property=`"og:url`" content=`"$routeUrl`">")
  if ($route -eq 'certifications') {
    $routeDocument = $routeDocument.Replace('</head>', '<link rel="stylesheet" href="certifications-neu-preview.css?v=2"></head>')
  }
  $routeDocument = $routeDocument.TrimEnd("`r", "`n") + "`n"
  [System.IO.File]::WriteAllText(
    (Join-Path $routeDirectory 'index.html'),
    $routeDocument,
    [System.Text.UTF8Encoding]::new($false)
  )
}

Write-Output "Generated $($routes.Count) GitHub Pages routes from index.html."
