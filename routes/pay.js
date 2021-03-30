const { Iamporter, IamporterError } = require("iamporter");

// For Testing (테스트용 API KEY와 SECRET 기본 설정)
const iamporter = new Iamporter();

// For Production
const iamporter = new Iamporter({
  apiKey: "2616929715457218",
  secret:
    "kd9QvtlJbumaHjVORplCGwrVeBidxawSnFJT94CkzYvgiq5aQqMwWesbPKpnVVfiAYbK3O4CNzT50ZgQ",
});
