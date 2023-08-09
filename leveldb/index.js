
const path = require("path");
const  { Level }  = require("level");
const dbPath = './nkbihfbeogaeaoehlefnkodbefgpgknn'
const db = new Level(path.resolve(__dirname, dbPath), { valueEncoding: "json" })



;(async ()=>{
    for await (const [key, value] of db.iterator()) {
        console.log(key,value);
        
        // console.log([key, JSON.stringify(value, null, 2)])
    }
    // await db.put("","")
    // await db.get("","")
    db.close()
})()
