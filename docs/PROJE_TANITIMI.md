# Proje Tanıtım Dokümanı

**Proje Adı:** TaskFlow — Görev ve Proje Yönetim Sistemi API
**Ders:** Node.js ile Backend Programlama — Bitirme Projesi

## Amaç

Bu proje kapsamında, eğitim süresince edinilen bilgi ve beceriler
uygulamalı olarak gösterilerek, gerçek hayatta kullanılabilecek bir Görev
ve Proje Yönetim Sistemi API'si tasarlanmış ve geliştirilmiştir. Sistem
tamamen **REST API** mantığında geliştirilmiştir.

## Senaryo

Bir yazılım şirketi, ekip içerisindeki görevleri, projeleri ve
çalışanların sorumluluklarını takip etmek istemektedir. Geliştirilen
sistem; görevlerin oluşturulmasını, çalışanlara atanmasını, durumlarının
takip edilmesini ve önceliklendirilmesini desteklemektedir. Ayrıca isteğe
bağlı olarak görevlerin filtrelenmesi, aranması ve temel raporlama
süreçleri de sisteme eklenmiştir.

## Sistem Özeti

TaskFlow API, bir görevin yaşam döngüsünü (oluşturma → atama → durum
takibi → tamamlanma) uçtan uca yönetir:

- **Görev Yönetimi (CRUD):** Görev ekleme, listeleme, detay görüntüleme,
  güncelleme ve silme işlemleri desteklenir.
- **Durum ve Öncelik Yönetimi:** Her görev `pending`, `in-progress` veya
  `completed` durumlarından birinde olabilir; `low`, `medium`, `high`
  önceliklerinden biriyle etiketlenebilir.
- **Atama:** Her görev bir çalışana (`assignee`) atanır.
- **Loglama:** Sisteme gelen tüm istekler (method, endpoint, zaman
  damgası) bir middleware aracılığıyla kayıt altına alınır.
- **Doğrulama:** Eksik veya hatalı veri girişleri, açıklayıcı hata
  mesajlarıyla birlikte reddedilir.
- **Filtreleme, Arama, Sayfalama, Sıralama ve Raporlama** *(isteğe
  bağlı)*: Görevler durum/önceliğe göre filtrelenebilir, anahtar kelimeyle
  aranabilir, sayfalanabilir ve temel istatistiksel raporlar alınabilir.

## Kapsam Dışı

Kullanıcı kimlik doğrulama/yetkilendirme (authentication/authorization),
gerçek bir veritabanı entegrasyonu ve arayüz (frontend) bu projenin
kapsamı dışındadır; sistem tamamen backend REST API odaklıdır.

## Kazanılan Yetkinlikler

Node.js temelleri, Express.js ile sunucu geliştirme, REST API tasarımı,
middleware kullanımı, routing yapıları, CRUD operasyonları ve JSON tabanlı
veri yönetimi.
