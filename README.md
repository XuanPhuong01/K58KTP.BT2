# K58KTP.BT2
# Nguyễn Thị Xuân Phương_K225480106054
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
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/81299d65-6694-4ed9-893b-587046cc71d3" />
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
  <img width="1034" height="811" alt="image" src="https://github.com/user-attachments/assets/0793ca64-6c2a-426b-ada7-93eb3bfbc4a1" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ec3be92b-1993-4dcd-a100-02ed98e149ef" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/54bcca72-275f-446c-b932-37498a6848d8" />
![Uploading image.png…]()









