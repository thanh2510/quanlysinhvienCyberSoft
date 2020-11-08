// console.log(axios);
// // ket noi du lieu backend dua vao thu vien axios 
// var layDanhSachSinhVienAPI = function(){
//     // tao ra 1 object chua cac thuoc tinhs backend yeu cau (url, method)
//     var objectAjax = {
//         url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', 
//         method: 'GET' // Backend cung cap 
//     }
//     var promise = axios(objectAjax); // goi den backend lay data 
//     // xu ly cho truong hop goi thanh cong
//     promise.then(function(result){
//         console.log('kqua:', result.data);
//         renderTable(result.data);
//     });
//     promise.catch(function(error){
//         console.log(error);
//     })
// }


// var renderTable = function(mangSinhVien){
//     var noiDungTable = '';
//     for(var i=0; i<mangSinhVien.length; i++){
//         var sv = new SinhVien();
//         sv.maSinhVien = mangSinhVien[i].maSinhVien;
//         sv.tenSinhVien = mangSinhVien[i].tenSinhVien;
//         sv.diemToan = mangSinhVien[i].diemToan;
//         sv.diemLy = mangSinhVien[i].diemLy;
//         sv.diemHoa = mangSinhVien[i].diemHoa;
//         sv.diemRenLuyen = mangSinhVien[i].diemRenLuyen;
//         sv.loaiSinhVien = mangSinhVien[i].loaiSinhVien;
//         sv.email = mangSinhVien[i].email;
//         noiDungTable +=`
//         <tr> 
//             <td>${sv.maSinhVien}</td>
//             <td>${sv.tenSinhVien}</td>
//             <td>${sv.email}</td>
//             <td>${sv.xepLoai()}</td>
//             <td>${sv.tinhDiemTrungBinh()}</td>
//             <td><button class="btn btn-danger">Xóa</button></td>
//             <td><button class="btn btn-info" >Sua</button></td>
//         </tr>
//         `
//         document.querySelector('#tableSinhVien').innerHTML= noiDungTable;
//     }
// }

// layDanhSachSinhVienAPI();


// // chuc nang them sinh vien luu tru vao server thong qua api backend
// document.querySelector('#btnXacNhan').onclick = function(){
//     var  sv = new SinhVien();
//     sv.maSinhVien = document.querySelector('#maSinhVien').value;
//     sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
//     sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
//     sv.diemToan = document.querySelector('#diemToan').value;
//     sv.diemLy = document.querySelector('#diemLy').value;
//     sv.diemHoa = document.querySelector('#diemHoa').value;
//     sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
//     sv.email = document.querySelector('#email').value;
//     console.log(sv);
//     // dung axios dua du lieu ve server thong qua api backend cung cap
//     var promise = axios({
//         url:'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien', 
//         method:'POST',
//         data: sv
//         // du lieu gui di ( luu ys: du lieu gui di phai dung format du lieu cua backend yeu cau)
//     });
//     promise.then(function(result){
//         console.log('kqua:', result.data);
//         layDanhSachSinhVienAPI();
      
//     });
//     promise.catch(function(error){
//         console.log(error.response.data);
//     })
// }
// console.log(axios);

// Kết nối dữ liệu backend dựa vào thư viện axios
var svService = new SinhVienService();
var layDanhSachSinhVienApi = function () {
    var promise = svService.layThongTinSinhVien();
    promise.then(function (result) {
        console.log('kết quả', result.data)
        // Lấy dữ liệu sever trả về gọi hàm tạo table
        rednerTable(result.data)
    });
    // xử lý cho trường hợp thất bại
    promise.catch(function (error) {
        console.log(error);
    });
}
// var layDanhSachSinhVienApi = function () {
//     // tạo ra 1 object chứa các thuộc tính backend yêu cầu (url, method) 
//     var objectAjax = {
//         url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //BE cung cấp
//         method: 'GET' // backend cung cấp
//     }

//     var promise = axios(objectAjax); // gọi đến backend lấy data

//     // xử lý cho trường hợp gọi thành công
//     promise.then(function (result) {
//         console.log('kết quả', result.data)
//         // Lấy dữ liệu sever trả về gọi hàm tạo table
//         rednerTable(result.data)
//     });

//     // xử lý cho trường hợp thất bại
//     promise.catch(function (error) {
//         console.log(error);
//     });
// }

var rednerTable = function (mangSinhVien) {
    var noiDungTable = "";
    for (var i = 0; i < mangSinhVien.length; i++) {
        var sv = new SinhVien();
        sv.maSinhVien = mangSinhVien[i].maSinhVien;
        sv.tenSinhVien = mangSinhVien[i].tenSinhVien;
        sv.diemToan = mangSinhVien[i].diemToan;
        sv.diemLy = mangSinhVien[i].diemLy;
        sv.diemHoa = mangSinhVien[i].diemHoa;
        sv.diemRenLuyen = mangSinhVien[i].diemRenLuyen;
        sv.loaiSinhVien = mangSinhVien[i].loaiSinhVien;
        sv.email = mangSinhVien[i].email;
        // tạo ra các tr chứa thông tin sinh viên tương ứng
        noiDungTable += `
        <tr>
            <td>${sv.maSinhVien}</td>
            <td>${sv.tenSinhVien}</td>
            <td>${sv.email}</td>
            <td>${sv.tinhDiemTrungBinh()}</td>
            <td>${sv.xepLoai()}</td>
            <td>
                <button class="btn btn-danger" onclick = "xoaSinhVien('${sv.maSinhVien}')">Xóa</button>
                <button class="btn btn-primary" onclick = "suaSinhVien('${sv.maSinhVien}')">Chỉnh sửa</button>
            </td>
        </tr>
        `;
    }
    document.querySelector("#tableSinhVien").innerHTML = noiDungTable;
}

layDanhSachSinhVienApi();



// ---- Chức năng thêm sinh viên lưu trữ vào sever thông qua api backend ----

document.querySelector("#btnXacNhan").onclick = function () {
    // Lấy dữ liệu từ người dùng nhập vào
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector("#maSinhVien").value;
    sv.tenSinhVien = document.querySelector("#tenSinhVien").value;
    sv.loaiSinhVien = document.querySelector("#loaiSinhVien").value;
    sv.diemToan = document.querySelector("#diemToan").value;
    sv.diemLy = document.querySelector("#diemLy").value;
    sv.diemHoa = document.querySelector("#diemHoa").value;
    sv.diemRenLuyen = document.querySelector("#diemRenLuyen").value;
    sv.email = document.querySelector("#email").value;
    console.log("Sinh Vien", sv);
    //  Dùng axios đưa dữ liệu về sever thông qua api backend cung cấp

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien', //API  backen cung cấp
        method: 'POST', // giao thức backend cung cấp
        data: sv // Dữ liệu gửi đi (lưu ý: dữ liệu gửi đi phải đúng format dữ liệu của backend yêu cầu)
    });

    // Hàm thực thi khi gọi ajax thành công
    promise.then(function (result) {
        console.log(result.data);
        
        // location.reload();

        // Gọi phương thức lấy thông tin sinh viên tạo lại table mới
        layDanhSachSinhVienApi();
    });

    // Hàm thực thi khi lỗi xảy ra
    promise.catch(function(error){
        console.log(error.response.data);
    })
}
// xoa 
var xoaSinhVien = function(){
    var promise = svService.xoaThongTinSinhVien();
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachSinhVienApi();
    });
    promise.catch(function(error){
        console.log(error.response.data);
    })
}
// var xoaSinhVien = function(maSinhVien)
// {
//     var promise = axios({
//         url: 'http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=' + maSinhVien,
//         method:"DELETE",
//     });
    
//     promise.then(function (result) {
//         console.log(result.data);
//         // location.reload();
//         // Gọi phương thức lấy thông tin sinh viên tạo lại table mới
//         layDanhSachSinhVienApi();
//     });

//     // Hàm thực thi khi lỗi xảy ra
//     promise.catch(function(error){
//         console.log(error.response.data);
//     })
// }
var suaSinhVien= function(maSinhVien){
    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien='+maSinhVien,
        method: 'GET',

    });
    promise.then(function (result) {
        console.log(result.data);
        // gan fu lieu 
        document.querySelector('#maSinhVien').value = result.data.maSinhVien;
        document.querySelector('#tenSinhVien').value = result.data.tenSinhVien;
        document.querySelector('#email').value = result.data.email;
        document.querySelector('#diemToan').value = result.data.diemToan;
        document.querySelector('#diemLy').value = result.data.diemLy;
        document.querySelector('#diemHoa').value = result.data.diemHoa;
        document.querySelector('#loaiSinhVien').value = result.data.loaiSinhVien;
        document.querySelector('#diemRenLuyen').value = result.data.diemRenLuyen;
    });

    // Hàm thực thi khi lỗi xảy ra
    promise.catch(function(error){
        console.log(error.response.data);
    })
}

// chuc nang luu thong tin server dua vao api
document.querySelector('#btnLuuThongTin').onclick = function(){
    // lay du lieu tu nguoi dung nhap dua vao doi  tuong theo format du lieu cua backend
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.email = document.querySelector('#email').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;

    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien='+ sv.maSinhVien,
        method:'PUT',
        data:sv
    });
    promise.then(function (result) {
        console.log(result.data);
        // location.reload();
        layDanhSachSinhVienApi();
        // Gọi phương thức lấy thông tin sinh viên tạo lại table mới
   
    });
    // Hàm thực thi khi lỗi xảy ra
    promise.catch(function(error){
        console.log(error.response.data);
    })
}