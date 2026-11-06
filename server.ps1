param(
    [int]$Port = 3000,
    [string]$RootPath = "$PSScriptRoot"
)

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Prefixes.Add("http://127.0.0.1:$Port/")

try {
    $listener.Start()
    Write-Host "Server listening on http://localhost:$Port/ and http://127.0.0.1:$Port/"
} catch {
    Write-Error "Failed to start HttpListener: $_"
    exit 1
}

$mimeTypes = @{
    ".html"  = "text/html; charset=utf-8"
    ".htm"   = "text/html; charset=utf-8"
    ".js"    = "application/javascript; charset=utf-8"
    ".mjs"   = "application/javascript; charset=utf-8"
    ".css"   = "text/css; charset=utf-8"
    ".json"  = "application/json; charset=utf-8"
    ".webp"  = "image/webp"
    ".png"   = "image/png"
    ".jpg"   = "image/jpeg"
    ".jpeg"  = "image/jpeg"
    ".svg"   = "image/svg+xml"
    ".ico"   = "image/x-icon"
    ".woff2" = "font/woff2"
    ".woff"  = "font/woff"
    ".ttf"   = "font/ttf"
}

$targetFiles = @(
    (Join-Path $RootPath "index.html"),
    (Join-Path $RootPath "assets\index-Bf1wO22b.js"),
    (Join-Path $RootPath "assets\index-DJ-rx1Ae.css")
)

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath

        if ($urlPath -eq "/__poll") {
            $maxTime = [long]0
            foreach ($tf in $targetFiles) {
                if ([System.IO.File]::Exists($tf)) {
                    $t = [System.IO.File]::GetLastWriteTimeUtc($tf).Ticks
                    if ($t -gt $maxTime) { $maxTime = $t }
                }
            }
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($maxTime.ToString())
            $response.ContentType = "text/plain; charset=utf-8"
            $response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.Close()
            continue
        }

        if ($urlPath -eq "/" -or $urlPath -eq "") {
            $urlPath = "/index.html"
        }

        $decoded = [System.Uri]::UnescapeDataString($urlPath).TrimStart('/')
        $localFilePath = [System.IO.Path]::Combine($RootPath, $decoded)

        if ([System.IO.File]::Exists($localFilePath)) {
            $ext = [System.IO.Path]::GetExtension($localFilePath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }

            $bytes = [System.IO.File]::ReadAllBytes($localFilePath)
            $response.ContentType = $mime
            $response.ContentLength64 = $bytes.Length
            $response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")
            $response.Headers.Add("Access-Control-Allow-Origin", "*")

            if ($request.HttpMethod -ne "HEAD") {
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            }
            $response.Close()
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $decoded")
            $response.ContentType = "text/plain; charset=utf-8"
            $response.ContentLength64 = $msg.Length
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            if ($request.HttpMethod -ne "HEAD") {
                $response.OutputStream.Write($msg, 0, $msg.Length)
            }
            $response.Close()
        }
    } catch {
    }
}
