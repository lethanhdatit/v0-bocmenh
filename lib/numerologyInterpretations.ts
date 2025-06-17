// Numerology number interpretations in Vietnamese

export interface NumberInterpretation {
  meaning: string
  traits: string[]
  strengths: string[]
  challenges: string[]
  career: string[]
  love: string
  advice: string
}

export const numberInterpretations: Record<number, NumberInterpretation> = {
  1: {
    meaning: "Người lãnh đạo, tiên phong",
    traits: ["Độc lập", "Sáng tạo", "Quyết đoán", "Tham vọng", "Tự tin"],
    strengths: ["Khả năng lãnh đạo tự nhiên", "Tinh thần tiên phong", "Sáng tạo và đổi mới", "Quyết tâm cao"],
    challenges: ["Có thể quá độc đoán", "Thiếu kiên nhẫn", "Khó hợp tác", "Có thể ích kỷ"],
    career: ["Doanh nhân", "Giám đốc", "Nhà phát minh", "Chính trị gia", "Nghệ sĩ"],
    love: "Cần một người bạn đời hiểu và ủng hộ tham vọng của bạn. Tránh kiểm soát quá mức.",
    advice: "Học cách lắng nghe và hợp tác với người khác. Kiên nhẫn sẽ giúp bạn đạt được mục tiêu lớn hơn.",
  },
  2: {
    meaning: "Người hòa giải, hợp tác",
    traits: ["Nhạy cảm", "Hợp tác", "Kiên nhẫn", "Hòa bình", "Trực giác"],
    strengths: ["Khả năng hợp tác tuyệt vời", "Trực giác mạnh", "Kiên nhẫn", "Khéo léo trong giao tiếp"],
    challenges: ["Quá nhạy cảm", "Thiếu tự tin", "Dễ bị ảnh hưởng", "Tránh xung đột"],
    career: ["Tư vấn", "Giáo viên", "Y tá", "Nhà ngoại giao", "Nghệ thuật"],
    love: "Bạn là người bạn đời lý tưởng, luôn quan tâm và thấu hiểu. Cần tìm người đánh giá cao sự tận tâm của bạn.",
    advice: "Tin tưởng vào trực giác và học cách đứng lên vì bản thân. Đừng để người khác lợi dụng lòng tốt của bạn.",
  },
  3: {
    meaning: "Người sáng tạo, giao tiếp",
    traits: ["Sáng tạo", "Giao tiếp tốt", "Lạc quan", "Nghệ thuật", "Hài hước"],
    strengths: ["Khả năng giao tiếp xuất sắc", "Sáng tạo nghệ thuật", "Lạc quan tích cực", "Truyền cảm hứng"],
    challenges: ["Dễ phân tâm", "Thiếu kỷ luật", "Quá cảm tính", "Khó tập trung"],
    career: ["Nghệ sĩ", "Nhà văn", "Diễn viên", "Nhà thiết kế", "Giáo viên"],
    love: "Bạn mang lại niềm vui và sự sáng tạo cho mối quan hệ. Cần người bạn đời kiên nhẫn và ủng hộ.",
    advice: "Tập trung vào một mục tiêu và kiên trì theo đuổi. Sử dụng khả năng giao tiếp để xây dựng mối quan hệ tốt.",
  },
  4: {
    meaning: "Người thực tế, có tổ chức",
    traits: ["Thực tế", "Có tổ chức", "Chăm chỉ", "Đáng tin cậy", "Kiên nhẫn"],
    strengths: ["Làm việc chăm chỉ", "Có tổ chức tốt", "Đáng tin cậy", "Kiên trì"],
    challenges: ["Quá cứng nhắc", "Thiếu linh hoạt", "Chậm thích ứng", "Quá thận trọng"],
    career: ["Kế toán", "Kỹ sư", "Quản lý", "Xây dựng", "Ngân hàng"],
    love: "Bạn là người bạn đời ổn định và đáng tin cậy. Cần học cách thể hiện cảm xúc nhiều hơn.",
    advice: "Học cách linh hoạt và mở lòng với những ý tưởng mới. Đừng quá khắt khe với bản thân và người khác.",
  },
  5: {
    meaning: "Người tự do, phiêu lưu",
    traits: ["Tự do", "Phiêu lưu", "Linh hoạt", "Tò mò", "Năng động"],
    strengths: ["Thích ứng nhanh", "Năng động", "Tò mò học hỏi", "Giao tiếp tốt"],
    challenges: ["Thiếu kiên nhẫn", "Dễ chán nản", "Khó cam kết", "Bốc đồng"],
    career: ["Du lịch", "Báo chí", "Bán hàng", "Giải trí", "Công nghệ"],
    love: "Bạn cần tự do trong mối quan hệ. Tìm người bạn đời hiểu và chia sẻ tinh thần phiêu lưu.",
    advice: "Học cách cam kết và kiên trì. Sử dụng năng lượng của bạn để tạo ra những thay đổi tích cực.",
  },
  6: {
    meaning: "Người nuôi dưỡng, có trách nhiệm",
    traits: ["Có trách nhiệm", "Quan tâm", "Gia đình", "Hòa hợp", "Chữa lành"],
    strengths: ["Quan tâm đến người khác", "Có trách nhiệm cao", "Tạo hòa hợp", "Khả năng chữa lành"],
    challenges: ["Quá lo lắng", "Hy sinh quá mức", "Kiểm soát", "Hoàn hảo chủ nghĩa"],
    career: ["Y tế", "Giáo dục", "Tư vấn", "Dịch vụ xã hội", "Nghệ thuật"],
    love: "Bạn là người bạn đời tận tâm và quan tâm. Cần học cách cân bằng giữa cho và nhận.",
    advice: "Học cách chăm sóc bản thân trước khi chăm sóc người khác. Đừng cố gắng kiểm soát mọi thứ.",
  },
  7: {
    meaning: "Người tìm kiếm chân lý, tâm linh",
    traits: ["Tâm linh", "Phân tích", "Trực giác", "Độc lập", "Sâu sắc"],
    strengths: ["Trực giác mạnh", "Khả năng phân tích", "Tìm kiếm chân lý", "Độc lập"],
    challenges: ["Quá hướng nội", "Khó gần", "Hoài nghi", "Cô lập"],
    career: ["Nghiên cứu", "Tâm linh", "Khoa học", "Triết học", "Tâm lý học"],
    love: "Bạn cần thời gian để mở lòng. Tìm người hiểu và tôn trọng không gian riêng của bạn.",
    advice: "Chia sẻ kiến thức và trực giác với người khác. Đừng cô lập bản thân quá mức.",
  },
  8: {
    meaning: "Người thành công vật chất, quyền lực",
    traits: ["Tham vọng", "Thực tế", "Tổ chức", "Quyền lực", "Thành công"],
    strengths: ["Khả năng kinh doanh", "Tổ chức tốt", "Quyết đoán", "Thành công vật chất"],
    challenges: ["Quá tập trung vào tiền bạc", "Độc đoán", "Căng thẳng", "Bỏ qua cảm xúc"],
    career: ["Kinh doanh", "Tài chính", "Bất động sản", "Luật", "Quản lý"],
    love: "Bạn cần cân bằng giữa sự nghiệp và tình yêu. Đừng để công việc chi phối hoàn toàn.",
    advice: "Sử dụng thành công để giúp đỡ người khác. Học cách thư giãn và tận hưởng cuộc sống.",
  },
  9: {
    meaning: "Người nhân đạo, phục vụ",
    traits: ["Nhân đạo", "Rộng lượng", "Sáng tạo", "Trực giác", "Phục vụ"],
    strengths: ["Lòng nhân ái", "Tầm nhìn rộng", "Sáng tạo", "Truyền cảm hứng"],
    challenges: ["Quá lý tưởng", "Cảm tính", "Thiếu thực tế", "Dễ thất vọng"],
    career: ["Từ thiện", "Nghệ thuật", "Giáo dục", "Y tế", "Tôn giáo"],
    love: "Bạn yêu sâu sắc và rộng lượng. Cần người hiểu và chia sẻ lý tưởng của bạn.",
    advice: "Tập trung vào những mục tiêu thực tế. Sử dụng lòng nhân ái để tạo ra thay đổi tích cực.",
  },
  11: {
    meaning: "Số chủ - Người truyền cảm hứng tâm linh",
    traits: ["Trực giác cao", "Tâm linh", "Truyền cảm hứng", "Nhạy cảm", "Sáng tạo"],
    strengths: ["Trực giác siêu việt", "Khả năng truyền cảm hứng", "Tầm nhìn tâm linh", "Sáng tạo"],
    challenges: ["Quá nhạy cảm", "Căng thẳng", "Khó thực hiện", "Áp lực cao"],
    career: ["Tâm linh", "Nghệ thuật", "Tư vấn", "Chữa lành", "Giảng dạy"],
    love: "Bạn cần người bạn đời hiểu và ủng hộ sứ mệnh tâm linh của bạn.",
    advice: "Học cách cân bằng giữa lý tưởng và thực tế. Sử dụng trực giác để giúp đỡ người khác.",
  },
  22: {
    meaning: "Số chủ - Người xây dựng vĩ đại",
    traits: ["Tầm nhìn lớn", "Thực tế", "Xây dựng", "Lãnh đạo", "Tổ chức"],
    strengths: ["Khả năng thực hiện ý tưởng lớn", "Tổ chức xuất sắc", "Tầm nhìn thực tế", "Lãnh đạo"],
    challenges: ["Áp lực lớn", "Căng thẳng", "Quá tham vọng", "Khó cân bằng"],
    career: ["Kiến trúc", "Kỹ thuật", "Chính trị", "Kinh doanh lớn", "Tổ chức quốc tế"],
    love: "Bạn cần người bạn đời mạnh mẽ và hiểu được tầm nhìn lớn của bạn.",
    advice: "Sử dụng khả năng của bạn để tạo ra những thay đổi tích cực cho thế giới.",
  },
  33: {
    meaning: "Số chủ - Người thầy tâm linh",
    traits: ["Thầy giáo", "Chữa lành", "Hy sinh", "Tình yêu vô điều kiện", "Phục vụ"],
    strengths: ["Khả năng chữa lành", "Tình yêu vô điều kiện", "Dạy dỗ", "Truyền cảm hứng"],
    challenges: ["Hy sinh quá mức", "Áp lực lớn", "Khó cân bằng", "Căng thẳng"],
    career: ["Giáo dục", "Chữa lành", "Tâm linh", "Từ thiện", "Tư vấn"],
    love: "Bạn yêu vô điều kiện nhưng cần học cách nhận lại tình yêu.",
    advice: "Học cách chăm sóc bản thân trong khi phục vụ người khác. Cân bằng là chìa khóa.",
  },
}

export function getNumberInterpretation(number: number): NumberInterpretation {
  return numberInterpretations[number] || numberInterpretations[1]
}

export function getChallengeInterpretation(challengeNumber: number): string {
  const interpretations: Record<number, string> = {
    0: "Không có thách thức đặc biệt - bạn có khả năng cân bằng tốt trong lĩnh vực này.",
    1: "Học cách độc lập và tự tin. Đừng quá phụ thuộc vào người khác.",
    2: "Phát triển khả năng hợp tác và kiên nhẫn. Tránh quá nhạy cảm.",
    3: "Tập trung và kỷ luật bản thân. Đừng để sự sáng tạo làm bạn phân tâm.",
    4: "Học cách linh hoạt và thích ứng. Đừng quá cứng nhắc.",
    5: "Phát triển sự kiên nhẫn và cam kết. Tránh thay đổi liên tục.",
    6: "Cân bằng giữa chăm sóc người khác và bản thân. Tránh kiểm soát quá mức.",
    7: "Mở lòng với người khác và chia sẻ kiến thức. Đừng cô lập bản thân.",
    8: "Cân bằng giữa thành công vật chất và tinh thần. Tránh quá tham lam.",
    9: "Thực tế hóa những lý tưởng. Đừng quá cảm tính trong quyết định.",
  }

  return interpretations[challengeNumber] || "Thách thức đặc biệt cần được khám phá sâu hơn."
}

export function getPinnacleInterpretation(pinnacleNumber: number): string {
  const interpretations: Record<number, string> = {
    1: "Thời kỳ phát triển sự độc lập và lãnh đạo. Tập trung vào mục tiêu cá nhân.",
    2: "Thời kỳ hợp tác và xây dựng mối quan hệ. Phát triển khả năng làm việc nhóm.",
    3: "Thời kỳ sáng tạo và giao tiếp. Thể hiện tài năng nghệ thuật và xã hội.",
    4: "Thời kỳ xây dựng nền tảng vững chắc. Tập trung vào công việc và tổ chức.",
    5: "Thời kỳ tự do và khám phá. Mở rộng tầm nhìn và trải nghiệm mới.",
    6: "Thời kỳ tập trung vào gia đình và trách nhiệm. Chăm sóc và nuôi dưỡng.",
    7: "Thời kỳ tìm kiếm chân lý và phát triển tâm linh. Học hỏi và nghiên cứu sâu.",
    8: "Thời kỳ thành công vật chất và quyền lực. Phát triển khả năng kinh doanh.",
    9: "Thời kỳ phục vụ nhân loại và hoàn thiện bản thân. Chia sẻ và cho đi.",
    11: "Thời kỳ truyền cảm hứng và phát triển trực giác. Sứ mệnh tâm linh cao.",
    22: "Thời kỳ thực hiện những dự án lớn. Xây dựng di sản cho tương lai.",
  }

  return interpretations[pinnacleNumber] || "Thời kỳ đặc biệt với những cơ hội độc đáo."
}
