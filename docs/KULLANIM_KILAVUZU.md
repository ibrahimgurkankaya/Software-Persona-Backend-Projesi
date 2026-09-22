# Kullanım Kılavuzu

Bu kılavuz, TaskFlow API'sinin uçtan uca nasıl kullanılacağını adım adım
anlatır. Örnekler `curl` ile verilmiştir; aynı istekleri Postman
koleksiyonundan da çalıştırabilirsiniz.

## 1. Sunucuyu Başlatma

```bash
npm install
npm start
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır.

## 2. Yeni Görev Oluşturma

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Backend API tasarla","description":"TaskFlow endpointlerini tasarla","priority":"high","assignee":"musa"}'
```

Dönen cevaptaki `id` alanını sonraki adımlarda kullanacaksınız.

## 3. Görevleri Listeleme

```bash
curl http://localhost:3000/tasks
```

Filtreli listeleme:

```bash
curl "http://localhost:3000/tasks?status=pending"
curl "http://localhost:3000/tasks?priority=high"
curl "http://localhost:3000/tasks?page=1&limit=5"
curl "http://localhost:3000/tasks?sort=-createdAt"
```

## 4. Görev Arama ve Kişiye Göre Listeleme

```bash
curl "http://localhost:3000/tasks/search?keyword=backend"
curl "http://localhost:3000/tasks/assignee/musa"
```

## 5. Görev Detayı Görüntüleme

```bash
curl http://localhost:3000/tasks/<GOREV_ID>
```

## 6. Görev Güncelleme

```bash
curl -X PUT http://localhost:3000/tasks/<GOREV_ID> \
  -H "Content-Type: application/json" \
  -d '{"status":"in-progress"}'
```

## 7. Görev Silme

```bash
curl -X DELETE http://localhost:3000/tasks/<GOREV_ID>
```

## 8. Raporları Görüntüleme

```bash
curl http://localhost:3000/reports/summary
curl http://localhost:3000/reports/completed
curl http://localhost:3000/reports/pending
```

## 9. İstek Kayıtlarını (Logs) İnceleme

Her istek `logs/requests.log` dosyasına kaydedilir:

```bash
tail -f logs/requests.log
```

## Sık Karşılaşılan Hatalar

| Durum Kodu | Sebep                                             |
| ---------- | -------------------------------------------------- |
| `400`      | Zorunlu alan eksik veya geçersiz değer gönderildi   |
| `404`      | Görev veya endpoint bulunamadı                      |
| `500`      | Beklenmeyen sunucu hatası                            |
