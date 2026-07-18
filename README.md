# PDA BLISS SOLUTIONS Website

## ความต้องการของระบบ (Requirements)

- **Node.js** เวอร์ชัน 18 ขึ้นไป
- **npm** เวอร์ชัน 9 ขึ้นไป

---

## วิธีติดตั้ง (Installation)

```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

หรือใช้คำสั่งเดียว:

```bash
npm install && cd frontend && npm install && cd ../backend && npm install && cd ..
```

---

## วิธีรัน Development

```bash
npm run dev
```

เว็บไซต์จะเปิดที่: **http://localhost:5555**

---

## Port ที่ใช้งาน

| บริการ | Port | URL |
|--------|------|-----|
| Frontend | 5555 | http://localhost:5555 |
| Backend | 5556 | http://localhost:5556 |

---

## วิธี Build สำหรับ Production

```bash
npm run build
```

---

## Environment Variables

### Frontend (`frontend/.env`)
```
VITE_API_URL=/api
VITE_SITE_URL=http://localhost:5555
VITE_GOOGLE_MAPS_URL=
VITE_LINE_URL=https://line.me/R/ti/p/@pdabliss
VITE_PHONE_NUMBER=02-123-4567
VITE_CONTACT_EMAIL=contact@pdabliss.co.th
```

### Backend (`backend/.env`)
```
PORT=5556
NODE_ENV=development
FRONTEND_URL=http://localhost:5555
```

---

## API Endpoints

| Method | Path | คำอธิบาย |
|--------|------|----------|
| GET | /api/health | ตรวจสอบสถานะ API |
| GET | /api/services | ดึงรายการบริการ |
| GET | /api/packages | ดึงแพ็กเกจสมาชิก |
| GET | /api/testimonials | ดึงรีวิวลูกค้า |
| GET | /api/faqs | ดึง FAQ |
| POST | /api/contact | ส่งข้อความติดต่อ |

---

## โครงสร้างโปรเจกต์

```
main/
├── frontend/          # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── package.json
├── backend/           # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── validators/
│   │   └── data/
│   └── package.json
├── package.json       # Root (concurrently)
└── README.md
```

---

## วิธีเปลี่ยนข้อความ

แก้ไขไฟล์ `frontend/src/data/` หรือ `backend/src/data/` ตามประเภทข้อมูล:
- `services.json` - ข้อมูลบริการ
- `packages.json` - ข้อมูลแพ็กเกจ
- `testimonials.json` - รีวิวลูกค้า
- `faqs.json` - คำถามที่พบบ่อย

---

## วิธีเปลี่ยนรูปภาพ

วางรูปภาพใน `frontend/public/images/` และแก้ไข path ใน component ที่ต้องการ

---

## วิธีเปลี่ยนข้อมูลติดต่อ

แก้ไขไฟล์ `frontend/src/data/company.ts` และ `backend/src/data/company.json`

---

## วิธี Deploy

1. Build โปรเจกต์: `npm run build`
2. Upload `frontend/dist/` ไปยัง Static Hosting (Vercel, Netlify, etc.)
3. Deploy `backend/dist/` ไปยัง Node.js Server (Railway, Render, etc.)
4. ตั้งค่า Environment Variables บน Production Server
