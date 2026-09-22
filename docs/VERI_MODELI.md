# Veri Modeli Tasarımı

## Task (Görev)

Sistemdeki tek veri varlığı `Task` (Görev) nesnesidir. Görevler
`src/data/tasks.json` dosyasında JSON dizisi olarak saklanır.

| Alan          | Tip      | Zorunlu | Açıklama                                                        |
| ------------- | -------- | ------- | ----------------------------------------------------------------- |
| `id`          | string   | Evet (otomatik) | Sunucu tarafından üretilen benzersiz kimlik (UUID)         |
| `title`       | string   | Evet    | Görev başlığı                                                    |
| `description` | string   | Evet    | Görev açıklaması                                                 |
| `status`      | string   | Hayır (varsayılan: `pending`) | `pending`, `in-progress`, `completed` değerlerinden biri |
| `priority`    | string   | Evet    | `low`, `medium`, `high` değerlerinden biri                       |
| `assignee`    | string   | Evet    | Görevin atandığı çalışanın adı                                    |
| `createdAt`   | string (ISO 8601) | Evet (otomatik) | Oluşturulma zamanı                                    |
| `updatedAt`   | string (ISO 8601) | Evet (otomatik) | Son güncellenme zamanı                                |

### Örnek Kayıt

```json
{
  "id": "2e606e48-0514-4481-8293-f55152f10ee8",
  "title": "Backend API tasarla",
  "description": "TaskFlow REST API endpointlerini tasarla",
  "status": "pending",
  "priority": "high",
  "assignee": "musa",
  "createdAt": "2026-09-22T17:27:44.126Z",
  "updatedAt": "2026-09-22T17:27:44.126Z"
}
```

### Doğrulama Kuralları

- `title`, `description`, `assignee`: boş olmayan string olmalıdır.
- `priority`: yalnızca `low`, `medium`, `high` değerlerinden birini alabilir.
- `status` (güncellemede): yalnızca `pending`, `in-progress`, `completed`
  değerlerinden birini alabilir.
- Kurallara uymayan istekler `400 Bad Request` ile açıklayıcı hata
  mesajları döndürür (`src/middleware/validateTask.js`).

### Veri Kalıcılığı

Proje, kurulumu basit tutmak amacıyla harici bir veritabanı yerine dosya
tabanlı JSON depolama (`src/data/taskStore.js`) kullanır. Sunucu her
istek sonrasında `tasks.json` dosyasını güncel tutar, böylece sunucu
yeniden başlatıldığında veriler kaybolmaz.
