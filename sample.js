/* More Details: https://developer.paytm.com/docs/checksum/#node */

var PaytmChecksum = require("./PaytmChecksum");

var paytmParams = {};

/* Generate Checksum via Array */

/* initialize an array */
paytmParams["MID"] = "wCwlzt96451374890132";
paytmParams["ORDERID"] = "ORDERID_98765";

/**
 * Generate checksum by parameters we have
 * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
 */
var paytmChecksum = PaytmChecksum.generateSignature(
  paytmParams,
  "7T8j2b9xXQH&u9yC"
);
paytmChecksum
  .then(function (result) {
    console.log("generateSignature Returns: " + result);
    var verifyChecksum = PaytmChecksum.verifySignature(
      paytmParams,
      "7T8j2b9xXQH&u9yC",
      result
    );
    console.log("verifySignature Returns: " + verifyChecksum);
  })
  .catch(function (error) {
    console.log(error);
  });

/* Generate Checksum via String */

/* initialize JSON String */
// body = '{"mid":"7T8j2b9xXQH&u9yC","orderId":"ORDERID_98765"}';

// /**
//  * Generate checksum by parameters we have
//  * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
//  */
// var paytmChecksum = PaytmChecksum.generateSignature(body, "7T8j2b9xXQH&u9yC");
// paytmChecksum
//   .then(function (result) {
//     console.log("generateSignature Returns: " + result);
//     var verifyChecksum = PaytmChecksum.verifySignature(
//       body,
//       "7T8j2b9xXQH&u9yC",
//       result
//     );
//     console.log("verifySignature Returns: " + verifyChecksum);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
