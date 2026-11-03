# Rừng Đom Đóm v10.18

Mở `index.html` bằng trình duyệt hiện đại. Không cần backend; trình duyệt cần được phép tải các file cùng thư mục.

## Cấu trúc

- `index.html` — DOM tĩnh và thứ tự tải.
- `css/` — 21 stylesheet được tách nguyên trạng, theo đúng thứ tự cascade của bản v10.17.
- `js/04-core-game.js` — state, canvas renderer, economy và game loop gốc.
- `js/05-expansion-and-world.js` — thế giới mở rộng, bạn rừng và UI hành trình.
- `js/12-m10-minigames.js` + `js/17-rdd-minigame-music.js` — mini-game M10 và âm thanh riêng.
- `js/13-rdd-v101-release-core.js` + `js/19-rdd-v1017-unified-core.js` — save, backup, định tuyến hệ thống và lifecycle.
- `manifest.json` — danh sách asset theo thứ tự tải.

## Quy ước hiện tại

1. Mini-game chuẩn: M10 Canvas.
2. Thám hiểm chuẩn: `E.trip` trong Hành trình.
3. Save chính: `rdd5`; backup xoay vòng: `rdd5_backup_rolling_current` và `rdd5_backup_rolling_previous`.
4. Preview tiến hóa cũ tạm bị khoá, vì không an toàn với save thật.

## Bước refactor tiếp theo

Các stylesheet vẫn được tách nguyên trạng để không đổi giao diện đột ngột. Sau khi smoke-test desktop/mobile, hợp nhất các file mobile CSS (`04`, `05`, `06`, `07`, `12`, `13`, `14`, `15`) thành một `mobile.css`, loại từng override trùng lặp sau mỗi lần kiểm thử.

