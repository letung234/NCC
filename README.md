```mermaid
graph TB
    subgraph "Hệ thống Quản lý Việc làm"
        Admin((Admin))
        Company((Công ty))
        Candidate((Ứng viên))
        
        subgraph "Quản lý Người dùng"
            Admin --> |Quản lý| User[Quản lý người dùng]
            Admin --> |Phân quyền| Role[Phân quyền]
        end
        
        subgraph "Quản lý Bài đăng"
            Company --> |Đăng bài| Post[Đăng bài việc làm]
            Company --> |Quản lý| PackagePost[Quản lý gói bài đăng]
            Admin --> |Duyệt bài| ApprovePost[Duyệt bài đăng]
        end
        
        subgraph "Quản lý CV"
            Candidate --> |Tạo CV| CV[Tạo CV]
            Candidate --> |Quản lý| PackageCV[Quản lý gói CV]
            Company --> |Xem CV| ViewCV[Xem CV ứng viên]
        end
        
        subgraph "Quản lý Danh mục"
            Admin --> |Quản lý| JobType[Loại công việc]
            Admin --> |Quản lý| WorkType[Hình thức làm việc]
            Admin --> |Quản lý| SalaryType[Khoảng lương]
        end
        
        subgraph "Tương tác"
            Candidate --> |Ứng tuyển| Apply[Ứng tuyển]
            Company --> |Liên hệ| Contact[Liên hệ ứng viên]
        end
    end
```
