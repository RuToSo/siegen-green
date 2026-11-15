# Lädt die sechs Fotos der Seite einmalig in den Ordner img/ (Pexels/Unsplash, frei nutzbar).
# Danach kommen alle Bilder direkt von siegen-green.rutoso.de – keine Fremdserver mehr.
# Ausführen im Repo-Ordner:  powershell -ExecutionPolicy Bypass -File .\bilder-holen.ps1
$ziel = Join-Path $PSScriptRoot "img"
New-Item -ItemType Directory -Force $ziel | Out-Null
$bilder = @{
  "farm-regale-1200.jpg" = "https://images.pexels.com/photos/15954902/pexels-photo-15954902.jpeg?auto=compress&cs=tinysrgb&w=1200"
  "farm-regale.jpg"      = "https://images.pexels.com/photos/15954902/pexels-photo-15954902.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop"
  "microgreens.jpg"      = "https://images.pexels.com/photos/3296644/pexels-photo-3296644.jpeg?auto=compress&cs=tinysrgb&w=800&h=380&fit=crop"
  "kraeuter.jpg"         = "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&h=380&q=80"
  "led-licht.jpg"        = "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&h=460&q=80"
  "buero.jpg"            = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&h=460&q=80"
}
foreach ($name in $bilder.Keys) {
  Invoke-WebRequest $bilder[$name] -OutFile (Join-Path $ziel $name)
  Write-Host "geladen: img/$name"
}
