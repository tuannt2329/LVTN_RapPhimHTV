# Ứng dụng đặt vé version 1 -- android only

Installation:
NOTE: chỉnh sửa: phần paypal đang gán địa chỉ ip cứng
~~~~
Bạn cần một AVD ( cài bên ngoài or dùng của android studio )
Mở project
Vào src/constants/index.js sửa lại API thành địa chỉ IPv4 của máy
npm install

Run
Webstorm: chuột phải vào 2 folder android và ios chọn Mask Direction as --> Exclusion
Nhấn Run ( Nếu Run invisible, Chọn configuration bên cạnh, chọn dấu + chọn react-native--> APPLY --> OK)

VS Code: mở 2 terminal
react-native start
react-native run-android

Cần cài thêm react-native cli nếu được yêu cầu

![alt text]()
~~~~

Nếu quá trình chạy có lỗi, thử cách phổ biến nhất:
`cd android`
`gradlew clean`
`Run `lại

**Tạo file apk**
...
 react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

 cd android gradlew assembleRelease

 trong file xml network configuration sua domain thanh domain can fetch (http)