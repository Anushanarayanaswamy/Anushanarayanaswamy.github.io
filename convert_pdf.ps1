$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$htmlFile = (Get-Item ".\resume_printable.html").FullName.Replace("\", "/")
$htmlUrl = "file:///$htmlFile"
$pdfOutput = (Get-Item ".").FullName + "\Anusha_N_DevOps_Resume_v2.pdf"

Write-Host "Converting $htmlUrl to $pdfOutput..."
$proc = Start-Process -FilePath $edgePath -ArgumentList "--headless", "--disable-gpu", "--no-pdf-header-footer", "--print-to-pdf=`"$pdfOutput`"", "`"$htmlUrl`"" -PassThru -Wait
Start-Sleep -Seconds 2

if (Test-Path $pdfOutput) {
    Write-Host "SUCCESS: PDF created at $pdfOutput"
    Copy-Item $pdfOutput -Destination ".\Anusha_N_DevOps_Resume.pdf" -Force
    Copy-Item $pdfOutput -Destination "C:\Users\Anusha\Desktop\anusha-portfolio\Anusha_N_DevOps_Resume_v2.pdf" -Force
    Copy-Item $pdfOutput -Destination "C:\Users\Anusha\Desktop\anusha-portfolio\Anusha_N_DevOps_Resume.pdf" -Force
} else {
    Write-Host "FAILED: PDF not found."
}
