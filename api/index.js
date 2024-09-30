const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();

app.use(cors());

function getLastDrawDate() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  let daysToSubtract;

  if (dayOfWeek === 0 || dayOfWeek === 1 || dayOfWeek === 2) {
    daysToSubtract = dayOfWeek + 1;
  } else if (dayOfWeek === 3) {
    daysToSubtract = 0;
  } else {
    daysToSubtract = dayOfWeek - 3;
  }

  const lastDrawDate = new Date(today);
  lastDrawDate.setDate(today.getDate() - daysToSubtract);

  return lastDrawDate.toISOString().split('T')[0];
}

app.get('/api/lotto-results', async (req, res) => {
  try {
    const { data } = await axios.get('https://viking-lotto.net/en/sweden-lotto');
    const $ = cheerio.load(data);

    const date = getLastDrawDate();

    const allLottoNumbers = $('div:contains("Sweden Lotto")').next().find('li.ball, li.tilläggsnummer').map((i, el) => $(el).text().trim()).get();

    const lotto1Numbers = allLottoNumbers.slice(0, 7);
    const lotto1Extra = allLottoNumbers.slice(7, 11);

    const lotto2Numbers = allLottoNumbers.slice(11, 18);
    const lotto2Extra = allLottoNumbers.slice(18, 22);

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
    res.status(500).json({ error: 'خطا در دریافت اطلاعات' });
  }
});

module.exports = app;