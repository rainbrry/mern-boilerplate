####

PERLU DIINGAT

setupInterceptors gunanya untuk meng-set interceptor axios, interceptor axios ini akan memeriksa apakah akses token masih valid atau tidak, jika tidak valid, maka interceptor axios akan mengirim request ke endpoint refresh-token untuk mendapatkan akses token baru.

useEffect getAuth di App.js, gunanya untuk mengambil data user dari backend. jika response nya error, maka frontend akan mengubah state login = false, dan menghapus akses token, dan mengarahkan ke halaman login. (ini ada di file authSlice, jika getAuth is rejected set state login to false, and delete token)


