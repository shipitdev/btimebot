# 🕒 BTimeBot

![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-ff69b4?logo=express)
![License](https://img.shields.io/badge/License-MIT-blue)

> A Node.js + Express bot that fetches Binance candle data for a specific coin and minute, analyzes price movements, and calculates pump/dump percentages.

---

## **Table of Contents**

- [About](#about)
- [Architecture](#architecture)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## **About**

BTimeBot is designed for **crypto enthusiasts and developers** who want **minute-level analysis** of any cryptocurrency on Binance.  
It fetches candle data for a given coin and time, calculates:

- **Pump %**  
- **Dump %**  
- **Net price movement %**

and exposes the results via a **RESTful API**.

---

## **Architecture**

```mermaid
flowchart TD
    A[User Request] --> B[Validation Middleware]
    B --> C[Rate Limit Middleware]
    C --> D[Controller: summary.controller.js]
    D --> E[Services: binance.service.js + analysis.service.js]
    E --> F[Response]
    F --> G[Error Handler Middleware]

    credits: @shipitdev