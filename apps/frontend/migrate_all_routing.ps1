$srcPath = "c:\Users\USER\Desktop\mind-graphix-solution---premium\apps\frontend\src"

$files = Get-ChildItem -Path $srcPath -Filter "*.ts*" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # 1. Imports
    # Replace from 'react-router-dom' with appropriate Next.js imports
    # If it contains Link, useNavigate, useLocation
    if ($content -match "from 'react-router-dom'" -or $content -match 'from "react-router-dom"') {
        # Link -> next/link
        if ($content -match "Link") {
            $content = $content -replace "import \{.*Link.*\} from ['""]react-router-dom['""]", "import Link from 'next/link'"
            $content = $content -replace "// @ts-ignore\s*import \{.*Link.*\} from ['""]react-router-dom['""]", "import Link from 'next/link'"
        }
        
        # useNavigate -> next/navigation (useRouter)
        if ($content -match "useNavigate") {
            if ($content -match "import Link from 'next/link'") {
                $content = $content -replace "import Link from 'next/link'", "import Link from 'next/link';`nimport { useRouter } from 'next/navigation'"
            } else {
                 $content = $content -replace "import \{.*useNavigate.*\} from ['""]react-router-dom['""]", "import { useRouter } from 'next/navigation'"
            }
        }

        # useLocation -> next/navigation (usePathname)
        if ($content -match "useLocation") {
            if ($content -match "import .* from 'next/navigation'") {
                $content = $content -replace "import \{ (.*) \} from 'next/navigation'", "import { `$1, usePathname } from 'next/navigation'"
            } else {
                 $content = $content -replace "import \{.*useLocation.*\} from ['""]react-router-dom['""]", "import { usePathname } from 'next/navigation'"
            }
        }
        
        # Cleanup remaining react-router-dom imports
        $content = $content -replace "import \{.*\} from ['""]react-router-dom['""]", ""
        $content = $content -replace "// @ts-ignore\s*import \{.*\} from ['""]react-router-dom['""]", ""
    }

    # 2. Logic replacements
    # to= -> href=
    $content = $content -replace 'to="', 'href="'
    $content = $content -replace "to='", "href='"
    $content = $content -replace "to={", "href={"
    
    # useNavigate() -> useRouter()
    $content = $content -replace "useNavigate\(\)", "useRouter()"
    $content = $content -replace "const navigate =", "const router ="
    $content = $content -replace "navigate\(", "router.push("
    
    # useLocation() -> usePathname()
    $content = $content -replace "useLocation\(\)", "usePathname()"
    $content = $content -replace "const location = usePathname\(\)", "const pathname = usePathname()"
    $content = $content -replace "location\.pathname", "pathname"

    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Migrated: $($file.FullName)"
    }
}
