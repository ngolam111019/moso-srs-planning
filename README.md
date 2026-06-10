# Moso.vn SRS & Knowledge Graph Pipeline

Dự án này là một quy trình tự động hóa (Agentic Workflow) sử dụng **BMAD Method** và **Understand-Anything** để phân tích hệ thống `moso.vn`. 
Kết quả của dự án là tài liệu Đặc tả Yêu cầu Phần mềm (SRS) và Sơ đồ Tri thức (Knowledge Graph) tương tác.

## 📂 Cấu trúc thư mục
```
moso-srs-planning/
├── agents/
│   ├── kg-generator.js            # Script sinh Knowledge Graph
│   └── srs-generator-agent.yaml   # File cấu hình cho các Agent (Mary, John, Paige)
├── artifacts/                      # Thư mục chứa toàn bộ kết quả đầu ra
│   ├── knowledge-graph.html       # Knowledge Graph (Giao diện HTML tương tác)
│   ├── knowledge-graph.json       # Dữ liệu Knowledge Graph gốc
│   ├── knowledge-graph.mmd        # Biểu đồ dạng Mermaid
│   ├── moso-analysis.json         # Dữ liệu phân tích ban đầu (từ Mary Agent)
│   ├── requirements.json          # Dữ liệu PRD (từ John Agent)
│   └── SRS-moso.md                # Tài liệu SRS hoàn chỉnh (từ Paige Agent)
├── templates/
│   └── SRS-template.md            # Template chuẩn để sinh SRS
├── .cursor/rules/
│   └── moso-analysis.md           # Rule dùng cho AI IDE (Cursor/Claude)
├── run-pipeline.js                # Script chính để chạy toàn bộ luồng
└── package.json
```

## 🚀 Hướng dẫn cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js (v20.12 trở lên)
- IDE hỗ trợ AI (Cursor, Claude Code) hoặc có thể chạy trực tiếp bằng lệnh terminal.

### Bước 1: Cài đặt dependencies
Đầu tiên, bạn **BẮT BUỘC** phải di chuyển Terminal vào đúng thư mục dự án bằng lệnh:
```bash
cd /Users/lam/SourceCodeFromGithub/moso-planning/moso-srs-planning
```
Sau đó mới chạy lệnh cài đặt:
```bash
npm install
```

### Bước 2: Khởi tạo luồng bằng AI Agents
*Lưu ý quan trọng: Lệnh dưới đây không phải gõ vào Terminal! Bạn cần mở **Khung Chat AI** của IDE (như Cursor, Claude Code, hoặc chính khung chat này của Antigravity) và nhắn tin cho AI:*
1. Yêu cầu **Mary Agent** (Analyst): Bạn copy và gửi câu này vào khung chat AI: *"Hãy đóng vai Mary Agent và Analyze https://moso.vn/"* (AI sẽ chạy và tạo ra `artifacts/moso-analysis.json`)
2. Yêu cầu **John Agent** (PM): Bạn copy và gửi câu này vào khung chat AI: *"Hãy đóng vai John Agent và Create PRD from analysis"* (AI sẽ tạo ra `artifacts/requirements.json`)

*(Lưu ý: Đối với repo hiện tại, tôi (AI) đã tạo sẵn các file dữ liệu mô phỏng (mock data) trong thư mục `artifacts/` để bạn có thể chạy bước 3 ngay lập tức)*

### Bước 3: Chạy Pipeline
Mở **Terminal (Command Line)** và gõ lệnh sau để sinh Knowledge Graph và xuất SRS:
```bash
node run-pipeline.js
```

### Bước 4: Xem kết quả
Sau khi pipeline chạy xong (báo `✨ Pipeline Complete!`), bạn xem kết quả bằng cách gõ các lệnh sau vào **Terminal**:
- **Xem tài liệu SRS:** Mở file trực tiếp trong editor hoặc gõ lệnh `cat artifacts/SRS-moso.md`
- **Xem Knowledge Graph:** Gõ lệnh `open artifacts/knowledge-graph.html` (nếu dùng Mac) hoặc click đúp vào file HTML đó trong thư mục để mở bằng trình duyệt web.
- **Knowledge Graph:** Mở file `artifacts/knowledge-graph.html` bằng trình duyệt web để xem giao diện Sơ đồ tri thức có thể tương tác (kéo thả, zoom).

## 🛠️ Tùy biến
- Nếu bạn muốn thay đổi mô hình quan hệ, hãy sửa logic trong `agents/kg-generator.js`.
- Nếu bạn muốn đổi format tài liệu, hãy sửa file `templates/SRS-template.md`.
