const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// تابع برای محاسبه تاریخ آخرین قرعه‌کشی (چهارشنبه یا شنبه گذشته)
function getLastDrawDate() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  let daysAgo;

  if (dayOfWeek === 0) { // یکشنبه
    daysAgo = 1;
  } else if (dayOfWeek <= 3) { // دوشنبه تا چهارشنبه
    daysAgo = dayOfWeek + 3;
  } else if (dayOfWeek <= 6) { // پنج‌شنبه تا شنبه
    daysAgo = dayOfWeek - 3;
  }

  const lastDrawDate = new Date(today);
  lastDrawDate.setDate(today.getDate() - daysAgo);
  return lastDrawDate.toISOString().split('T')[0]; // فرمت YYYY-MM-DD
}

app.get('/lotto-results', async (req, res) => {
  try {
    const { data } = await axios.get('https://viking-lotto.net/en/sweden-lotto');
    const $ = cheerio.load(data);

    // استفاده از تابع getLastDrawDate برای محاسبه تاریخ آخرین قرعه‌کشی
    const date = getLastDrawDate();

    // استخراج همه اعداد لوتو
    const allLottoNumbers = $('div:contains("Sweden Lotto")').next().find('li.ball, li.tilläggsnummer').map((i, el) => $(el).text().trim()).get();

    // استخراج اعداد Lotto 1 (اولین 11 عدد)
    const lotto1Numbers = allLottoNumbers.slice(0, 7);
    const lotto1Extra = allLottoNumbers.slice(7, 11);

    // استخراج اعداد Lotto 2 (دومین 11 عدد)
    const lotto2Numbers = allLottoNumbers.slice(11, 18);
    const lotto2Extra = allLottoNumbers.slice(18, 22);

    // استخراج اعداد Joker
    const jokerNumbers = $('h2:contains("Joker")').next().find('ul.balls li').map((i, el) => $(el).text().trim()).get();

    res.json({
      date: date,
      results: {
        lotto1: {
          numbers: lotto1Numbers,
          extraNumbers: lotto1Extra,
        },
        lotto2: {
          numbers: lotto2Numbers,
          extraNumbers: lotto2Extra,
        },
        joker: jokerNumbers,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('خطا در دریافت اطلاعات');
  }
});

app.listen(PORT, () => {
  console.log(`سرور در حال اجرا در پورت ${PORT}`);
});