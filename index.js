const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")
const { find } = require("domutils")
const PORT = process.env.PORT || 4000
const url = "https://www.theguardian.com/uk"


const app = express();

// function export_csv(arrayHeader, arrayData, delimiter, fileName) {
//     let header = arrayHeader.join(delimiter) + '\n';
//     let csv = header;
//     arrayData.forEach( obj => {
//         let row = [];
//         for (key in obj) {
//             if (obj.hasOwnProperty(key)) {
//                 row.push(obj[key]);
//             }
//         }
//         csv += row.join(delimiter)+"\n";
//     });

//     let csvData = new Blob([csv], { type: 'text/csv' });  
//     let csvUrl = URL.createObjectURL(csvData);

//     let hiddenElement = document.createElement('a');
//     hiddenElement.href = csvUrl;
//     hiddenElement.target = '_blank';
//     hiddenElement.download = fileName + '.csv';
//     hiddenElement.click();
// }
const fetch = () =>
{
    axios(url)
    .then(resp =>
    {
        const data = resp.data
        const articles = []
        const $ = cheerio.load(data)
        $('.fc-item__title', data).each(function() {
           const title = $(this).text()
            const url = $(this).find('a').attr('href')
            articles.push({title, url})

        })
        console.log(articles)
    }).catch(err => console.log(err))    
}




app.listen(PORT, ()=> console.log(`App running on port ${PORT}`))