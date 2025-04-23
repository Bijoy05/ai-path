const username = "ueda2920ccc39c93e7b25615f78d7a3e5";
const password = "B8E8B3A2B7DCE63644F8758324A6803";
const auth  = Buffer.from(username + ":" + password).toString("base64");

let data = {
  from: "NodeElk",
  to: "+46738514392",
  message: "Thank you for calling. Please visit" // https://www.google.com"
};

data = new URLSearchParams(data);
data = data.toString();

fetch("https://api.46elks.com/a1/sms", {
  method: "post",
  body: data,
  headers: { "Authorization": "Basic "  + auth }
})
.then(res => res.json())
.then(json => console.log(json))
.catch(err => console.log(err));
