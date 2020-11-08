// lop doi tuwong chứa các phương thức giao tiếp với BE 
var SinhVienService = function(){
    this.layThongTinSinhVien = function(){
        var promise = axios( {
            url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //BE cung cấp
            method: 'GET' // backend cung cấp
        });
    return promise;
    }
    this.xoaThongTinSinhVien = function(){
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=' + maSinhVien,
            method:"DELETE",
        });
        return promise;
    }
}
