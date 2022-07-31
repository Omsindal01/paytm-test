import https from "https";

// import fetch from "node-fetch";
/*
 * import checksum generation utility
 * You can get this utility from https://developer.paytm.com/docs/checksum/
 */
import PaytmChecksum from "./PaytmChecksum.js";
const orderID = "25";
var paytmParams = {};

paytmParams.body = {
  requestType: "Payment",
  mid: "wCwlzt96451374890132",
  websiteName: "WEBSTAGING",
  orderId: orderID,
  callbackUrl: "https://merchant.com/callback",
  txnAmount: {
    value: "10.00",
    currency: "INR",
  },
  userInfo: {
    custId: "CUST_001",
  },
  enablePaymentMode: [
    { mode: "UPI", channel: ["UPI", "UPIPUSH"] },
    { mode: "DEBIT_CARD", channel: ["RUPAY", "VISA", "MASTER"] },
    { mode: "CREDIT_CARD", channel: ["VISA"] },
    { mode: "NET_BANKING", channel: ["SBI"] },
  ],
};

/*
 * Generate checksum by parameters we have in body
 * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
 */
export const op = (req, res) => {
  PaytmChecksum.generateSignature(
    JSON.stringify(paytmParams.body),
    "7T8j2b9xXQH&u9yC"
  ).then(function (checksum) {
    paytmParams.head = {
      signature: checksum,
    };
    console.log("checksum is:", checksum);

    var post_data = JSON.stringify(paytmParams);

    var options = {
      /* for Staging */
      hostname: "securegw-stage.paytm.in" /* for Production */, // hostname: 'securegw.paytm.in',

      port: 443,
      path: `/theia/api/v1/initiateTransaction?mid=wCwlzt96451374890132&orderId=${orderID}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": post_data.length,
      },
    };

    var response = "";
    var post_req = https.request(options, function (post_res) {
      post_res.on("data", function (chunk) {
        response += chunk;
      });

      post_res.on("end", function () {
        console.log("Response: ", response);
        res.send(response);
      });
      // post_res.send(response);
    });

    post_req.write(post_data);
    post_req.end();
  });
};
