# 上线部署指南（澳洲客户专属）

> 你的客户主要在**澳洲**，所以：**不需要 ICP 备案**（那是中国大陆才要的）；SEO 主战场是 **Google**（不是百度）；域名建议用 **.com.au**。
> 全程约 1–2 小时即可让网站正式上线，下面按顺序照做即可。

---

## 总览：从 0 到上线的 6 步
1. 注册域名（.com.au 或 .com）
2. 部署主机（推荐 Netlify，免费）
3. 把域名指向主机 + 开启 HTTPS
4. 接收表单线索（Netlify Forms 或 Formspree）
5. 装 Google Analytics + 提交 Google Search Console
6. 注册 Google Business Profile（澳洲本地获客关键）

---

## 第 1 步 · 注册域名

**选哪个后缀？**
- **`.com.au`** —— 澳洲企业最受信任，对本地 Google 排名有正面信号。**需要澳洲 ABN（Australian Business Number）或 ACN**。如果你有公司/个体经营 ABN，强烈建议拿这个。
- **`.com`** —— 全球通用、无需 ABN，可立即注册。建议**两个都买**（.com.au 主用，.com 做保护性注册并跳转）。

**在哪注册（澳洲常用）：**
- **VentraIP**（澳洲本土，支持 .com.au，客服在澳洲）— https://ventraip.com.au
- **Crazy Domains**（澳洲老牌）— https://www.crazydomains.com.au
- **Cloudflare Registrar**（按成本价、最便宜，但 .com.au 支持有限，.com 很合适）— https://www.cloudflare.com

**操作：** 在注册商搜索你想要的域名（如 `harmonymediation.com.au`）→ 加入购物车 → 注册 `.com.au` 时填写 ABN → 付款。年费约 AUD 15–30。

> 没有 ABN？在 https://abr.gov.au 免费申请，个体经营者也能申请，几分钟到几天下来。没有就先用 `.com` 起步，之后再补 `.com.au`。

---

## 第 2 步 · 部署主机（推荐 Netlify，免费且最简单）

Netlify 免费套餐对这种站完全够用，全球 CDN（含悉尼节点）、自动 HTTPS、拖拽即上线。本项目已附 `netlify.toml`，开箱即用。

**最快方式（拖拽部署，无需 Git）：**
1. 打开 https://app.netlify.com 注册（用邮箱或 GitHub 登录）。
2. 进入 **Sites** → 找到 "want to deploy without Git? **Drag and drop your site folder here**"。
3. 把**整个 `website` 文件夹**拖进去。
4. 几十秒后，Netlify 给你一个临时网址（如 `random-name.netlify.app`）——**这时网站已经在线了**，可以先用它测试。

**进阶方式（连 Git，每次改完自动上线）：**
1. 把项目推到 GitHub（`git init` → 提交 → push 到一个新仓库）。
2. Netlify → **Add new site → Import from Git** → 选你的仓库 → 直接 Deploy（无需构建命令，已在 `netlify.toml` 配好）。

> 替代方案：**Cloudflare Pages**（同样免费、全球 CDN）或 **Vercel**，流程类似。三选一即可。

---

## 第 3 步 · 绑定域名 + HTTPS

1. Netlify 站点 → **Domain settings → Add a domain** → 输入你的 `harmonymediation.com.au`。
2. Netlify 会给你 DNS 记录。两种做法：
   - **简单**：把域名 DNS 改用 Netlify DNS（按它提示，在注册商把 nameservers 改成 Netlify 给的两个）。
   - **或**：在注册商加一条 `CNAME`/`A` 记录指向 Netlify 给的目标。
3. 等 DNS 生效（几分钟到几小时）。
4. HTTPS：Netlify 会**自动**签发 Let's Encrypt 证书，开启 "Force HTTPS"。无需额外操作。

---

## 第 4 步 · 接收表单线索（二选一）

没有这一步，用户提交表单你收不到——**务必配置**。

**方案 A：Netlify Forms（推荐，已为你预先接好，零代码改动）**
- 两个表单已带 `data-netlify="true"`（中文表单名 `lead`、英文 `lead-en`），**部署到 Netlify 后自动开始收线索**，无需第三方账号。免费套餐每月 100 条。
- 上线后：到 Netlify 后台 **Forms** 即可看到线索；在 **Forms → Settings → Form notifications** 设置邮件提醒（填你的邮箱）。
- 自测：部署后在线上页面提交一条，确认 Netlify Forms 后台能收到。
- ⚠️ 本地预览（localhost）收不到，这是正常的——Netlify Forms 只在部署后生效。

**方案 B：Formspree（仅当你不部署在 Netlify 时才需要）**
1. 注册 https://formspree.io → New Form → 拿到形如 `https://formspree.io/f/abcdwxyz` 的地址。
2. 在 `index.html` / `en/index.html` 的 `<form>` 上：删掉 `data-netlify="true"` 和 `name="form-name"` 隐藏项，改加 `action="https://formspree.io/f/你的ID" method="POST"`。
3. 设置里填接收邮箱，提交一条测试确认收到。

> 默认走方案 A，无需改动。本地预览时表单只显示"已收到"不真正发送，属正常——部署后即真实生效。

---

## 第 5 步 · 装统计 + 提交收录（Google 为主）

1. **Google Analytics 4**：https://analytics.google.com 创建媒体资源 → 拿到 `G-XXXXXXXXXX`。
   打开本项目 `js/main.js` 顶部，把 `ga4: ''` 填成 `ga4: 'G-XXXXXXXXXX'` → 重新部署。全站（含转化事件）自动生效。
   （`baidu` 字段澳洲用不到，留空即可。）
2. **Google Search Console**：https://search.google.com/search-console → 添加你的域名 → 验证（可用 DNS 记录）→ 提交 `https://你的域名/sitemap.xml`，请求收录。

---

## 第 6 步 · Google Business Profile（澳洲本地获客重中之重）

很多澳洲人直接在 Google 地图/搜索找"mediation near me"。
1. https://business.google.com 注册商家资料。
2. 类别选 **Mediation Service** / Legal services；填地址（或服务区域）、电话、官网、营业时间。
3. 服务列表：英文按"商业/职场/社区/线上调解"填（**英文对外不列家事**）；如服务华人也可注明中文服务。
4. 完成验证后，主动邀请满意客户留 **5 星评价**——这是本地排名最强信号之一。

---

## 上线前最终检查清单
- [ ] 域名已注册并指向主机，`https://` 正常、无证书警告
- [ ] 品牌名 / 电话 / 域名等占位符已全部替换（见 README）
- [ ] 表单提交能**真实收到**线索（已自测）
- [ ] GA4 已生效（实时报告能看到自己的访问）
- [ ] sitemap 已提交 Google Search Console
- [ ] 中英切换、移动端、各页链接均正常
- [ ] 隐私政策 / 免责声明页可访问（已内置 privacy.html / en/privacy.html）
- [ ] Google Business Profile 已提交

---

## 占位符替换速查（上线必改，2026-07 核对）

| # | 位置 | 现状 | 改成 |
|---|---|---|---|
| 1 | **电话**（⚠️ 最重要） | `(08) 6186 7180` 是**虚构占位号**，出现在 index / en/index / about / en/about 共 8 处 | 你的真实澳洲号码。一条命令全替换（先改成你的号码再运行）：`grep -rl '6186 7180\|61867180' --include='*.html' . \| xargs sed -i '' -e 's/(08) 6186 7180/(08) XXXX XXXX/g' -e 's/+61 8 6186 7180/+61 8 XXXX XXXX/g' -e 's/+61861867180/+618XXXXXXXX/g'` |
| 2 | 调解员姓名/照片 | `about.html:53`、`en/about.html:53` 留有填写位 | 你的名字 + 职业照（照片放 `assets/img/`） |
| 3 | GA4 统计 | `js/main.js` 顶部 `ga4: ''` 为空 | 你的 `G-XXXXXXXXXX` |
| 4 | 域名 | 全站按 `harmonymediation.com.au` 写死（canonical、hreflang、sitemap、robots、og:image） | 若最终注册的域名不同，需全站替换：`grep -rl 'harmonymediation.com.au' . \| xargs sed -i '' 's/harmonymediation.com.au/你的域名/g'` |

> ⚠️ **切勿带着占位电话上线**——客户打过去要么空号、要么打给陌生人，直接流失。没有座机就用手机号（04xx xxx xxx）完全没问题。
> 隐私页请按**澳洲隐私法（Privacy Act / APPs）**核对；币种用 AUD。
