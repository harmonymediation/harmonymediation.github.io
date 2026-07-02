# 和合调解中心 · 引流网站

为调解（mediation）服务引流、获取客户线索的静态网站。完整策略与运营方案见 [PLAN.md](PLAN.md)。

## 双语与服务规则
- **中英双语**：中文站在根目录 `/`，英文站在 `/en/`，已配 `hreflang`，导航有语言切换。
- **中文站：承接所有案子**（家事 + 商业/合同 + 社区/民事）。
- **英文站：暂不承接家事类**，只做 商业/合同、职场、社区/民事、线上调解。
- 风格参考 lifemediation.com.au（温暖、专业、零法言法语）。

## 文件结构
```
website/
├── index.html              中文首页 / 主引流落地页（SEO + 结构化数据 + 咨询表单 + 语言切换）
├── en/index.html           英文首页（无家事服务，含 hreflang + 语言切换）
├── articles/               中文知识中心（SEO 内容引流核心）
│   ├── index.html
│   ├── divorce-mediation-vs-litigation.html
│   ├── contract-dispute-mediation.html
│   └── mediation-agreement-legal-effect.html
├── css/styles.css          设计系统与样式（含语言切换样式）
├── js/main.js              导航 + 表单提交 + 统计埋点 + 转化事件
├── sitemap.xml / robots.txt   SEO 收录（含双语 hreflang）
├── netlify.toml            一键部署配置
├── PLAN.md                 完整方案（策略/设计/上线/运营/合规）
├── GROWTH.md               站外引流内容包（知乎/小红书/视频号/LinkedIn 可发文案 + 30天日历）
└── README.md               本文件
```

## 本地预览
任选其一：
```bash
# Python
python3 -m http.server 8000
# 然后访问 http://localhost:8000

# 或 Node（npx）
npx serve .
```

## 上线前必改清单（占位符替换）
1. **品牌名**：全站 `和合调解中心` → 你的品牌。
2. **电话**：`400-000-0000` / `tel:+864000000000` → 真实号码。
3. **域名**：所有 `https://example.com` → 你的域名（index、articles 的 canonical、sitemap、robots、og）。
4. **表单后端**：已预接 **Netlify Forms**（表单带 `data-netlify="true"`）——部署到 Netlify 后**自动收线索，无需改动**；到 Netlify 后台 Forms 设邮件提醒即可。若不部署在 Netlify，改用 Formspree（见 [DEPLOY.md](DEPLOY.md) 方案 B）。本地预览时表单仅提示成功、不真正发送。
5. **微信二维码 / 地址**：在首页与页脚补充。
6. **备案号**（国内主机）：页脚 `备案号：待填写`。
7. **统计代码**：打开 `js/main.js` 顶部 `ANALYTICS`，填入 `ga4` 和/或 `baidu` ID，全站自动生效（含表单转化事件）。
8. **真实图片**：`assets/img/` 放入真实人物/场景图，替换 emoji 占位。

## 部署
**面向澳洲客户**：见 **[DEPLOY.md](DEPLOY.md)** —— 域名(.com.au)、Netlify 部署、HTTPS、表单后端、GA4、Google Search Console、Google Business Profile 的逐步指南。澳洲**无需 ICP 备案**，SEO 以 **Google** 为主（非百度）。
（其他市场的通用部署对比见 PLAN.md 第 7 节。）

## 上线后三件事
1. 提交 `sitemap.xml` 到百度站长平台 + Google Search Console。
2. 确认统计生效，设"表单提交"为转化目标。
3. 按 PLAN.md 第 5 节持续产出知识文章 + 小额投放测试。
```
```
