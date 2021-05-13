const app = express();
const iamport = require("iamport");
const Iamport = new iamport({
  impKey: "2616929715457218",
  impSecret:
    "kd9QvtlJbumaHjVORplCGwrVeBidxawSnFJT94CkzYvgiq5aQqMwWesbPKpnVVfiAYbK3O4CNzT50ZgQ",
});

app.get("/payments/status/all", (req, res) => {
  iamport.payment
    .getByStatus({
      payment_status: "paid",
    })
    .then(function (result) {
      res.render("payments_list", { list: result.list });
    })
    .catch(function (error) {
      console.log(error);
      red.send(error);
    });
});
