import React from "react";

export default function BrandStoryScreen() {
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
    <article className="py-6 md:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
        <header className="mb-8 border-b border-gray-100 pb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Câu Chuyện Thương Hiệu
          </h1>
          <p className="text-xl text-gray-600 italic text-center max-w-2xl mx-auto">
            &quot;Mỹ Phẩm Khánh Diễm - Khởi đầu từ những điều bình dị nhất&quot;
          </p>
        </header>

        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
          {/* Section 1: The Beginning */}
          <section>
            <p>
              Mỹ Phẩm Khánh Diễm ra đời không bắt đầu từ một bản kế hoạch kinh
              doanh hoàn hảo, mà từ{" "}
              <strong className="text-red-900">
                một cuộc trò chuyện rất đời thường
              </strong>{" "}
              giữa hai vợ chồng chúng tôi và một người anh họ trong những ngày
              cả gia đình về quê tránh dịch, giãn cách xã hội. Thời điểm ấy, các
              công ty buộc phải tạm ngưng hoạt động, chúng tôi không còn thu
              nhập , tương lai trở nên mơ hồ hơn bao giờ hết.
            </p>
          </section>

          {/* Section 2: The Inspiration */}
          <section className="bg-red-50 p-6 rounded-xl border-l-4 border-red-400 not-prose">
            <p className="mb-4 text-lg text-gray-800">
              Trong cuộc trò chuyện đó, người anh họ đã gợi mở cho chúng tôi một
              hướng đi mới –{" "}
              <strong className="text-red-900">
                kinh doanh mỹ phẩm ngành tóc
              </strong>
              , lĩnh vực mà gia đình đã có người đi trước rất thành công. Ý
              tưởng ấy lập tức chạm đúng khát khao thay đổi cuộc sống đang cháy
              bỏng trong lòng hai vợ chồng.
            </p>
            <p className="text-lg text-gray-800">
              Đặc biệt khi trước đó chúng tôi vốn rất ngưỡng mộ người chị họ –
              người đã tạo dựng được chỗ đứng vững chắc trong ngành và được xem
              là <strong>tấm gương sáng để noi theo</strong>.
            </p>
          </section>

          {/* Section 3: The Decision */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Quyết định trong &quot;tâm bão&quot;
            </h3>
            <p className="mb-6">
              Sau một đêm suy nghĩ dài, dù còn vô vàn lo lắng và không ít lời
              can ngăn, chúng tôi vẫn quyết định thành lập{" "}
              <span className="font-bold text-red-600">Mỹ Phẩm Khánh Diễm</span>
              . Quyết định ấy được đưa ra giữa giai đoạn khó khăn nhất:{" "}
              <strong>giãn cách xã hội kéo dài gần 4 tháng</strong>. Hai vợ
              chồng cùng đứa con nhỏ mới 6 tháng tuổi phải sống xa ông bà nội,
              vừa lo cho gia đình, vừa trăn trở cho con đường tương lai.
            </p>
            <p>
              Chúng tôi đã đi đến một lựa chọn mang tính bước ngoặt:{" "}
              <em>nghỉ hẳn công việc cũ để rẽ sang con đường kinh doanh</em>,
              với mong muốn có một công việc ổn định hơn, chủ động hơn.
            </p>
          </section>

          {/* Section 4: Challenges & Gratitude */}
          <section className="grid md:grid-cols-2 gap-8 items-stretch my-8 not-prose">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col">
              <h4 className="font-bold text-red-800 mb-4 text-lg uppercase tracking-wider">
                Khởi đầu gian nan
              </h4>
              <ul className="space-y-3 text-gray-700 flex-grow">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                  <span>
                    <strong>Hai bàn tay trắng:</strong> Mới cưới, mới sinh con.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                  <span>
                    <strong>Mất vốn:</strong> Bị lừa đảo 70 triệu đồng khi mang
                    thai.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                  <span>
                    <strong>Kinh nghiệm:</strong> Chưa có trải nghiệm thực tế
                    trong ngành.
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col">
              <h4 className="font-bold text-green-800 mb-4 text-lg uppercase tracking-wider">
                Sự ủng hộ quý giá
              </h4>
              <div className="space-y-4 text-gray-700 flex-grow">
                <p>
                  Giữa lúc khó khăn, bố mẹ đã tin tưởng cho mượn sổ đỏ để vay
                  300 triệu đồng , cùng 8 chỉ vàng từ chị gái làm vốn.
                </p>
                <p>
                  Đặc biệt biết ơn người chị họ đã trực tiếp nâng đỡ, hướng dẫn
                  những bước đi đầu tiên bằng tất cả sự tận tâm.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: The Journey */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Hành trình &quot;Wave Alpha&quot;
            </h3>
            <p className="mb-6">
              Từ dân văn phòng chuyển sang làm kinh doanh, mọi thứ đều mới mẻ và
              đầy thử thách. Phương tiện duy nhất khi ấy chỉ là một chiếc xe máy{" "}
              <strong>Wave Alpha</strong>, nhưng phải gánh vác đủ mọi công việc:
              đi lấy hàng, đi thị trường, giao hàng cho khách.
            </p>
            <blockquote className="italic text-gray-600 border-l-4 border-gray-300 pl-6 py-4 my-8 bg-gray-50 rounded-r-lg">
              &quot;Vợ tôi ở nhà vừa chăm con nhỏ, vừa bán hàng, tư vấn và chăm
              sóc khách hàng. Còn tôi thì ngày ngày rong ruổi ngoài thị trường,
              tìm hiểu nhu cầu và chào mời từng sản phẩm bằng sự chân
              thành.&quot;
            </blockquote>
            <p>
              Con đường khởi nghiệp chưa bao giờ dễ dàng. Không có dấu chân của
              sự lười biếng, chỉ có sự kiên trì, nỗ lực không ngừng, tinh thần
              học hỏi và khát vọng vươn lên.
            </p>
          </section>

          {/* Conclusion */}
          <footer className="mt-12 pt-10 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Hướng Tới Tương Lai
            </h3>
            <p className="mb-6 text-gray-700 leading-relaxed text-center italic max-w-2xl mx-auto">
              &quot;Chúng tôi tin rằng, bằng sự tử tế trong kinh doanh và nỗ lực
              bền bỉ mỗi ngày, Mỹ Phẩm Khánh Diễm sẽ đóng góp được một phần nhỏ
              bé trong hành trình kiến tạo vẻ đẹp cho khách hàng, và sẽ ngày
              càng phát triển – vươn xa – bền vững trong tương lai.&quot;
            </p>
            <div className="flex flex-col items-center gap-2 mt-8">
              <p className="text-center text-lg font-bold text-gray-900">
                Mỹ Phẩm Khánh Diễm
              </p>
              <p className="text-gray-500 text-sm">
                Đồng hành cùng vẻ đẹp Việt
              </p>
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}
