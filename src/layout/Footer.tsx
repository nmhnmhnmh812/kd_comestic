import { LogoWhite } from "@/assets/icons";
import {
  FacebookFilled,
  InstagramFilled,
  MailFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <LogoWhite />
            <p className="text-sm text-gray-400 leading-relaxed">
              KMP là thương hiệu phân phối mỹ phẩm chính hãng và dịch vụ chăm
              sóc khách hàng tận tâm
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Dịch vụ KMP bao có thể hoàn toàn yên tâm khi lựa chọn cho mình
              những bộ sản phẩm phù hợp và ứng ý tự các nhân hàng nổi tiếng trên
              toàn thế giới
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-4">VỀ KMP</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  href="/brand-story"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Câu chuyện thương hiệu
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* CHÍNH SÁCH Section */}
          <div>
            <h3 className="text-base font-semibold mb-4">CHÍNH SÁCH</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/policy/privacy"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Chính sách và bảo mật thông tin
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/personal-data"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Chính sách bảo mật thông tin cá nhân
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/terms"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/general"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Chính sách và quy định chung
                </Link>
              </li>
              <li>
                <Link
                  href="/loyalty-program"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Khách hàng thân thiết
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/shipping"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Chính sách vận chuyển
                </Link>
              </li>
            </ul>
          </div>

          {/* KẾT NỐI Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">KẾT NỐI</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" aria-label="Facebook">
                <FacebookFilled className="text-xl" />
              </Link>
              <Link href="https://instagram.com" aria-label="Instagram">
                <InstagramFilled className="text-xl" />
              </Link>
              <Link href="https://youtube.com" aria-label="Youtube">
                <YoutubeFilled className="text-xl" />
              </Link>
              <Link href="mailto:contact@kmp.com" aria-label="Email">
                <MailFilled className="text-xl" />
              </Link>
            </div>
            <div className="text-sm text-gray-400">PHƯƠNG THỨC THANH TOÁN</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
