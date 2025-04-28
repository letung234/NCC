# Git

## 1. Config name và email cho git với `git config`

- Git có 2 loại config đó là `local` và `global`. Local là dành riêng cho dự án, còn Global là cho cả máy tính, nếu không config local thì Git sẽ tự động dùng config của global.

- Để xem các config ở local

```bash
git config --local --list
```

- Để xem các config ở global

```bash
git config --global --list
```

- Đầu tiên thì chúng ta cần config cho git biết chúng ta là ai khi mà đưa code lên

```bash
git config --global user.name "Lê Thanh Tùng"
git config --global user.email tunglt072603@gmail.com
```

> **Lưu ý**: Với terminal sử dụng Git bash thì khi dùng tiếng Việt với Unikey nó sẽ dễ bị lỗi. Nên chuyển Unikey sang tiếng Anh.

- Github nó sẽ dựa vào email mà mình config ở local để định danh khi thay đổi code trên Github. Vậy nên khi khi config một email không giống email mà bạn đăng ký trên Github thì khi gửi code lên Github sẽ thấy một user khác chứ không phải mình!

### ❓ Nếu bạn config một email CHƯA đăng ký GitHub thì sao?

#### ✅ GitHub vẫn chấp nhận commit đó:

- Bạn vẫn push code bình thường.
- Git vẫn lưu thông tin commit như bạn đã config.
- Tuy nhiên, commit **sẽ không liên kết với bất kỳ tài khoản GitHub nào**.

#### ❌ Trên GitHub:

- Commit vẫn hiển thị tên và email bạn cấu hình.
- **Không có avatar** vì GitHub không nhận diện được tài khoản qua email đó.
- **Không có liên kết đến trang cá nhân (profile)**.
- **Không có huy hiệu "Verified"** (nếu không cấu hình ký số bằng GPG/S/MIME).

---

## 2. Khởi tạo Repository trên máy tính với `git init`

- Repository (Repo) là nơi chứa mã nguồn dự án. Để khởi tạo một Git Repo trên local thì dùng câu lệnh

```bash
git init
```

- Sau khi khởi tạo thì bạn sẽ thấy một thư mục ẩn tên là ".git".

> **Lưu ý**: Code phải nằm chung thư mục chứa folder ".git" thì code của bạn mới được quản lý bởi Git!

Có 2 loại repository:

1. **Local repository**: Repo trên máy tính
2. **Remote repository**: Repo trên server như Github

## 3. Hiển thị trạng thái với `git status`

Lệnh `git status` được dùng để kiểm tra trạng thái hiện tại của repository. Nó hiển thị các thông tin quan trọng như:

- ✅ Bạn đang ở **branch** nào.
- 🔁 Branch hiện tại đang **trùng khớp, đi trước, hoặc bị trễ** bao nhiêu commit so với remote (origin).
- 📂 Trạng thái của các **file đang được theo dõi (tracked)** hoặc **chưa theo dõi (untracked)**.
- ✏️ Những file nào đã bị **thay đổi**, đã được **staged**, hoặc chưa được staged.

### 🔍 Câu lệnh:

```bash
git status
```

### 🟢 **Tracked Files** là gì?

Trong Git, **`tracked files`** là những file mà Git đã biết đến và đang theo dõi. Khi bạn thêm một file vào staging area (sử dụng `git add`), hoặc commit một file (sử dụng `git commit`), Git sẽ bắt đầu **theo dõi** sự thay đổi của nó. Các file này có thể ở một trong ba trạng thái sau:

| Trạng thái                    | Giải thích đơn giản         | Ví dụ trong `git status`   |
| ----------------------------- | --------------------------- | -------------------------- |
| `Unmodified`                  | File không bị sửa           | Không hiện ra gì cả        |
| `Modified`                    | File đã sửa, chưa `add` lại | `modified: index.js`       |
| `Staged` (trong staging area) | Đã `add`, sẵn sàng commit   | `Changes to be committed:` |

### 💡 Minh họa về Tracked Files:

Giả sử bạn có file `main.js`, và bạn thực hiện các bước sau:

```bash
# Tạo file
echo "console.log('Hello');" > main.js

# Bước 1: Add vào Git => file trở thành tracked (và đang ở trạng thái "staged")
git add main.js

# Bước 2: Commit => Git theo dõi (tracked) và trạng thái là "unmodified"
git commit -m "add main.js"

# Bước 3: Bạn sửa file main.js => trạng thái chuyển thành "modified"
echo "console.log('Hello World');" >> main.js

# Git báo modified
git status
# => modified: main.js

# Bước 4: Bạn add lại để commit => trạng thái chuyển thành "staged"
git add main.js
git status
# => Changes to be committed: modified: main.js

## 4 Các khu vực làm việc với Git
```

---

## Các khu vực trong Git

Trong Git, có bốn khu vực chính mà file có thể ở trong quá trình làm việc. Các khu vực này giúp Git theo dõi và quản lý sự thay đổi của file qua các bước khác nhau. Dưới đây là các khu vực theo thứ tự từ khi bạn bắt đầu làm việc cho đến khi file được đẩy lên server.

### 1. **Khu vực làm việc (Working Directory)**

- **Định nghĩa**: Đây là nơi bạn làm việc và chỉnh sửa các file. Các thay đổi sẽ chỉ tồn tại trên local máy tính của bạn cho đến khi bạn quyết định đưa vào Git.
- **Ví dụ**: Bạn tạo một file mới hoặc sửa đổi một file đã có sẵn trong dự án.

### 2. **Khu vực staging (Staging Area)**

- **Định nghĩa**: Sau khi bạn sử dụng lệnh `git add <file>` để đưa file vào staging, file đó sẽ được chuẩn bị sẵn sàng cho lần commit tiếp theo. Đây là nơi Git ghi nhận các thay đổi mà bạn muốn đưa vào lịch sử phiên bản.
- **Ví dụ**: Khi bạn sửa đổi file `index.js` và muốn lưu các thay đổi này, bạn sử dụng `git add index.js`. Lúc này, file `index.js` đã được đưa vào **staging** và sẵn sàng cho commit.

### 3. **Khu vực committed (Local Repository)**

- **Định nghĩa**: Sau khi sử dụng lệnh `git commit`, các thay đổi trong khu vực staging sẽ được lưu vào lịch sử phiên bản của Git (local repository). Các thay đổi này đã được xác nhận và ghi lại, nhưng vẫn chỉ tồn tại trên máy tính của bạn.
- **Ví dụ**: Bạn chạy lệnh `git commit -m "Add new feature"` để commit các thay đổi trong staging. Các thay đổi này bây giờ đã được Git ghi lại vào lịch sử commit.

### 4. **Khu vực remote (Remote Repository)**

- **Định nghĩa**: Sau khi sử dụng lệnh `git push`, các thay đổi trong local repository (committed) sẽ được đẩy lên **remote repository** trên server. Lúc này, các thay đổi của bạn đã được đồng bộ hóa với các thành viên trong nhóm và có thể truy cập từ bất kỳ máy tính nào.
- **Ví dụ**: Sau khi commit xong, bạn sử dụng lệnh `git push` để đẩy các thay đổi của mình lên GitHub.

### 🧠 Tóm tắt các khu vực trong Git:

| Khu vực                                  | Mô tả                                                       |
| ---------------------------------------- | ----------------------------------------------------------- |
| **Khu vực làm việc** (Working Directory) | Nơi bạn thực hiện các thay đổi và chỉnh sửa file.           |
| **Khu vực staging** (Staging Area)       | Nơi các file thay đổi được chuẩn bị sẵn sàng để commit.     |
| **Khu vực committed** (Local Repository) | Nơi các thay đổi được lưu trữ trong lịch sử Git của bạn.    |
| **Khu vực remote** (Remote Repository)   | Nơi các thay đổi được đẩy lên server, chia sẻ với đồng đội. |

---

## 5. Thêm file vào khu vực Staging với `git add`

Câu lệnh dưới đây sẽ thêm một hoặc nhiều file (đã thay đổi) vào khu vực **Staging**.

Thêm 1 file

```bash
git add index.html
```

> **Lưu ý**: Các file của bạn phải thay đổi gì đó thì mới add vào được nha
> Thêm nhiều file

```bash
git add index.html app.js
```

Thêm tất cả các file.

```bash
git add .
```

> **Lưu ý** nếu bạn ở thư mục con thì nó chỉ thêm tất cả các file ở thư mục con thôi.

## 6. Khôi phục những file ở khu vực Staging về khu vực code với `git reset`

Ngược lại với `git add` thì `git reset` sẽ đưa một hoặc nhiều file ở khu vực **Staging** trở về khu vực code.

Khôi phục 1 file từ staging về khu vực code

```bash
git reset index.html
```

Khôi phục nhiều file

```bash
git reset index.html app.js
```

Khôi phục tất cả các file.

```bash
git reset .
```

## 7. Commit code với `git commit`

Câu lệnh dưới đây sẽ đính kèm các title khi bạn thực hiện những thay đổi trong dự án. Nó có tác dụng với những file trong khu vực **Staging**.

```bash
git commit -m "Tôi thay đổi dòng này vì nó xảy ra tình trạng vòng lặp vô tận"
```

> **Lưu ý** có một số terminal bắt buộc bạn phải dùng dấu nháy kép "" chứ không được dùng dấu nháy đơn ''. Còn một số terminal thì dùng cả 2 đều được.

Trong trường hợp bạn muốn đính kèm thêm description để mô tả thêm cho title thì bạn có thể dùng 2 cách

Cách 1:

```bash
git commit -m "Title" -m "Description"
```

Cách 2: Bạn gõ thiếu dấu `"` và nhấn Enter nó sẽ cho bạn xuống dòng, tiếp theo bạn sẽ gõ tiếp mô tả và kết thúc bằng dấu `"` là được.

```bash
git commit -m "Title
> Description"
```

## 8. Tạo và clone remote repo với HTTPS và SSH

### 8.1. Clone với Https

1. Mở remote repo trên github lên, click vào "Code" chọn "HTTPS" và copy đường link
2. Mở terminal lên paste đường link đó kèm với câu lệnh `git clone`, ví dụ:

   ```bash
   git clone https://github.com/dreact04072022/git-can-ban.git
   ```

   Trong trường hợp repo đó ở chế độ public thì không sao, nếu repo đó ở chế độ private hoặc ở public nhưng bạn muốn có quyền push code lên remote repo đó thì bạn phải nhập username và mật khẩu vào khi clone. Ví dụ:

   ```bash
   git clone https://username:password@github.com/dreact04072022/git-can-ban.git
   ```

### 8.2. Clone với SSH

Clone với SSH thì bạn cần làm 2 thứ

1. Tạo SSH key và add vào github

2. Copy đường link SSH trên Github repo rồi chạy câu lệnh `git clone` là được

```bash
git clone git@github.com:dreact04072022/git-can-ban.git
```

Clone với SSH tiện lợi hơn giao thức HTTPS vì bạn không cần nhập username và mật khẩu mỗi khi clone, dễ làm lộ thông tin. Bạn cũng chỉ cần tạo SSH key và add vào 1 lần duy nhất, những lần sau chỉ cần chạy `git clone` là được rồi.

### 8.3. Tạo SSH key

1. Đầu tiên mở terminal Gish Bash lên
2. Paste text bên dưới, thay thế email là địa chỉ email Github của bạn

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Nó sẽ yêu cầu bạn nhập tên file để lưu, nếu bạn enter thì nó sẽ lấy tên file mặc định như trong dấu (). Lưu ý là khi nhập tên file phải nhập đầy đủ đường dẫn lưu file tương tự như trong dấu () nhé.

```bash
Enter file in which to save the key (/c/Users/dutha/.ssh/id_ed25519):
```

Tiếp theo nó sẽ yêu cầu bạn nhập passphrase (tương tự password thôi). Cá nhân mình thì không nhập, cứ Enter thôi vì khi nhập sau này mỗi khi làm việc với Git phải nhập passphrase khá mệt

```bash
Enter passphrase (empty for no passphrase):
```

```bash
Enter same passphrase again:
```

Sau khi tạo thành công thì nó sẽ sinh ra cho bạn 2 file là private key và public key theo đường dẫn mà bạn nhập tên file. File chứa public key sẽ có đuôi `.pub` phía sau.

```bash
Your identification has been saved in /c/Users/dutha/.ssh/id_duthanhduoc10
Your public key has been saved in /c/Users/dutha/.ssh/id_duthanhduoc10.pub
```

Để đọc nội dung public SSH key thì bạn chỉ có khá nhiều cách, dùng cách nào dưới đây cũng được. Ví dụ file public key của mình bên trên là `id_duthanhduoc10.pub`

- Copy đường dẫn này `c:/Users/dutha/.ssh/id_duthanhduoc10.pub` bỏ lên Chrome thì nó sẽ ra nội dung của public key
- Dùng git bash gõ `cat /c/Users/dutha/.ssh/id_duthanhduoc10.pub`

### 8.4. Tiến hành thêm SSH public key vào Github

Tham khảo đầy đủ tại [https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)

### 8.5. Kiểm ta SSH key đã kết nối github thành công hay chưa

Tham khảo đầy đủ cho các hệ điều hành tại [https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection)

1. Mở Git bash
2. Nhập dòng này vào và enter `ssh -T git@github.com`
   Có thể bạn sẽ thấy cảnh báo này

   ```bash
   > The authenticity of host 'github.com (IP ADDRESS)' can't be established.
   > RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
   > Are you sure you want to continue connecting (yes/no)?
   ```

3. [Xác nhận fingerprint] có giống lúc tạo shh key hay không. Nếu đúng thì gõ `yes`:

   ```bash
   Hi username You've successfully authenticated, but GitHub does not provide shell access.
   ```

4. Kiểm tra lại coi thông báo có đúng username tài khoản github của bạn hay không. Nếu đúng thì đã thành công, nếu sai thì kiểm tra lại public key bạn add vào github có thể bị sai.

## 9. Dùng nhiều tài khoản Github trên cùng một máy tính

Tạo 1 file tên là `config` trong thư mục `~/.ssh/`

Viết nội dung file này tương tự như nội dung bên dưới

```yaml
#Default GitHub
Host github.com
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa

#React-Awesome thanhtung
Host github-thanhtung.com
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa_thanhtung
```

Ở trên thì mình có dùng 2 tài khoản Github, cái đầu tiên dùng với private key là `id_rsa` với Host là `github.com`, cái thứ hai là `id_rsa_thanhtung` với Host là `github-thanhtung.com`.

Khi mình clone những repo thuộc quyền của tài khoản github đầu tiên thì mình vẫn giữ nguyên link github.com nhưng nếu mình clone những repo thuộc quyền sở hữu của tài khoản thứ hai thì mình phải thay đổi thành như thế này

```bash
git clone git@github-thanhtung.com:dreact04072022/git-can-ban.git
```

Tương tự với những câu lệnh như `git remote add origin git@github-thanhtung.com:dreact04072022/git-can-ban.git`

## 10. Đẩy code lên git server với `git push`

Muốn đẩy code của bạn lên server thì local repo phải được liên kết với remote repo. Có 2 cách để bạn liên kết:

1. Bạn chưa có local repo, bạn tiến hành clone một remote repo về máy tính thì lúc này bạn sẽ có được local repo
2. Bạn có local repo nhưng chưa có remote repo, lúc này bạn cần tiến hành tạo một remote repo mới hoàn toàn và tiến hành liên kết nó với local repo của bạn.

Nếu bạn đang ở nhánh master, câu lệnh dưới đây sẽ đẩy code của bạn lên nhánh master ở remote repo (hay còn gọi là origin master)

```bash
git push origin master
```

> Mặc định đối với nhánh master thì bạn chỉ cần `git push` là được rồi vì git nó tự hiểu là bạn đang push lên orgin master.

## 11. Hiển thị log commit với git log

Hiển thị những thông tin commit gần đây. Các bạn nhân phím "q" để quit (thoát)

```bash
git log
```

Một số phím chức năng bạn có thể nhập đề điều hướng và tìm kiếm trong log như:

- return - dòng tiếp theo
- w - trang tiếp
- spacebar - trang trước
- q - thoát
- ?pattern - tìm kiếm, với pattern là mẫu tìm kiếm (keyword)
- /pattern - giống ?pattern
- n - đến vị trí tìm kiếm phía dưới
- N - đến kết quả tìm kiếm phía trước

Nếu muốn nhìn thấy thông tin rút gọn thì

```bash
git log --oneline
```

## 12 Kéo code từ remote repo về với `git pull`

Trong những trường hợp code trên remote repo có những thay đổi và cập nhật, bạn có thể cập nhật những thay đổi này trên local repo của bạn cho giống như trên remote repo.

Câu lệnh dưới đây sẽ pull code từ nhánh master về nhánh hiện tại của bạn ở local

```bash
git pull orgin master
```

> Mặc định đối với nhánh master thì bạn chỉ cần `git pull` là được rồi vì git nó tự hiểu là bạn đang pull từ orgin master.

## 13 Bỏ qua file với .gitignore

Có những file chúng ta không muốn bị git giám sát thì chỉ cần tạo file `.gitignore` và thêm các file và folder vào file `.gitignore` này.

**`.gitignore`**

```bash
# Comment
node_modules/
.logs
```

Những trường hợp phổ biến dùng `.gitignore`

- ignore thư mục node_modules vì thư mục này rất nặng gây tốn thời gian pull và push code. Ngoài ra còn tốn tài nguyên git, ai muốn có node_modules thì chỉ cần chạy npm hoặc yarn là có ngay.
- ignore các thư mục build như `dist`. Ai muốn có các file build thì chỉ cần chạy câu lệnh build là được, không cần gửi lên git thư mục này làm gì
- ignore các file cấu hình trên máy tính cá nhân mà không muốn xuất hiện ở các máy thành viên khác

Cách viết `.gitignore`

- Comment thì dùng `#`
- Ignore file: `example.exe`
- Ignore cả thư mục: `folder/`, tất nhiên là bạn dùng `folder` cũng được nhưng nên thêm `/` để phân biệt với file
- Phủ định thì thêm `!`: `!folder/file.exe`
- Ignore tất cả các file có đuôi là `.exe`: `*.exe`
- Ignore tất cả các file có tên bắt đầu là log: `log*`
- Ignore tất cả các file có đuôi là `.exe` ở theo đường dẫn `folder/file.exe` (các file ở đường dẫn `folder/sub/file.exe` sẽ không bị ignore): `folder/**.exe`
- Ignore tất cả các file có đuôi là `.exe` ở thư mục `folder` dù cho có nằm ở sub-folder đi chăng nữa: `folder/**/**.exe`
- Ignore mọi thứ bên trong thư mục folder: `folder/**`

### Xử lý Git cache

Trong một số trường hợp bạn code một thời gian rồi, push pull các kiểu rồi, sau đó bạn mới thêm các file vào `.gitignore`, lúc này những file đó có thể không bị ignore vì nó đã bị git cache từ trước và git nó vẫn quản lý những file này. Cách giải quyết là hãy xóa những file đó ra khỏi cache

```bash
git rm -r --cached /đường-dẫn-file-hoặc-folder
```

## 14. Tạo file README.md

ReadMe là file giới thiệu về dự án, cũng là file mô tả cấu trúc hoặc doc của dự án.

Để tạo và sử dụng ReadMe file thì bạn chỉ cần

1. Tạo file có tên là README.md trong thư mục root của repo
2. Thêm nội dung cho file với cú pháp Markdown.
3. Khi hoàn thành thì có thể push lên remote repo và xem thành quả

## 15. Giải quyết conflict code

Code bị conflict khi code trên local branch khác xung đột với remote branch, vấn đề này xảy ra khi có ai đó đã cập nhật 1 đoạn code trên remote branch và bạn cũng cập nhật đoạn đó trên local branch.

Lúc này git sẽ không cho phép bạn push code lên, bạn phải pull code trên remote branch về và lựa chọn xem nên chọn những đoạn code nào.

Thứ tự thường dùng:

1. Pull code mới nhất trên remote branch về bằng `git pull`
2. Giải quyết conflict bằng tay, thảo luận với những người liên quan đoạn code xung đột nên chọn cái nào.
3. Add file xung đột vào khu vực staging `git add TenFile`. Hoặc có thể `git add .` cũng được
4. Commit cho những file xung đột đó và push code lên

## 16. Thao tác với Git UI cơ bản trên VS code

- Xem nhánh hiện tại
- Các khu vực Changes / Staged Changes
- Khôi phục Staged Changes về Changes
- Thêm Changes vào Staged Changes
- Add, Commit, Push
- Cài Gitlens extension
- Xem lịch sử các Commit
- Search commit
- Xem author, người đã edit

## 1 Thao tác với branch

Khi làm việc trong một dự án có nhiều người tham gia, chúng ta thường sẽ tạo nhiều nhánh để dễ dàng quản lý code hơn. Ví dụ: Người A code tính năng login ở nhánh `feature/Login` và người B code tính năng register ở nhánh `feature/Register`, 2 người không ảnh hưởng đến nhau khi code. Sau đó, hai người sẽ tiến hành gộp code của họ lại vào `master` khi họ code xong.

### 1.1 Tạo branch mới

Câu lệnh này sẽ tạo một nhánh mới dựa trên nhánh hiện tại

```bash
git branch TenNhanhMoi
```

2 câu lệnh dưới sẽ tạo một nhánh mới dựa trên nhánh hiện tại và chuyển sang nhánh mới luôn.

```bash
git checkout -b TenNhanhMoi
```

```bash
git switch -c TenNhanhMoi
```

`git switch` mới ra ở phiên bản Git 2.23. Các bạn dùng cái nào cũng được

### 1.2 List tất cả branch

Câu lệnh này sẽ cho bạn biết local repo của bạn hiện tại đang có bao nhiêu nhánh. Những nhánh mà câu lệnh `git branch` show ra là những nhánh mà bạn đã từng làm việc trên local. Có những nhánh đã có ở local mà bạn chưa làm việc (những nhánh này thường là do bạn pull hoặc fetch code về sẽ có) thì nó sẽ không hiện ở đây.

```bash
git branch
```

hoặc `git branch --list` đều như nhau

Nếu muốn thấy các remote branch

```bash
git branch -r
```

Nếu muốn thấy tất cả local và remote branch

```bash
git branch -a
```

### 1.3. Đổi tên branch

Nếu bạn tạo tên nhánh bị sai, bạn cũng có thể sửa lại tên nhánh hiện tại bằng cách

```bash
git branch -m TenMoi
```

Cách trên chỉ áp dụng khi nhánh hiện tại của bạn là nhánh sai và bạn muốn đổi tên nhánh hiện tại. Trong trường hợp bạn muốn đổi tên nhánh nào đó không nhất thiết là nhánh hiện tại thì bạn phải ghi rõ tên nhánh cũ và nhánh mới như dưới đây

```bash
git branch -m TenNhanhCu TenNhanhMoi
```

Các bạn đổi tên branch thì chỉ đổi được ở dưới local repo, nếu branch đó đã xuất hiện ở trên remote repo thì khi bạn push nó sẽ tạo một branch mới trên remote repo
cách khác phục:

- B1: Đổi tên local branch
  git branch -m old-name new-name

- B2: Push nhánh mới lên remote và thiết lập upstream
  git push origin new-name

- B3: Xoá nhánh cũ trên remote
  git push origin --delete old-name

- B4 (tuỳ chọn): Thiết lập lại upstream nếu cần
  git branch -u origin/new-name

### 1.4 Chuyển branch

Nếu bạn đơn giản chỉ muốn chuyển sang một nhánh trên local repo, 2 câu lệnh dưới đây đều được

```bash
git switch TenNhanh
```

```bash
git checkout TenNhanh
```

> **Lưu ý**: Nhánh phải có trên local repo thì mới chuyển được nhé, nếu nhánh đó có trên remote repo mà local chưa có thì bạn phải tiến hành cập nhật repo của bạn lại bằng câu lệnh `git fetch`.

### 1.5 Push một branch

Nếu local branch của bạn không tồn tại trên remote, chạy câu lệnh sau

```bash
git push -u origin localBranch
```

Hoặc câu lệnh này, nó sẽ giúp các bạn không cần gõ chính xác tên local branch

```bash
git push -u origin HEAD
```

> Head là tham chiếu đến đầu danh sách branch hiện tại

### 1.6 Xóa branch

Xóa branch ở local

```bash
git branch -D localBranchName
```

Xóa branch ở remote

```bash
git push origin --delete remoteBranchName
```

Hoặc bạn có thể dùng cú pháp rút gọn

```bash
git push origin :remoteBranchName
```

Nếu bạn gặp lỗi dưới đây thì có thể ai đó đã xóa branch

```bash
error: unable to delete 'branchName': remote ref does not exist
error: failed to push some refs to 'git@repository_name'
```

Khi ai đó đã xóa một branch trên remote nhưng khi bạn gõ `git branch -r` vẫn show ra origin branch đó thì bạn cần thực hiện đồng bộ hóa bằng câu lệnh dưới đây.

```bash
git fetch -p
```

`-p` nghĩa là **"prune"**. Sau khi fetch, những branch không còn trên remote cũng sẽ xóa khỏi local repo của bạn.

### 1.7 Push code mà không cần origin

Nếu bạn để ý thì khi ở nhánh `master`, bạn push code lên orgin thì bạn chỉ cần `git push` là xong, không cần `git push origin master`. Nhưng nếu bạn ở nhánh khác ví dụ nhánh `feature` thì khi bạn push code lên `origin feature` thì phải `git push orgin feature` khá dài dòng và phải nhớ tên nhánh mệt mỏi.

Cách cải thiện khá đơn giản, bạn chỉ cần thêm option `-u` câu lệnh push là được, chỉ cần làm 1 lần, lần sau không cần làm với nhánh đó nữa.

```bash
git push -u origin feature
```

`-u` là short-hand của `--set-upstream`. Nó cho git biết rằng hãy tự kết nối nhánh `local feature` với `origin feature`

Làm 1 lần thôi, lần sau chỉ cần ở nhánh `feature` và nhấn `git push` là code tự lên.

> Tip: Nếu muốn xem những local branch đã kết nối với remote branch thì chỉ cần gõ `cat .git/config`

### git merge

Gộp các commit lại của 2 nhánh với nhau dựa trên thời gian các commit, sau khi gộp thì sẽ tạo ra một commit gộp sau cùng.

```bash
git merge branchTarget
```

Chúng ta có 3 nhánh:

- main
- Alpha: checkout từ nhánh main và thêm 2 commit D,E
- Beta: checkout từ nhánh main và thêm 2 commit là F,G

Thứ tự các commit theo chiều ngang được sắp xếp theo thời gian

```shell
   (main)
A--B-C---D--E (Alpha)
      \
       -F-----G (Beta)
```

Nếu ở nhánh Beta chúng ta muốn có những commit của nhánh Alpha (hay còn gọi là có code) thì ta sẽ tiến hành merge Alpha vào Beta nên ta thực hiện lệnh

```bash
git checkout Beta
git merge Alpha
```

Sơ đồ commit sẽ như thế này, các commit của Alpha sẽ xuất hiện trong Beta và được sắp xếp theo thứ tự thời gian. Ta sẽ thấy sự xuất hiện của một commit merge nữa phía sau cùng, commit merge này chứa tất cả những sự thay đổi của nhánh Beta sau khi merge nhánh Alpha vào.

```shell
   (main)
A--B-C---D--E (Alpha)
      \       \
       -F----G-M (Beta)
```

Bây giờ nhánh Beta đã có đầy đủ code của nhánh Alpha.

Nếu trong quá trình merge có bị conflict thì thao tác theo thứ tự

1. Tìm file conflict trong tab source và fix nó.
2. Sau khi fix hết các file bị conflict rồi thì dùng `git add .` hoặc add từng file
3. Tiến hành thêm commit cho những file vừa fix conflict bằng câu lệnh `git commit --no-edit`, nếu muốn edit commit thì `git merge --continue`, còn nếu muốn tự viết commit thì cứ `git commit -m 'thông điệp'` như thường
4. push hết lên với câu lệnh `git push`

Nếu merge xong rồi mới nhận ra mình không cần merge nữa thì có thể dùng `git reset --hard <commit-của bạn-trước-khi-merge>`. Cách này áp dụng cho cả đã push code hay chưa push đều được.

> Tips: `git pull` là sự kết hợp giữa `git fetch` và `git merge`. Trong thực tế thì mình dùng `git pull` chứ ít khi dùng `git merge` vì mình luôn muốn fetch data mới nhất từ origin về rồi mới merge.
>
> Bạn cũng có thể tạo merge request (một số chỗ gọi là pull request) bằng git server như Github thay vì dùng câu lệnh. Những merge request này được tạo ra để phục vụ việc team review và approve code.

# Git nâng cao

## 1 Thao tác với branch

Khi làm việc trong một dự án có nhiều người tham gia, chúng ta thường sẽ tạo nhiều nhánh để dễ dàng quản lý code hơn. Ví dụ: Người A code tính năng login ở nhánh `feature/Login` và người B code tính năng register ở nhánh `feature/Register`, 2 người không ảnh hưởng đến nhau khi code. Sau đó, hai người sẽ tiến hành gộp code của họ lại vào `master` khi họ code xong.

### 1.1 Tạo branch mới

Câu lệnh này sẽ tạo một nhánh mới dựa trên nhánh hiện tại

```bash
git branch TenNhanhMoi
```

2 câu lệnh dưới sẽ tạo một nhánh mới dựa trên nhánh hiện tại và chuyển sang nhánh mới luôn.

```bash
git checkout -b TenNhanhMoi
```

```bash
git switch -c TenNhanhMoi
```

`git switch` mới ra ở phiên bản Git 2.23. Các bạn dùng cái nào cũng được

### 1.2 List tất cả branch

Câu lệnh này sẽ cho bạn biết local repo của bạn hiện tại đang có bao nhiêu nhánh. Những nhánh mà câu lệnh `git branch` show ra là những nhánh mà bạn đã từng làm việc trên local. Có những nhánh đã có ở local mà bạn chưa làm việc (những nhánh này thường là do bạn pull hoặc fetch code về sẽ có) thì nó sẽ không hiện ở đây.

```bash
git branch
```

hoặc `git branch --list` đều như nhau

Nếu muốn thấy các remote branch

```bash
git branch -r
```

Nếu muốn thấy tất cả local và remote branch

```bash
git branch -a
```

### 1.3. Đổi tên branch

Nếu bạn tạo tên nhánh bị sai, bạn cũng có thể sửa lại tên nhánh hiện tại bằng cách

```bash
git branch -m TenMoi
```

Cách trên chỉ áp dụng khi nhánh hiện tại của bạn là nhánh sai và bạn muốn đổi tên nhánh hiện tại. Trong trường hợp bạn muốn đổi tên nhánh nào đó không nhất thiết là nhánh hiện tại thì bạn phải ghi rõ tên nhánh cũ và nhánh mới như dưới đây

```bash
git branch -m TenNhanhCu TenNhanhMoi
```

Các bạn đổi tên branch thì chỉ đổi được ở dưới local repo, nếu branch đó đã xuất hiện ở trên remote repo thì khi bạn push nó sẽ tạo một branch mới trên remote repo
cách khác phục:

- B1: Đổi tên local branch
  git branch -m old-name new-name

- B2: Push nhánh mới lên remote và thiết lập upstream
  git push origin new-name

- B3: Xoá nhánh cũ trên remote
  git push origin --delete old-name

- B4 (tuỳ chọn): Thiết lập lại upstream nếu cần
  git branch -u origin/new-name

### 1.4 Chuyển branch

Nếu bạn đơn giản chỉ muốn chuyển sang một nhánh trên local repo, 2 câu lệnh dưới đây đều được

```bash
git switch TenNhanh
```

```bash
git checkout TenNhanh
```

> **Lưu ý**: Nhánh phải có trên local repo thì mới chuyển được nhé, nếu nhánh đó có trên remote repo mà local chưa có thì bạn phải tiến hành cập nhật repo của bạn lại bằng câu lệnh `git fetch`.

### 1.5 Push một branch

Nếu local branch của bạn không tồn tại trên remote, chạy câu lệnh sau

```bash
git push -u origin localBranch
```

Hoặc câu lệnh này, nó sẽ giúp các bạn không cần gõ chính xác tên local branch

```bash
git push -u origin HEAD
```

> Head là tham chiếu đến đầu danh sách branch hiện tại

### 1.6 Xóa branch

Xóa branch ở local

```bash
git branch -D localBranchName
```

Xóa branch ở remote

```bash
git push origin --delete remoteBranchName
```

Hoặc bạn có thể dùng cú pháp rút gọn

```bash
git push origin :remoteBranchName
```

Nếu bạn gặp lỗi dưới đây thì có thể ai đó đã xóa branch

```bash
error: unable to delete 'branchName': remote ref does not exist
error: failed to push some refs to 'git@repository_name'
```

Khi ai đó đã xóa một branch trên remote nhưng khi bạn gõ `git branch -r` vẫn show ra origin branch đó thì bạn cần thực hiện đồng bộ hóa bằng câu lệnh dưới đây.

```bash
git fetch -p
```

`-p` nghĩa là **"prune"**. Sau khi fetch, những branch không còn trên remote cũng sẽ xóa khỏi local repo của bạn.

### 1.7 Push code mà không cần origin

Nếu bạn để ý thì khi ở nhánh `master`, bạn push code lên orgin thì bạn chỉ cần `git push` là xong, không cần `git push origin master`. Nhưng nếu bạn ở nhánh khác ví dụ nhánh `feature` thì khi bạn push code lên `origin feature` thì phải `git push orgin feature` khá dài dòng và phải nhớ tên nhánh mệt mỏi.

Cách cải thiện khá đơn giản, bạn chỉ cần thêm option `-u` câu lệnh push là được, chỉ cần làm 1 lần, lần sau không cần làm với nhánh đó nữa.

```bash
git push -u origin feature
```

`-u` là short-hand của `--set-upstream`. Nó cho git biết rằng hãy tự kết nối nhánh `local feature` với `origin feature`

Làm 1 lần thôi, lần sau chỉ cần ở nhánh `feature` và nhấn `git push` là code tự lên.

> Tip: Nếu muốn xem những local branch đã kết nối với remote branch thì chỉ cần gõ `cat .git/config`

### git merge

Gộp các commit lại của 2 nhánh với nhau dựa trên thời gian các commit, sau khi gộp thì sẽ tạo ra một commit gộp sau cùng.

```bash
git merge branchTarget
```

Chúng ta có 3 nhánh:

- main
- Alpha: checkout từ nhánh main và thêm 2 commit D,E
- Beta: checkout từ nhánh main và thêm 2 commit là F,G

Thứ tự các commit theo chiều ngang được sắp xếp theo thời gian

```shell
   (main)
A--B-C---D--E (Alpha)
      \
       -F-----G (Beta)
```

Nếu ở nhánh Beta chúng ta muốn có những commit của nhánh Alpha (hay còn gọi là có code) thì ta sẽ tiến hành merge Alpha vào Beta nên ta thực hiện lệnh

```bash
git checkout Beta
git merge Alpha
```

Sơ đồ commit sẽ như thế này, các commit của Alpha sẽ xuất hiện trong Beta và được sắp xếp theo thứ tự thời gian. Ta sẽ thấy sự xuất hiện của một commit merge nữa phía sau cùng, commit merge này chứa tất cả những sự thay đổi của nhánh Beta sau khi merge nhánh Alpha vào.

```shell
   (main)
A--B-C---D--E (Alpha)
      \       \
       -F----G-M (Beta)
```

Bây giờ nhánh Beta đã có đầy đủ code của nhánh Alpha.

Nếu trong quá trình merge có bị conflict thì thao tác theo thứ tự

1. Tìm file conflict trong tab source và fix nó.
2. Sau khi fix hết các file bị conflict rồi thì dùng `git add .` hoặc add từng file
3. Tiến hành thêm commit cho những file vừa fix conflict bằng câu lệnh `git commit --no-edit`, nếu muốn edit commit thì `git merge --continue`, còn nếu muốn tự viết commit thì cứ `git commit -m 'thông điệp'` như thường
4. push hết lên với câu lệnh `git push`

Nếu merge xong rồi mới nhận ra mình không cần merge nữa thì có thể dùng `git reset --hard <commit-của bạn-trước-khi-merge>`. Cách này áp dụng cho cả đã push code hay chưa push đều được.

> Tips: `git pull` là sự kết hợp giữa `git fetch` và `git merge`. Trong thực tế thì mình dùng `git pull` chứ ít khi dùng `git merge` vì mình luôn muốn fetch data mới nhất từ origin về rồi mới merge.
>
> Bạn cũng có thể tạo merge request (một số chỗ gọi là pull request) bằng git server như Github thay vì dùng câu lệnh. Những merge request này được tạo ra để phục vụ việc team review và approve code.

### git rebase

Lấy tất cả các commit của `branchTarget` làm lại base (gọi là re-base) cho mình, các commit của mình mà khác so với `branchTarget` sẽ bị thay đổi hash và thêm vào sau cùng.

```bash
git rebase branchTarget
```

```txt
   (main)
A-B-C-----D (feature)
     \
      --E----F (feature/Login)
```

```bash
git checkout feature/Login
git rebase feature
```

```txt
   (main)(feature)
A-B-C-----D--E'----F' (feature/Login)
```

Nếu những commit của branch `feature/Login` và `feature` đã xuất hiện trên remote thì có thể sau khi rebase `feature` vào `feature/Login` thì bạn sẽ gặp một hiện tượng đó là git sẽ báo bạn kiểu như là **"Current branch feature/Login is 2 commit behind, 3 commit ahead origin/feature/Login"**.

Giải thích:

- `feature/Login` ở local chỉ giống với `origin/feature/Login` đoạn `A-B-C` thôi =>
  `feature/Login` đứng sau 2 commit của `origin/feature/Login` là `E-F`. Ngoài ra `feature/Login` có 3 commit trước so với `origin/feature/Login` là `D--E'----F'`

- Git sẽ yêu cầu bạn pull code từ origin `feature/Login` về trước khi push lên. Mọi thao tác làm thay đổi lịch sử Git trên origin như xóa commit, đổi mã hash commit thì Git đều không cho push mà yêu cầu pull về trước. Nếu pull code về thì ta lại có commit `E-F` khá thừa thải vì đã có `E'-F'` rồi, để tránh hiện tượng này thì bạn có thể push force `git push -f` luôn.

Git rebase sẽ làm Git Graph của bạn trông đẹp, dễ nhìn, đỡ phải phân tách nhánh rồi gộp như bên rebase. Nhưng cái gì cũng có cái giá của nó. Bạn phải sử dụng `git push -f` sau cùng, và câu lệnh này **rất nguy hiểm** nếu bạn đang thực hiện trên một branch nhiều người dùng.

Ở trên mình đang thực hiện trên branch `feature/Login`, mình rebase `feature` vào. Nếu mình làm ngược lại là rebase `feature/Login` vào `feature` thì rất nguy hiểm.

### Hãy cẩn thận với git rebase

**Không nên rebase những nhánh khác vào nhánh tổng (nhánh có nhiều người làm gốc để tạo nhánh con, nhánh được chia sẻ bởi nhiều người).** Ví dụ bạn đang ở nhánh `master`, bạn muốn có code của nhánh `feature/Login` và bạn thực hiện

```bash
git checkout master
git rebase feature/Login
```

Lúc này thì base lịch sử commit của nhánh `master` sẽ bị **thay thế**. Nó sẽ lấy base là nhánh `feature/Login` và đặt những commit mới của `master` ra sau cùng, điều này không tốt chút nào với một nhánh tổng. Việc **thay thế** base lịch sử commit của `master` sẽ gây khó khăn trong việc revert tính năng Login, bạn phải `git revert` tất cả commit của tính năng Login từng cái một.

Khi rebase thì phải push force, mà push force rất nguy hiểm, nhất là trên nhánh tổng. Vì nó sẽ override code của người khác đã commit trên nhánh tổng đó.

Nhưng nó sẽ là an toàn nếu bạn đang ở nhánh `feature/Login` (đây là nhánh chỉ có mỗi 1 mình bạn đảm nhận code) và bạn muốn có code mới nhất của nhánh `master`, bạn thực hiện

```bash
git checkout feature/Login
git rebase master
```

Ưu điểm rebase:

- Tạo một đường thằng commit sạch sẽ, dễ nhìn
- Nếu làm trên nhánh cá nhân thì sẽ phù hợp

Khuyết điểm

- Nếu rebase trên branch chung thì sẽ rất nguy hiểm vì có thể làm mất code người khác
- Dùng push force có thể làm mất code nếu không để ý
- Muốn undo rebase thì không phải chuyện đơn giản. Nếu bạn rebase trên máy bạn thì bạn có thể undo bằng cách sử dụng `git reflog` và `git reset` nhưng nếu bạn clear local repo hoặc bạn phải thực hiện undo rebase trên máy khác thì bạn phải dùng `git revert` để hoàn tác từng commit.

Cách an toàn nhất trong mọi trường hợp là cứ dùng `git merge` đi, mặc dù merge nó sẽ tạo ra thêm 1 commit merge và lịch sử commit của branch đó sẽ bị thêm khá nhiều commit xen kẻ của người khác làm cho bạn rối nhưng ít ra nó sẽ không làm cho bạn bị mất code.

### git fetch

Phổ biến nhất là chỉ cần gõ `git fetch`, nó sẽ load về local tất cả những branch, commit hiện có.

### git remote

Lệnh `git remote` cho phép tạo, xem, xóa kết nối với các repo.

Để liệt kê các liên kết

```bash
git remote
```

> Khi lấy một remote repo bằng câu lệnh `git clone`, mặc định repo tải về có liên kết với tên `origin` chứa địa chỉ tham chiếu đến remote repo nó tải về

Hiển thị thông tin chi tiết hơn, có thêm đường dẫn đến remote Repo

```bash
git remote -v
```

Tạo một liên kết

```bash
git remote add TenRemote url
```

Xóa một địa chỉ remote

```bash
git remote rm TenRemote
```

Đổi tên địa chỉ remote

```bash
git remote rename TenCu TenMoi
```

Xem thông tin về Remote

```bash
git remote show origin
```

## Các kỹ thuật hoàn tác thay đổi với Git

### Hoàn tác những file local change về trạng thái ban đầu

Dùng với terminal

1. Chạy `git status` bạn sẽ thấy những file bị change (hoặc cũng có thể coi trong VS Code)

2. Chạy câu lệnh dưới, thay thế `filename.html` thành file path của bạn

   ```bash
   git checkout filename.html
   ```

   Hoặc chúng ta có lệnh `git restore` chuyên để làm việc với các file trong working tree. Nếu không truyền gì thì mặc định là `-W` hoặc `--worktree`

   ```bash
   git restore filename.html
   ```

   ```bash
   git restore filename.html -W
   ```

   ```bash
   git restore filename.html --worktree
   ```

Dùng với VS Code

Vào Source Control, hover vào file và click vào icon "Discard Change" là được.

### Hoàn tác những file ở khu vực Staging về khu vực làm việc

Ngược lại với `git add` thì `git reset` sẽ đưa một hoặc nhiều file ở khu vực **Staging** trở về khu vực code.

Dùng Terminal

Khôi phục 1 file từ staging về khu vực code

```bash
git reset index.html
```

Khôi phục nhiều file

```bash
git reset index.html app.js
```

Khôi phục tất cả các file.

```bash
git reset .
```

Tương tự với `git reset` ta có `git restore -S` hoặc `git restore --staged`

Dùng VS code

Vào Source Control, hover vào file và click vào icon dấu "-" "Unstage changes" là được.

### Hoàn tác những file nào đó từ những commit trong quá khứ

Bạn chỉ cần nhớ những công việc liên quan đến hoàn tác file thì `git restore` luôn rất mạnh. Để hoàn tác file nào đó thuộc commit nào đó thì chỉ cần tìm mã hash commit đó rồi chạy command

```bash
git restore --source=3c13cc8 TenFile
```

Câu lệnh trên sẽ đưa file đó về trạng thái Changes, một trạng thái an toàn nhất.

Áp dụng với VS Code

Với UI VS code thì đơn giản hơn nhiều, bạn vào "Source Control", bạn có thể tìm file đó trong khu vực COMMITS hoặc tìm lịch sử chỉnh sửa file đó trong FILE HISTORY. Tại đây bạn có thể xem được các file đó đã thay đổi như thế nào trong quá khứ. Sau đó click chuột phải vào file đó chọn "Restore (Checkout)" nó sẽ đưa file bạn về trạng thái Staging

### Hoàn tác commit bằng reset (đã push hay chưa đều được)

Nếu bạn có những local commit mà bạn không thích, chúng chưa được push thì bạn có thể reset để commit lại tốt hơn.

Dùng terminal

1. Mỗi commit có một mã hash khác nhau. Bạn cần tìm mã hash của cái commit mà bạn thấy ổn cuối cùng (cái mà bạn muốn hoàn tác trở về, Ví dụ bạn có commit là `A`, `B`. Bạn muốn hoàn tác commit `A` thì bạn phải trở về ngay tại commit `B`). Ở đây có một số cách tìm như
   - Trong commit history của Github
   - Trong terminal bằng cách gõ câu lệnh `git log --oneline`
   - Trong VS code
2. Khi bạn biết cái commit ổn cuối cùng rồi thì chỉ cần chạy câu lệnh dưới (thay thế `2f5451f` bằng commit hash của bạn)

   Bây giờ sẽ có một số option cho bạn, những option dưới đây sẽ xóa các commit và đưa những file thay đổi về những trạng thái khác nhau, mình sẽ sắp xếp theo thứ tự độ an toàn giảm dần

   - Đưa những file thay đổi về trạng thái **Changes**. **Đây là option an toàn nhất**

   ```bash
   git reset 2f5451f
   ```

   hoặc thêm `--mixed`. Default `git reset` không thêm là mode `--mixed`

   ```bash
   git reset --mixed 2f5451f
   ```

   - Đưa những file thay đổi về trạng thái **Staging**

   ```bash
   git reset --soft 2f5451f
   ```

   - Đưa những thay đổi về tình trạng như chưa có gì thay đổi (nguy hiểm nhất vì nó sẽ làm mất code của bạn).

   ```bash
   git reset --hard 2f5451f
   ```

   - Giống `--hard` ngoại trừ việc nó sẽ giữ lại những thay đổi của những file (đã từng commit trong quá khứ) mà bạn đang edit dỡ chưa add tại **Changes**.

   Ví dụ mình đang edit lại file `index.html` đã tồn tại từ trước, và hiện tại nó đang xuất hiện ở khu vực **Changes**, mình thực hiện reset với `--merge` thì file này nó vẫn được giữ nguyên những thay đổi ở khu vực **Changes**. `--hard` thì nó xóa luôn những thay đổi đó nên nếu không cẩn thận có thể làm mất code.

   ```bash
   git reset --merge 2f5451f
   ```

3. Dùng `git push -f` để push những thay đổi

Dùng VS code (Phải cài Git Lens)

Ở đây thì có 1 vài cách

- Mở Source Control lên, Vào khu vực COMMITS, hover chuột vào commit muốn hoàn tác và click vào icon Undo Commit là được. Nó sẽ đưa những thay đổi về khu vực Staging. **Cách này chỉ có tác dụng với commit gần nhất**

- Mở terminal Git Bash trong terminal của VS Code. Gõ `git log --oneline` rồi Ctrl + Click vào mã hash commit mà muốn trở về. Tiếp theo chọn "Reset branch to commit". Sau đó chọn option reset tương tự như trên terminal

#### Lưu ý khi dùng `git reset`

Nếu bạn reset về những commit thuộc branch khác thì bạn có thể bị mất những commit trên branch của bạn. Vậy nên hãy cẩn thận, áp dụng **Git Graph** để cho chắc ăn.

### Hoàn tác commit bằng revert

1. Chạy `git status` và chắc rằng working tree của bạn clean
2. Mỗi commit có một mã hash, tìm mã hash đó
3. Khi bạn tìm thấy mã hash rồi thì chạy câu lệnh dưới (thay thế `2f5451f` bằng mã hash của bạn)

   ```bash
   git revert 2f5451f --no-edit
   ```

   **Note:** `--no-edit` option ngăn git hỏi bạn edit một commit message. Nếu bạn không thêm option đó, nó sẽ mở 1 file bằng Code Editor của bạn để cho bạn edit lại cái message mặc định khi revert, bạn edit lại message rồi close file đi là được. (Nếu nó là VIM editor thì để thoát khỏi VIM, ấn `:` trong command mode, sau đó nhấn `q` để thoát, và cuối cùng nhấn **Return** (Mac) hoặc **Enter** (Windows))

4. Thao tác này sẽ tạo một commit mới đối lập với commit hiện có, hoàn tác các file về trạng thái trước đó như thể nó chưa bao giờ được thay đổi.
5. Nếu bạn làm việc với một remote repo, bạn cần push những thay đổi đó bằng `git push`

Lưu ý dùng `git revert -m 1 <merge-commit>` để revert commit merge.

Mỗi commit đều có commit cha (commit trước nó). Những commit thường thì sẽ có 1 cha, nhưng merge commit thì có nhiều hơn 1 cha. `-m 1` là chọn commit cha đầu tiên (commit cha đầu tiên lúc nào cũng là commit trên branch của hiện tại của bạn, hay còn gọi là branch được merge). Bạn có thể xem những commit cha bằng cách gõ `git log` và những commit cha sẽ được liệt kê trong mục `Merge` (hoặc xem trong **Git Graph**)

### Gộp commit đã push (hoặc chưa push đều được)

Để gộp các commit đã push thì chúng ta dùng rebase interactive với squash. Với squash thì nó sẽ neo commit của bạn vào commit phía trước.

Ví dụ mình muốn gộp 3 commit gần nhất lại thành 1

Đầu tiên mình sẽ kiểm tra `git log --oneline`

```bash
8c6fb49 (HEAD -> bugfix, origin/bugfix) 1
44fa9a0 (origin/main, origin/HEAD, main) tm3
9bd70cc (origin/t3, t3) t3
16bc7f3 update main
6804903 (origin/t2, t2) t2 app.js
3e233a4 t2
```

Tiếp theo mình sẽ chạy câu lệnh

```bash
git rebase -i HEAD~3
```

Lúc này nó sẽ xuất hiện 1 file để bạn edit như thế này. Có thể bạn sẽ thấy thứ tự 3 commit gần đây hơi ngược so với khi dùng `git log`, nhưng không sau, kệ nó đi. Bạn chỉ cần biết thứ tự của nó theo chiều nào là được rồi.

Bây giờ mình sẽ gộp commit có message là `1` và `tmp3` vào t3. Lưu ý: Bạn không thể gộp `t3` và `tm3` vào `1` được bởi vì `1` đứng phía sau `t3` và `tm3`. Tức là chỉ được gộp những commit phía sau vào commit phía trước thôi.

```bash
pick 9bd70cc t3
pick 44fa9a0 tm3
pick 8c6fb49 1

# Rebase 16bc7f3..8c6fb49 onto 16bc7f3 (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
#                    commit's log message, unless -C is used, in which case
#                    keep only this commit's message; -c is same as -C but
#                    opens the editor
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified); use -c <commit> to reword the commit message
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
```

Mình sẽ edit lại như thế này và lưu lại và tắt đi, sửa `pick` thành `s` (hoặc `squash` cũng được)

```bash
pick 9bd70cc t3
s 44fa9a0 tm3
s 8c6fb49 1

# Rebase 16bc7f3..8c6fb49 onto 16bc7f3 (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
#                    commit's log message, unless -C is used, in which case
#                    keep only this commit's message; -c is same as -C but
#                    opens the editor
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified); use -c <commit> to reword the commit message
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
```

Lúc này nó sẽ xuất hiện 1 file nữa để mình edit

```bash
# This is a combination of 3 commits.
# This is the 1st commit message:

t3

# This is the commit message #2:

tm3

# This is the commit message #3:

1

2

3

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Sun Jul 24 17:30:29 2022 +0700
#
# interactive rebase in progress; onto 16bc7f3
# Last commands done (3 commands done):
#    squash 44fa9a0 tm3
#    squash 8c6fb49 1
# No commands remaining.
# You are currently rebasing branch 'bugfix' on '16bc7f3'.
#
# Changes to be committed:
#	modified:   readme.md
#	new file:   t3.md
#	new file:   tm3.md
#
```

Mình sẽ edit lại cái commit message `t3` thành `gộp 3 commit lại` và lưu, đóng file.

```bash
# This is a combination of 3 commits.
# This is the 1st commit message:

gộp 3 commit lại

# This is the commit message #2:

tm3

# This is the commit message #3:

1

2

3

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Sun Jul 24 17:30:29 2022 +0700
#
# interactive rebase in progress; onto 16bc7f3
# Last commands done (3 commands done):
#    squash 44fa9a0 tm3
#    squash 8c6fb49 1
# No commands remaining.
# You are currently rebasing branch 'bugfix' on '16bc7f3'.
#
# Changes to be committed:
#	modified:   readme.md
#	new file:   t3.md
#	new file:   tm3.md
#
```

Bây giờ chỉ cần `git push -f` là xong.

Và tất nhiên sau khi rebase thì hash của commit sẽ bị thay đổi.

```bash
d88d8e9 (HEAD -> bugfix, origin/bugfix) gộp 3 commit lại
16bc7f3 update main
6804903 (origin/t2, t2) t2 app.js
3e233a4 t2
```

### Sửa message một commit đã được push

Chúng ta cũng dùng rebase interactive nhưng thay vì `squash` thì chúng ta chọn `reword` hoặc `r`

> Sửa một message của commit sẽ làm thay đổi hash của commit đó và tất cả những commit phía sau nó. Sau khi sửa thì phải push force

### Thêm thay đổi vào commit cuối cùng

Thêm file vào staging

```bash
git add .
```

Chạy câu lệnh

```bash
git commit --amend
```

Nó sẽ xuất hiện 1 file để bạn có thể edit lại commit message mới nhất, sau đó lưu và tắt file đó đi.

Lệnh `--amend` sẽ làm thay đổi mã hash của commit mới nhất, vì thế sau đó bạn phải dùng `git push -f` để push lên.

### Sự khác nhau giữa `git reset`, `git restore`, `git revert`

- git reset chuyên reset con trỏ HEAD về một trạng thái nhất định
- git restore chuyên khôi phục những file trong working tree
- git revert chuyên khôi phục những commit những sẽ tạo ra một commit revert.

3 thằng này được quy định là thế nhưng trong số chúng có những tính năng mà thằng khác vẫn làm được. Vậy nên dùng quen thằng nào thì dùng thằng đó, không cần quá cứng nhắc.

## Git stash

Dùng khi muốn lưu lại các thay đổi chưa commit, rất hữu dụng khi đang làm dỡ branch hiện tại mà lại muốn chuyển sang branch khác.

Để lưu toàn bộ thay đổi thì dùng

```bash
git stash
```

Để show toàn bộ thay đổi

```bash
git stash list
```

Kết quả sẽ như thế này

```bash
stash@{0}: WIP on Register: 8373b84 Hoàn thành register page
stash@{1}: WIP on Register: 812sd81 Tạo file a.md
```

Để show chi tiết toàn bộ thay đổi

```bash
git stash list -p
```

Để xem chi tiết stash vị trí thứ 0

```bash
git stash show stash@{0} -p
```

Để apply lại thay đổi stash 0

```bash
git stash apply stash@{0}
```

Để xóa một stash

```bash
git stash drop stash@{1}
```

Để xóa toàn bộ stash

```bash
git stash clear
```

## Khi nào Git sẽ bắt chúng ta pull code về trước khi push lên

Khi origin branch có những commit mà local branch chúng ta không có. Điều này sảy ra khi

- Mã hash commit bị thay đổi
- Chúng ta đã xóa những commit trên local branch

Nếu chúng ta tin rằng local branch của chúng ta là đúng, origin branch hãy cập nhật đúng theo local branch thì cứ dùng `git push -f` (nhưng phải để ý branch, không nên force trên branch tổng)

Có một option an toàn hơn `--force` là `--force-with-lease`. `--force-with-lease` chỉ cho phép override những commit của bạn thôi, nếu có những commit của người khác thì nó sẽ không cho push.

## Git Flow

Git flow là quy trình làm việc với Git, cách thiết kế các nhánh khác nhau để merge lại sao cho hạn chế những lỗi hay conflict không đáng có.

![Git flow](./gitflow.png)

- **master**: Là nhánh default, đây là nơi chứa source chính thứ khi release sản phẩm ra cộng đồng.

- **hotfixes**: Nhánh này được checkout từ **master**, để sửa nhanh những lỗi của nhánh **master**. Sau khi sửa xong thì sẽ merge lại vào **master**. Bởi vì chúng ta không nên thay đổi code trực tiếp trên nhánh **master**, rất nguy hiểm đến sản phẩm đang chạy production.

- **release**: Nhánh này là nơi các tính năng đã hoàn thành và đang trong quá trình test, sau khi test xong thì sẽ được merge vào **master**

- **develop**: Được checkout từ **master**, nhánh này là nơi chứa tất cả lịch sử commit của dự án. Khi dev đã hoàn thành xong một chức năng trên nhánh feature thì sẽ được merge vào nhánh **develop**, Leader sẽ review và sẽ tiến hành merge **develop** vào release để cho tester test tính năng đó.

- **feature**: Được checkout từ **develop**, **feature** ở đây có thể là **feature/login**, **feature/register**, **feature/cart**. Sau khi hoàn thành một feature sẽ tiến hành merge vào **develop**.

Trên đây là một git flow cơ bản, tùy dự án sẽ có một số branch khác phục vụ những môi trường khác nhau như **release-qc** cho tester test, **release-beta** cho người dùng test.

### Nhưng nguyên tắc để dùng Git an toàn

1. Merge branch nhỏ vào branch tổng thành **hãy tạo merge request**. Ví dụ merge **feature/Login** vào **develop**

   - Giúp cho Leader và các thành viên trong team có thể review code bạn và comment những đoạn code không hợp lý

   - Lưu lại lịch sử code của bạn (bao gồm cả commit), phục vụ việc kiểm tra sau này nếu dự án có vấn đề

   - Là nơi đánh giá code của các thành viên trong team, mọi người có thể học hỏi cách code lẫn nhau. Sau này nếu công ty có đánh giá nhân viên thì có thể xem lại cái merge request này để xem chất lượng code của nhân viên đó.

2. **Xử lý conflict code**

   - Để hạn chế conflict thì hãy chia nhỏ file, chia nhỏ code ra.

   - Thường xuyên cập nhật local branch để mới nhất so với remote branch bằng cách `git pull`.
     Ví dụ mình code ở branch **feature/Login**, để hạn chế việc xử lý conflict khi mình tiến hành merge **feature/Login** vào **develop** thì trong quá trình mình code, mình thường hay `git pull origin develop` để code của mình luôn mới.

   - Khi xuất hiện conflict thì hãy lựa chọn các option một cách cẩn thận, nên xem xét kêu gọi những người liên quan đến conflict để cùng giải quyết.

# Git Merge, Pull và Checkout - Giải thích chi tiết có ví dụ hình minh họa

## 1. Git Merge

`git merge` dùng để hợp nhất các thay đổi từ một nhánh khác vào nhánh hiện tại.

### 1.1 Fast-forward merge

- **Điều kiện:** Nhánh hiện tại không có commit nào mới so với nhánh được merge (tức là nó là tổ tiên trực tiếp của nhánh được merge).
- **Kết quả:** Git chỉ di chuyển con trỏ (HEAD) của nhánh hiện tại lên commit cuối cùng của nhánh được merge, không tạo commit mới. ID commit không thay đổi.
- **Lệnh:**
  ```bash
  git checkout main
  git merge feature
  ```
- **Ví dụ minh họa:**
  Trước khi merge:

  ```
  main:    A---B

  feature:           C---D
  ```

  Giả sử C = B, tức là feature được tạo từ B => đúng điều kiện fast-forward.
  Sau khi merge (Fast-forward):

  ```
  main:    A---B---C---D
  ```

  - HEAD của `main` chỉ "chuyển tới" HEAD của `feature`.
  - Không có commit mới được tạo.

### 1.2 Merge commit (no-ff)

- **Dùng khi:** Muốn ghi lại rõ ràng thời điểm merge bằng một commit riêng.
- **Lệnh:**
  ```bash
  git merge --no-ff feature
  ```
- **Ví dụ minh họa:**
  Trước:
  ```
  main:    A---B
                 \
  feature:       C---D
  ```
  Sau khi merge (no-ff):
  ```
  main:    A---B---------M
                 \       /
                  C---D
  ```
  `M` là commit merge ghi nhận cả 2 nhánh.

### 1.3 Squash merge

- **Mục đích:** Gom toàn bộ các commit trong nhánh được merge thành một commit duy nhất.
- **Lệnh:**
  ```bash
  git merge --squash feature
  git commit -m "Thêm tính năng X"
  ```
- **Ví dụ minh họa:**
  Trước:
  ```
  main:    A---B
                 \
  feature:       C---D---E
  ```
  Sau khi squash:
  ```
  main:    A---B---S
  ```
  `S` là commit mới chứa toàn bộ thay đổi của C-D-E gom lại. Commit gốc C, D, E không được giữ lại.

## 2. Git Pull từ nhánh khác

`git pull` thực chất là tổ hợp của `git fetch` và `git merge`. Để lấy và merge thay đổi từ nhánh khác:

```bash
git pull origin another-branch
```

- Nếu muốn merge theo dạng squash hoặc no-ff, cần dùng thủ công:
  ```bash
  git fetch origin
  git merge --no-ff origin/another-branch
  ```

## 3. Git Checkout

### 3.1 Chuyển sang nhánh khác

```bash
git checkout branch-name
```

- Dùng để chuyển ngữ cảnh làm việc sang một nhánh cụ thể.

### 3.2 Tạo nhánh mới và chuyển sang

```bash
git checkout -b new-branch
```

- Tạo mới nhánh và chuyển ngay sang nhánh đó.
- **Ví dụ minh họa:**
  ```
  A---B (main)
        \
         \ (new-feature)
          C
  ```

### 3.3 Checkout về 1 revision (commit cụ thể)

```bash
git checkout <commit-hash>
```

- Dùng để xem trạng thái repo ở một thời điểm cụ thể trong lịch sử.
- **Trạng thái `detached HEAD`:** Sau khi checkout về một commit cụ thể, bạn không còn ở trên bất kỳ nhánh nào. HEAD đang "tách rời" (detached) và trỏ trực tiếp vào commit đó.
- Nếu bạn sửa file và commit ở trạng thái này, Git sẽ tạo commit mới nhưng **không thuộc về nhánh nào**. Khi quay lại nhánh cũ, những thay đổi đó **sẽ không còn**, trừ khi bạn lưu lại bằng cách tạo nhánh mới.

- **Ví dụ:**
  Giả sử bạn có lịch sử:

  ```
  A---B---C---D---E (main)
          ^
          |
         HEAD (checkout về commit C)
  ```

  Bạn đang ở trạng thái `detached HEAD`. Nếu bạn sửa `file.txt`, sau đó:

  ```bash
  git add file.txt
  git commit -m "Thay đổi ở commit C"
  ```

  => Git tạo commit mới, nhưng không thuộc nhánh `main`.

- **Giải pháp để lưu lại:** Nếu muốn lưu các thay đổi này:
  ```bash
  git switch -c temp-branch-from-C
  ```
  => Bạn đã tạo một nhánh mới chứa commit đó.

### 3.4 Trở lại nhánh cũ

```bash
git checkout -
```

- Quay lại nhánh trước đó bạn đang làm việc.

## Tổng kết

| Tác vụ                             | Lệnh                                       | Mục đích                                |
| ---------------------------------- | ------------------------------------------ | --------------------------------------- |
| Merge thường (có thể fast-forward) | `git merge branch`                         | Hợp nhất code nếu không có thay đổi mới |
| Merge no-ff                        | `git merge --no-ff branch`                 | Tạo commit merge riêng biệt             |
| Merge squash                       | `git merge --squash branch` + `git commit` | Gom commit thành một                    |
| Pull từ nhánh khác                 | `git pull origin branch`                   | Lấy và merge thay đổi từ nhánh khác     |
| Checkout nhánh                     | `git checkout branch`                      | Chuyển sang nhánh khác                  |
| Tạo nhánh mới                      | `git checkout -b branch`                   | Tạo và chuyển sang nhánh mới            |
| Xem commit cũ                      | `git checkout <hash>`                      | Truy cập trạng thái ở commit cũ         |
| Quay lại nhánh trước               | `git checkout -`                           | Trở về nhánh trước đó                   |
