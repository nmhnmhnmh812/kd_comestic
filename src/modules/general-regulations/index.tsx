import { StoreLocation } from "@/types";

export default function GeneralRegulationsScreen({
  storeLocations,
}: {
  storeLocations: StoreLocation[];
}) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6 text-gray-800 text-justify">
        <section>
          <h2 className="text-xl font-bold uppercase mb-4">
            CHÍNH SÁCH BẢO HÀNH
          </h2>
          <p className="mb-4">
            Trong thời gian sử dụng nếu gặp bất kỳ trục trặc nào hoặc lỗi do
            người sử dụng. Quý khách hàng có thể liên lạc trực tiếp với trung
            tâm chăm sóc khách hàng của công ty hoặc trung tâm bảo hành của Hãng
            để được trợ giúp
          </p>

          <p className="font-bold mb-2">Bảo hành</p>
          <ul className="list-disc ml-6 mb-4">
            <li>
              Bảo hành sản phẩm là: Khắc phục lỗi hỏng hóc, sự cố xảy ra do lỗi
              của nhà sản xuất.
            </li>
          </ul>

          <p className="font-bold mb-2">Quy định về bảo hành</p>
          <ul className="list-disc ml-6 mb-4">
            <li>
              Sản phẩm được bảo hành miễn phí nếu sản phẩm đó còn thời hạn bảo
              hành được tính kể từ ngày giao hàng.
            </li>
            <li>
              Thời hạn bảo hành được ghi trên Phiếu Bảo Hành và theo quy định
              của từng hãng sản xuất đối với tất cả các sự cố về mặt kỹ thuật
              của sản phẩm.
            </li>
            <li>
              Có phiếu bảo hành và tem bảo hành hợp lệ của công ty hoặc của hãng
              sản xuất trên sản phẩm.
            </li>
          </ul>

          <p className="font-bold mb-2">Những trường hợp không được bảo hành</p>
          <ul className="list-disc ml-6 mb-4">
            <li>
              Sản phẩm đã quá hạn bảo hành ghi trên phiếu hoặc mất Phiếu Bảo
              Hành.
            </li>
            <li>
              Tem niêm phong bảo hành bị rách, vỡ, bị dán đè hoặc sửa đổi, tẩy
              xóa.
            </li>
            <li>Phiếu bảo hành không ghi rõ số Serial và ngày mua sản phẩm.</li>
            <li>
              Sản phẩm có dấu hiệu hư hỏng do chuột bọ hoặc côn trùng xâm nhập.
            </li>
          </ul>

          <p className="font-bold mb-2">Địa điểm bảo hành và bảo trì</p>
          <ul className="list-unstyled mb-4">
            <li>
              - Nếu trong hợp đồng, biên bản bàn giao, phiếu bảo hành không ghi
              thỏa thuận tại địa chỉ khách hàng đã ký, thì tất cả các sản phẩm
              đều được bảo hành tại Trung tâm bảo hành của hãng sản xuất. Nhân
              viên công ty sẽ hướng dẫn Quý khách hàng đến hãng hoặc thay mặt
              Quý khách hàng mang sản phẩm tới Trung tâm bảo hàng của hãng sản
              xuất để bảo hành sản phẩm cho Quý khách hàng.
            </li>
          </ul>

          <p className="font-bold mb-2">Lưu ý:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Bảo hành không bao gồm chi phí vận chuyển và giao hàng.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase mb-4">
            CHÍNH SÁCH ĐỔI TRẢ HOÀN TIỀN
          </h2>
          <p className="mb-2">Những trường hợp được đổi trả:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Hàng bị lỗi do nhà sản xuất, không hoạt động được.</li>
            <li>
              Hàng bị hư hỏng do quá trình vận chuyển hàng cho khách của công ty
            </li>
            <li>Hàng giao không đúng mẫu mã, loại mà khách đã đặt</li>
            <li>Hàng giao bị thiếu</li>
          </ul>
          <p className="mb-4">
            Nếu phát hiện những trường hợp trên, quý khách vui lòng không nhận
            hàng và yêu cầu nhân viên giao nhận của chúng tôi xác nhận tình
            trạng hàng ngay tại chỗ và yêu cầu đổi trả. Còn không khách hàng
            phải báo ngay tình trạng hàng bị lỗi về cho chúng tôi trong vòng 24h
            kể từ lúc nhận hàng để được hỗ trợ đổi mới, quá 24h chúng tôi sẽ
            không hỗ trợ giải quyết vì mặc định khách hàng đã đồng ý với sản
            phẩm được giao.
          </p>

          <p className="mb-2">Điều kiện và quy định đổi trả chung:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>
              “Một đổi một” đối với những sản phẩm bán ra trong vòng 07 ngày nếu
              có vấn đề trục trặc.
            </li>
            <li>
              Còn đầy đủ tem mác, hóa đơn, không bị trầy xước, móp méo, hỏng hóc
              bên ngoài, đổ vỡ..
            </li>
            <li>
              Thời gian đổi hàng không quá 3 ngày kể từ khi nhận hàng (căn cứ
              theo hóa đơn mua hàng hoặc biên lai ký nhận của bên giao hàng).
            </li>
            <li>
              Có đầy đủ các chứng từ kèm theo như biên nhận, hóa đơn, phiếu giao
              hàng, phiếu bảo hành, catalouge...
            </li>
          </ul>
          <p className="mb-4">
            Tuy nhiên đối với một số sản phẩm chúng tôi sẽ không áp dụng những
            điều kiện đổi trả giống như trên, trong quá trình tư vấn bán hàng
            chúng tôi sẽ tư vấn cụ thể về thời hạn cũng như hình thức đổi trả
            cho từng sản phẩm để khách hàng tham khảo khi có nhu cầu mua sản
            phẩm đó.
          </p>

          <p className="mb-4">
            Lệ phí hoàn trả: phí hoàn trả sẽ hoàn toàn do công ty chi trả hoàn
            toàn nếu lỗi đó thuộc về công ty.
          </p>
          <p className="mb-4">
            Hình thức hoàn trả: Sẽ đổi mới sản phẩm cho khách hàng, trường hợp
            không còn sản phẩm hàng hóa đó trong kho, công ty cam kết hoàn trả
            100% phí mà khách hàng đã thanh toán cho chúng tôi thông qua các
            hình thức như: tiền mặt tại công ty hoặc chuyển khoản cho khách hàng
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold uppercase mb-4">
            CHÍNH SÁCH THANH TOÁN
          </h2>
          <p className="mb-4">
            Quý khách mua hàng tại công ty có thể chọn các phương thức thanh
            toán sau đây:
          </p>

          <p className="font-bold mb-2">Thanh toán trực tiếp tại địa chỉ:</p>
          {storeLocations.length > 0 ? (
            storeLocations.map((location) => (
              <p key={location.id} className="mb-4">
                <strong>{location.name}</strong>
                <br />
                ĐỊA CHỈ : {location.address}
                <br />
                SĐT : {location.phone}
              </p>
            ))
          ) : (
            <p className="mb-4">
              Mỹ Phẩm Khánh Diễm
              <br />
              ĐỊA CHỈ : Số 94 Đống Xung, Thắng Lợi, Thường Tín, Hà Nội
              <br />
              SĐT : 0984657786
            </p>
          )}

          <p className="font-bold mb-2">
            Thanh toán qua hình thức chuyển khoản
          </p>
          <p className="mb-2">
            Thông tin cụ thể về số tài khoản chuyển khoản chúng tôi sẽ gửi cho
            quý khách cụ thể vào email để quý khách xác nhận.
          </p>
          <p className="mb-2">
            Nội dung chuyển khoản: Thông tin sản phẩm – Số điện thoại – Số lượng
          </p>
          <p className="mb-4">
            Sau khi chuyển khoản hãy thông báo lại cho chúng tôi để chúng tôi
            kiểm tra và xác nhận lại cho Quý khách
          </p>

          <p className="font-bold mb-2">
            3. Thanh toán khi nhân viên đến giao nhận hàng
          </p>
          <p className="mb-2">
            Là cách thanh toán dễ dàng nhất, đặc biệt là khi Quý khách không
            quen thanh toán trực tuyến.
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>
              Quý khách chọn phương thức thanh toán khi nhân viên đến giao nhận
              hàng vui lòng ghi rõ nội dung chuyển tiền như: Tên công ty, Số
              điện thoại người chuyển tiền và tên sản phẩm quý khách đã chọn.
            </li>
            <li>
              Sau khi giao dịch thành công, Quý khách vui lòng email hoặc gọi
              điện thông báo với công ty để thuận tiện trong việc kiểm tra.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase mb-4">
            CHÍNH SÁCH VẬN CHUYỂN VÀ GIAO NHẬN
          </h2>
          <p className="mb-2">Công ty chúng tôi nhận ship hàng toàn quốc.</p>
          <p className="mb-2">
            Phí vận chuyển sẽ tính theo giá trị đơn hàng của Quý khách
            <br />
            Nếu bạn ở cách xa công ty hoặc ở các địa phương khác, chúng tôi sẽ
            giao hàng ngay sau 8-12 tiếng (đối với sản phẩm bán sẵn) sau từ 7
            -10 ngày (nếu là sản phẩm đặt mua).
          </p>
          <p className="mb-2">
            Đối với trường hợp quý khách mua hàng trong các dịp lễ, tết hoặc gặp
            một số điều kiện khách quan như phương tiện hỏng hóc, thời tiết xấu,
            gặp thiên tai… Công ty sẽ thương lượng với quý khách về thời gian
            giao hàng để đảm bảo tiến độ và chất lượng của hàng hóa.
          </p>
          <p className="mb-4">
            Đối với các đơn hàng số lượng nhiều công ty sẽ trực tiếp trao đổi
            với quý khách để quý khách luôn cảm thấy yên tâm khi lựa chọn mua
            hàng
          </p>
        </section>
      </div>
    </div>
  );
}
