import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Câu Chuyện Thương Hiệu - Mỹ Phẩm Khánh Diễm | Hành Trình Kiến Tạo Vẻ Đẹp",
  description:
    "Khám phá hành trình khởi nghiệp đầy cảm hứng của Mỹ Phẩm Khánh Diễm, từ những ngày giãn cách khó khăn đến thương hiệu mỹ phẩm uy tín tại Nam Hà Nội. Sự kiên trì và tử tế trong kinh doanh.",
  openGraph: {
    title: "Câu Chuyện Thương Hiệu - Mỹ Phẩm Khánh Diễm",
    description: "Hành trình từ con số 0 đến thương hiệu mỹ phẩm uy tín.",
    type: "article",
    url: "https://myphamkhanhdiem.com/cau-chuyen-thuong-hieu",
    images: [
      {
        url: "/logo.png", // Fallback or specific banner if available
        width: 1200,
        height: 630,
        alt: "Mỹ Phẩm Khánh Diễm",
      },
    ],
  },
};

export default function BrandStoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Organization",
      name: "Mỹ Phẩm Khánh Diễm",
      foundingDate: "2021",
      description:
        "Mỹ Phẩm Khánh Diễm cung cấp các sản phẩm mỹ phẩm chính hãng, uy tín tại Hà Nội.",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+84-984-657-786",
        contactType: "customer service",
      },
    },
  };

  return (
    <article className="min-h-screen font-sans text-gray-800 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero / Header Section */}
      <header className="relative py-16 md:py-24 border-b border-pink-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-red-700 mb-6 tracking-wide uppercase">
            Câu Chuyện Thương Hiệu
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 italic">
            &quot;Mỹ Phẩm Khánh Diễm - Khởi đầu từ những điều bình dị nhất&quot;
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 mt-12 space-y-12 leading-relaxed text-lg">
        {/* Section 1: The Beginning */}
        <section>
          <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-red-700 first-letter:mr-3 float-left">
            M
          </p>
          <p>
            Mỹ Phẩm Khánh Diễm ra đời không bắt đầu từ một bản kế hoạch kinh
            doanh hoàn hảo, mà từ{" "}
            <strong className="text-red-900">
              một cuộc trò chuyện rất đời thường
            </strong>{" "}
            giữa hai vợ chồng chúng tôi và một người anh họ trong những ngày cả
            gia đình về quê tránh dịch, giãn cách xã hội. Thời điểm ấy, các công
            ty buộc phải tạm ngưng hoạt động,{" "}
            <span className="bg-yellow-100 px-1 italic">
              chúng tôi không còn thu nhập
            </span>
            , tương lai trở nên mơ hồ hơn bao giờ hết.
          </p>
        </section>

        {/* Section 2: The Inspiration */}
        <section className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-red-400">
          <p className="mb-4">
            Trong cuộc trò chuyện đó, người anh họ đã gợi mở cho chúng tôi một
            hướng đi mới – <strong>kinh doanh mỹ phẩm ngành tóc</strong>, lĩnh
            vực mà gia đình đã có người đi trước rất thành công. Ý tưởng ấy lập
            tức chạm đúng khát khao thay đổi cuộc sống đang cháy bỏng trong lòng
            hai vợ chồng.
          </p>
          <p>
            Đặc biệt khi trước đó chúng tôi vốn rất ngưỡng mộ người chị họ –
            người đã tạo dựng được chỗ đứng vững chắc trong ngành và được xem là{" "}
            <strong>tấm gương sáng để noi theo</strong>.
          </p>
        </section>

        {/* Section 3: The Decision */}
        <section>
          <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-red-100 pb-2 inline-block">
            Quyết định trong &quot;tâm bão&quot;
          </h3>
          <p className="mb-6">
            Sau một đêm suy nghĩ dài, dù còn vô vàn lo lắng và không ít lời can
            ngăn, chúng tôi vẫn quyết định thành lập{" "}
            <span className="font-bold text-red-600">Mỹ Phẩm Khánh Diễm</span>.
            Quyết định ấy được đưa ra giữa giai đoạn khó khăn nhất:{" "}
            <strong>giãn cách xã hội kéo dài gần 4 tháng</strong>. Hai vợ chồng
            cùng đứa con nhỏ mới 6 tháng tuổi phải sống xa ông bà nội, vừa lo
            cho gia đình, vừa trăn trở cho con đường tương lai.
          </p>
          <p>
            Chúng tôi đã đi đến một lựa chọn mang tính bước ngoặt:{" "}
            <em>nghỉ hẳn công việc cũ để rẽ sang con đường kinh doanh</em>, với
            mong muốn có một công việc ổn định hơn, chủ động hơn.
          </p>
        </section>

        {/* Section 4: Challenges & Gratitude */}
        <section>
          <div className="grid md:grid-cols-2 gap-8 items-center bg-red-50 p-6 rounded-lg my-8">
            <div>
              <h4 className="font-bold text-red-800 mb-2 text-lg">
                Khởi đầu gian nan
              </h4>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
                <li>Hai bàn tay trắng: Mới cưới, mới sinh con.</li>
                <li>Mất vốn: Bị lừa đảo 70 triệu đồng khi mang thai.</li>
                <li>Không kinh nghiệm.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-green-800 mb-2 text-lg">
                Sự ủng hộ quý giá
              </h4>
              <p className="text-sm md:text-base mb-2">
                Giữa lúc khó khăn, bố mẹ đã tin tưởng cho mượn{" "}
                <strong>sổ đỏ để vay 300 triệu đồng</strong>, cùng 8 chỉ vàng từ
                chị gái làm vốn.
              </p>
              <p className="text-sm md:text-base">
                Đặc biệt biết ơn người chị họ đã trực tiếp nâng đỡ, hướng dẫn
                những bước đi đầu tiên.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: The Journey */}
        <section>
          <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-red-100 pb-2 inline-block">
            Hành trình &quot;Wave Alpha&quot;
          </h3>
          <p className="mb-6">
            Từ dân văn phòng chuyển sang làm kinh doanh, mọi thứ đều mới mẻ và
            đầy thử thách. Phương tiện duy nhất khi ấy chỉ là một chiếc xe máy{" "}
            <strong>Wave Alpha</strong>, nhưng phải gánh vác đủ mọi công việc:
            đi lấy hàng, đi thị trường, giao hàng cho khách.
          </p>
          <blockquote className="italic text-gray-600 border-l-4 border-gray-300 pl-4 py-2 my-6">
            &quot;Vợ tôi ở nhà vừa chăm con nhỏ, vừa bán hàng, tư vấn và chăm
            sóc khách hàng. Còn tôi thì ngày ngày rong ruổi ngoài thị trường,
            tìm hiểu nhu cầu và chào mời từng sản phẩm bằng sự chân thành.&quot;
          </blockquote>
          <p>
            Con đường khởi nghiệp chưa bao giờ dễ dàng. Không có dấu chân của sự
            lười biếng, chỉ có sự kiên trì, nỗ lực không ngừng, tinh thần học
            hỏi và khát vọng vươn lên.
          </p>
        </section>

        {/* Conclusion */}
        <section className="bg-gradient-to-br from-red-600 to-pink-600 text-white p-10 rounded-2xl shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Hướng Tới Tương Lai
          </h3>
          <p className="mb-4 text-center">
            Đến hôm nay, Mỹ Phẩm Khánh Diễm đã từng bước xây dựng được uy tín
            với các đối tác cung cấp sản phẩm, cũng như sự tin tưởng của quý
            khách hàng khu vực phía Nam Hà Nội nói riêng và thị trường nói
            chung.
          </p>
          <p className="text-center font-medium italic">
            &quot;Chúng tôi tin rằng, bằng sự tử tế trong kinh doanh và nỗ lực
            bền bỉ mỗi ngày, Mỹ Phẩm Khánh Diễm sẽ đóng góp được một phần nhỏ bé
            trong hành trình kiến tạo vẻ đẹp cho khách hàng, và sẽ ngày càng
            phát triển – vươn xa – bền vững trong tương lai.&quot;
          </p>
        </section>
      </div>
    </article>
  );
}
