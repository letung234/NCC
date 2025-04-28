// ============================================
// 🔠 Types trong TypeScript - Giải thích & Ví dụ
// ============================================

/**
 * 1. Kiểu cơ bản (Primitive Types)
 */
let username: string = "Alice";
let age: number = 25;
let isOnline: boolean = true;
let nothing: null = null;
let notSet: undefined = undefined;

/**
 * 2. Array - Mảng
 */
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

/**
 * 3. Tuple - Bộ giá trị cố định kiểu & độ dài
 */
let coordinates: [number, number] = [10, 20];

/**
 * 4. Enum - Liệt kê các hằng số
 */
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
let go: Direction = Direction.Up; // = 0

/**
 * 5. Any - Bỏ kiểm tra kiểu (tránh lạm dụng)
 */
let randomValue: any = 10;
randomValue = "string";
randomValue = true;

/**
 * 6. Unknown - Giống any nhưng an toàn hơn
 */
let maybeValue: unknown = "Hello";
if (typeof maybeValue === "string") {
  console.log(maybeValue.toUpperCase());
}

/**
 * 7. Union Type - Có thể nhiều kiểu
 */
let id: number | string;
id = 123;
id = "ABC123";

/**
 * 8. Literal Type - Giới hạn giá trị cụ thể
 */
let direction: "left" | "right";
direction = "left";
// direction = "up"; // ❌ Lỗi vì không thuộc literal type

/**
 * 9. Type Alias - Tạo tên cho kiểu dữ liệu
 */
type UserID = number | string;
let userId: UserID = "abc123";

/**
 * 10. Interface - Định nghĩa cấu trúc object
 */
interface User {
  id: number;
  name: string;
  email?: string; // Thuộc tính tùy chọn
}

const user: User = {
  id: 1,
  name: "Alice",
};

/**
 * 11. Intersection Type - Kết hợp nhiều kiểu
 */
type Admin = {
  role: string;
};
type AdminUser = User & Admin;

const admin: AdminUser = {
  id: 2,
  name: "Bob",
  role: "Manager",
};

/**
 * 12. Function Types - Kiểu cho hàm
 */
let add: (a: number, b: number) => number = (a, b) => a + b;

/**
 * 13. Type Assertions - Ép kiểu
 */
let someValue: unknown = "Hello TS";
let strLength: number = (someValue as string).length;

/**
 * 14. Nullable Types - null hoặc undefined
 */
let input: string | null = null;

/**
 * 15. Optional Properties - Thuộc tính có thể có
 */
interface Product {
  name: string;
  price?: number;
}

const pen: Product = { name: "Pen" };

/**
 * 16. Readonly - Không thể thay đổi sau khi gán
 */
interface Config {
  readonly host: string;
}
const cfg: Config = { host: "localhost" };
// cfg.host = "127.0.0.1"; // ❌ Lỗi vì readonly

/**
 * 17. typeof - Lấy kiểu của biến khác
 */
let value = 123;
let anotherValue: typeof value; // => number

/**
 * 18. keyof - Lấy key của một object type
 */
type Keys = keyof User; // "id" | "name" | "email"

/**
 * 19. ReturnType - Lấy kiểu trả về của hàm
 */
function multiply(x: number, y: number) {
  return x * y;
}
type MultiplyResult = ReturnType<typeof multiply>; // number


/**
 * ===================================================
 * Sự khác biệt giữa `interface` và `type` trong TypeScript
 * ===================================================
 */

/**
 * 1. Khả năng mở rộng (Extending)
 * - `interface` có thể được mở rộng bằng cách sử dụng từ khóa `extends`.
 * - `type` có thể mở rộng thông qua phép toán `&` (Intersection Types).
 */

// Interface mở rộng một interface khác:
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

const dog: Dog = {
  name: "Rex",
  breed: "Labrador"
};

// Type mở rộng một type khác:
type AnimalType = {
  name: string;
};

type DogType = AnimalType & {
  breed: string;
};

const dogType: DogType = {
  name: "Rex",
  breed: "Labrador"
};

/**
 * 2. Định nghĩa các kiểu dữ liệu phức tạp
 * - `interface` chủ yếu dùng để định nghĩa cấu trúc của đối tượng hoặc lớp.
 * - `type` có thể định nghĩa nhiều kiểu dữ liệu phức tạp như union types, intersection types, mapped types, v.v.
 */

// Interface dùng để định nghĩa đối tượng:
interface Person {
  name: string;
  age: number;
}

// Type có thể sử dụng cho nhiều kiểu khác nhau:
type ID = string | number; // Union type

type Employee = Person & { jobTitle: string }; // Intersection type

type NumberArray = number[]; // Mảng

/**
 * 3. Tái định nghĩa (Declaration Merging)
 * - `interface` có khả năng tái định nghĩa (declaration merging). Bạn có thể khai báo một interface nhiều lần và TypeScript sẽ hợp nhất chúng.
 * - `type` không có khả năng này. Nếu khai báo lại một `type` với tên giống nhau, TypeScript sẽ báo lỗi.
 */

// Declaration Merging với Interface:
interface PersonInterface {
  name: string;
}

interface PersonInterface {
  age: number;
}

const person: PersonInterface = {
  name: "Alice",
  age: 30
};

// Type không có Declaration Merging:
type PersonType = {
  name: string;
};

// Sẽ báo lỗi khi khai báo lại:
type PersonType = {
  age: number;
}; // Error: Duplicate identifier 'PersonType'.

/**
 * 4. Khả năng sử dụng trong các trường hợp phức tạp
 * - `type` có thể định nghĩa các kiểu dữ liệu phức tạp hơn như mapped types, conditional types, v.v.
 * - `interface` chủ yếu được sử dụng để định nghĩa đối tượng và lớp.
 */

// Mapped Types với Type:
type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

type PersonMapped = {
  name: string;
  age: number;
};

const readOnlyPerson: ReadOnly<PersonMapped> = {
  name: "Alice",
  age: 30
};

// Không thể thay đổi giá trị vì nó đã được đánh dấu readonly:
readOnlyPerson.name = "Bob"; // Error: cannot assign to 'name' because it is a read-only property.

/**
 * 5. Sự khác biệt tổng thể
 * - `interface` dễ mở rộng, thường dùng khi bạn muốn định nghĩa cấu trúc đối tượng hoặc khi muốn sử dụng với `extends` và `implements`.
 * - `type` linh hoạt hơn, có thể được sử dụng để định nghĩa kiểu dữ liệu phức tạp và kết hợp nhiều kiểu lại với nhau.
 */

/**
 * So sánh chi tiết giữa `interface` và `type`
 * ===================================================
 * | Đặc điểm                | `interface`                                     | `type`                                   |
 * |-------------------------|-------------------------------------------------|------------------------------------------|
 * | **Khả năng mở rộng**     | Có thể mở rộng (extends, implements)            | Mở rộng bằng `&` (intersection types)    |
 * | **Khả năng tái định nghĩa**| Hỗ trợ declaration merging                     | Không hỗ trợ declaration merging         |
 * | **Sử dụng linh hoạt**    | Thích hợp cho đối tượng, lớp                    | Phù hợp với tất cả các kiểu dữ liệu (hàm, union, mảng, ...) |
 * | **Dễ dàng mở rộng**      | Dễ dàng mở rộng và tái sử dụng trong class và interface khác | Thường không dùng để mở rộng như interface |
 * | **Khả năng biểu diễn kiểu phức tạp**| Không linh hoạt như `type`                 | Linh hoạt, có thể tạo kiểu dữ liệu phức tạp như mapped types, conditional types |
 */

/**
 * Khi nào dùng `type` hoặc `interface`?
 * ===================================================
 * - Dùng `interface` khi bạn cần định nghĩa cấu trúc của đối tượng hoặc lớp.
 * - Dùng `type` khi bạn cần định nghĩa kiểu dữ liệu phức tạp, kết hợp các kiểu hoặc tạo các kiểu dữ liệu không phải đối tượng.
 */



// 1. Biến cục bộ và toàn cục
let globalVar = "I am a global variable"; // Biến toàn cục

function testLocalVar() {
  let localVar = "I am a local variable"; // Biến cục bộ
  console.log(localVar); // In ra: I am a local variable
}

testLocalVar();
// console.log(localVar); // Lỗi: localVar không xác định

// 2. `let`, `const`, `var`
let number = 10; // Biến có thể thay đổi
const pi = 3.14; // Biến hằng, không thể thay đổi
// var oldWay = 20; // `var` không được khuyến khích trong TypeScript

// Sử dụng `let` để thay đổi giá trị
number = 15;
console.log(number); // In ra: 15

// Sử dụng `const` sẽ gây lỗi nếu gán lại giá trị
// pi = 3.14159; // Lỗi: Cannot assign to 'pi' because it is a constant.


// 3. Biến lớp và biến đối tượng trong class

class Rectangle {
  static totalCount = 0; // Biến lớp (static), chia sẻ giữa tất cả các đối tượng
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    Rectangle.totalCount++; // Tăng tổng số hình chữ nhật
  }

  // Phương thức tính diện tích cho hình chữ nhật
  area(): number {
    return this.width * this.height;
  }

  // Phương thức lớp (class method)
  static getTotalCount(): number {
    return Rectangle.totalCount;
  }
}

const rect1 = new Rectangle(10, 5);
console.log(`Total Rectangles: ${Rectangle.getTotalCount()}`); // In ra: Total Rectangles: 1

const rect2 = new Rectangle(8, 4);
console.log(`Total Rectangles: ${Rectangle.getTotalCount()}`); // In ra: Total Rectangles: 2
// Hàm
// 1. Hàm cơ bản
function greet(name: string): string {
  return `Hello, ${name}`;
}

// 2. Hàm với tham số mặc định
function greetWithDefault(name: string = "Guest"): string {
  return `Hello, ${name}`;
}

// 3. Hàm vô số tham số (Rest Parameters)
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

// 4. Hàm ẩn danh (Anonymous Function)
const multiply = function(a: number, b: number): number {
  return a * b;
};

// 5. Hàm mũi tên (Arrow Function)
const add = (a: number, b: number): number => a + b;

// 6. Hàm với kiểu trả về `void` (Không trả về giá trị)
function logMessage(message: string): void {
  console.log(message);
}

// 7. Hàm với kiểu trả về `never` (Không bao giờ trả về) - khi ném ra lỗi thì kết thúc trương trình
function throwError(message: string): never {
  throw new Error(message);
}

// 8. Hàm là phần tử trong đối tượng
const calculator = {
  add(a: number, b: number): number {
    return a + b;
  },
  subtract(a: number, b: number): number {
    return a - b;
  }
};


// 10. Hàm trả về hàm (Hàm có kiểu trả về là một hàm)
function multiplier(factor: number): (x: number) => number {
  return function(x: number): number {
    return x * factor;
  };
}

// 11. Kiểu hàm trong TypeScript
let greeting: (name: string) => string;
greeting = (name: string) => `Hello, ${name}`;


// ===========================================
// # Scope – Phạm vi
// ===========================================

// 1. Global Scope – Phạm vi toàn cục
let globalVar = "🌍 I am global"; // Có thể truy cập từ mọi nơi

function showGlobal() {
  console.log(globalVar); // ✅ Truy cập biến toàn cục
}
showGlobal();

// 2. Block Scope – Khối mã (let, const)
{
  let blockVar = "📦 I am block-scoped";
  const blockConst = "📦 I am const in block";
  console.log(blockVar);     // ✅ OK
  console.log(blockConst);   // ✅ OK
}
// console.log(blockVar);    // ❌ Error: blockVar is not defined
// console.log(blockConst);  // ❌ Error: blockConst is not defined

// 3. Local Scope – Hàm (var, function)
function testLocalScope() {
  var localVar = "🔒 I am function-scoped";
  function localFunc() {
    console.log("🔧 Inner function");
  }
  console.log(localVar); // ✅ OK
  localFunc();           // ✅ OK
}
testLocalScope();
// console.log(localVar);  // ❌ Không truy cập được biến trong hàm

// 4. Khi gọi hàm sẽ tạo ra một phạm vi mới
function outerFunc() {
  let outer = "🔲 Outer Scope";
  function innerFunc() {
    let inner = "🔳 Inner Scope";
    console.log(outer); // ✅ Có thể truy cập biến của outer
    console.log(inner); // ✅ Biến nội bộ
  }
  innerFunc();
  // console.log(inner); // ❌ Không thể truy cập biến inner từ bên ngoài
}
outerFunc();

// 5. Lexical Scope – Hàm có thể truy cập biến của cấp ngoài nó
let scopeVar = "🔗 Global";

function levelOne() {
  let levelOneVar = "🔗 Level 1";

  function levelTwo() {
    let levelTwoVar = "🔗 Level 2";
    console.log(scopeVar);      // ✅ Global
    console.log(levelOneVar);   // ✅ Level 1
    console.log(levelTwoVar);   // ✅ Level 2
  }

  levelTwo();
}
levelOne();

// 6. Cách thức truy cập biến – theo chuỗi phạm vi (Scope Chain)
let a = "A";
function f1() {
  let b = "B";
  function f2() {
    let c = "C";
    console.log(a, b, c); // ✅ Truy cập biến từ trong ra ngoài: C -> B -> A
  }
  f2();
}
f1();

// 7. Khi nào biến bị xóa khỏi bộ nhớ?

// 7.1. Biến toàn cục => sống đến khi reload hoặc tab bị đóng
let globalMemoryVar = "🧠 Global memory";

// 7.2. Biến trong hàm => sẽ bị xóa sau khi hàm kết thúc
function tempMemory() {
  let temp = "🧠 Temp inside function";
}
tempMemory();
// Sau khi chạy xong, biến `temp` sẽ bị thu gom rác (GC)

// 7.3. Biến trong hàm nhưng được giữ bởi closure => không bị xóa
function memoryClosure() {
  let retained = "🧠 I am retained by closure";
  return function accessRetained() {
    console.log(retained); // vẫn còn tồn tại trong bộ nhớ
  };
}
const keepAlive = memoryClosure();
keepAlive(); // => 🧠 I am retained by closure

// Vì `accessRetained` vẫn giữ reference đến `retained` nên biến này không bị GC


// ===========================================
// Từ khóa `this` trong JavaScript
// ===========================================
// `this` dùng để tham chiếu đến đối tượng mà nó thuộc về.
// Đặc tính
// - **Trong phương thức:** `this` tham chiếu đối tượng gọi phương thức.
// - **Ngoài phương thức:** `this` tham chiếu đối tượng global (window trong trình duyệt)
// - Ở **strict mode**, `this` trong hàm thường là `undefined`.


// ===========================================
// use strict
// ===========================================

// Lỗi: gán giá trị cho thuộc tính không writable
const obj = {};
Object.defineProperty(obj, "x", { value: 42, writable: false });
obj.x = 9; // Error

// Lỗi: trùng tên tham số
function example(a, a) { // Error
  return a + a;
}

// Hàm chỉ tồn tại trong block
{
  function blockFunc() {
    console.log('Inside block');
  }
}
blockFunc(); // Error nếu gọi ngoài block

// Lỗi: dùng từ khóa bị cấm
let private = 1; // Error

// Lỗi: gán biến chưa khai báo
x = 3; // Error

// ------------------------------------------------------

// ECMAScript 6 (ES6 - 2015)

// 1. let và const: khai báo biến block-scoped
let a = 10;
const b = 20;

// 2. Arrow functions: cách viết hàm ngắn gọn
const sum = (x, y) => x + y;

// 3. Template literals: chuỗi có thể chèn biến
const name = 'Alice';
console.log(`Hello, ${name}!`);

// 4. Destructuring: phân rã object hoặc array
const user = { id: 1, username: 'bob' };
const { id, username } = user;

const numbers = [1, 2, 3];
const [first, second] = numbers;

// 5. Default parameters: tham số mặc định cho hàm
function greet(name = 'Guest') {
    console.log(`Hello, ${name}`);
}

// 6. Classes: cú pháp class (OOP)
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

// 7. Modules: import và export
// export: trong file a.js
// export const PI = 3.14;
// import: trong file b.js
// import { PI } from './a.js';

// 8. Promises: xử lý bất đồng bộ
const promise = new Promise((resolve, reject) => {
    let success = true;
    if (success) {
        resolve('Success!');
    } else {
        reject('Failure!');
    }
});

promise.then(result => console.log(result)).catch(error => console.log(error));

//-------------------------------------------------------------

// ECMAScript 2016 (ES7)

// 1. Array.prototype.includes: kiểm tra phần tử trong mảng
const fruits = ['apple', 'banana', 'mango'];
console.log(fruits.includes('banana')); // true

// 2. Exponentiation operator (**): toán tử lũy thừa
console.log(2 ** 3); // 8

//-------------------------------------------------------------

// ECMAScript 2017 (ES8)

// 1. async/await: cú pháp bất đồng bộ dễ đọc hơn
async function fetchData() {
    return 'Data fetched';
}

async function getData() {
    const result = await fetchData();
    console.log(result);
}
getData();

// 2. Object.values() và Object.entries()
const person = { name: 'John', age: 30 };
console.log(Object.values(person)); // ['John', 30]
console.log(Object.entries(person)); // [['name', 'John'], ['age', 30]]

// 3. String padding: padStart và padEnd
console.log('5'.padStart(3, '0')); // '005'
console.log('5'.padEnd(3, '0')); // '500'
