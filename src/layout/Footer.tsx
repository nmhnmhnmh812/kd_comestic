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
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          <div className="space-y-3">
            <LogoWhite className="w-12 h-12 md:w-auto md:h-auto" />
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              KMP là thương hiệu phân phối mỹ phẩm chính hãng và dịch vụ chăm
              sóc khách hàng tận tâm
            </p>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              Dịch vụ KMP bao có thể hoàn toàn yên tâm khi lựa chọn cho mình
              những bộ sản phẩm phù hợp và ứng ý tự các nhân hàng nổi tiếng trên
              toàn thế giới
            </p>
          </div>

          <div>
            <h3 className="text-sm md:text-base font-semibold mb-3 md:mb-4">VỀ KMP</h3>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  href="/brand-story"
                  className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Câu chuyện thương hiệu
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* CHÍNH SÁCH Section */}
          <div>
            <h3 className="text-sm md:text-base font-semibold mb-3 md:mb-4">CHÍNH SÁCH</h3>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <Link
                  href="/policy/privacy"
                  className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Chính sách và bảo mật thông tin
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/personal-data"
                  className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Chính sách bảo mật thông tin cá nhân
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/terms"
                  className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/general"
                  className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Chính sách và quy định chung
                </Link>
              </li>
              <li>
                <Link
                  href="/loyalty-program"
                  className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Khách hàng thân thiết
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/shipping"
                  className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Chính sách vận chuyển
                </Link>
              </li>
            </ul>
          </div>

          {/* KẾT NỐI Section */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-sm md:text-base font-semibold">KẾT NỐI</h3>
            <div className="flex space-x-3 md:space-x-4">
              <Link href="https://facebook.com" aria-label="Facebook">
                <FacebookFilled className="text-lg md:text-xl" />
              </Link>
              <Link href="https://instagram.com" aria-label="Instagram">
                <InstagramFilled className="text-lg md:text-xl" />
              </Link>
              <Link href="https://youtube.com" aria-label="Youtube">
                <YoutubeFilled className="text-lg md:text-xl" />
              </Link>
              <Link href="mailto:contact@kmp.com" aria-label="Email">
                <MailFilled className="text-lg md:text-xl" />
              </Link>
            </div>
            <div className="text-xs md:text-sm text-gray-400">PHƯƠNG THỨC THANH TOÁN</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
