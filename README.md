# 🌍 Reiseplaner Wayfarer App

## 📋 Projektbeschreibung

Die Reiseplaner App ist eine mobile Anwendung, die Reisenden hilft, ihre bevorstehenden Reisen zu organisieren. Benutzer können Reisepläne erstellen, Aktivitäten hinzufügen, die Pläne speichern und sie jederzeit anzeigen.

## 🛠️ Upcoming


1. **Reiseplan-Erstellung**
   - Implementieren einer MongoDB-Datenbankstruktur für Reisepläne.
   - Erstellen einer API-Route, um neue Reisepläne in MongoDB zu speichern.
   - Implementieren einer React-Komponente mit einem Formular, um neue Reisepläne einzugeben und an die Serverroute zu senden.

2. **Aktivitäten hinzufügen**
   - Implementieren einer MongoDB-Datenbankstruktur für Aktivitäten.
   - Erstellen einer API-Route, um neue Aktivitäten in MongoDB zu speichern.
   - Implementieren einer React-Komponente mit einem Formular, um neue Aktivitäten einzugeben und an die Serverroute zu senden.

3. **Reiseplan-Ansicht**
   - Implementieren einer API-Route, um einen Reiseplan und seine Aktivitäten aus MongoDB abzurufen.
   - Implementieren einer React-Komponente, die den Reiseplan und die Aktivitäten anzeigt und die notwendigen Daten von der Serverroute abruft.

4. **Reiseplan-Teilen**
   - Implementieren einer API-Route, die einen eindeutigen öffentlichen Link zu einem Reiseplan generiert.
   - Implementieren einer React-Komponente, die den Link anzeigt und den Benutzer das Teilen ermöglicht.

5. **Wetterinformationen**
   - Registrieren für die OpenWeatherMap API und Anbinden dieser API.
   - Implementieren einer API-Route, die Wetterinformationen für einen bestimmten Ort und Zeitraum von der OpenWeatherMap API abruft.
   - Implementieren einer React-Komponente, die Wetterinformationen anzeigt.

6. **Aktivitätensuche**
   - Registrieren für die Google Places API und Anbinden dieser API.
   - Implementieren einer API-Route, die Aktivitätensuchen über die Google Places API durchführt.
   - Implementieren einer React-Komponente mit Suchfeld und Ergebnisanzeige, die die von der API bereitgestellten Informationen verwendet.

7. **Kartenansicht**
   - Registrieren für die Google Maps API und Anbinden dieser API.
   - Implementieren einer React-Komponente, die eine Kartenansicht der Aktivitäten in den Reiseplänen der Benutzer anzeigt.
``


### Optional

**Benutzerregistrierung und Anmeldung**
   - Einrichten einer Benutzerdatenbank mit MongoDB.
   - Implementieren einer Registrierungsroute im Next.js API-Routing, die die Benutzerinformationen validiert und den neuen Benutzer in der MongoDB speichert.
   - Implementieren einer Login-Route, die die Benutzeranmeldedaten überprüft und einen JWT ausstellt.
   - Implementieren von React-Komponenten für die Registrierungs- und Login-Formulare und verwenden des `fetch`-APIs oder `axios`, um Anfragen an die Serverrouten zu senden.

**Reiseplan-Export**
   - Verwenden einer serverseitigen Bibliothek wie Puppeteer, um HTML zu PDF zu konvertieren.
   - Implementieren einer API-Route, die einen Reiseplan als PDF generiert und zum Download anbietet.
   - Implementieren einer React-Komponente, die den Download des PDFs ermöglicht.
