# Docker Deployment Guide

## Hướng dẫn Deploy với Docker

### Yêu cầu

- Docker Desktop hoặc Docker Engine
- Docker Compose (thường đi kèm với Docker Desktop)

### Các bước triển khai

#### 1. Chuẩn bị file môi trường

Đảm bảo bạn đã có file `.env` với các biến môi trường cần thiết:

```bash
# Ví dụ nội dung .env
NEXT_PUBLIC_API_URL=https://your-api-url.com
NEXT_PUBLIC_IMAGE_URL=your-image-domain.com
NEXT_PUBLIC_BASE_IMAGE_URL=your-base-image-domain.com
# ... các biến môi trường khác
```

#### 2. Build và chạy với Docker Compose (Khuyến nghị)

```bash
# Build và chạy ứng dụng
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng ứng dụng
docker-compose down

# Rebuild image khi có thay đổi code
docker-compose up -d --build
```

#### 3. Build và chạy với Docker trực tiếp

```bash
# Build Docker image
docker build -t kd-cosmetic:latest .

# Chạy container
docker run -d \
  --name kd-cosmetic-app \
  -p 3000:3000 \
  --env-file .env \
  kd-cosmetic:latest

# Xem logs
docker logs -f kd-cosmetic-app

# Dừng container
docker stop kd-cosmetic-app

# Xóa container
docker rm kd-cosmetic-app
```

#### 4. Deploy trên VM

##### Bước 1: Copy project lên VM

```bash
# Từ máy local
scp -r /path/to/project user@vm-ip:/path/on/vm
```

##### Bước 2: SSH vào VM và chạy

```bash
ssh user@vm-ip
cd /path/on/vm/kd_comestic

# Chạy với docker-compose
docker-compose up -d
```

##### Bước 3: Kiểm tra

```bash
# Kiểm tra container đang chạy
docker ps

# Kiểm tra logs
docker-compose logs -f
```

### Truy cập ứng dụng

Sau khi chạy thành công, truy cập:

- **Local**: http://localhost:3000
- **VM**: http://vm-ip:3000

### Quản lý và Bảo trì

```bash
# Xem trạng thái container
docker-compose ps

# Restart container
docker-compose restart

# Xem resource usage
docker stats kd-cosmetic-app

# Xóa tất cả (container + volumes)
docker-compose down -v

# Clean up unused images
docker image prune -a
```

### Troubleshooting

#### Container không start được

```bash
# Kiểm tra logs
docker-compose logs

# Xem chi tiết container
docker inspect kd-cosmetic-app
```

#### Port đã được sử dụng

Thay đổi port trong `docker-compose.yml`:

```yaml
ports:
  - "8080:3000" # Đổi 3000 thành port khác
```

#### Cần thay đổi biến môi trường

1. Sửa file `.env`
2. Restart container: `docker-compose restart`

### Tối ưu hóa

#### Giảm kích thước image

Image đã được tối ưu với multi-stage build và standalone output.

#### Cải thiện performance

- Sử dụng reverse proxy như Nginx
- Enable caching
- Sử dụng CDN cho static assets

### Backup và Restore

```bash
# Backup image
docker save kd-cosmetic:latest | gzip > kd-cosmetic-backup.tar.gz

# Restore image
docker load < kd-cosmetic-backup.tar.gz
```

### Security Best Practices

1. Không commit file `.env` vào Git
2. Sử dụng secrets management cho production
3. Thường xuyên update base image
4. Scan vulnerabilities: `docker scan kd-cosmetic:latest`
5. Sử dụng HTTPS cho production (với Nginx/Traefik)

### CI/CD Integration

Dockerfile này đã sẵn sàng cho CI/CD pipelines như:

- GitHub Actions
- GitLab CI
- Jenkins
- CircleCI

## Ghi chú quan trọng

- Dockerfile sử dụng Node.js 20 Alpine để tối ưu kích thước
- Multi-stage build để giảm image size
- Standalone output mode cho deployment tối ưu
- Health check đã được cấu hình trong docker-compose.yml
