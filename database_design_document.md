
# 📘 Tài liệu Thiết kế Cơ sở Dữ liệu

_Tài liệu mô tả các bảng, trường dữ liệu, quan hệ và mục đích kinh doanh cho hệ thống Quản lý Nhân sự và Dự án_

---

## 1. Tổng quan

Hệ thống cơ sở dữ liệu này hỗ trợ quản lý toàn diện cho:

- **Người dùng và phân quyền truy cập**
- **Cấu trúc tổ chức**
- **Quản lý khách hàng, dự án và phân công công việc**
- **Theo dõi thời gian làm việc và điểm danh**
- **Quản lý nghỉ phép và làm thêm giờ (OT)**
- **Đánh giá năng lực nhân sự**

Mỗi khối chức năng được kết nối qua các khóa ngoại, đảm bảo tính nhất quán và hỗ trợ báo cáo đa chiều.

---

## 2. Mô tả các bảng

### 2.1 `users`

- **Mục đích**: Lưu trữ thông tin nhân viên.
- **Trường chính**:
  - `id` (integer, PK)
  - `fullname`, `email`, `avatar`, `dob`, `sex`
  - `start_date` (date), `salary` (decimal), `salary_at` (date)
  - Liên kết: `id_branch` → `branches.id`, `id_level` → `levels.id`, `id_position` → `positions.id`
  - Pháp lý/Ngân hàng: `identify`, `tax_code`, `bank`, `bank_account`
  - Liên kết tự tham chiếu: `trainer_id` → `users.id`

### 2.2 Phân quyền truy cập

- **`roles`**: Định nghĩa vai trò (ADMIN, USER...)
- **`permissions`**: Danh sách quyền (create_user, edit_project...)
- **`role_permission`**: Gán quyền cho vai trò
- **`user_role`**: Gán vai trò cho người dùng

**Quan hệ**:

```sql
user_role.user_id → users.id
user_role.role_id → roles.id
role_permission.role_id → roles.id
role_permission.permission_id → permissions.id
```

### 2.3 `branches`

- **Mục đích**: Thông tin chi nhánh công ty
- **Quan hệ**: `manager_id` → `users.id` xác định người quản lý chi nhánh

### 2.4 `levels` & `positions`

- **Mục đích**: Chuẩn hoá cấp bậc và chức danh
- **Quan hệ**: Liên kết với `users` và `capability_settings`

### 2.5 Khách hàng và Dự án

#### 2.5.1 `customers`

- **Trường**: `id` (PK), `name`, `code`, `address`
- **Mục đích**: Thông tin cơ bản về khách hàng

#### 2.5.2 `projects`

- **Trường**:
  - `code` (PK, varchar): Mã dự án duy nhất
  - `name` (varchar): Tên dự án, không trùng
  - `start_date`, `end_date` (date)
  - `note` (text), `project_type` (internal/external)
  - `customer_id` → `customers.id`
  - `created_at`, `updated_at`

- **Mục đích**: Quản lý metadata dự án, phục vụ báo cáo tiến độ và chi phí

#### 2.5.3 `user_project`

- `user_id` → `users.id`
- `project_code` → `projects.code`
- `role` (DEV, QA, PM...)
- `created_at`, `updated_at`

- **Mục đích**: Quan hệ nhiều–nhiều giữa nhân viên và dự án

### 2.6 `tasks`

- **Trường**: `id`, `project_code` → `projects.code`, `assignee_id` → `users.id`, `name`, `description`, `total_hours`, `billable_hours`, `is_billable`, `status`, `priority`, `due_date`, `started_at`, `completed_at`, `created_at`, `updated_at`
- **Mục đích**: Theo dõi công việc cụ thể, tính toán công và chi phí

### 2.7 Theo dõi thời gian và điểm danh

- **`working_time`**: Mẫu ca làm việc, trạng thái, ngày áp dụng, duyệt
- **`daily_attendances`**: Ghi nhận check-in/out, liên kết task, project, phạt, khiếu nại, tình trạng

### 2.8 Yêu cầu nghỉ phép

- **`requests`**: Loại onsite/remote/off, thời gian, lý do, trạng thái, người duyệt
- **`absence_types`**: Loại nghỉ (paid/unpaid), có trừ phép không

### 2.9 Nghỉ lễ & OT

- **`DayOff`**: Lịch nghỉ, hệ số OT
- **`ProjectOTSetting`**: Quy tắc OT theo dự án/ngày
- **`overtime_records`**: Ghi OT chi tiết, liên kết task, trạng thái duyệt

### 2.10 Đánh giá năng lực

- **`capabilities`**: Danh sách năng lực
- **`capability_settings`**: Khung năng lực theo chức danh–cấp bậc
- **`capability_setting_capability`**: Gán hệ số, hướng dẫn đánh giá

---

## 3. Sơ đồ quan hệ (ER Diagram)

📎 **Link sơ đồ ER**: [Xem tại đây](https://dbdocs.io/tunglt072603/3333333dddd?view=relationships)  
🔒 **Mật khẩu**: `123456`


---

## 4. Vấn đề giải quyết

- **Phân quyền truy cập**: RBAC chi tiết qua `roles` và `permissions`
- **Phân bổ nguồn lực**: Gán người dùng cho dự án và công việc
- **Theo dõi thời gian**: Ghi nhận giờ làm, điểm danh, trễ, khiếu nại
- **Quản lý nghỉ phép và OT**: Quy trình duyệt, tính lương OT
- **Khung đánh giá năng lực**: Kết nối chức danh–cấp bậc với năng lực
