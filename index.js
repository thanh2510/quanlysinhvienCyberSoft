
var mangSinhVien = [];
var validate = new Validation();
//Định nghĩa sự kiện click khi người dùng bấm nút xác nhận
document.querySelector('#btnXacNhan').onclick = function () {
    //Tạo ra đối tượng sinh viên chứa thông tin người dùng nhập vào từ giao diện
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    // console.log('Sinh viên', sv);
    //Kiểm tra hợp lệ 
    var valid = true;
    //Kiểm tra rổng
    valid &= validate.kiemTraRong(sv.maSinhVien,'Mã sinh viên','.kiemTraRong-maSinhVien') & validate.kiemTraRong(sv.tenSinhVien,'Tên sinh viên','.kiemTraRong-tenSinhVien') & validate.kiemTraRong(sv.email,'Email','.kiemTraRong-email') & validate.kiemTraRong(sv.soDienThoai,'Số điện thoại','.kiemTraRong-soDienThoai') & validate.kiemTraRong(sv.diemToan,'Điểm toán','.kiemTraRong-diemToan') & validate.kiemTraRong(sv.diemLy,'Điểm lý','.kiemTraRong-diemLy') & validate.kiemTraRong(sv.diemHoa,'Điểm hóa','.kiemTraRong-diemHoa') & validate.kiemTraRong(sv.diemRenLuyen,'Điểm rèn luyện','.kiemTraRong-diemRenLuyen'); 

    //Kiểm tra định dạng dữ liệu
    //kiểm tra định dạng email

    valid &= validate.kiemTraEmail(sv.email,'Email','.kiemTraDinhDang-email');

    //Kiểm tra định dạng tenSinhVien
    valid &= validate.kiemTraTatCaKyTu(sv.tenSinhVien,'Tên sinh viên','.kiemTraDinhDang-tenSinhVien')
    //Kiểm tra định dạng số điện thoại & và điểm tất cả phải nhập số
    valid &= validate.kiemTraTatCaLaSo(sv.soDienThoai,'Số điện thoại','.kiemTraDinhDang-soDienThoai') & validate.kiemTraTatCaLaSo(sv.diemToan,'Điểm toán','.kiemTraDinhDang-diemToan') & validate.kiemTraTatCaLaSo(sv.diemLy,'Điểm lý','.kiemTraDinhDang-diemLy') & validate.kiemTraTatCaLaSo(sv.diemHoa,'Điểm hóa','.kiemTraDinhDang-diemHoa')& validate.kiemTraTatCaLaSo(sv.diemRenLuyen,'Điểm rèn luyện','.kiemTraDinhDang-diemRenLuyen') ;  




    //Kiểm tra giá trị
    valid &= validate.kiemTraGiaTri(sv.diemToan,'Điểm toán','.kiemTraGiaTri-diemToan',0,10) & validate.kiemTraGiaTri(sv.diemLy,'Điểm lý','.kiemTraGiaTri-diemLy',0,10) &validate.kiemTraGiaTri(sv.diemHoa,'Điểm hóa','.kiemTraGiaTri-diemHoa',0,10) & validate.kiemTraGiaTri(sv.diemRenLuyen,'Điểm rèn luyện','.kiemTraGiaTri-diemRenLuyen',0,10);

    //Kiểm tra độ dài 
    valid &= validate.kiemTraDoDaiChuoi(sv.email,'Email','.kiemTraDoDaiChuoi-email',6,32);
    valid &= validate.kiemTraDoDaiChuoi(sv.tenSinhVien,'Tên sinh viên','.kiemTraDoDaiChuoi-tenSinhVien',6,50) ;

    if(!valid){
        return;
    }

    //Thêm 1 sinh viên vào mảng
    mangSinhVien.push(sv);
    // console.log('mảng sinh viên', mangSinhVien);
    //Tạo bảng
    renderTable(mangSinhVien);

    // luu vao localStorage 
    luuLocalStorage();
}


var renderTable = function (arrSV) {
    //Từ mảng sinh viên tạo ra 1 chuỗi html nhiều thẻ tr dựa vào vòng lặp
    var noiDungTable = '';
    for (var index = 0; index < arrSV.length; index++) {
        //Mỗi lần lặp lấy ra 1 đối tượng sinhVien
        // var sv = arrSV[index];
        //Tạo ra 1 chuỗi + dồn vào nội dung <tr></tr>
        var sinhVien = arrSV[index];
        var sv = new SinhVien(sinhVien.maSinhVien, sinhVien.tenSinhVien, sinhVien.loaiSinhVien, sinhVien.email, sinhVien.soDienThoai, sinhVien.diemToan, sinhVien.diemLy, sinhVien.diemHoa, sinhVien.diemRenLuyen, sinhVien.loaiSV);
        // sv.maSinhVien = sinhVien.maSinhVien;
        // sv.tenSinhVien = sinhVien.tenSinhVien;
        // sv.email = sinhVien.email;
        // sv.soDienThoai = sinhVien.soDienThoai;
        // sv.diemHoa = sinhVien.diemHoa;
        // sv.diemLy = sinhVien.diemLy;
        // sv.diemRenLuyen = sinhVien.diemRenLuyen;
        // sv.loaiSinhVien = sinhVien.loaiSinhVien;
        noiDungTable += `
                <tr>    
                    <td>${sv.maSinhVien}</td>
                    <td>${sv.tenSinhVien}</td>
                    <td>${sv.email}</td>
                    <td>${sv.soDienThoai}</td>
                    <td>${sv.tinhDiemTrungBinh()}</td>
                    <td>${sv.xepLoai()}</td>
                    <td><button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')">Xóa</button></td>
                    <td><button class="btn btn-info" onclick="chinhSua('${sv.maSinhVien}')">Sua</button></td>
                </tr>            
        `;
    }
    // console.log(noiDungTable);
    document.querySelector('#tableSinhVien').innerHTML = noiDungTable;
}

var chinhSua = function(maSV)
{
    document.querySelector('#maSinhVien').disabled = true;

    for( var i =0; i<mangSinhVien.length; i++)
    {
        var sv = mangSinhVien[i];
        if(maSV === sv.maSinhVien){
            document.querySelector('#maSinhVien').value = sv.maSinhVien;
            document.querySelector('#tenSinhVien').value = sv.tenSinhVien;
            document.querySelector('#email').value = sv.email;
            document.querySelector('#soDienThoai').value = sv.soDienThoai;
            document.querySelector('#diemToan').value = sv.diemToan;
            document.querySelector('#diemLy').value = sv.diemLy;
            document.querySelector('#diemHoa').value = sv.diemHoa;
            document.querySelector('#loaiSinhVien').value = sv.loaiSinhVien;
            document.querySelector('#diemRenLuyen').value = sv.diemRenLuyen;
        }
    }
}

//Cài đặt sự kiện cho nút button xóa
var xoaSinhVien = function (maSV) {
    //mangSinhVien= [{ma:1,ten:'a'},{ma:2,ten:'b'},{ma:3,ten:'c'}];
    for (var index = mangSinhVien.length -1 ; index >=0 ; index--) {
        //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên
        var sv = mangSinhVien[index];
        
        //Lấy mã sinh viên của từng đối tượng so sánh với maSV được click
        if(sv.maSinhVien === maSV) {
            //splice là hàm xóa phần tử của mảng dự vào index
            mangSinhVien.splice(index,1); 
        }
    }
    //Sau khi xóa dữ liệu trong mảng gọi hàm tạo lại table truyền vào mảng sinh viên đã xóa
    renderTable(mangSinhVien);
}
var luuLocalStorage = function(){

    //  bien mang sinh vien thanh chuoi 
    var sMangSinhVien = JSON.stringify(mangSinhVien);
    // dem chuoi mangSinhVien luu vao localStorage
    localStorage.setItem('mangSinhVien', sMangSinhVien);
}
//  viet phuong thuc lay du lieu tu localStorage khi nguoi dung vua vao trng web 
var layMangSinhVienStorage = function(){
    // kiem tra du lieu co trong localStorage khong 
    if(localStorage.getItem('mangSinhVien')){
        var sMangSinhVien = localStorage.getItem('mangSinhVien');
        // bien du lieu chuoi chuyen ve object javascript gan vao mang sinh vien 
        mangSinhVien = JSON.parse(sMangSinhVien);
        // sau khi lay du lieu tu localStorage ra thi goi ham tao bang 
        renderTable(mangSinhVien);
    }
}
layMangSinhVienStorage();
// localStorage hem luu duoc ham 
document.querySelector('.btnLuuThongTin').onclick = function(){
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;

    // tim trong mangSinhVien doi tuowngj cungf ma => cap nhap lai gia tri 
    for( var index = 0; index < mangSinhVien.length; index ++)
    {
        var sinhVienCapNhat = mangSinhVien[index];
        if(sinhVienCapNhat.maSinhVien === sv.maSinhVien){
            sinhVienCapNhat.maSV = sv.maSinhVien;
            sinhVienCapNhat.tenSinhVien = sv.tenSinhVien;
            sinhVienCapNhat.email = sv.email;
            sinhVienCapNhat.soDienThoai = sv.soDienThoai;
            sinhVienCapNhat.diemToan = sv.maSindiemToanhVien;
            sinhVienCapNhat.diemLy = sv.diemLy;
            sinhVienCapNhat.diemHoa = sv.diemHoa;
            sinhVienCapNhat.diemRenLuyen = sv.diemRenLuyen;
        }
    }
    renderTable(mangSinhVien);
    luuLocalStorage();
}