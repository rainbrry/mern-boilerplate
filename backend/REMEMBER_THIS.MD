######

refresh token disimpan di cookie dari backend.
access token dikirim sebagai response dan di set ke header dari frontend.

endpoint refresh-token, get-auth, dan logout memerlukan verifikasi refresh token dari cookie.

sedangkan endpoints user dll menggunakan middleware sesuai dengan role user.
isAdmin jika user adalah admin, dst.

######

flow middleware yang memerlukan akses token:

verify akses token dari header.
cek apakah akses token masih valid.
lalu kirim userId sebagai request.
next();

jika akses token lolos.
cari user berdasarkan req.userId.
jika user tidak ditemukan, kirim response error.
jika user ditemukan, kirim user sebagai request. (req.user = user)
next();

jika user login.
cek apakah role setiap user.
next();

######

## NOTE

kenapa endpoint get-auth menggunakan refresh token?
untuk ngakalin auth dari frontend.
jika refresh token tidak ada, user tetap login dan akses token yang ada di header akan expired, maka dari itu jika get-auth meresponse error, maka frontend akan menghapus state login = false, dan menghapus akses token, dan mengarahkan ke halaman login.
JANGAN DIUBAH LAGI.
