$srcPath = "c:\Users\USER\Desktop\mind-graphix-solution---premium\apps\frontend\src"

$files = Get-ChildItem -Path $srcPath -Filter "*.ts*" -Recurse

foreach ($file in $files) {
    $filePath = $file.FullName
    $content = [System.IO.File]::ReadAllText($filePath)
    $originalContent = $content
    
    # 1. Imports
    # Link
    $content = $content -replace "import \{.*Link.*\} from ['""]react-router-dom['""]", "import Link from 'next/link'"
    $content = $content -replace "// @ts-ignore\s*import \{.*Link.*\} from ['""]react-router-dom['""]", "import Link from 'next/link'"
    
    # useNavigate
    $content = $content -replace "import \{.*useNavigate.*\} from ['""]react-router-dom['""]", "import { useRouter } from 'next/navigation'"
    $content = $content -replace "// @ts-ignore\s*import \{.*useNavigate.*\} from ['""]react-router-dom['""]", "import { useRouter } from 'next/navigation'"

    # useLocation
    $content = $content -replace "import \{.*useLocation.*\} from ['""]react-router-dom['""]", "import { usePathname } from 'next/navigation'"
    $content = $content -replace "// @ts-ignore\s*import \{.*useLocation.*\} from ['""]react-router-dom['""]", "import { usePathname } from 'next/navigation'"

    # 2. Logic replacements
    $content = $content -replace 'to="', 'href="'
    $content = $content -replace "to='", "href='"
    $content = $content -replace "to={", "href={"
    
    # useNavigate() -> useRouter()
    $content = $content -replace "useNavigate\(\)", "useRouter()"
    # Use -replace carefully for variables
    $content = $content -replace "const navigate =", "const router ="
    $content = $content -replace "navigate\(", "router.push("
    
    # useLocation() -> usePathname()
    $content = $content -replace "useLocation\(\)", "usePathname()"
    $content = $content -replace "const location = usePathname\(\)", "const pathname = usePathname()"
    $content = $content -replace "location\.pathname", "pathname"

    if ($content -ne $originalContent) {
        [System.IO.File]::WriteAllText($filePath, $content)
        Write-Host "Migrated: $filePath"
    }
}
