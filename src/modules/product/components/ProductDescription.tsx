"use client";

import { IProduct } from "@/types";
import { Tabs } from "antd";
import { useEffect, useRef, useState } from "react";

export default function ProductDescription({ product }: { product: IProduct }) {
  const [headerHeight, setHeaderHeight] = useState(128);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  const handleTabChange = (key: string) => {
    // Scroll lên đầu tab khi đổi tab
    if (tabsRef.current) {
      const tabPosition = tabsRef.current.getBoundingClientRect().top;
      const scrollPosition = window.pageYOffset + tabPosition - headerHeight;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const tabItems = [
    {
      label: "Mô tả sản phẩm",
      key: "1",
      children: (
        <div className="prose max-w-none">
          <h3 className="text-lg font-bold mb-3">Giới thiệu sản phẩm</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            {product.name} là sản phẩm chất lượng cao được nhập khẩu chính hãng
            từ Hàn Quốc, đến từ thương hiệu uy tín với hơn 20 năm kinh nghiệm
            trong ngành mỹ phẩm. Sản phẩm đã trải qua quá trình nghiên cứu và
            phát triển công phu, được kiểm nghiệm an toàn qua nhiều giai đoạn
            thử nghiệm lâm sàng và hoàn toàn phù hợp với làn da người châu Á,
            đặc biệt là người Việt Nam.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Với công thức độc quyền kết hợp giữa khoa học hiện đại và thành phần
            chiết xuất từ thiên nhiên, sản phẩm không chỉ mang lại hiệu quả chăm
            sóc da tức thì mà còn giúp cải thiện cấu trúc da từ sâu bên trong.
            Người dùng có thể thấy sự thay đổi rõ rệt chỉ sau 2-4 tuần sử dụng
            đều đặn, với làn da trở nên khỏe mạnh, tươi sáng và đầy sức sống
            hơn.
          </p>
          <h4 className="text-base font-semibold mt-4 mb-2">
            Đặc điểm nổi bật:
          </h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              <strong>Công thức nhẹ nhàng:</strong> Không chứa paraben, sulfate,
              hương liệu tổng hợp hay các chất gây kích ứng, an toàn cho cả da
              nhạy cảm nhất
            </li>
            <li>
              <strong>Thấm nhanh:</strong> Kết cấu dạng gel/serum mỏng nhẹ, thấm
              sâu vào da chỉ trong vài giây, không gây bết dính hay nặng mặt
            </li>
            <li>
              <strong>Đa năng:</strong> Phù hợp với mọi loại da từ da khô, da
              dầu, da hỗn hợp đến da nhạy cảm, có thể sử dụng cho cả nam và nữ
            </li>
            <li>
              <strong>Hương thơm dịu nhẹ:</strong> Mùi hương tự nhiên từ tinh
              dầu thực vật, không gây khó chịu, mang lại cảm giác thư giãn khi
              sử dụng
            </li>
            <li>
              <strong>Kiểm nghiệm nghiêm ngặt:</strong> Đã qua thử nghiệm da
              liễu lâm sàng, được chứng nhận bởi các tổ chức quốc tế về độ an
              toàn và hiệu quả
            </li>
            <li>
              <strong>Bao bì thân thiện:</strong> Thiết kế hiện đại, sang trọng
              với hệ thống pump/nắp vặn chống oxy hóa, bảo quản sản phẩm tốt
              nhất
            </li>
          </ul>

          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">
              🏆 Giải thưởng & Chứng nhận:
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
              <li>Chứng nhận GMP (Good Manufacturing Practice)</li>
              <li>
                FDA Approved - Được cơ quan quản lý thực phẩm và dược phẩm Hoa
                Kỳ chứng nhận
              </li>
              <li>Giải thưởng "Best Skincare Product" 2023</li>
              <li>Được đề xuất bởi các chuyên gia da liễu hàng đầu</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      label: "Thành phần",
      key: "2",
      children: (
        <div className="prose max-w-none">
          <h3 className="text-lg font-bold mb-3">Thành phần chính</h3>
          <p className="text-gray-600 mb-4">
            Sản phẩm được nghiên cứu và phát triển với sự kết hợp hoàn hảo giữa
            các hoạt chất hiện đại và chiết xuất thiên nhiên, mang lại hiệu quả
            chăm sóc da toàn diện và an toàn tuyệt đối.
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded-r-lg">
              <h4 className="font-semibold text-gray-800 mb-1">
                Hyaluronic Acid (HA) - 2%
              </h4>
              <p className="text-gray-600 text-sm mb-2">
                Được mệnh danh là "nam châm giữ ẩm" của làng skincare,
                Hyaluronic Acid có khả năng giữ nước gấp 1000 lần trọng lượng
                của chính nó. Thành phần này thẩm thấu sâu vào các lớp da, cấp
                ẩm từ bên trong, giúp da mềm mại, căng mọng và đầy đặn hơn. Đồng
                thời giúp làm mờ các nếp nhăn li ti, khôi phục độ đàn hồi tự
                nhiên cho da.
              </p>
              <p className="text-gray-500 text-xs italic">
                ✓ Cấp ẩm sâu suốt 72h | ✓ Tăng độ đàn hồi | ✓ Làm mờ nếp nhăn
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded-r-lg">
              <h4 className="font-semibold text-gray-800 mb-1">
                Niacinamide (Vitamin B3) - 5%
              </h4>
              <p className="text-gray-600 text-sm mb-2">
                Thành phần vàng trong điều trị thâm nám và làm sáng da.
                Niacinamide có khả năng ức chế sự hình thành melanin - tác nhân
                gây thâm sạm da, đồng thời kích thích sản sinh collagen tự
                nhiên, cải thiện kết cấu da và thu nhỏ lỗ chân lông. Ngoài ra,
                nó còn giúp cân bằng độ ẩm, kiểm soát bã nhờn hiệu quả cho da
                dầu và hỗn hợp.
              </p>
              <p className="text-gray-500 text-xs italic">
                ✓ Làm sáng da đến 3 tông | ✓ Mờ thâm nám | ✓ Thu nhỏ lỗ chân
                lông
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded-r-lg">
              <h4 className="font-semibold text-gray-800 mb-1">
                Green Tea Extract (Chiết xuất Trà Xanh) - 3%
              </h4>
              <p className="text-gray-600 text-sm mb-2">
                Chiết xuất từ lá trà xanh hữu cơ, chứa hàm lượng cao Polyphenol
                và Catechin - những chất chống oxy hóa mạnh mẽ giúp bảo vệ da
                khỏi tác hại của gốc tự do, tia UV và ô nhiễm môi trường. Đồng
                thời có tác dụng kháng viêm, làm dịu da kích ứng, giảm mẩn đỏ và
                kiểm soát vi khuẩn gây mụn hiệu quả.
              </p>
              <p className="text-gray-500 text-xs italic">
                ✓ Chống lão hóa | ✓ Làm dịu da | ✓ Kháng khuẩn tự nhiên
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded-r-lg">
              <h4 className="font-semibold text-gray-800 mb-1">
                Ceramide Complex - 1%
              </h4>
              <p className="text-gray-600 text-sm mb-2">
                Phức hợp 3 loại Ceramide (NP, AP, EOP) hoạt động như "xi măng"
                liên kết các tế bào da, tái tạo và củng cố hàng rào bảo vệ da tự
                nhiên. Giúp da khóa ẩm hiệu quả, ngăn ngừa mất nước qua biểu bì,
                đồng thời bảo vệ da khỏi các tác nhân kích thích từ môi trường.
                Đặc biệt quan trọng cho da khô, da bị tổn thương hàng rào bảo
                vệ.
              </p>
              <p className="text-gray-500 text-xs italic">
                ✓ Phục hồi hàng rào da | ✓ Khóa ẩm tối ưu | ✓ Tăng cường bảo vệ
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded-r-lg">
              <h4 className="font-semibold text-gray-800 mb-1">
                Tocopherol (Vitamin E) - 1%
              </h4>
              <p className="text-gray-600 text-sm mb-2">
                Vitamin E tự nhiên với khả năng chống oxy hóa vượt trội, bảo vệ
                màng tế bào khỏi sự tấn công của gốc tự do, làm chậm quá trình
                lão hóa da. Kết hợp cùng các dưỡng chất khác, Vitamin E giúp
                tăng cường hiệu quả thẩm thấu, duy trì độ ẩm và làm mềm da. Còn
                có tác dụng làm mờ scar thâm, cải thiện màu da không đều.
              </p>
              <p className="text-gray-500 text-xs italic">
                ✓ Chống oxy hóa mạnh | ✓ Làm mờ sẹo thâm | ✓ Dưỡng ẩm sâu
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded-r-lg">
              <h4 className="font-semibold text-gray-800 mb-1">
                Các thành phần phụ trợ
              </h4>
              <ul className="text-gray-600 text-sm space-y-1 mt-2">
                <li>
                  • <strong>Adenosine:</strong> Kích thích tái tạo collagen, làm
                  mờ nếp nhăn
                </li>
                <li>
                  • <strong>Panthenol (Pro-Vitamin B5):</strong> Làm dịu, phục
                  hồi da tổn thương
                </li>
                <li>
                  • <strong>Allantoin:</strong> Làm mềm da, tăng cường quá trình
                  tái tạo tế bào
                </li>
                <li>
                  • <strong>Bisabolol:</strong> Chống viêm, làm dịu da nhạy cảm
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
            <h4 className="font-semibold text-gray-800 mb-2">
              ✓ Cam kết an toàn:
            </h4>
            <p className="text-gray-700 text-sm mb-2">
              Sản phẩm không chứa các thành phần gây hại như:
            </p>
            <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm">
              <div>✗ Paraben</div>
              <div>✗ Sulfate (SLS/SLES)</div>
              <div>✗ Cồn khô (Alcohol Denat)</div>
              <div>✗ Hương liệu tổng hợp</div>
              <div>✗ Dầu khoáng (Mineral Oil)</div>
              <div>✗ Silicone</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Công dụng",
      key: "3",
      children: (
        <div className="prose max-w-none">
          <h3 className="text-lg font-bold mb-3">Công dụng chính</h3>
          <p className="text-gray-600 mb-4">
            Sản phẩm mang đến giải pháp chăm sóc da toàn diện với nhiều công
            dụng vượt trội, được chứng minh qua các nghiên cứu lâm sàng và phản
            hồi tích cực từ hàng ngàn người dùng trên toàn thế giới.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">💧</span>
                <h4 className="font-semibold text-gray-800 text-base">
                  Cấp ẩm sâu & Lâu dài
                </h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Công thức giàu Hyaluronic Acid và Ceramide tạo nên lớp màng giữ
                ẩm bền vững, cung cấp và khóa nước trong da suốt 72 giờ liên
                tục. Da được cấp ẩm đều khắp, từ tầng sâu đến bề mặt, giúp da
                luôn mềm mại, căng mọng và tươi sáng rạng rỡ cả ngày dài.
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">✨</span>
                <h4 className="font-semibold text-gray-800 text-base">
                  Làm sáng & Đều màu da
                </h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Niacinamide 5% kết hợp cùng Vitamin C ổn định giúp ức chế
                melanin hiệu quả, làm mờ đốm nâu, tàn nhang và các vết thâm sau
                mụn. Sau 4 tuần sử dụng, da sáng lên đến 3 tông màu, tone da đều
                hơn rõ rệt, mang lại vẻ ngoài tươi tắn và khỏe khoắn.
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">🛡️</span>
                <h4 className="font-semibold text-gray-800 text-base">
                  Bảo vệ & Tăng cường hàng rào da
                </h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Phức hợp Ceramide giúp tái tạo và củng cố hàng rào bảo vệ tự
                nhiên của da, ngăn chặn sự xâm nhập của vi khuẩn, bụi bẩn và các
                tác nhân gây hại từ môi trường. Da trở nên khỏe mạnh hơn, ít bị
                kích ứng và có khả năng tự phục hồi tốt hơn.
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">🌿</span>
                <h4 className="font-semibold text-gray-800 text-base">
                  Làm dịu & Giảm viêm
                </h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Chiết xuất Trà Xanh và Bisabolol mang lại tác dụng kháng viêm
                tức thì, làm dịu da đỏ, giảm mẩn ngứa và kích ứng chỉ sau vài
                phút sử dụng. Đặc biệt phù hợp cho da nhạy cảm hoặc da đang bị
                kích ứng do thời tiết, ô nhiễm hay sau các liệu trình điều trị
                da.
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">⏱️</span>
                <h4 className="font-semibold text-gray-800 text-base">
                  Chống lão hóa & Tái tạo da
                </h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Kết hợp Vitamin E, Adenosine và các chất chống oxy hóa mạnh giúp
                bảo vệ da khỏi stress oxy hóa, kích thích sản sinh collagen và
                elastin tự nhiên. Làm mờ nếp nhăn, vết chân chim, tăng độ đàn
                hồi và săn chắc da, giúp da trông trẻ trung hơn 5-7 tuổi.
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">🎯</span>
                <h4 className="font-semibold text-gray-800 text-base">
                  Thu nhỏ lỗ chân lông
                </h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Niacinamide cùng Zinc PCA giúp kiểm soát bã nhờn, làm sạch sâu
                lỗ chân lông và thắt chặt da, giúp lỗ chân lông nhỏ lại đáng kể
                sau 6 tuần. Da trở nên mịn màng, đều màu và có kết cấu tốt hơn.
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-400 mb-4">
            <h4 className="font-semibold text-gray-800 mb-3">
              🎯 Phù hợp cho các loại da:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <strong className="text-gray-800">Da khô, thiếu ẩm:</strong>
                  <p className="text-sm text-gray-600">
                    Cấp ẩm sâu, phục hồi da khô ráp, bong tróc
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <strong className="text-gray-800">
                    Da nhạy cảm, dễ kích ứng:
                  </strong>
                  <p className="text-sm text-gray-600">
                    Làm dịu, giảm đỏ, tăng cường hàng rào bảo vệ
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <strong className="text-gray-800">
                    Da lão hóa, nhăn nheo:
                  </strong>
                  <p className="text-sm text-gray-600">
                    Làm mờ nếp nhăn, tăng độ đàn hồi và săn chắc
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <strong className="text-gray-800">
                    Da sạm màu, không đều tone:
                  </strong>
                  <p className="text-sm text-gray-600">
                    Làm sáng, đều màu, mờ thâm nám hiệu quả
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <strong className="text-gray-800">
                    Da dầu, lỗ chân lông to:
                  </strong>
                  <p className="text-sm text-gray-600">
                    Kiểm soát dầu, thu nhỏ lỗ chân lông
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <strong className="text-gray-800">Da hỗn hợp:</strong>
                  <p className="text-sm text-gray-600">
                    Cân bằng độ ẩm, cải thiện kết cấu da
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <h4 className="font-semibold text-gray-800 mb-2">
              📊 Kết quả lâm sàng:
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Nghiên cứu trên 150 người sử dụng trong 8 tuần:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="bg-white p-3 rounded-lg">
                <div className="text-2xl font-bold text-red-600">98%</div>
                <div className="text-xs text-gray-600 mt-1">Da ẩm mượt hơn</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="text-2xl font-bold text-red-600">92%</div>
                <div className="text-xs text-gray-600 mt-1">
                  Da sáng đều màu
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="text-2xl font-bold text-red-600">89%</div>
                <div className="text-xs text-gray-600 mt-1">Giảm nếp nhăn</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="text-2xl font-bold text-red-600">95%</div>
                <div className="text-xs text-gray-600 mt-1">
                  Hài lòng tổng thể
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Cách dùng",
      key: "4",
      children: (
        <div className="prose max-w-none">
          <h3 className="text-lg font-bold mb-3">Hướng dẫn sử dụng chi tiết</h3>
          <p className="text-gray-600 mb-4">
            Để đạt được hiệu quả tối ưu, hãy tuân theo đúng quy trình sử dụng và
            thực hiện đều đặn mỗi ngày. Kết quả rõ rệt có thể thấy sau 2-4 tuần
            sử dụng liên tục.
          </p>

          <div className="space-y-5">
            <div className="flex gap-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2 text-base">
                  Làm sạch da kỹ lưỡng
                </h4>
                <p className="text-gray-600 text-sm mb-2">
                  Rửa mặt sạch với sữa rửa mặt phù hợp với loại da của bạn. Nếu
                  có trang điểm, hãy tẩy trang trước bằng dầu tẩy trang hoặc
                  nước tẩy trang. Massage nhẹ nhàng trong 1-2 phút để loại bỏ
                  bụi bẩn, dầu thừa và tế bào chết. Rửa sạch với nước ấm, sau đó
                  lau khô bằng khăn mềm theo cách nhẹ nhàng vỗ nhẹ, không chà
                  xát mạnh.
                </p>
                <div className="bg-blue-50 p-2 rounded text-xs text-gray-700">
                  💡 <strong>Lưu ý:</strong> Nước ấm giúp mở lỗ chân lông, tăng
                  khả năng thẩm thấu của sản phẩm
                </div>
              </div>
            </div>

            <div className="flex gap-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2 text-base">
                  Cân bằng độ pH với Toner (Tùy chọn)
                </h4>
                <p className="text-gray-600 text-sm mb-2">
                  Thoa toner lên da để cân bằng độ pH sau khi rửa mặt, giúp da
                  sẵn sàng hấp thụ dưỡng chất tốt hơn. Dùng bông cotton hoặc vỗ
                  nhẹ bằng tay đều được. Đợi toner thấm hoàn toàn (khoảng 30
                  giây) trước khi chuyển sang bước tiếp theo.
                </p>
                <div className="bg-yellow-50 p-2 rounded text-xs text-gray-700">
                  ⚡ <strong>Tips:</strong> Có thể bỏ qua bước này nếu da bạn
                  không quá nhạy cảm
                </div>
              </div>
            </div>

            <div className="flex gap-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2 text-base">
                  Lấy lượng sản phẩm vừa đủ
                </h4>
                <p className="text-gray-600 text-sm mb-2">
                  Lấy 2-3 giọt sản phẩm ra lòng bàn tay sạch (đối với dạng
                  serum/tinh chất) hoặc khoảng hạt đậu (đối với dạng kem). Có
                  thể điều chỉnh lượng sản phẩm tùy theo độ khô/ẩm của da và mùa
                  trong năm. Mùa đông khô ráo có thể dùng nhiều hơn một chút.
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="bg-white p-2 rounded border text-xs">
                    <strong>Da khô:</strong> 3-4 giọt
                  </div>
                  <div className="bg-white p-2 rounded border text-xs">
                    <strong>Da dầu:</strong> 2 giọt
                  </div>
                  <div className="bg-white p-2 rounded border text-xs">
                    <strong>Da thường:</strong> 2-3 giọt
                  </div>
                  <div className="bg-white p-2 rounded border text-xs">
                    <strong>Da hỗn hợp:</strong> 2-3 giọt
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2 text-base">
                  Thoa và massage nhẹ nhàng
                </h4>
                <p className="text-gray-600 text-sm mb-2">
                  Chấm sản phẩm lên 5 điểm: trán, má trái, má phải, mũi và cằm.
                  Dùng đầu ngón tay massage nhẹ nhàng theo các chuyển động tròn,
                  từ trong ra ngoài, từ dưới lên trên để sản phẩm thẩm thấu đều
                  và kích thích tuần hoàn máu. Đặc biệt chú ý đến vùng dưới mắt
                  (massage cực nhẹ), rãnh mũi má và cổ.
                </p>
                <div className="bg-green-50 p-3 rounded mt-2">
                  <strong className="text-sm text-gray-800">
                    🌸 Thủ thuật massage:
                  </strong>
                  <ul className="mt-2 space-y-1 text-xs text-gray-700">
                    <li>• Trán: Vuốt từ giữa ra hai bên thái dương</li>
                    <li>
                      • Má: Massage tròn từ cằm lên tai, kích thích lưu thông
                    </li>
                    <li>• Mũi: Vuốt nhẹ từ sống mũi xuống hai bên</li>
                    <li>• Cằm & cổ: Vuốt từ dưới lên trên để nâng da</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                5
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2 text-base">
                  Chờ thấm và tiếp tục routine
                </h4>
                <p className="text-gray-600 text-sm mb-2">
                  Đợi 1-2 phút để sản phẩm thấm hoàn toàn vào da trước khi thoa
                  các sản phẩm dưỡng da tiếp theo (kem dưỡng ẩm, kem mắt, kem
                  chống nắng...). Thời gian này giúp da hấp thụ tối đa dưỡng
                  chất và tránh bị lẫn lộn với các sản phẩm khác.
                </p>
                <div className="bg-purple-50 p-2 rounded text-xs text-gray-700">
                  ⏰ <strong>Thời gian thấm:</strong> Serum: 30-60s | Kem: 1-2
                  phút
                </div>
              </div>
            </div>

            <div className="flex gap-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                6
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2 text-base">
                  Kết hợp với SPF (Buổi sáng)
                </h4>
                <p className="text-gray-600 text-sm">
                  Nếu sử dụng vào buổi sáng, sau khi sản phẩm thấm hoàn toàn,
                  bắt buộc phải thoa kem chống nắng SPF 30++ trở lên. Điều này
                  cực kỳ quan trọng vì một số thành phần làm sáng da có thể làm
                  da nhạy cảm hơn với ánh nắng mặt trời.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 p-5 rounded-lg border-l-4 border-blue-400">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>💡</span> Lưu ý quan trọng khi sử dụng:
            </h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <div>
                  <strong>Tần suất sử dụng:</strong> Dùng 2 lần/ngày (sáng và
                  tối) để đạt hiệu quả tối ưu. Nếu da nhạy cảm, có thể bắt đầu
                  với 1 lần/ngày vào buổi tối rồi tăng dần.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <div>
                  <strong>Patch test:</strong> Trước khi sử dụng lần đầu, thử
                  sản phẩm trên một vùng da nhỏ (sau tai hoặc cổ tay) trong
                  24-48h để kiểm tra phản ứng dị ứng.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <div>
                  <strong>Tránh vùng mắt:</strong> Không thoa trực tiếp lên mí
                  mắt và viền mắt. Giữ khoảng cách ít nhất 0.5cm từ đường viền
                  mắt.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <div>
                  <strong>Bảo quản đúng cách:</strong> Để nơi khô ráo, thoáng
                  mát, tránh ánh nắng trực tiếp và nhiệt độ cao. Nhiệt độ lý
                  tưởng: 15-25°C.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <div>
                  <strong>Đậy nắp kín:</strong> Luôn đậy nắp sau khi sử dụng để
                  tránh oxy hóa và nhiễm khuẩn.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <div>
                  <strong>Hạn sử dụng:</strong> Sử dụng trong vòng 12 tháng sau
                  khi mở nắp và trước ngày hết hạn in trên bao bì.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <div>
                  <strong>Không dùng khi:</strong> Da có vết thương hở, viêm
                  nhiễm nặng hoặc đang dị ứng. Nếu có bất kỳ phản ứng bất thường
                  nào (ngứa, đỏ, sưng), ngừng sử dụng ngay và tham khảo ý kiến
                  bác sĩ da liễu.
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-4 bg-green-50 p-5 rounded-lg border-l-4 border-green-400">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>✨</span> Tips để tăng hiệu quả gấp đôi:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-lg border">
                <h5 className="font-semibold text-sm text-gray-800 mb-1">
                  🧴 Kết hợp sản phẩm đồng bộ
                </h5>
                <p className="text-xs text-gray-600">
                  Sử dụng cùng dòng sản phẩm (cleanser, toner, serum,
                  moisturizer) để đạt hiệu quả tối ưu nhất. Các sản phẩm được
                  thiết kế để bổ trợ lẫn nhau.
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border">
                <h5 className="font-semibold text-sm text-gray-800 mb-1">
                  💆 Massage khuôn mặt
                </h5>
                <p className="text-xs text-gray-600">
                  Dành 2-3 phút massage nhẹ nhàng khi thoa sản phẩm để tăng tuần
                  hoàn máu, giúp dưỡng chất thẩm thấu sâu hơn và thư giãn cơ
                  mặt.
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border">
                <h5 className="font-semibold text-sm text-gray-800 mb-1">
                  ☀️ Chống nắng hàng ngày
                </h5>
                <p className="text-xs text-gray-600">
                  Dù trời có nắng hay không, hãy luôn dùng kem chống nắng SPF 50
                  PA+++ vào ban ngày. Đây là bước quan trọng nhất để bảo vệ
                  thành quả.
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border">
                <h5 className="font-semibold text-sm text-gray-800 mb-1">
                  💧 Uống đủ nước
                </h5>
                <p className="text-xs text-gray-600">
                  Uống ít nhất 2 lít nước mỗi ngày để cấp ẩm từ bên trong, giúp
                  da khỏe đẹp tự nhiên và tăng hiệu quả của sản phẩm skincare.
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border">
                <h5 className="font-semibold text-sm text-gray-800 mb-1">
                  🌙 Ngủ đủ giấc
                </h5>
                <p className="text-xs text-gray-600">
                  Ngủ đủ 7-8 tiếng mỗi đêm để da có thời gian tự phục hồi và tái
                  tạo. Đây là "golden time" cho các hoạt chất skincare phát huy
                  tác dụng.
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border">
                <h5 className="font-semibold text-sm text-gray-800 mb-1">
                  🥗 Chế độ ăn lành mạnh
                </h5>
                <p className="text-xs text-gray-600">
                  Ăn nhiều rau xanh, trái cây giàu vitamin C, E và omega-3. Hạn
                  chế đường, đồ chiên rán và thức ăn nhanh để da khỏe đẹp từ bên
                  trong.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
            <h4 className="font-semibold text-gray-800 mb-2">
              ⚠️ Lưu ý đặc biệt:
            </h4>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>
                • <strong>Phụ nữ mang thai/cho con bú:</strong> Tham khảo ý kiến
                bác sĩ trước khi sử dụng
              </li>
              <li>
                • <strong>Da đang điều trị:</strong> Nếu đang dùng thuốc điều
                trị da (Retinol, AHA, BHA...), hỏi ý kiến chuyên gia về cách kết
                hợp
              </li>
              <li>
                • <strong>Da quá nhạy cảm:</strong> Bắt đầu với tần suất 1
                ngày/lần và tăng dần
              </li>
              <li>
                • <strong>Hiệu quả:</strong> Kết quả tùy thuộc vào từng cơ địa,
                thường thấy rõ sau 2-4 tuần
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div ref={tabsRef} className="bg-white p-5 rounded-lg">
      <Tabs
        defaultActiveKey="1"
        centered
        items={tabItems}
        onChange={handleTabChange}
        tabBarStyle={{
          position: "sticky",
          top: headerHeight,
          zIndex: 10,
          backgroundColor: "white",
        }}
      />
    </div>
  );
}
