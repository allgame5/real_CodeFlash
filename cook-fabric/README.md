# Cook-Fabric Bestellseite

Dies ist ein einfaches Bestellsystem für Cook-Fabric, bei dem Bestellungen über ein Online-Formular aufgenommen und per Discord-Webhook an verschiedene Bäckereien gesendet werden.

## Funktionen
- Produktliste mit Preisen
- Dynamischer Warenkorb
- Bestellformular mit Validierung
- Bestellungen an Discord senden
- Admin-Panel mit Login, zur Anzeige und Verwaltung von Bestellungen
- Bestellungen werden dauerhaft in einer MySQL-Datenbank gespeichert

## Installation
1. Stelle sicher, dass du [Node.js](https://nodejs.org) und [MySQL](https://www.mysql.com/) installiert hast.
2. Klone dieses Repository und installiere die Abhängigkeiten:
    ```
    git clone https://github.com/DeinGitHub/ProjektName.git
    cd ProjektName
    npm install
    ```
3. Erstelle eine MySQL-Datenbank mit dem Namen `cook_fabric` und füge eine `orders`-Tabelle hinzu:
    ```sql
    CREATE TABLE orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      adresse TEXT,
      bäckerei VARCHAR(255),
      produkte TEXT
    );
    ```
4. Ändere die Verbindungsdaten in `api/orders.js` und richte deine Webhooks für Discord ein.
5. Starte das Projekt:
    ```
    npm run dev
    ```

## Lizenz
MIT Lizenz
