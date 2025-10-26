# K58KTP.BT2
# *Nguyễn Thị Xuân Phương_K225480106054*
## Nội dung bài tập 2
### 2.1. Cài đặt Apache web server:
- Vô hiệu hoá IIS: nếu iis đang chạy thì mở cmd quyền admin để chạy lệnh: iisreset /stop
- Download apache server, giải nén ra ổ D, cấu hình các file:
  + D:\Apache24\conf\httpd.conf
  + D:Apache24\conf\extra\httpd-vhosts.conf
  để tạo website với domain: fullname.com
  code web sẽ đặt tại thư mục: `D:\Apache24\fullname` (fullname ko dấu, liền nhau)
- sử dụng file `c:\WINDOWS\SYSTEM32\Drivers\etc\hosts` để fake ip 127.0.0.1 cho domain này
  ví dụ sv tên là: `Đỗ Duy Cốp` thì tạo website với domain là fullname ko dấu, liền nhau: `doduycop.com`
- thao tác dòng lệnh trên file `D:\Apache24\bin\httpd.exe` với các tham số `-k install` và `-k start` để cài đặt và khởi động web server apache.
  
<img width="412" height="287" alt="image" src="https://github.com/user-attachments/assets/d2d1959e-d344-453e-9f48-1095f0f43b6d" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5c5da0ee-6ee2-4f06-b994-da21d0ad7ef2" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9fea8c4d-b2f0-4ba3-8435-fc5c7d0bb8d8" />

### 2.2. Cài đặt nodejs và nodered => Dùng làm backend:
- Cài đặt nodejs:
  + download file `https://nodejs.org/dist/v20.19.5/node-v20.19.5-x64.msi`  (đây ko phải bản mới nhất, nhưng ổn định)
  + cài đặt vào thư mục `D:\nodejs`
- Cài đặt nodered:
  + chạy cmd, vào thư mục `D:\nodejs`, chạy lệnh `npm install -g --unsafe-perm node-red --prefix "D:\nodejs\nodered"`
  + download file: https://nssm.cc/release/nssm-2.24.zip
    giải nén được file nssm.exe
    copy nssm.exe vào thư mục `D:\nodejs\nodered\`
  + tạo file "D:\nodejs\nodered\run-nodered.cmd" với nội dung (5 dòng sau):
@echo off
REM fix path
set PATH=D:\nodejs;%PATH%
REM Run Node-RED
node "D:\nodejs\nodered\node_modules\node-red\red.js" -u "D:\nodejs\nodered\work" %*
  + mở cmd, chuyển đến thư mục: `D:\nodejs\nodered`
  + cài đặt service `a1-nodered` bằng lệnh: nssm.exe install a1-nodered "D:\nodejs\nodered\run-nodered.cmd"
  + chạy service `a1-nodered` bằng lệnh: `nssm start a1-nodered`

<img width="1232" height="656" alt="image" src="https://github.com/user-attachments/assets/0d2cb7b5-cbda-4228-be90-06798963b00a" />
<img width="1103" height="639" alt="image" src="https://github.com/user-attachments/assets/e3debcec-71b2-41cb-8e89-5faa779e716c" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c3b466c9-1c5c-44ed-8d4f-504c2a3b8a95" />

### 2.3. Tạo csdl tuỳ ý trên mssql (sql server 2022)
nhớ các thông số kết nối: ip, port, username, password, db_name, table_name

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/11da21a5-d327-430a-8d76-0dd0b38b3fce" />

### 2.4. Cài đặt thư viện trên nodered:
- truy cập giao diện nodered bằng url: http://localhost:1880
- cài đặt các thư viện: node-red-contrib-mssql-plus, node-red-node-mysql, node-red-contrib-telegrambot, node-red-contrib-moment, node-red-contrib-influxdb, node-red-contrib-duckdns, node-red-contrib-cron-plus
- Sửa file `D:\nodejs\nodered\work\settings.js` : 
  tìm đến chỗ adminAuth, bỏ comment # ở đầu dòng (8 dòng), thay chuỗi mã hoá mật khẩu bằng chuỗi mới
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "chuỗi_mã_hoá_mật_khẩu",
            permissions: "*"
        }]
    },   
   với mã hoá mật khẩu có thể thiết lập bằng tool: https://tms.tnut.edu.vn/pw.php
- chạy lại nodered bằng cách: mở cmd, vào thư mục `D:\nodejs\nodered` và chạy lệnh `nssm restart a1-nodered`
  khi đó nodered sẽ yêu cầu nhập mật khẩu mới vào được giao diện cho admin tại: http://localhost:1880
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/81299d65-6694-4ed9-893b-587046cc71d3" />
  <img width="1034" height="811" alt="image" src="https://github.com/user-attachments/assets/0793ca64-6c2a-426b-ada7-93eb3bfbc4a1" />

  ### 2.5. tạo api back-end bằng nodered:
- tại flow1 trên nodered, sử dụng node `http in` và `http response` để tạo api
- thêm node `MSSQL` để truy vấn tới cơ sở dữ liệu
- logic flow sẽ gồm 4 node theo thứ tự sau (thứ tự nối dây): 
  1. http in  : dùng GET cho đơn giản, URL đặt tuỳ ý, ví dụ: /timkiem
  2. function : để tiền xử lý dữ liệu gửi đến
  3. MSSQL: để truy vấn dữ liệu tới CSDL, nhận tham số từ node tiền xử lý
  4. http response: để phản hồi dữ liệu về client: Status Code=200, Header add : Content-Type = application/json
  có thể thêm node `debug` để quan sát giá trị trung gian.
- test api thông qua trình duyệt, ví dụ: http://localhost:1880/timkiem?q=thị
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ec3be92b-1993-4dcd-a100-02ed98e149ef" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/984ed5dc-f491-4c96-bb3f-2a00b0f92cde" />

### 2.6. Tạo giao diện front-end:
- html form gồm các file : index.html, fullname.js, fullname.css
  cả 3 file này đặt trong thư mục: `D:\Apache24\fullname`
  nhớ thay fullname là tên của bạn, viết liền, ko dấu, chữ thường, vd tên là Đỗ Duy Cốp thì fullname là `doduycop`
  khi đó 3 file sẽ là: index.html, doduycop.js và doduycop.css
- index.html và fullname.css: trang trí tuỳ ý, có dấu ấn cá nhân, có form nhập được thông tin.
- fullname.js: lấy dữ liệu trên form, gửi đến api nodered đã làm ở bước 2.5, nhận về json, dùng json trả về để tạo giao diện phù hợp với kết quả truy vấn của bạn.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/54bcca72-275f-446c-b932-37498a6848d8" />


### 2.7. Nhận xét bài làm của mình

Về quá trình cài đặt phần mềm và thư viện:
Em đã hiểu được quy trình cài đặt và cấu hình các phần mềm cần thiết cho dự án web, bao gồm Apache Web Server, Node-RED và các thư viện hỗ trợ. Quá trình này giúp em nắm rõ vai trò của từng thành phần: Apache để triển khai front-end, Node-RED để xây dựng back-end, và các gói thư viện JavaScript giúp xử lý giao tiếp giữa hai phần. Em cũng học được cách chỉnh sửa file cấu hình (httpd.conf, hosts) và thao tác cài đặt, khởi động dịch vụ Apache bằng dòng lệnh (httpd -k install, httpd -k start).

Về việc sử dụng Node-RED để tạo API back-end:
Em đã hiểu được cách sử dụng Node-RED để thiết kế luồng xử lý dữ liệu (flow) trực quan, trong đó mỗi node đảm nhận một chức năng cụ thể như nhận yêu cầu HTTP, xử lý dữ liệu và phản hồi kết quả cho client. Việc kết nối các node giúp em hình dung rõ cách một API hoạt động trong thực tế và cách triển khai nhanh chóng một REST API mà không cần viết quá nhiều mã lập trình.

Về cách front-end tương tác với back-end:
Em đã hiểu được nguyên lý giao tiếp giữa front-end và back-end thông qua giao thức HTTP. Từ giao diện HTML/JavaScript, em sử dụng phương thức fetch() để gửi yêu cầu đến API được tạo bằng Node-RED, sau đó nhận phản hồi (dữ liệu JSON) và hiển thị kết quả trên trang web. Quá trình này giúp em nắm rõ vai trò của API trong việc trung gian truyền dữ liệu giữa giao diện người dùng và hệ thống xử lý phía server.

Tự đánh giá:
Qua bài thực hành, em đã nắm được quy trình cơ bản để xây dựng một ứng dụng web hoàn chỉnh gồm cả front-end và back-end. Tuy vẫn còn một số lỗi nhỏ khi cấu hình và kết nối ban đầu, nhưng sau khi kiểm tra log và chỉnh sửa, hệ thống đã hoạt động ổn định. Bài học giúp em củng cố kiến thức về web server, domain nội bộ (localhost), và kỹ năng làm việc với API trong môi trường thực tế.









