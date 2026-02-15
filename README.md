# 🇮🇷 Iran Pro Data Generator

Online Service :: https://acyber.ir/service

Iran Pro Data Generator is a comprehensive JavaScript-based toolkit designed for developers, QA engineers, and security testers who need realistic Iranian test data.  

The project works completely offline and allows generating large volumes of structured data for testing, form validation, penetration testing environments, and simulation scenarios — without using real personal information.


## 👨‍💻 Author

Created for developers and security professionals who need reliable Iranian-context test data in offline environments.
Developer : Mrmtwoj
---

## 🚀 Overview

This tool is built to simulate real-world Iranian user data including:

- National identification formats
- Banking-related numbers
- Telecom numbers
- Address data
- Identity-based records
- Credentials and account information

Everything runs locally in the browser — no API calls, no external dependencies, no data collection.

---

## 🔧 Features

### 📱 Telecom Data
- Generate valid **Iranian mobile numbers**
- Supports major operators:
  - Hamrah Aval
  - Irancell
  - Rightel
  - Shatel Mobile
  - Samantel
- Randomized but structurally correct prefixes

---

### 🆔 Identity Data
- Generate valid **Iranian National ID (Melli Code)**
  - Correct checksum algorithm
  - Avoids invalid repeated numbers
- Persian first and last name generator
- English first and last name generator
- Full name combinations (FA / EN)

---

### 🏦 Banking Data
- Generate valid **Iranian bank card numbers**
  - Real BIN prefixes per bank
  - Luhn algorithm validation
- Generate **IBAN (Sheba) numbers**
  - Correct mod-97 calculation
- Multiple Iranian bank prefixes supported

---

### 📮 Postal & Address Data
- Generate **10-digit postal codes**
  - Based on province and city
  - Realistic structural format
- Province → City hierarchical selection
- Generate full Iranian-style addresses

---

### 📧 Account & Security Data
- Generate realistic **email addresses**
- Support for common domains:
  - gmail.com
  - yahoo.com
  - yahoo.ir
  - mail.ir
- Generate **passwords**
  - Simple mode
  - Complex mode (mixed characters)

---

## 🎯 Use Cases

- Form validation testing
- QA automation environments
- Security testing labs
- Local penetration testing setups
- Data simulation
- UI testing
- Development mock data
- Red team / blue team exercises (lab environments)

---

## 💻 Installation

Clone the repository:

```bash
git clone https://github.com/mrmtwoj/Iran-Pro-Data-Generator-Comprehensive-Local-Test-Data-Toolkit.git
```

Then:

1. Open `index.html` in your browser  
2. Select the data type  
3. Configure options (count, city, operator, language, etc.)  
4. Click **Generate**  

Everything works locally.

No build process required.

---

## 🌐 Requirements

- Modern browser (Chrome, Edge, Firefox)
- No server needed
- No database needed
- Fully offline capable

---

## 🛡 Security & Privacy

This tool:
- Does NOT collect data
- Does NOT send requests to any server
- Does NOT use real personal information
- Is safe for isolated lab environments

⚠️ Intended for testing and educational purposes only.

---

## 🧠 Roadmap Ideas

Future improvements may include:

- Fake company generator
- Iranian vehicle plate generator
- National ID by province code
- Iranian passport format simulation
- JSON / CSV export
- Bulk download file generation
- Dark mode UI
- API mode (local only)

---

## 🤝 Contribution

Pull requests are welcome.

If you’d like to add:
- More provinces & cities
- Additional banks
- More realistic name datasets
- New test-data modules

Feel free to contribute.

---

## 📄 License

MIT License

---

