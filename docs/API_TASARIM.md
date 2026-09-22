# API Tasarım Dokümanı

Base URL: `http://localhost:3000`

Tüm cevaplar JSON formatındadır ve `success` (boolean) alanı içerir.

---

## Genel

### `GET /`

API'nin ayakta olduğunu doğrulamak için sağlık kontrolü.

**Response `200`**

```json
{
  "success": true,
  "message": "TaskFlow API calisiyor.",
  "endpoints": { "tasks": "/tasks", "reports": "/reports" }
}
```

---

## Görev (Task) Endpointleri — Zorunlu

### `POST /tasks` — Görev Oluşturma

**Request Body**

```json
{
  "title": "Backend API tasarla",
  "description": "TaskFlow REST API endpointlerini tasarla",
  "priority": "high",
  "assignee": "musa"
}
```

`status` alanı gönderilmezse varsayılan olarak `pending` atanır.

**Response `201`**

```json
{
  "success": true,
  "data": {
    "id": "2e606e48-0514-4481-8293-f55152f10ee8",
    "title": "Backend API tasarla",
    "description": "TaskFlow REST API endpointlerini tasarla",
    "status": "pending",
    "priority": "high",
    "assignee": "musa",
    "createdAt": "2026-09-22T17:27:44.126Z",
    "updatedAt": "2026-09-22T17:27:44.126Z"
  }
}
```

**Response `400`** (eksik/geçersiz veri)

```json
{
  "success": false,
  "message": "Gecersiz veya eksik veri.",
  "errors": ["title alani zorunludur ve bos olamaz."]
}
```

### `GET /tasks` — Görevleri Listeleme

Query parametreleri opsiyoneldir ve birlikte kullanılabilir.

| Parametre  | Örnek                     | Açıklama                        |
| ---------- | -------------------------- | --------------------------------- |
| `status`   | `?status=completed`        | Duruma göre filtreler             |
| `priority` | `?priority=high`           | Önceliğe göre filtreler           |
| `page`, `limit` | `?page=1&limit=10`    | Sayfalama                         |
| `sort`     | `?sort=createdAt` / `?sort=-createdAt` | Artan / azalan sıralama |

**Response `200`**

```json
{ "success": true, "total": 2, "data": [ { "...": "..." } ] }
```

### `GET /tasks/search?keyword=backend` — Görev Arama

`title` veya `description` içinde anahtar kelime araması yapar.

### `GET /tasks/assignee/:name` — Kişiye Göre Listeleme

Örnek: `GET /tasks/assignee/musa`

### `GET /tasks/:id` — Görev Detayı

**Response `200`** — Tek görev nesnesi.
**Response `404`** — Görev bulunamazsa.

### `PUT /tasks/:id` — Görev Güncelleme

Yalnızca gönderilen alanlar güncellenir (kısmi güncelleme desteklenir).

```json
{ "status": "in-progress" }
```

**Response `200`** — Güncellenmiş görev nesnesi.
**Response `400`** — Geçersiz alan değeri (örn. tanımsız `status`).
**Response `404`** — Görev bulunamazsa.

### `DELETE /tasks/:id` — Görev Silme

**Response `200`**

```json
{ "success": true, "message": "Gorev silindi.", "data": { "...": "..." } }
```

**Response `404`** — Görev bulunamazsa.

---

## Raporlama Endpointleri — İsteğe Bağlı

### `GET /reports/completed`

Tamamlanan (`status: completed`) tüm görevleri döndürür.

### `GET /reports/pending`

Bekleyen (`status: pending`) tüm görevleri döndürür.

### `GET /reports/summary`

```json
{
  "success": true,
  "data": {
    "total": 2,
    "pending": 0,
    "inProgress": 1,
    "completed": 1,
    "byPriority": { "low": 0, "medium": 1, "high": 1 }
  }
}
```

---

## Hata Formatı

Tanımsız bir route çağrıldığında:

**Response `404`**

```json
{ "success": false, "message": "Endpoint bulunamadi: /gecersiz-yol" }
```

Beklenmeyen sunucu hatalarında:

**Response `500`**

```json
{ "success": false, "message": "Sunucu hatasi olustu." }
```
