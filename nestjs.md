# Kiến thức về SOLID, Cách để truy vấn dữ liệu TypeORM

## 1. Kiến thức về SOLID

**SOLID** là gì?  
SOLID là tập hợp 5 nguyên lý thiết kế phần mềm hướng đối tượng giúp code dễ bảo trì, mở rộng và hạn chế lỗi.  
Tên SOLID là viết tắt từ các chữ cái đầu của 5 nguyên lý:

- **S** - _Single Responsibility Principle (SRP)_: Nguyên lý trách nhiệm đơn lẻ
- **O** - _Open/Closed Principle (OCP)_: Nguyên lý đóng/mở
- **L** - _Liskov Substitution Principle (LSP)_: Nguyên lý thay thế Liskov
- **I** - _Interface Segregation Principle (ISP)_: Nguyên lý phân tách giao diện
- **D** - _Dependency Inversion Principle (DIP)_: Nguyên lý đảo ngược phụ thuộc

### 1.1 Single Responsibility Principle (SRP)

Mỗi class chỉ nên đảm nhận đúng một vai trò (chức năng) trong hệ thống. Nếu một class có nhiều hơn một lý do để thay đổi thì đã vi phạm nguyên lý này.

**Lợi ích:**

- Giúp hệ thống dễ bảo trì, khi cần thay đổi một chức năng chỉ sửa đúng class liên quan.

**Ví dụ:**

- `PaymentService`: chỉ chịu trách nhiệm xử lý thanh toán.
- `MailService`: chỉ xử lý việc gửi email.

Nhờ vậy, mã nguồn rõ ràng, dễ mở rộng và kiểm soát thay đổi.

**Tình huống thực tế:**  
Giả sử bạn có một hệ thống bán hàng online.  
Trước đây, class `OrderService` vừa quản lý đơn hàng, vừa xử lý thanh toán, vừa gửi email xác nhận đơn hàng. Khi công ty muốn thay đổi phương thức thanh toán (ví dụ chuyển từ ví điện tử sang thẻ tín dụng), bạn phải chỉnh sửa rất nhiều code trong `OrderService`. Điều này dễ gây ra lỗi và làm việc bảo trì phức tạp.

Khi áp dụng SRP, bạn tách từng chức năng thành một class riêng:

- `OrderService`: chỉ xử lý các nghiệp vụ về đơn hàng
- `PaymentService`: chỉ xử lý thanh toán
- `EmailService`: chỉ gửi email

Khi thay đổi phương thức thanh toán, bạn chỉ cần sửa hoặc thay thế `PaymentService` mà không ảnh hưởng đến các phần còn lại của hệ thống. Nhờ vậy, code rõ ràng hơn, dễ bảo trì và giảm nguy cơ phát sinh lỗi ngoài ý muốn.

---

### 1.2 Open/Closed Principle (OCP)

Nguyên lý đóng/mở (Open/Closed Principle) phát biểu rằng: "Các module, class, function phải được thiết kế để mở rộng (open for extension) nhưng đóng với việc sửa đổi (closed for modification)".

**Lợi ích:**

- Giảm thiểu rủi ro khi thay đổi code hiện có
- Dễ dàng mở rộng chức năng mà không cần sửa đổi code cũ
- Tăng tính tái sử dụng của code

**Ví dụ:**
Giả sử bạn có một hệ thống tính giá sản phẩm với các loại giảm giá khác nhau:

```typescript
// Vi phạm OCP
class DiscountCalculator {
  calculateDiscount(product: Product, discountType: string) {
    if (discountType === "PERCENTAGE") {
      return product.price * 0.1; // 10% discount
    } else if (discountType === "FIXED") {
      return 50; // $50 off
    }
    // Mỗi khi thêm loại giảm giá mới, phải sửa code ở đây
  }
}

// Tuân thủ OCP
interface DiscountStrategy {
  calculateDiscount(product: Product): number;
}

class PercentageDiscount implements DiscountStrategy {
  calculateDiscount(product: Product): number {
    return product.price * 0.1;
  }
}

class FixedDiscount implements DiscountStrategy {
  calculateDiscount(product: Product): number {
    return 50;
  }
}

class DiscountCalculator {
  constructor(private strategy: DiscountStrategy) {}

  calculateDiscount(product: Product): number {
    return this.strategy.calculateDiscount(product);
  }
}
```

**Tình huống thực tế:**
Trong một ứng dụng thương mại điện tử, bạn cần tính giá sản phẩm với nhiều loại giảm giá khác nhau:

- Giảm giá theo phần trăm
- Giảm giá cố định
- Giảm giá theo số lượng
- Giảm giá theo thời gian (flash sale)

Nếu không áp dụng OCP, mỗi khi thêm một loại giảm giá mới, bạn phải sửa đổi code của class tính giảm giá. Điều này có thể gây ra lỗi và làm code khó bảo trì.

Khi áp dụng OCP:

1. Tạo interface `DiscountStrategy` định nghĩa phương thức tính giảm giá
2. Mỗi loại giảm giá được implement trong một class riêng
3. Khi cần thêm loại giảm giá mới, chỉ cần tạo class mới implement `DiscountStrategy`
4. Không cần sửa đổi code hiện có

Nhờ vậy, code dễ mở rộng và bảo trì hơn, đồng thời giảm thiểu rủi ro khi thêm tính năng mới.

**Các vấn đề có thể xảy ra khi không tuân thủ OCP:**

1. **Lỗi khi thêm tính năng mới:**

   - Phải sửa đổi code hiện có, có thể vô tình làm hỏng logic đang hoạt động tốt
   - Cần test lại toàn bộ class, không chỉ phần mới thêm
   - Có thể gây ra lỗi ở các phần khác của hệ thống

2. **Khó khăn trong việc bảo trì:**

   - Code trở nên phức tạp và khó đọc
   - Mỗi lần thêm tính năng mới, class càng lớn và phức tạp hơn
   - Khó kiểm soát các thay đổi và debug khi có lỗi

3. **Vi phạm nguyên tắc Single Responsibility:**

   - Class phải xử lý quá nhiều trường hợp khác nhau
   - Khó tách biệt các chức năng để test riêng lẻ
   - Khó tái sử dụng code cho các trường hợp khác

4. **Rủi ro khi làm việc nhóm:**
   - Nhiều người cùng sửa một class dễ gây conflict
   - Khó review code khi có quá nhiều thay đổi

---

### 1.3 Liskov Substitution Principle (LSP)

Nguyên lý thay thế Liskov (Liskov Substitution Principle) phát biểu rằng: "Các đối tượng của lớp con có thể thay thế các đối tượng của lớp cha mà không làm thay đổi tính đúng đắn của chương trình".

**Lợi ích:**

- Đảm bảo tính nhất quán trong kế thừa
- Giúp code dễ mở rộng và bảo trì
- Tránh các lỗi không mong muốn khi sử dụng đa hình

**Tình huống thực tế:**  
Dưới đây là các nguyên tắc cần tuân thủ để đảm bảo nguyên lý Liskov Substitution Principle (LSP):

1. **Hợp đồng (Contract):**

   ```typescript
   // Ví dụ về hợp đồng
   class BankAccount {
     // Điều kiện tiên quyết: số tiền rút phải > 0
     // Điều kiện hậu quả: số dư sau khi rút phải >= 0
     withdraw(amount: number): void {
       if (amount <= 0) throw new Error("Số tiền rút phải lớn hơn 0");
       if (this.balance - amount < 0) throw new Error("Số dư không đủ");
       this.balance -= amount;
     }
   }

   // Vi phạm LSP - Làm yếu đi điều kiện tiên quyết
   class OverdraftAccount extends BankAccount {
     withdraw(amount: number): void {
       // Vi phạm: cho phép rút số tiền <= 0
       if (amount < 0) throw new Error("Số tiền rút không được âm");
       this.balance -= amount;
     }
   }

   // Vi phạm LSP - Làm mạnh thêm điều kiện hậu quả
   class SavingsAccount extends BankAccount {
     withdraw(amount: number): void {
       if (amount <= 0) throw new Error("Số tiền rút phải lớn hơn 0");
       // Vi phạm: yêu cầu số dư phải >= 1000 sau khi rút
       if (this.balance - amount < 1000)
         throw new Error("Số dư tối thiểu phải là 1000");
       this.balance -= amount;
     }
   }
   ```

2. **Tính nhất quán:**

   ```typescript
   // Ví dụ về tính nhất quán
   class Vehicle {
     protected speed: number = 0;

     accelerate() {
       this.speed += 10;
     }
   }

   // Vi phạm LSP - Thay đổi tính nhất quán
   class Car extends Vehicle {
     accelerate() {
       // Vi phạm: thay đổi logic tăng tốc
       this.speed *= 2; // Tăng gấp đôi thay vì cộng 10
     }
   }

   // Tuân thủ LSP
   class SportsCar extends Vehicle {
     accelerate() {
       // Tuân thủ: vẫn tăng 10 nhưng có thêm logic riêng
       this.speed += 10;
       this.activateTurbo();
     }

     private activateTurbo() {
       // Logic riêng của SportsCar
     }
   }
   ```

3. **Xử lý ngoại lệ:**

   ```typescript
   // Ví dụ về xử lý ngoại lệ
   class Database {
     connect() {
       try {
         // Logic kết nối
       } catch (error) {
         throw new Error("Lỗi kết nối database");
       }
     }
   }

   // Vi phạm LSP - Throw exception mới
   class MySQLDatabase extends Database {
     connect() {
       try {
         // Logic kết nối MySQL
       } catch (error) {
         // Vi phạm: throw exception mới
         throw new MySQLException("Lỗi kết nối MySQL");
       }
     }
   }

   // Tuân thủ LSP
   class PostgreSQLDatabase extends Database {
     connect() {
       try {
         // Logic kết nối PostgreSQL
       } catch (error) {
         // Tuân thủ: throw cùng loại exception
         throw new Error("Lỗi kết nối database");
       }
     }
   }
   ```

4. **Tính đa hình:**

   ```typescript
   // Ví dụ về tính đa hình
   class Animal {
     makeSound() {
       return "Some sound";
     }
   }

   // Vi phạm LSP - Thay đổi hành vi cơ bản
   class MuteAnimal extends Animal {
     makeSound() {
       // Vi phạm: thay đổi hoàn toàn hành vi
       return null; // Không phát ra âm thanh
     }
   }

   // Tuân thủ LSP
   class Dog extends Animal {
     makeSound() {
       // Tuân thủ: vẫn trả về âm thanh
       return "Woof!";
     }
   }
   ```

**Giải thích đơn giản:**

1. **Hợp đồng:**

   - Lớp con phải giữ đúng "luật chơi" của lớp cha
   - Không được nới lỏng các điều kiện đầu vào
   - Không được thêm điều kiện chặt chẽ hơn ở đầu ra

2. **Tính nhất quán:**

   - Lớp con phải hoạt động giống như lớp cha
   - Có thể thêm tính năng mới nhưng không được thay đổi logic cũ
   - Giống như một chiếc xe con vẫn phải chạy như xe cha, nhưng có thể thêm tính năng mới

3. **Xử lý ngoại lệ:**

   - Lớp con chỉ được báo lỗi giống hoặc ít hơn lớp cha
   - Không được thêm các loại lỗi mới
   - Giống như một nhà hàng con không được phục vụ món ăn độc hại hơn nhà hàng cha

4. **Tính đa hình:**
   - Lớp con phải có thể thay thế lớp cha trong mọi tình huống
   - Không được thay đổi hành vi cơ bản
   - Giống như một cái bóng đèn LED phải thay thế được bóng đèn thường

---

### 1.4 Interface Segregation Principle (ISP)

Nguyên lý phân tách giao diện (Interface Segregation Principle) phát biểu rằng: "Không nên ép buộc các client phải phụ thuộc vào các interface mà họ không sử dụng".

**Ví dụ vi phạm ISP:**

```typescript
// Vi phạm ISP - Interface quá lớn và không cần thiết
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
  code(): void;
  design(): void;
  test(): void;
  deploy(): void;
}

// Developer phải implement tất cả các phương thức
class Developer implements Worker {
  work() {
    /* ... */
  }
  eat() {
    /* ... */
  }
  sleep() {
    /* ... */
  }
  code() {
    /* ... */
  }
  design() {
    /* Developer không làm design */
  }
  test() {
    /* Developer không làm test */
  }
  deploy() {
    /* Developer không làm deploy */
  }
}

// Designer cũng phải implement tất cả
class Designer implements Worker {
  work() {
    /* ... */
  }
  eat() {
    /* ... */
  }
  sleep() {
    /* ... */
  }
  code() {
    /* Designer không code */
  }
  design() {
    /* ... */
  }
  test() {
    /* Designer không test */
  }
  deploy() {
    /* Designer không deploy */
  }
}
```

**Ví dụ tuân thủ ISP:**

```typescript
// Tuân thủ ISP - Tách thành các interface nhỏ
interface BasicNeeds {
  work(): void;
  eat(): void;
  sleep(): void;
}

interface DeveloperTasks {
  code(): void;
}

interface DesignerTasks {
  design(): void;
}

interface DevOpsTasks {
  test(): void;
  deploy(): void;
}

// Developer chỉ implement những interface cần thiết
class Developer implements BasicNeeds, DeveloperTasks {
  work() {
    /* ... */
  }
  eat() {
    /* ... */
  }
  sleep() {
    /* ... */
  }
  code() {
    /* ... */
  }
}

// Designer chỉ implement những interface cần thiết
class Designer implements BasicNeeds, DesignerTasks {
  work() {
    /* ... */
  }
  eat() {
    /* ... */
  }
  sleep() {
    /* ... */
  }
  design() {
    /* ... */
  }
}

// DevOps implement các interface phù hợp
class DevOps implements BasicNeeds, DevOpsTasks {
  work() {
    /* ... */
  }
  eat() {
    /* ... */
  }
  sleep() {
    /* ... */
  }
  test() {
    /* ... */
  }
  deploy() {
    /* ... */
  }
}
```

**Lợi ích của ISP:**

- **Tăng tính linh hoạt:**  
  Class chỉ cần implement interface cần thiết, dễ thêm hoặc bỏ chức năng.

- **Dễ bảo trì:**  
  Code rõ ràng, dễ sửa đổi mà không ảnh hưởng các phần khác.

- **Tái sử dụng tốt hơn:**  
  Interface nhỏ giúp nhiều class có thể dùng chung, dễ mở rộng.

- **Hỗ trợ testing:**  
  Dễ mock interface nhỏ để test riêng từng phần, giảm lỗi kiểm thử.

**Các nguyên tắc khi áp dụng ISP:**

1. **Tách interface theo chức năng:**

   - Mỗi interface nên định nghĩa một nhóm chức năng liên quan
   - Tránh tạo interface quá lớn
   - Ưu tiên interface nhỏ và tập trung

2. **Xem xét người dùng interface:**

   - Hiểu rõ client sẽ sử dụng interface như thế nào
   - Chỉ định nghĩa những phương thức thực sự cần thiết
   - Tránh ép buộc client implement các phương thức không cần thiết

3. **Kết hợp interface:**

   - Cho phép class implement nhiều interface
   - Tạo các interface mới bằng cách kết hợp các interface nhỏ
   - Linh hoạt trong việc sử dụng interface

4. **Đặt tên interface rõ ràng:**
   - Tên interface nên phản ánh chức năng
   - Sử dụng hậu tố phù hợp (Service, Manager, Handler, etc.)
   - Dễ hiểu và dễ sử dụng

---

### 1.5 Dependency Inversion Principle (DIP)

Nguyên lý đảo ngược phụ thuộc (Dependency Inversion Principle) phát biểu rằng: "Các module cấp cao không nên phụ thuộc vào các module cấp thấp. Cả hai nên phụ thuộc vào abstraction. Abstraction không nên phụ thuộc vào chi tiết. Chi tiết nên phụ thuộc vào abstraction."

**Ví dụ vi phạm DIP:**

```typescript
// Vi phạm DIP - Module cấp cao phụ thuộc trực tiếp vào module cấp thấp
class MySQLDatabase {
  connect() {
    return "Kết nối MySQL";
  }
  query() {
    return "Truy vấn MySQL";
  }
}

class UserService {
  private database: MySQLDatabase;

  constructor() {
    // Phụ thuộc trực tiếp vào MySQLDatabase
    this.database = new MySQLDatabase();
  }

  getUser(id: number) {
    this.database.connect();
    return this.database.query();
  }
}

// Khi muốn đổi sang PostgreSQL, phải sửa code của UserService
class PostgreSQLDatabase {
  connect() {
    return "Kết nối PostgreSQL";
  }
  query() {
    return "Truy vấn PostgreSQL";
  }
}
```

**Ví dụ tuân thủ DIP:**

```typescript
// Tuân thủ DIP - Sử dụng abstraction
interface Database {
  connect(): string;
  query(): string;
}

class MySQLDatabase implements Database {
  connect() {
    return "Kết nối MySQL";
  }
  query() {
    return "Truy vấn MySQL";
  }
}

class PostgreSQLDatabase implements Database {
  connect() {
    return "Kết nối PostgreSQL";
  }
  query() {
    return "Truy vấn PostgreSQL";
  }
}

class UserService {
  private database: Database;

  constructor(database: Database) {
    // Phụ thuộc vào abstraction (interface)
    this.database = database;
  }

  getUser(id: number) {
    this.database.connect();
    return this.database.query();
  }
}

// Sử dụng
const mysqlDb = new MySQLDatabase();
const userService = new UserService(mysqlDb);

// Dễ dàng chuyển sang PostgreSQL
const postgresDb = new PostgreSQLDatabase();
const userService2 = new UserService(postgresDb);
```

**Lợi ích của DIP:**

1. **Tính linh hoạt:**

   - Dễ dàng thay đổi implementation mà không ảnh hưởng code
   - Có thể thêm các implementation mới
   - Dễ dàng test với mock objects

2. **Giảm sự phụ thuộc:**

   - Các module độc lập với nhau
   - Dễ dàng thay thế các thành phần
   - Giảm thiểu rủi ro khi thay đổi code

3. **Dễ bảo trì:**

   - Code rõ ràng, dễ hiểu
   - Dễ dàng mở rộng chức năng
   - Giảm thiểu lỗi khi sửa đổi

**Các nguyên tắc khi áp dụng DIP:**

1. **Sử dụng Dependency Injection:**

   - Truyền dependency qua constructor
   - Sử dụng interface thay vì concrete class
   - Tránh tạo instance trực tiếp trong class

2. **Sử dụng Interface:**

   - Định nghĩa contract rõ ràng
   - Tránh phụ thuộc vào implementation
   - Dễ dàng thay thế implementation

3. **Áp dụng Inversion of Control:**
   - Sử dụng DI container
   - Quản lý dependency tập trung
   - Dễ dàng cấu hình và thay đổi

---

### 2. Dependency Injection trong NestJS

#### 2.1 Trước khi có Dependency Injection

Trước khi có Dependency Injection, việc quản lý các dependency thường gặp nhiều khó khăn:

```typescript
// Cách làm truyền thống - Không sử dụng DI
class UserService {
  private database: MySQLDatabase;
  private emailService: EmailService;
  private logger: Logger;

  constructor() {
    // Tạo instance trực tiếp - vi phạm DIP
    this.database = new MySQLDatabase();
    this.emailService = new EmailService();
    this.logger = new Logger();
  }

  async createUser(userData: UserDTO) {
    try {
      // Sử dụng các dependency
      await this.database.save(userData);
      await this.emailService.sendWelcomeEmail(userData.email);
      this.logger.info("User created successfully");
    } catch (error) {
      this.logger.error("Failed to create user");
      throw error;
    }
  }
}

// Vấn đề với cách làm này:
// 1. Khó test - không thể mock các dependency
// 2. Khó thay đổi implementation
// 3. Vi phạm DIP - phụ thuộc trực tiếp vào concrete class
// 4. Khó quản lý lifecycle của các dependency
```

#### 2.2 Sau khi có Dependency Injection trong NestJS

NestJS cung cấp một hệ thống DI mạnh mẽ, giúp giải quyết các vấn đề trên:

```typescript
// 1. Định nghĩa interface (abstraction)
interface IDatabase {
  save(data: any): Promise<void>;
}

interface IEmailService {
  sendWelcomeEmail(email: string): Promise<void>;
}

interface ILogger {
  info(message: string): void;
  error(message: string): void;
}

// 2. Implement các service
@Injectable()
class MySQLDatabase implements IDatabase {
  async save(data: any): Promise<void> {
    // Implementation
  }
}

@Injectable()
class EmailService implements IEmailService {
  async sendWelcomeEmail(email: string): Promise<void> {
    // Implementation
  }
}

@Injectable()
class Logger implements ILogger {
  info(message: string): void {
    // Implementation
  }
  error(message: string): void {
    // Implementation
  }
}

// 3. Sử dụng DI trong service
@Injectable()
class UserService {
  constructor(
    @Inject("IDatabase") private database: IDatabase,
    @Inject("IEmailService") private emailService: IEmailService,
    @Inject("ILogger") private logger: ILogger
  ) {}

  async createUser(userData: UserDTO) {
    try {
      await this.database.save(userData);
      await this.emailService.sendWelcomeEmail(userData.email);
      this.logger.info("User created successfully");
    } catch (error) {
      this.logger.error("Failed to create user");
      throw error;
    }
  }
}

// 4. Cấu hình DI trong module
@Module({
  providers: [
    {
      provide: "IDatabase",
      useClass: MySQLDatabase,
    },
    {
      provide: "IEmailService",
      useClass: EmailService,
    },
    {
      provide: "ILogger",
      useClass: Logger,
    },
    UserService,
  ],
})
export class UserModule {}
```

#### 2.3 Lợi ích của Dependency Injection trong NestJS

1. **Dễ dàng thay đổi implementation:**

```typescript
// Thay đổi database từ MySQL sang PostgreSQL
@Module({
  providers: [
    {
      provide: "IDatabase",
      useClass: PostgreSQLDatabase, // Chỉ cần thay đổi ở đây
    },
    // ... other providers
  ],
})
export class UserModule {}
```

2. **Dễ dàng testing:**

```typescript
// Test UserService với mock objects
describe("UserService", () => {
  let userService: UserService;
  let mockDatabase: jest.Mocked<IDatabase>;
  let mockEmailService: jest.Mocked<IEmailService>;
  let mockLogger: jest.Mocked<ILogger>;

  beforeEach(() => {
    mockDatabase = {
      save: jest.fn(),
    };
    mockEmailService = {
      sendWelcomeEmail: jest.fn(),
    };
    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
    };

    userService = new UserService(mockDatabase, mockEmailService, mockLogger);
  });

  it("should create user successfully", async () => {
    const userData = { email: "test@example.com" };
    await userService.createUser(userData);

    expect(mockDatabase.save).toHaveBeenCalledWith(userData);
    expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalledWith(
      userData.email
    );
    expect(mockLogger.info).toHaveBeenCalledWith("User created successfully");
  });
});
```

3. **Quản lý lifecycle của dependency:**

```typescript
// Singleton scope (mặc định)
@Injectable()
class DatabaseService {
  // Chỉ tạo một instance cho toàn bộ ứng dụng
}

// Request scope
@Injectable({ scope: Scope.REQUEST })
class RequestLogger {
  // Tạo instance mới cho mỗi request
}

// Transient scope
@Injectable({ scope: Scope.TRANSIENT })
class TemporaryService {
  // Tạo instance mới mỗi khi được inject
}
```

4. **Tự động inject các dependency:**

```typescript
// NestJS tự động inject các dependency
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}
  // Không cần tạo instance của UserService
}
```

#### 2.5 Kết luận

Dependency Injection trong NestJS giúp:

- Tuân thủ nguyên lý DIP một cách tự nhiên
- Code dễ test và bảo trì hơn
- Dễ dàng thay đổi implementation
- Quản lý lifecycle của các dependency một cách hiệu quả

---

### 3. Cách để truy vấn dữ liệu TypeORM

#### 3.1 Cách để truy vấn dữ liệu TypeORM

##### Repository API (Entity Repositories)

Repository API trong TypeORM cung cấp các phương thức để thao tác với database một cách dễ dàng. Dưới đây là các ví dụ chi tiết:

**Cách dùng:**
Sử dụng các phương thức có sẵn như find, findOne, save, update, delete trên Repository của entity.

```typescript
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  // 1. Tìm kiếm cơ bản
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  // 2. Tìm kiếm với điều kiện
  async findByAge(age: number): Promise<User[]> {
    return this.userRepository.find({
      where: { age },
      order: { name: "ASC" },
    });
  }

  // 3. Tìm kiếm với relations
  async findWithPosts(): Promise<User[]> {
    return this.userRepository.find({
      relations: ["posts"],
      where: { isActive: true },
    });
  }

  // 4. Tìm kiếm với select
  async findNames(): Promise<User[]> {
    return this.userRepository.find({
      select: ["id", "name"],
      where: { age: MoreThan(18) },
    });
  }

  // 5. Tạo mới
  async create(userData: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  // 6. Cập nhật
  async update(id: number, userData: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, userData);
    return this.findOne(id);
  }

  // 7. Xóa
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  // 8. Tìm kiếm với nhiều điều kiện
  async findComplex(): Promise<User[]> {
    return this.userRepository.find({
      where: [
        { age: MoreThan(18), isActive: true },
        { age: LessThan(30), isActive: true },
      ],
      order: { age: "DESC" },
      take: 10,
    });
  }
}
```

**Ưu điểm:**

- Dễ sử dụng, đơn giản, code ngắn gọn.

  ```typescript
  // Ví dụ: Tìm user theo điều kiện đơn giản
  const users = await userRepository.find({
    where: { age: 18 },
  });
  // Code ngắn gọn, dễ đọc, dễ hiểu
  ```

- Phù hợp cho các truy vấn đơn giản.

  ```typescript
  // Ví dụ: Thao tác CRUD cơ bản
  // Create
  const user = userRepository.create({ name: "John" });
  await userRepository.save(user);

  // Read
  const users = await userRepository.find();

  // Update
  await userRepository.update(1, { name: "Jane" });

  // Delete
  await userRepository.delete(1);
  ```

- Tích hợp sẵn các phương thức hữu ích.

  ```typescript
  // Ví dụ: Các phương thức tiện ích
  // Tìm và đếm
  const [users, count] = await userRepository.findAndCount();

  // Tìm một hoặc tạo mới nếu không có
  const user = await userRepository.findOneOrFail({ where: { id: 1 } });

  // Kiểm tra tồn tại
  const exists = await userRepository.exist({ where: { id: 1 } });
  ```

**Nhược điểm:**

- Hạn chế khi cần truy vấn phức tạp với nhiều điều kiện, join, group by,...

  ```typescript
  // Ví dụ: Truy vấn phức tạp khó thực hiện với Repository API
  // Khó thực hiện với Repository API:
  // - Join nhiều bảng
  // - Group by với các hàm tổng hợp
  // - Subquery phức tạp
  // - Dynamic query với nhiều điều kiện
  ```

- Khó tối ưu hiệu năng cho các truy vấn phức tạp.

  ```typescript
  // Ví dụ: Khó tối ưu với Repository API
  const users = await userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.posts", "post")
    .leftJoinAndSelect("user.comments", "comment")
    .leftJoinAndSelect("user.profile", "profile")
    .where("user.age > :age", { age: 18 })
    .andWhere("post.likes > :likes", { likes: 100 })
    .orderBy("user.name", "ASC")
    .getMany();
  ```

- Khó thực hiện các truy vấn động phức tạp.
  ```typescript
  // Ví dụ: Khó thực hiện truy vấn động
  // Khó thực hiện với Repository API:
  // - Thêm/xóa điều kiện tìm kiếm động
  // - Thay đổi order by động
  // - Thay đổi relations động
  ```

**Khi nào dùng:**

- Truy vấn đơn giản, lấy dữ liệu theo điều kiện dễ dàng.

  ```typescript
  // Ví dụ: Truy vấn đơn giản
  const activeUsers = await userRepository.find({
    where: { isActive: true },
  });
  ```

- Thao tác CRUD thông thường.

  ```typescript
  // Ví dụ: CRUD thông thường
  // Create
  const newUser = await userRepository.save({
    name: "John",
    email: "john@example.com",
  });

  // Read
  const user = await userRepository.findOne({
    where: { email: "john@example.com" },
  });

  // Update
  await userRepository.update(user.id, {
    name: "John Doe",
  });

  // Delete
  await userRepository.delete(user.id);
  ```

- Khi cần code ngắn gọn, dễ đọc và dễ bảo trì.
  ```typescript
  // Ví dụ: Code ngắn gọn, dễ đọc
  const users = await userRepository.find({
    select: ["id", "name"],
    where: { age: MoreThan(18) },
    order: { name: "ASC" },
  });
  ```

#### 3.2 Query Builder

Query Builder là một cách mạnh mẽ để xây dựng các truy vấn SQL phức tạp trong TypeORM. Nó cung cấp một API linh hoạt để tạo các truy vấn động.

**Cách dùng:**

```typescript
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  // 1. Query Builder cơ bản
  async findUsers(): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder("user")
      .where("user.age > :age", { age: 18 })
      .getMany();
  }

  // 2. Join với relations
  async findUsersWithPosts(): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.posts", "post")
      .where("user.isActive = :isActive", { isActive: true })
      .getMany();
  }

  // 3. Sử dụng các điều kiện phức tạp
  async findComplexUsers(): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder("user")
      .where("user.age > :minAge", { minAge: 18 })
      .andWhere("user.age < :maxAge", { maxAge: 30 })
      .andWhere("user.isActive = :isActive", { isActive: true })
      .orderBy("user.age", "DESC")
      .take(10)
      .getMany();
  }

  // 4. Sử dụng subquery
  async findUsersWithPopularPosts(): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder("user")
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select("post.userId")
          .from(Post, "post")
          .where("post.likes > :likes", { likes: 100 })
          .getQuery();
        return "user.id IN " + subQuery;
      })
      .getMany();
  }

  // 5. Sử dụng group by và having
  async findUsersByPostCount(): Promise<any[]> {
    return this.userRepository
      .createQueryBuilder("user")
      .leftJoin("user.posts", "post")
      .select("user.id", "userId")
      .addSelect("user.name", "userName")
      .addSelect("COUNT(post.id)", "postCount")
      .groupBy("user.id")
      .having("COUNT(post.id) > :minPosts", { minPosts: 5 })
      .getRawMany();
  }

  // 6. Sử dụng case when
  async findUsersWithStatus(): Promise<any[]> {
    return this.userRepository
      .createQueryBuilder("user")
      .select("user.id", "userId")
      .addSelect("user.name", "userName")
      .addSelect(
        `
        CASE 
          WHEN user.age < 18 THEN 'minor'
          WHEN user.age < 30 THEN 'young'
          ELSE 'adult'
        END`,
        "ageGroup"
      )
      .getRawMany();
  }

  // 7. Sử dụng pagination
  async findUsersWithPagination(
    page: number,
    limit: number
  ): Promise<[User[], number]> {
    return this.userRepository
      .createQueryBuilder("user")
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy("user.id", "DESC")
      .getManyAndCount();
  }

  // 8. Sử dụng dynamic query
  async findUsersDynamic(filters: any): Promise<User[]> {
    const queryBuilder = this.userRepository.createQueryBuilder("user");

    if (filters.name) {
      queryBuilder.andWhere("user.name LIKE :name", {
        name: `%${filters.name}%`,
      });
    }

    if (filters.minAge) {
      queryBuilder.andWhere("user.age >= :minAge", { minAge: filters.minAge });
    }

    if (filters.maxAge) {
      queryBuilder.andWhere("user.age <= :maxAge", { maxAge: filters.maxAge });
    }

    if (filters.isActive !== undefined) {
      queryBuilder.andWhere("user.isActive = :isActive", {
        isActive: filters.isActive,
      });
    }

    return queryBuilder.getMany();
  }
}
```

**Ưu điểm:**

- Linh hoạt trong việc xây dựng truy vấn phức tạp.

  ```typescript
  // Ví dụ: Truy vấn phức tạp với nhiều điều kiện
  const users = await userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.posts", "post")
    .leftJoinAndSelect("user.comments", "comment")
    .leftJoinAndSelect("user.profile", "profile")
    .where("user.age > :age", { age: 18 })
    .andWhere("post.likes > :likes", { likes: 100 })
    .orderBy("user.name", "ASC")
    .getMany();
  ```

- Tối ưu hiệu năng với các truy vấn phức tạp.

  ```typescript
  // Ví dụ: Tối ưu hiệu năng
  const users = await userRepository
    .createQueryBuilder("user")
    .select(["user.id", "user.name"]) // Chỉ select các trường cần thiết
    .leftJoin("user.posts", "post")
    .where("post.createdAt > :date", { date: new Date() })
    .getMany();
  ```

- Hỗ trợ các tính năng SQL nâng cao.
  ```typescript
  // Ví dụ: Sử dụng các tính năng SQL nâng cao
  const result = await userRepository
    .createQueryBuilder("user")
    .select("user.id")
    .addSelect("COUNT(post.id)", "postCount")
    .addSelect("AVG(post.likes)", "avgLikes")
    .leftJoin("user.posts", "post")
    .groupBy("user.id")
    .having("COUNT(post.id) > :minPosts", { minPosts: 5 })
    .andHaving("AVG(post.likes) > :minLikes", { minLikes: 50 })
    .orderBy("postCount", "DESC")
    .getRawMany();
  ```

**Nhược điểm:**

- Code dài và phức tạp hơn Repository API.

  ```typescript
  // Ví dụ: Code phức tạp với Query Builder
  const users = await userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.posts", "post")
    .leftJoinAndSelect("post.comments", "comment")
    .leftJoinAndSelect("comment.replies", "reply")
    .where("user.age > :age", { age: 18 })
    .andWhere("post.likes > :likes", { likes: 100 })
    .andWhere("comment.isApproved = :isApproved", { isApproved: true })
    .orderBy("user.name", "ASC")
    .addOrderBy("post.createdAt", "DESC")
    .getMany();
  ```

- Cần kiến thức SQL để sử dụng hiệu quả.

  ```typescript
  // Ví dụ: Cần kiến thức SQL để viết subquery
  const users = await userRepository
    .createQueryBuilder("user")
    .where((qb) => {
      const subQuery = qb
        .subQuery()
        .select("post.userId")
        .from(Post, "post")
        .where("post.likes > :likes", { likes: 100 })
        .groupBy("post.userId")
        .having("COUNT(post.id) > :minPosts", { minPosts: 5 })
        .getQuery();
      return "user.id IN " + subQuery;
    })
    .getMany();
  ```

**Khi nào dùng:**

- Khi cần truy vấn phức tạp với nhiều điều kiện.

  ```typescript
  // Ví dụ: Truy vấn phức tạp
  const users = await userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.posts", "post")
    .where("user.age > :age", { age: 18 })
    .andWhere("post.likes > :likes", { likes: 100 })
    .orderBy("user.name", "ASC")
    .getMany();
  ```

- Khi cần truy vấn động.

  ```typescript
  // Ví dụ: Truy vấn động
  const queryBuilder = userRepository.createQueryBuilder("user");

  if (filters.name) {
    queryBuilder.andWhere("user.name LIKE :name", {
      name: `%${filters.name}%`,
    });
  }

  if (filters.age) {
    queryBuilder.andWhere("user.age = :age", { age: filters.age });
  }

  const users = await queryBuilder.getMany();
  ```

#### 3.3 So sánh Query Builder và Repository API

Dưới đây là một số ví dụ về các truy vấn phức tạp chỉ có thể thực hiện được bằng Query Builder:

1. **Truy vấn với nhiều điều kiện phức tạp và subquery lồng nhau:**

```typescript
// Chỉ có thể thực hiện bằng Query Builder
async findComplexUsers(): Promise<User[]> {
  return this.userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect(
      "user.posts",
      "post",
      "post.isPublished = :isPublished AND post.likes > :minLikes AND post.createdAt > :date",
      {
        isPublished: true,
        minLikes: 100,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    )
    .leftJoinAndSelect("post.comments", "comment",
      "comment.isApproved = :isApproved AND comment.rating > :minRating",
      {
        isApproved: true,
        minRating: 4
      }
    )
    .leftJoinAndSelect("comment.replies", "reply",
      "reply.createdAt > :date",
      {
        date: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    )
    .leftJoinAndSelect("user.profile", "profile",
      "profile.isVerified = :isVerified",
      {
        isVerified: true
      }
    )
    .leftJoinAndSelect("profile.settings", "settings",
      "settings.isActive = :isActive",
      {
        isActive: true
      }
    )
    .where("user.isActive = :isActive", { isActive: true })
    .andWhere("user.lastLoginDate > :date", {
      date: new Date(Date.now() - 24 * 60 * 60 * 1000)
    })
    .orderBy("user.name", "ASC")
    .getMany();
}

// Nếu muốn thực hiện bằng Repository API, cần:
// 1. Thực hiện nhiều truy vấn riêng lẻ
// 2. Xử lý logic lồng nhau ở tầng application
// 3. Cân nhắc giữa hiệu năng và độ phức tạp của code
async findComplexUsersRepository(): Promise<any[]> {
  // Sử dụng relations để load tất cả dữ liệu cần thiết trong một truy vấn
  const users = await this.userRepository.find({
    where: {
      isActive: true,
      lastLoginDate: MoreThan(new Date(Date.now() - 24 * 60 * 60 * 1000))
    },
    relations: {
      posts: {
        comments: {
          replies: true
        }
      },
      profile: {
        settings: true
      }
    }
  });

  // Lọc và xử lý dữ liệu ở tầng application
  return users.map(user => ({
    ...user,
    // Lọc posts theo điều kiện
    posts: user.posts.filter(post =>
      post.isPublished &&
      post.likes > 100 &&
      post.createdAt > new Date(Date.now() - 24 * 60 * 60 * 1000)
    ).map(post => ({
      ...post,
      // Lọc comments theo điều kiện
      comments: post.comments.filter(comment =>
        comment.isApproved &&
        comment.rating > 4
      ).map(comment => ({
        ...comment,
        // Lọc replies theo điều kiện
        replies: comment.replies.filter(reply =>
          reply.createdAt > new Date(Date.now() - 24 * 60 * 60 * 1000)
        )
      }))
    })),
    // Lọc profile và settings theo điều kiện
    profile: user.profile && user.profile.isVerified ? {
      ...user.profile,
      settings: user.profile.settings.filter(setting => setting.isActive)
    } : null
  })).sort((a, b) => {
    // Sắp xếp theo tên
    const nameCompare = a.name.localeCompare(b.name);
     return nameCompare;
  });
}

  ```

#### 3.4 Tổng kết

Trong TypeORM, việc lựa chọn giữa Query Builder và Repository API phụ thuộc vào nhiều yếu tố. Dưới đây là tổng kết chi tiết:

**1. Repository API**
- **Ưu điểm:**
  - Code ngắn gọn, dễ đọc và dễ hiểu
  - Phù hợp cho các thao tác CRUD cơ bản
  - Tích hợp sẵn nhiều phương thức tiện ích
  - Phù hợp cho các dự án nhỏ và vừa

- **Nhược điểm:**
  - Hạn chế trong việc xử lý truy vấn phức tạp
  - Không hỗ trợ nhiều tính năng SQL nâng cao
  - Khó tối ưu hiệu năng cho các truy vấn phức tạp
  - Không linh hoạt trong việc xây dựng query động

- **Nên dùng khi:**
  - Thực hiện các thao tác CRUD đơn giản
  - Không cần tối ưu hiệu năng tối đa
  - Dự án có yêu cầu truy vấn đơn giản

**2. Query Builder**
- **Ưu điểm:**
  - Linh hoạt trong việc xây dựng truy vấn phức tạp
  - Hỗ trợ đầy đủ các tính năng SQL nâng cao
  - Có thể tối ưu hiệu năng tốt hơn
  - Dễ dàng xây dựng query động

- **Nhược điểm:**
  - Code dài và phức tạp hơn
  - Cần kiến thức SQL để sử dụng hiệu quả
  - Có thể gây khó khăn cho người mới

- **Nên dùng khi:**
  - Cần thực hiện truy vấn phức tạp
  - Cần tối ưu hiệu năng
  - Cần sử dụng các tính năng SQL nâng cao
  - Cần xây dựng query động

**3. Best Practices**
- **Khi nào kết hợp cả hai:**
  - Sử dụng Repository API cho các thao tác CRUD cơ bản
  - Chuyển sang Query Builder khi cần truy vấn phức tạp
  - Tạo các phương thức riêng cho các truy vấn phức tạp
  - Sử dụng Query Builder cho các báo cáo và thống kê

- **Tối ưu hiệu năng:**
  - Chỉ select các trường cần thiết
  - Sử dụng index cho các trường thường xuyên tìm kiếm
  - Tránh load quá nhiều relations không cần thiết
  - Sử dụng pagination cho các truy vấn lớn

- **Bảo trì code:**
  - Tách các truy vấn phức tạp thành các phương thức riêng
  - Thêm comments giải thích cho các truy vấn phức tạp
  - Sử dụng các hằng số cho các giá trị tĩnh
  - Tạo các interface rõ ràng cho các tham số truy vấn

**4. Kết luận**
Việc lựa chọn giữa Query Builder và Repository API không phải là một quyết định cứng nhắc. Thay vào đó, nên dựa trên:
- Yêu cầu cụ thể của dự án
- Độ phức tạp của truy vấn
- Yêu cầu về hiệu năng
- Kinh nghiệm của team

Một dự án có thể sử dụng cả hai phương pháp một cách linh hoạt để đạt được hiệu quả tốt nhất.

```
