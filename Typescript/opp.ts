// Encapsulation: bảo mật, an toàn thông tin

// 🔸 Class Cha
class Person {
  private ssn: string; // chỉ dùng được trong class Person
  protected name: string; // dùng được trong Person và các class con
  public age: number; // ai cũng truy cập được

  constructor(name: string, age: number, ssn: string) {
    this.name = name;
    this.age = age;
    this.ssn = ssn;
  }

  public getSSN(): string {
    return this.ssn;
  }

  public getInfo(): string {
    return `Tên: ${this.name}, Tuổi: ${this.age}`;
  }
}

// 🔹 Class Con kế thừa từ Person
class Student extends Person {
  private grade: number;

  constructor(name: string, age: number, ssn: string, grade: number) {
    super(name, age, ssn); // gọi constructor của class cha
    this.grade = grade;
  }

  public showStudentInfo(): void {
    // console.log(this.ssn); ❌ Không truy cập được (private)
    console.log(`Họ tên: ${this.name}`);     // ✅ Được (protected)
    console.log(`Tuổi: ${this.age}`);        // ✅ Được (public)
    console.log(`Điểm: ${this.grade}`);      // ✅ Được (private trong class này)
  }
}



// inheritance: tối ưu mã nguồn
// 🔹 Interface định nghĩa một hành vi
interface Workable {
  work(): void;
}

// 🔸 Class Cha
class Person {
  protected name: string;
  protected age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  introduce(): void {
    console.log(`Tôi tên là ${this.name}, năm nay ${this.age} tuổi.`);
  }
}

// 🔸 Class Con kế thừa Person và implement Workable
class Developer extends Person implements Workable {
  private language: string;

  constructor(name: string, age: number, language: string) {
    super(name, age); // gọi constructor class cha
    this.language = language;
  }

  // override từ interface Workable
  work(): void {
    console.log(`${this.name} đang lập trình bằng ${this.language}.`);
  }

  // override method từ class cha
  override introduce(): void {
    super.introduce(); // gọi lại introduce của cha
    console.log(`Tôi là lập trình viên, sử dụng ngôn ngữ ${this.language}.`);
  }
}

// 🔸 Sử dụng
const dev = new Developer("Nam", 25, "TypeScript");

dev.introduce();  // Gọi method kế thừa và ghi đè
dev.work();       // Gọi method từ interface



// Polymorphism: 1 việc có thể được thể hiện dưới nhiều hình dang.
// Abstraction: Ẩn đi những chi tiết phức tạp, chỉ lộ ra các thông tin cần thiết, thường sử dụng abstract class hoặc interface.
// 2 tính chật này thường được kết hợp với nhau để mang lại lợi ích dễ dàng thay thế sửa đổi, bổ sung.
// 🔹 Interface Workable định nghĩa hành vi "work"
interface Workable {
  work(): void;
  attendMeeting(): void;
}

// 🔹 Interface ProjectManager định nghĩa hành vi quản lý dự án
interface ProjectManager {
  manageProject(): void;
  assignTask(task: string): void;
}

// 🔹 Interface TeamMember định nghĩa hành vi làm việc trong nhóm
interface TeamMember {
  developSoftware(): void;
  reportProgress(): void;
}

// 🔸 Abstract class Person định nghĩa các thuộc tính chung cho mọi người
abstract class Person {
  constructor(protected name: string, protected age: number) {}

  introduce(): void {
    console.log(`Xin chào, tôi là ${this.name}, ${this.age} tuổi.`);
  }

  abstract getRole(): string;  // Phương thức trừu tượng, lớp con sẽ ghi đè
}

// 🔸 Class Employee kế thừa Person và implements nhiều interface
abstract class Employee extends Person implements Workable, ProjectManager, TeamMember {
  constructor(name: string, age: number, protected department: string) {
    super(name, age); // Gọi constructor của lớp cha
  }

  // Phương thức phải được triển khai từ Workable
  work(): void {
    console.log(`${this.name} đang làm việc tại bộ phận ${this.department}.`);
  }

  attendMeeting(): void {
    console.log(`${this.name} đang tham gia cuộc họp bộ phận.`);
  }

  // Phương thức từ ProjectManager
  manageProject(): void {
    console.log(`${this.name} đang quản lý dự án ${this.department}.`);
  }

  assignTask(task: string): void {
    console.log(`${this.name} đang phân công nhiệm vụ: ${task}`);
  }

  // Phương thức từ TeamMember
  developSoftware(): void {
    console.log(`${this.name} đang phát triển phần mềm trong nhóm.`);
  }

  reportProgress(): void {
    console.log(`${this.name} đang báo cáo tiến độ dự án.`);
  }

  abstract getRole(): string;  // Phương thức trừu tượng, lớp con sẽ ghi đè
}

// 🔹 Lớp Developer, kế thừa Employee và implements thêm các hành vi từ interface
class Developer extends Employee {
  constructor(name: string, age: number, department: string, private programmingLanguage: string) {
    super(name, age, department);
  }

  // Ghi đè getRole để xác định vai trò cụ thể
  getRole(): string {
    return `Developer (${this.programmingLanguage})`;
  }

  // Ghi đè work() nếu cần
  work(): void {
    console.log(`${this.name} đang phát triển phần mềm với ${this.programmingLanguage}.`);
  }
}

// 🔹 Lớp Manager, kế thừa Employee và implements thêm các hành vi từ interface
class Manager extends Employee {
  constructor(name: string, age: number, department: string) {
    super(name, age, department);
  }

  getRole(): string {
    return 'Manager';
  }

  // Ghi đè work() để phản ánh công việc cụ thể của Manager
  work(): void {
    console.log(`${this.name} đang quản lý nhóm ${this.department}.`);
  }
}

// 🔹 Lớp Designer, kế thừa Employee và implements thêm các hành vi từ interface
class Designer extends Employee {
  constructor(name: string, age: number, department: string, private designTool: string) {
    super(name, age, department);
  }

  getRole(): string {
    return `Designer (using ${this.designTool})`;
  }

  // Ghi đè work() để làm việc với công cụ thiết kế
  work(): void {
    console.log(`${this.name} đang thiết kế giao diện với công cụ ${this.designTool}.`);
  }
}


// tính linh hoạt dễ thay thế, sửa đổi trong tính đo hình
abstract class UIComponent {
  // Phương thức trừu tượng, các lớp con phải triển khai nó
  abstract render(): void;
}

class Button extends UIComponent {
  render(): void {
    console.log("Render a Button");
  }
}

class TextField extends UIComponent {
  render(): void {
    console.log("Render a TextField");
  }
}

class Checkbox extends UIComponent {
  render(): void {
    console.log("Render a Checkbox");
  }
}

function renderUIComponent(component: UIComponent) {
  component.render(); // Đây là đa hình, không quan tâm đến loại component cụ thể
}

// Tạo các đối tượng cụ thể
const button = new Button();
const textField = new TextField();
const checkbox = new Checkbox();

// Gọi phương thức render() mà không cần quan tâm đến loại thành phần
renderUIComponent(button); // Render a Button
renderUIComponent(textField); // Render a TextField
renderUIComponent(checkbox); // Render a Checkbox


// Biến và hàm class
// Biến class (static property): Sử dụng khi bạn cần lưu trữ giá trị chung cho tất cả các đối tượng của class, không thay đổi theo từng đối tượng riêng biệt.
// Hàm class (static method): Sử dụng khi bạn cần một phương thức có thể được gọi mà không cần phải tạo đối tượng, và phương thức này không cần truy cập đến trạng thái của các đối tượng (có thể chỉ làm việc với dữ liệu toàn cục của class). hàm khi không cần phụ thuộc vào thuộc tính của từng đối tượng cụ thể thì nên để làm hàm class giúp giảm bộ nhớ.
class Counter {
  // Biến class (static variable) dùng để lưu trữ số đếm
  private static count: number = 0;

  // Hàm class (static method) để tăng giá trị của biến class count
  public static incrementCount(): void {
    Counter.count += 1; // Tăng biến count lên 1
    console.log(`Count: ${Counter.count}`);
  }

  // Hàm class (static method) không phụ thuộc vào thuộc tính của đối tượng cụ thể
  // Hàm này dùng để tính tổng các số trong mảng mà không cần đối tượng
  public static sumArray(arr: number[]): number {
    return arr.reduce((total, num) => total + num, 0);
  }

  // Hàm đối tượng (instance method) để lấy giá trị của biến count
  public getCount(): number {
    return Counter.count; // Trả về giá trị hiện tại của count
  }
}


// ép kiểu ( chúng ta chỉ có thể ép kiểu từ vd: dog -> animal , còn nếu chúng ta ép kiểu từ animal -> dog thì chỉ có thể thực hiện khi chính animal đó đã pải là dog rồi)
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }

  speak() {
    console.log(`${this.name} barks`);
  }

  fetch() {
    console.log(`${this.name} is fetching a ball`);
  }
}

// Upcasting (ép kiểu từ Dog -> Animal)
const dog: Dog = new Dog("Buddy", "Golden Retriever");
const animal: Animal = dog; // Hợp lệ, dog là kiểu con của Animal
animal.speak(); // In ra: Buddy barks

// Downcasting (ép kiểu từ Animal -> Dog) - Không an toàn nếu không kiểm tra
const someAnimal: Animal = new Animal("Generic Animal");
const someDog: Dog = someAnimal as Dog; // Đây là ép kiểu không an toàn, có thể gây lỗi nếu không kiểm tra

// Kiểm tra an toàn trước khi ép kiểu
if (someAnimal instanceof Dog) {
  const doggie = someAnimal as Dog;
  doggie.fetch(); // In ra: Generic Animal is fetching a ball
} else {
  console.log("someAnimal is not a Dog"); // In ra: someAnimal is not a Dog
}
