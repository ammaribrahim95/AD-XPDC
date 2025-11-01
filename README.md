# 🧰 Store Inventory Management System (SIMS)

A **Full-Stack Web Application** developed to streamline the management of engineering spare parts and inventory operations.  
This system ensures **accurate stock control**, **traceability of parts**, and **integration with maintenance workflows**, reducing downtime and optimizing procurement efficiency.

---

## 🚀 Project Overview

The **Store Inventory Management System (SIMS)** is designed to digitalize the manual processes of engineering store operations.  
It enables storekeepers, procurement officers, and maintenance technicians to manage spare parts, issue items via barcode scanning, and track part usage across assets and work orders in real time.

---

## 🎯 Project Goal

To develop a **centralized digital platform** that automates inventory, procurement, and maintenance part-tracking processes — ensuring operational reliability, visibility, and data-driven decision-making.

---

## ✅ Objectives

1. Automate spare part tracking and issuance using barcode technology.  
2. Implement role-based access control (Admin, Storekeeper, Procurement, Technician).  
3. Enable automated low-stock alerts and smart reorder suggestions.  
4. Provide real-time dashboards and analytical reporting.  
5. Reduce downtime by linking issued parts to maintenance work orders.  

---

## ⚙️ System Architecture

**Tech Stack:**
- **Frontend:** Flutter (for Web) — responsive and tablet-friendly user interface  
- **Backend:** Firebase (Firestore + Authentication + Cloud Functions)  
- **Cloud Storage:** Firebase Storage for digital files (datasheets, certificates)  
- **Hosting:** Firebase Hosting or Vercel  
- **Version Control:** GitHub  

**System Modules:**
1. **User & Data Management** – Role-based login, CRUD for parts, suppliers, and locations  
2. **Inventory Operations** – Barcode receiving, issuing, and stock adjustments  
3. **Procurement & Replenishment** – Automated requisition and purchase order workflows  
4. **Reporting & Analytics** – Traceability reports, KPI dashboards, and audit logs  

---

## 📘 Project Documentation

All project-related documents, proposals, and tracking boards are organized in a dedicated documentation section.

You can access the full documentation here:  
<a href="https://github.com/ammaribrahim95/AD-XPDC/blob/main/Project%20Documents/README.md" target="_blank">📂 Open Project Documents</a>

### 🧾 Quick Access Links

| Document | Description | Link |
|-----------|--------------|------|
| 📝 **Project Proposal** | Detailed overview of the system goals, scope, and approach. | <a href="https://docs.google.com/document/d/19uJlhjBiuIAJlYO_JeQMenCaWmMWrQLXF4ZdNeF3zxg/edit?usp=sharing" target="_blank">Open Proposal</a> |
| ⚙️ **Sagile Board** | Agile sprint tracking and progress management dashboard. | <a href="https://sagile.dev/shared-project/store-inventory-management-system-CLsbf6EN" target="_blank">View Sagile Board</a> |
| 📄 **Software Requirements Specification (SRS)** | Detailed system requirements, modules, and features. | <a href="https://docs.google.com/document/d/your-srs-link-here" target="_blank">View SRS Document</a> |

---

## 🧑‍🤝‍🧑 Project Team

| Member Name | Role | Description |
|--------------|------|-------------|
| **Muhammad Syazwan bin Nazri** | Project Manager & System Analyst | Leads requirement analysis, system design, documentation, and testing coordination. |
| **Ammar Ibrahim bin Mohamed** | Backend Developer & Database Engineer | Builds the backend using Firebase, manages APIs, and ensures data security and performance. |
| **Irfan Danial Leong Bin Muhammad Shariff Leong** | Frontend Developer & UI/UX Designer | Designs the user interface with Flutter and integrates it with the backend APIs. |

---

## 🧩 Key Features

| Feature | Description |
|----------|-------------|
| 🔐 **Role-Based Access Control** | Secure login and access restrictions for Admin, Storekeeper, Technician, and Procurement Officer. |
| 🧾 **Digital Part Master** | Manage all spare parts with datasheets, certificates, and supplier details. |
| 📦 **Barcode/QR Integration** | Scan parts during receiving and issuing for accurate real-time updates. |
| 🔔 **Smart Alerts** | Automatic low-stock and critical spare notifications. |
| 📈 **Reports & Dashboards** | Visual KPIs for stock levels, usage trends, and asset traceability. |
| 💡 **Automated Reorder Suggestions** | Suggest reorder quantities based on past usage and lead time. |

---

## 🏗️ System Workflow (Use Case Overview)

**Actors:**
- **Admin** – Manages users, permissions, and system settings.  
- **Storekeeper** – Performs daily receiving, issuing, and stock updates.  
- **Procurement Officer** – Handles purchase requisitions and supplier records.  
- **Maintenance Technician** – Requests and collects parts for assigned work orders.  

**Typical Flow:**
1. Procurement officer creates or receives a Purchase Order (PO).  
2. Storekeeper scans and receives parts into the system.  
3. Technician requests parts using a Work Order ID.  
4. Storekeeper issues parts and updates the asset traceability log.  
5. Dashboard displays stock levels, alerts, and part usage reports.  

---

## 🖥️ Installation & Setup

### **Prerequisites**
- Node.js & npm (for Firebase CLI)
- Flutter SDK installed
- Firebase project configured

### **Setup Steps**
```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/spare-parts-management-system.git

# 2. Navigate into the project folder
cd spare-parts-management-system

# 3. Install dependencies
flutter pub get

# 4. Connect Firebase project
firebase login
firebase init

# 5. Run the app (development)
flutter run -d chrome

---

📅 **Last Updated:** November 2025  
Maintained by **SIMS Development Team**  
