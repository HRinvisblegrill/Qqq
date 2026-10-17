# HR Invisible Safety Grill - website (GitHub Pages)

Is folder mein poori website hai. Aapko coding nahi karni. Text, photos, reviews, FAQ sab **admin panel** se badalte hain.

## Folder mein kya hai
| File / folder | Kaam |
|---|---|
| `content.json` | Website ka saara text (pages, FAQ, reviews, phone, email, address) |
| `img/` | Saari photos. Yahan se hatayi nahi jaati jab tak aap admin se delete na karo |
| `admin/` | Admin panel (password se band) |
| `auth.json` | Admin password ka scrambled (hashed) form. Asli password isme nahi hai |
| `src/` | Design aur chat bot ki files. **Inhe mat badlo** |
| `build.py` + `.github/` | Har change par website ke 104 pages apne aap banata hai |

## Ek baar ka setup (15 minute)
1. github.com par account banao. **New repository** banao (naam jaise `hr-invisible-safety-grill`, Public).
2. Is zip ko khol kar **andar ki saari files aur folders** repository mein upload karo: *Add file -> Upload files*, phir sab drag karo (`.github` folder bhi). Neeche **Commit changes** dabao.
   - Agar `.github` folder upload na ho: *Add file -> Create new file*, naam likho `.github/workflows/deploy.yml`, aur is zip wali `deploy.yml` ka text paste karo.
3. Repository mein **Settings -> Pages -> Source = GitHub Actions** chuno.
4. **Actions** tab kholo. Hari tick aane tak 3 se 5 minute ruko.
5. Website yahan khulegi: `https://AAPKA-USERNAME.github.io/REPO-NAAM/`
   Admin yahan: `https://AAPKA-USERNAME.github.io/REPO-NAAM/admin/`

## Admin panel kaise chalana hai
1. `/admin/` kholo, admin password daalo (wahi jo aapne set kiya tha).
2. Pehli baar GitHub se jodna hai: GitHub -> Settings -> Developer settings -> **Fine-grained tokens** -> Generate new token. Sirf apni website wali repository chuno. Permissions mein **Contents = Read and write**. Token copy karke admin mein daalo, repository ka naam `username/repo` likho. Token sirf aapke phone ya computer mein rehta hai.
3. Tabs: **Pages** (har page ka text, Google title, heading, photo), **Photos** (nayi photo upload ya delete), **Reviews**, **FAQ**, **Business info** (phone, email, address, map link, password badlo).
4. Kaam ke baad **Publish changes** dabao. 1 se 2 minute mein website badal jati hai.

## Apna domain (Google ke liye bahut zaroori)
`github.io` wali website ki ranking custom domain jitni achhi nahi hoti. Domain kharido, phir:
1. Repository ke sabse upar (root mein) `CNAME` naam ki file banao. Usme sirf domain likho, jaise `www.aapkadomain.com`.
2. Domain ke DNS mein GitHub Pages ke records lagao (GitHub ki "Custom domain" guide dekho) aur Settings -> Pages mein **Enforce HTTPS** chalu karo.
3. Website apne aap naye domain par canonical, sitemap aur share links bana legi.

## Google par dikhne ke liye
1. Google Search Console mein apna domain jodo aur `sitemap.xml` submit karo.
2. Ranchi ke address par Google Business Profile banao. Category: invisible grill installer, balcony safety net supplier.
3. Asli customers se review maango aur admin ke Reviews tab mein daalo.
4. Apne kaam ki asli photos upload karo (har photo ka title aur description likhna mat bhoolna).

## Suraksha aur bachav
- Koi bhi galti ho to GitHub har badlav ka record rakhta hai: repository -> History se purana version wapas la sakte ho.
- Token kisi ko mat do. Kho jaye to GitHub mein us token ko Delete kar do aur naya banao.
- Photos `img/` folder mein hain aur upload ke baad badalti nahi hain.
