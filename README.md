# Konfigurasi VPS untuk Website Sealab
Berikut adalah langkah-langkah untuk mengkonfigurasi Virtual Private Server (VPS) untuk menjalankan website Sealab.
> Pastikan API sudah dikonfigurasi sebelumnya.

## Instalasi Node.js
> Node.js yang di instal harus versi **^18.x**
```bash
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=18
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt-get install nodejs
```
setelah instalasi ketik `node -v` dan pastikan versi sudah **^18.x**

## Instalasi npm dan Yarn
Untuk website ini `yarn` lebih direkomendasikan sebagai package manager dibanding `npm`
```
sudo apt-get install npm
npm install --global yarn
```
setelah install ketik `yarn -v` untuk memeriksa apakah `yarn` sudah terinstall

Buat file konfigurasi baru untuk situs web di `/etc/nginx/sites-available` dengan nama `sealab-telu.com` lalu isi dengan kode berikut

```
server {
    listen 80;
    server_name sealab-telu.com;

    location / {
        proxy_pass http://localhost:4173;
    }
}
```
Aktifkan konfigurasi dengan membuat link simbolis ke direktori `/etc/nginx/sites-enabled` dengan kode berikut
``` bash
ln -s /etc/nginx/sites-available/sealab-telu.com /etc/nginx/sites-enabled/
```

## Menjalankan aplikasi
Gunakan terminal multiplexer seperti `tmux` untuk menjalankan website secara terus menerus:
```bash
tmux new -s sea-web
tmux a -t sea-web
cd sealab-web
```
Sebelum menjalankan aplikasi setting dulu `.env` sesuai dengan contoh di `.env.example` kemudian untuk menjalankan web ketik:

```bash
chmod +x deploy.sh
./deploy.sh
```
