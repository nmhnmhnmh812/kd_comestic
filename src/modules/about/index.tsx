import React from "react";

export default function AboutScreen() {
  return (
    <article className="py-6 md:py-8">
      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Về chúng tôi
          </h1>
        </header>

        <section className="prose prose-lg max-w-none space-y-6">
          <p className="text-lg leading-relaxed text-gray-700">
            <strong className="text-gray-900">Mỹ phẩm Khánh Diễm</strong> là nhà
            phân phối – đại diện thương hiệu tại Hà Nội của nhiều nhãn hàng mỹ
            phẩm tóc lớn, uy tín trên thị trường, tiêu biểu như:{" "}
            <strong>
              Tricol, Real Star, Lacoha, Sophia, Obsidian, Ecolove, Goldwell,
              Davines, ATS, L&rsquo;Oréal, Schwarzkopf, Cehko, Prosee, Nouvelle,
              Caluober, Minato, Luminous
            </strong>
            …
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            Được thành lập vào ngày <time dateTime="2021-11-24">24/11/2021</time>,{" "}
            <strong className="text-gray-900">Mỹ phẩm Khánh Diễm</strong> là đơn
            vị chuyên cung cấp sỉ và lẻ các sản phẩm phục vụ ngành làm đẹp. Với
            định hướng mang đến cho khách hàng những sản phẩm{" "}
            <em>chất lượng cao – nguồn gốc rõ ràng – giá cả hợp lý</em>, Khánh
            Diễm từng bước khẳng định vị thế và uy tín trên thị trường.
          </p>

          <section className="my-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Các ngành hàng chính
            </h2>
            <p className="text-base text-gray-700 mb-4">
              Hiện nay, các ngành hàng chính của Mỹ phẩm Khánh Diễm bao gồm:
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 pl-4">
              <li className="text-lg">
                <strong>Sản phẩm ngành tóc</strong>
              </li>
              <li className="text-lg">
                <strong>Sản phẩm ngành trang điểm</strong>
              </li>
              <li className="text-lg">
                <strong>Sản phẩm ngành mi và móng</strong>
              </li>
              <li className="text-lg">
                <strong>Sản phẩm ngành spa</strong>
              </li>
              <li className="text-lg">
                <strong>Sản phẩm ngành xăm, thẩm mỹ</strong>
              </li>
            </ul>
          </section>

          <section className="my-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Cam kết của chúng tôi
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Lấy chữ <strong className="text-red-600 text-xl">TÍN</strong> làm
              nền tảng phát triển, Mỹ phẩm Khánh Diễm cam kết mang đến cho khách
              hàng những sản phẩm chất lượng tốt nhất, mức giá cạnh tranh cùng
              dịch vụ tư vấn tận tâm, chuyên nghiệp, nhằm đem lại sự hài lòng
              tối đa trong từng đơn hàng.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Bên cạnh đó, chúng tôi không ngừng cải thiện tốc độ giao hàng nhanh
              chóng, tiết kiệm chi phí, kết hợp nhiều chương trình ưu đãi hấp
              dẫn, cùng phong cách phục vụ chu đáo và thân thiện.
            </p>
          </section>

          <footer className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-lg leading-relaxed text-gray-700 italic">
              <strong className="text-gray-900">Mỹ phẩm Khánh Diễm</strong> xin
              trân trọng gửi lời tri ân sâu sắc đến quý khách hàng và các đối
              tác đã tin tưởng, đồng hành cùng chúng tôi trong suốt thời gian
              qua. Trong thời gian tới, Khánh Diễm sẽ tiếp tục nâng cao chất
              lượng sản phẩm và dịch vụ để mang đến cho quý khách hàng những
              trải nghiệm ngày càng tốt hơn.
            </p>
            <p className="text-center text-lg font-semibold text-gray-900 mt-6">
              Xin chân thành cảm ơn!
            </p>
          </footer>
        </section>
      </div>
    </article>
  );
}
