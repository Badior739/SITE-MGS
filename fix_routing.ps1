$files = @(
    "c:\Users\USER\Desktop\mind-graphix-solution---premium\apps\frontend\src\components\CommonSections.tsx",
    "c:\Users\USER\Desktop\mind-graphix-solution---premium\apps\frontend\src\components\Hero.tsx",
    "c:\Users\USER\Desktop\mind-graphix-solution---premium\apps\frontend\src\components\HomeExtras.tsx",
    "c:\Users\USER\Desktop\mind-graphix-solution---premium\apps\frontend\src\components\Portfolio.tsx",
    "c:\Users\USER\Desktop\mind-graphix-solution---premium\apps\frontend\src\components\Team.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        # Replace to= with href=
        $content = $content -replace 'to="', 'href="'
        $content = $content -replace "to='", "href='"
        $content = $content -replace "to={", "href={"
        
        # Replace react-router-dom imports
        $content = $content -replace "import { Link } from 'react-router-dom'", "import Link from 'next/link'"
        $content = $content -replace 'import { Link } from "react-router-dom"', 'import Link from "next/link"'
        $content = $content -replace "// @ts-ignore\s*import { Link } from 'react-router-dom'", "import Link from 'next/link'"
        
        Set-Content -Path $file -Value $content -NoNewline
        Write-Host "Fixed: $file"
    }
}
