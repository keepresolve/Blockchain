<template>
  <div id="app">
    生成是否相同 {{ isSome }}
    <div>计算次数 {{ params.length -1 }} 次</div>
    <div class="wapprer">
      <textarea class="left">{{ formatJson(params[params.length - 1]) }}</textarea>
      <div class="right">
        <div class="tr" v-for="item in params" :key="item.count">
          <span class="tag">{{ item["count"] }}</span>
           <textarea  style="height:400px;width:100%">{{ formatJson(item) }}</textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { generateKeyPair, getKeyPairFromMnemonic, getKeyPairFromSeed } from "human-crypto-keys";
import { mapMutations, mapState } from "vuex";
// generateKeyPair 这个方法在会调用 _primeinc 这个方法寻找大素数来生成密钥对，这个 _primeinc 方法存在引入时间间隔参数可能导致大素数生成不确定性问题。
export default {
  name: "aa",
  data() {
    return {
      isSome: false,
    };
  },
  computed: {
    ...mapState(["params"]),
  },
  methods: {
    ...mapMutations(["setParams"]),
    transitionJsonToString(jsonObj) {
      // 转换后的jsonObj受体对象
      // let _jsonObj: any = null; // ts写法
      let _jsonObj = null;
      // 判断传入的jsonObj对象是不是字符串，如果是字符串需要先转换为对象，再转换为字符串，这样做是为了保证转换后的字符串为双引号
      if (Object.prototype.toString.call(jsonObj) !== "[object String]") {
        try {
          _jsonObj = JSON.stringify(jsonObj);
        } catch (error) {
          // 转换失败错误信息
          // callback(error);
        }
      } else {
        try {
          jsonObj = jsonObj.replace(/(\')/g, '"');
          _jsonObj = JSON.stringify(JSON.parse(jsonObj));
        } catch (error) {
          // 转换失败错误信息
          // callback(error);
        }
      }
      return _jsonObj;
    },

    formatJson(jsonObj) {
      //  console.log(jsonObj)
      //  console.log(callback)
      // 正则表达式匹配规则变量
      let reg = null;
      // 转换后的字符串变量
      let formatted = "";
      // 换行缩进位数
      let pad = 0;
      // 一个tab对应空格位数
      let PADDING = "\t";
      // json对象转换为字符串变量
      let jsonString = this.transitionJsonToString(jsonObj);
      if (!jsonString) {
        return jsonString;
      }
      // 存储需要特殊处理的字符串段
      let _index = [];
      // 存储需要特殊处理的“再数组中的开始位置变量索引
      let _indexStart = null;
      // 存储需要特殊处理的“再数组中的结束位置变量索引
      let _indexEnd = null;
      // 将jsonString字符串内容通过\r\n符分割成数组
      let jsonArray = [];
      // 正则匹配到{,}符号则在两边添加回车换行
      jsonString = jsonString.replace(/([\{\}])/g, "\r\n$1\r\n");
      // 正则匹配到[,]符号则在两边添加回车换行
      jsonString = jsonString.replace(/([\[\]])/g, "\r\n$1\r\n");
      // 正则匹配到,符号则在两边添加回车换行
      jsonString = jsonString.replace(/(\,)/g, "$1\r\n");
      // 正则匹配到要超过一行的换行需要改为一行
      jsonString = jsonString.replace(/(\r\n\r\n)/g, "\r\n");
      // 正则匹配到单独处于一行的,符号时需要去掉换行，将,置于同行
      jsonString = jsonString.replace(/\r\n\,/g, ",");
      // 特殊处理双引号中的内容
      jsonArray = jsonString.split("\r\n");
      jsonArray.forEach(function (node, index) {
        // 获取当前字符串段中"的数量
        let num = node.match(/\"/g) ? node.match(/\"/g).length : 0;
        // 判断num是否为奇数来确定是否需要特殊处理
        if (num % 2 && !_indexStart) {
          _indexStart = index;
        }
        if (num % 2 && _indexStart && _indexStart != index) {
          _indexEnd = index;
        }
        // 将需要特殊处理的字符串段的其实位置和结束位置信息存入，并对应重置开始时和结束变量
        if (_indexStart && _indexEnd) {
          _index.push({
            start: _indexStart,
            end: _indexEnd,
          });
          _indexStart = null;
          _indexEnd = null;
        }
      });
      // 开始处理双引号中的内容，将多余的"去除
      _index.reverse().forEach(function (item, index) {
        let newArray = jsonArray.slice(item.start, item.end + 1);
        jsonArray.splice(item.start, item.end + 1 - item.start, newArray.join(""));
      });
      // 将处理后的数组通过\r\n连接符重组为字符串
      jsonString = jsonArray.join("\r\n");
      // 将匹配到:后为回车换行加大括号替换为冒号加大括号
      jsonString = jsonString.replace(/\:\r\n\{/g, ":{");
      // 将匹配到:后为回车换行加中括号替换为冒号加中括号
      jsonString = jsonString.replace(/\:\r\n\[/g, ":[");
      // 将上述转换后的字符串再次以\r\n分割成数组
      jsonArray = jsonString.split("\r\n");
      // 将转换完成的字符串根据PADDING值来组合成最终的形态
      jsonArray.forEach(function (item, index) {
        // console.log(item);
        let i = 0;
        // 表示缩进的位数，以tab作为计数单位
        let indent = 0;
        // 表示缩进的位数，以空格作为计数单位
        let padding = "";
        if (item.match(/\{$/) || item.match(/\[$/)) {
          // 匹配到以{和[结尾的时候indent加1
          indent += 1;
        } else if (item.match(/\}$/) || item.match(/\]$/) || item.match(/\},$/) || item.match(/\],$/)) {
          // 匹配到以}和]结尾的时候indent减1
          if (pad !== 0) {
            pad -= 1;
          }
        } else {
          indent = 0;
        }
        for (i = 0; i < pad; i++) {
          padding += PADDING;
        }
        formatted += padding + item + "\r\n";
        pad += indent;
      });
      // 返回的数据需要去除两边的空格和换行
      return formatted.trim().replace(new RegExp("^\\" + "<br />" + "+|\\" + "<br />" + "+$", "g"), "");
    },
  },
  async mounted() {
    // const keyPair = await generateKeyPair('rsa');
    // => Generates a key pair with rsa encryption and provides information for recovery.

    // const keyPairFromMnemonic = await getKeyPairFromMnemonic(keyPair.mnemonic, keyPair.algorithm);
    // => Generates the same key pair based on the mnemonic.

    // const keyPairFromSeed = await getKeyPairFromSeed(keyPair.seed, keyPair.algorithm);
    // => Generates the same key pair based on the seed.
    // console.log({keyPairFromMnemonic, keyPairFromSeed})
    const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAksF6cSp7USbyuqqWCIXNQpLBRQQ/F0HND1CIBQ8N7PKIT/4p
ej9WF5Q4EnbBGwyhPtSM/L+BCLGjxBnelSz9SFqsZGKS4XC0UMClwGC2VmX3+qFr
BPZMikJNjinOu1vL5rOtMWdbNA5vS0dcQSAgHihHjO68bihqOeeMSL8KGWRKUteE
CG0/td8DDozmPZ/ezCzxdirdqOiwaUvYwckjjXWfyMvbUCFXIsihL7NnCO5//dId
CYjPpdpxkuVOu5xiBM6uk24cK442c1HY6AZ0tClhpBC7eLP7wRHURnnCzqyFwyTp
u9v89lgtMvnlXdpk0VvlRe9Yy2fWe8FnV4kg8wIDAQABAoIBAFx0l/cDlH0j1HfV
UIA+C3qNikU4z6aPRekICylkupk0krwSm37wuARS1KCNQEsSQeObdNcmrtwTTeEV
iyzgExGqTkFP+Mkef/r/42y3gSgdRYUYfJu7r6zK6KFPpXZT9rl5KPue6c556ZO7
eVtuKc3WAn2/Seb8fy/LuI18DZjApmJoaGaINj7WfCvCv/vqT3nYsUGJMaam4VVc
TTnaQV+YHyMIHgCSx3WpKoaxcWiIZf2DZlRdJ932TmHntsA2bihl/tDBEhDteavI
jTl1nKEHjQUI15pZfHoapPAvH+/84EwF4E7193uibj0rkEaqVFZF8h6v38tRXufH
aqjXKMECgYEA5gO8eO95J0Nj4Ev6YtVZwUzSyBD63ftTmdsz0Wdpl/wNbBCZF54j
dQ9fUmzuNDBeuixrBNEU0gpxZ0i4Yrg1eX/tRPpurFn80M3bKQOX8QPBNdaJwXDV
0MBBUvTMtBPaBZcy1VaGes5eXlwS/t3x2mIzB22Up0c5eQfDJssMWIUCgYEAo1XP
O52WanJNiDvCNT3ZahumSGIY0IG672RkgAxNOMT8E2iXJ3E0pPZjzPOBV2QVQ1Nz
3kkyfR3Tzt1CcgpdJYmqjoKHSAZZIaITrHUOS/5bSVZxt8qNUp0RlwcMV/+kHsu6
P+rGti33REByDVMmho+8CR6hCiMAhK6I7So2iRcCgYEAmLFOQrImqUvxV4rYkxey
18GaA7pR717SZsa/pXmS/ZQTjPOPzb/rJeColN0/XGHn4ItwF+h8e9r24WvDC7Xh
ueCUsD/XjI7IaAzgOl/qU9L8RjM/i6zOJCAcvWdJJRowl5mB42HnMEsjFlzlN1A7
J5Ac9AdosYt0ucXPZUdR0MkCgYBVKRZlpOKaGYKnN1Eo5ViIZGYsc0kw3ZMT4ios
QT26DarIi83TuMiUAgtC/us/H2WettJA4bU7WuPmhaJxR0oNmluc9h2GxhiO2qyb
TGTp5nK+KB4ej7NjkZVsQzaCYz20+M/hJ433yruTkG5m2CXMHwERWDDq0hkhFMc7
sLjCfQKBgQDVSZWGJKIXMBKL9AmvJ57UUNaXDNJniCSSZhhOSZ1BhtKt2HDNlzfK
6mNF0pDllHZUa8oOdFid9c0YgCzzSokyZqwexQpSx825jhfouSgRfEzRiLMhoxfm
35+9N8MN5bOmLrLueDDEZAVwSkncII0p1nmw8FjIryhGgJBZNnphWg==
-----END RSA PRIVATE KEY-----`;
    await new Promise(res=>setTimeout(res,3000))
    debugger
    const mnemonic = "face venue detect arrow zoo wheat thank among skirt vintage regular dove";
    const keyPair = await getKeyPairFromMnemonic(mnemonic, { id: "rsa", modulusLength: 2048 }, { privateKeyFormat: "pkcs1-pem" });
    console.log("isSome", keyPair.privateKey.trim() == privateKey.trim());
    this.isSome = keyPair.privateKey.trim() == privateKey.trim();
  },
};
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
}
.wapprer {
  display: flex;
  width: 100ww;
  .left,
  .right {
    width: 50%;
    box-sizing: border-box;
    word-break: break-all;
    height: 100vh;
    overflow: auto;
  }
}
.flex {
  display: flex;
  .k {
    flex-basis: 100px;
  }
}
.tr {
  border: 1px solid;
  margin: 3px;
  position: relative;
  padding-top: 10px;
  .tag {
    position: absolute;
    top: 0;
    left: 0;
    background: blue;
    color: #fff;
  }
}
</style>
