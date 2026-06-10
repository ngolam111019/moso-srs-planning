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

### Bước 1: Cài đặt hệ thống
Mở Terminal tại thư mục dự án và cài đặt các thư viện cần thiết:
```bash
npm install
npx bmad-method install --yes --tools claude-code
```

### Bước 2: Khởi động AI IDE
Mở thư mục dự án trong một AI IDE (như Cursor, Claude Code, hoặc VS Code có plugin AI):
```bash
code .
```

### Bước 3: Chạy quy trình tạo SRS và Knowledge Graph
Trong IDE, bạn mở khung chat AI (Agent) và thực hiện tuần tự theo luồng công việc sau:

1. **Phân tích hệ thống:** Nhắn cho AI Agent (Mary) lệnh: 
   `"Analyze https://moso.vn/"` 
   *(Hệ thống sẽ dựa vào luật trong `.cursor/rules/moso-analysis.md` để sinh ra `artifacts/moso-analysis.json`)*
   
2. **Viết PRD:** Nhắn cho AI Agent (John) lệnh: 
   `"Create PRD from analysis"`
   *(Sinh ra file `artifacts/requirements.json`)*
   
3. **Sinh Knowledge Graph:** Mở Terminal (trong IDE) và chạy script tự động:
   ```bash
   node run-pipeline.js
   ```
   *(Script sẽ tự sinh ra biểu đồ Graph dạng `JSON`, `Mermaid`, và `HTML`)*
   
4. **Viết SRS:** Nhắn cho AI Agent (Paige) lệnh: 
   `"Generate SRS documentation"`
   *(Hệ thống sẽ dùng template và dữ liệu để xuất bản `artifacts/SRS-moso.md` cuối cùng)*

### Bước 4: Kiểm tra kết quả
Sau khi luồng hoàn tất, hãy kiểm tra thư mục `artifacts/`:
- **Tương tác Sơ đồ Tri thức:** Chạy lệnh `open artifacts/knowledge-graph.html` trên terminal (hoặc nhấp đúp vào file HTML) để xem giao diện tương tác.
- **Đọc tài liệu SRS:** Mở xem file `artifacts/SRS-moso.md`.

## 🛠️ Tùy biến
- Nếu bạn muốn thay đổi mô hình quan hệ, hãy sửa logic trong `agents/kg-generator.js`.
- Nếu bạn muốn đổi format tài liệu, hãy sửa file `templates/SRS-template.md`.
