const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const ShortUrl = require("./models/shortUrl");
require("./db/conn");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.get("", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});
app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullurl });
  res.redirect("/");
});

app.get("/:shortUrl",async(req,res)=>{
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl})
    if(shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()
    res.redirect(shortUrl.full)
})
app.listen(port, () => {
  console.log(`Server is running at port no. ${port}`);
});
