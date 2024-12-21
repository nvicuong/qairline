const items = [
  {
    index: 1,
    img: require("../../assets/images/news.jpg"),
    title: "Bay Đến Tương Lai - Mở Đường Bay Mới",
    description:
      "Khám phá những chân trời mới cùng chúng tôi với đường bay thẳng vừa ra mắt. Hãy sẵn sàng cho hành trình thuận tiện, tiết kiệm thời gian, và trải nghiệm dịch vụ hàng đầu trên mỗi chuyến đi.",
    time: "06/12/2024",
    category: "announcement",
    detail:
      "Đường bay thẳng mới sẽ giúp hành khách tiết kiệm thời gian khi di chuyển từ Việt Nam đến các thành phố lớn ở Châu Á. Hành khách có thể tận hưởng các dịch vụ cao cấp và sự tiện nghi trong suốt chuyến bay.",
  },
  {
    index: 2,
    img: require("../../assets/images/news.jpg"),
    title: "Ưu Đãi Đặc Biệt Cho Kỳ Nghỉ",
    description:
      "Chào đón mùa lễ hội với những ưu đãi hấp dẫn chưa từng có! Đặt vé ngay hôm nay để tận hưởng giá vé giảm đến 50% và bắt đầu kỳ nghỉ trọn vẹn bên gia đình và bạn bè.",
    time: "06/12/2024",
    category: "announcement",
    detail:
      "Nhân dịp lễ hội cuối năm, chúng tôi dành tặng bạn ưu đãi giảm giá đến 50% trên tất cả các chuyến bay nội địa và quốc tế. Đừng bỏ lỡ cơ hội này để trải nghiệm chuyến đi thú vị với mức giá ưu đãi.",
  },
  {
    index: 3,
    img: require("../../assets/images/news.jpg"),
    title: "Cập Nhật Chính Sách Hành Lý Mới",
    description:
      "Với mong muốn mang đến trải nghiệm bay thoải mái hơn, chúng tôi vừa cải tiến chính sách hành lý, gia tăng cân nặng miễn phí cho hạng vé phổ thông. Đừng quên kiểm tra trước khi bay!",
    time: "06/12/2024",
    category: "procedure",
    detail:
      "Chính sách hành lý mới của chúng tôi cho phép hành khách hạng vé phổ thông mang thêm 5kg hành lý xách tay mà không phải trả phí. Đây là một phần trong cam kết của chúng tôi nhằm mang đến cho bạn sự thoải mái tối đa trong suốt chuyến bay.",
  },
  {
    index: 4,
    img: require("../../assets/images/news.jpg"),
    title: "Dịch Vụ Internet Trên Không - Luôn Kết Nối Mọi Nơi",
    description:
      "Giờ đây, bạn có thể làm việc, giải trí hoặc kết nối với người thân ngay trên máy bay với dịch vụ Wi-Fi hiện đại của chúng tôi. Trải nghiệm bay tiện nghi và không bỏ lỡ khoảnh khắc nào.",
    time: "06/12/2024",
    category: "experience",
    detail:
      "Chúng tôi tự hào giới thiệu dịch vụ Wi-Fi trên máy bay giúp bạn luôn kết nối với thế giới. Bây giờ, bạn có thể làm việc, giải trí hoặc giữ liên lạc với gia đình và bạn bè ngay cả khi đang ở trên không.",
  },
  {
    index: 5,
    img: require("../../assets/images/news.jpg"),
    title: "Hành Trình Xanh - Bảo Vệ Hành Tinh",
    description:
      "Chúng tôi tự hào cam kết hướng tới các giải pháp thân thiện với môi trường: sử dụng nhiên liệu bền vững và giảm thiểu khí thải. Bay cùng chúng tôi là đồng hành vì một tương lai xanh.",
    time: "06/12/2024",
    category: "travel-guide",
    detail:
      "Chúng tôi cam kết giảm thiểu tác động của ngành hàng không đến môi trường. Sử dụng nhiên liệu sinh học, giảm khí thải và tối ưu hóa quy trình vận hành, chúng tôi đang nỗ lực xây dựng một ngành hàng không xanh hơn cho tương lai.",
  },
  {
    index: 6,
    img: require("../../assets/images/news.jpg"),
    title: "Khám Phá Mùa Thu Tại Nhật Bản",
    description:
      "Cùng chúng tôi khám phá vẻ đẹp tuyệt vời của mùa thu Nhật Bản. Từ những con đường rợp lá vàng đến các lễ hội đặc sắc, hãy tận hưởng chuyến đi không thể nào quên.",
    time: "05/12/2024",
    category: "travel-guide",
    detail:
      "Mùa thu tại Nhật Bản là thời điểm tuyệt vời để khám phá vẻ đẹp thiên nhiên và các lễ hội truyền thống. Hãy trải nghiệm cảnh sắc lá vàng tuyệt đẹp và các món ăn đặc trưng trong chuyến du lịch mùa thu.",
  },
  {
    index: 7,
    img: require("../../assets/images/news.jpg"),
    title: "Tính Năng Mới Của Ứng Dụng Mobile",
    description:
      "Chúng tôi vừa cập nhật tính năng mới trên ứng dụng mobile, giúp bạn dễ dàng đặt vé, theo dõi lịch trình bay, và nhận thông báo trực tiếp từ chúng tôi.",
    time: "04/12/2024",
    category: "announcement",
    detail:
      "Với tính năng mới trên ứng dụng, bạn có thể nhận thông báo trực tiếp về các chuyến bay, theo dõi lịch trình và thậm chí đặt vé chỉ với một vài thao tác đơn giản. Hãy cập nhật ngay để trải nghiệm dịch vụ tiện ích này.",
  },
  {
    index: 8,
    img: require("../../assets/images/news.jpg"),
    title: "Kết Nối Thế Giới - Chuyến Bay Thẳng Đến Châu Mỹ",
    description:
      "Chúng tôi tự hào thông báo về chuyến bay thẳng đến các thành phố lớn của Châu Mỹ. Khám phá những điểm đến mới lạ và tận hưởng chuyến bay ấn tượng với chúng tôi.",
    time: "03/12/2024",
    category: "announcement",
    detail:
      "Chuyến bay thẳng đến các thành phố lớn ở Châu Mỹ như New York, Los Angeles sẽ giúp bạn tiết kiệm thời gian và tận hưởng chuyến đi ấn tượng. Đặt vé ngay để khám phá các điểm đến mới mẻ và thú vị này.",
  },
  {
    index: 9,
    img: require("../../assets/images/news.jpg"),
    title: "Ưu Đãi Vé Máy Bay Cho Sinh Viên",
    description:
      "Sinh viên có thể tận hưởng những ưu đãi vé máy bay giảm giá cực kỳ hấp dẫn khi đặt vé với chúng tôi. Hãy nhanh tay đăng ký và khởi hành chuyến đi mơ ước.",
    time: "02/12/2024",
    category: "announcement",
    detail:
      "Để giúp các bạn sinh viên có cơ hội trải nghiệm những chuyến du lịch, chúng tôi đang có ưu đãi vé máy bay giảm giá cực kỳ hấp dẫn. Đặt vé ngay hôm nay để tận hưởng mức giá ưu đãi dành riêng cho sinh viên.",
  },
  {
    index: 10,
    img: require("../../assets/images/news.jpg"),
    title: "Tối Ưu Hóa Thời Gian Bay - Đảm Bảo Sự Tiện Nghi",
    description:
      "Chúng tôi luôn nỗ lực để tối ưu hóa thời gian bay của bạn. Đảm bảo rằng mỗi chuyến bay sẽ là một trải nghiệm tiện nghi và dễ chịu nhất.",
    time: "01/12/2024",
    category: "experience",
    detail:
      "Chúng tôi luôn nỗ lực cải thiện và tối ưu hóa quy trình bay, từ việc giảm thiểu thời gian chờ đợi đến nâng cao chất lượng dịch vụ trên mỗi chuyến bay. Đảm bảo mọi chuyến bay đều thoải mái và thuận tiện.",
  },
  {
    index: 11,
    img: require("../../assets/images/news.jpg"),
    title: "Bảo Vệ An Toàn Cho Mỗi Chuyến Bay",
    description:
      "Đảm bảo an toàn tuyệt đối cho hành khách là ưu tiên hàng đầu của chúng tôi. Cùng khám phá các biện pháp bảo vệ và các cải tiến trong quy trình an toàn của chúng tôi.",
    time: "01/12/2024",
    category: "procedure",
    detail:
      "Chúng tôi không ngừng cải tiến quy trình an toàn, từ việc kiểm tra an ninh đến đào tạo phi hành đoàn. Mục tiêu của chúng tôi là đảm bảo an toàn tuyệt đối cho hành khách trên mỗi chuyến bay.",
  },
  {
    index: 12,
    img: require("../../assets/images/news.jpg"),
    title: "Khám Phá Du Lịch Phượt Việt Nam",
    description:
      "Hãy cùng khám phá những địa điểm du lịch hấp dẫn tại Việt Nam. Từ miền núi cao đến những bãi biển xinh đẹp, trải nghiệm chuyến đi không thể nào quên.",
    time: "30/11/2024",
    category: "travel-guide",
    detail:
      "Việt Nam là điểm đến lý tưởng cho những tín đồ du lịch phượt. Các địa điểm như Sa Pa, Hà Giang, và Phú Quốc sẽ mang đến cho bạn những trải nghiệm mới lạ và đầy thử thách.",
  },
];

export default items;
