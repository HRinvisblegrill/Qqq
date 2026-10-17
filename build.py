"""Builds the website into ./dist  (run by GitHub Actions on every change; you never need to run it yourself).
Reads content.json + img/ + src/ and writes one real HTML page per URL, sitemap.xml, robots.txt and 404.html."""
import asyncio, re, json, os, shutil, datetime
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.abspath(__file__))
DOM = os.environ.get('DOMAIN', 'https://example.com').rstrip('/')
BASE = os.environ.get('BASE', '/')
OUT = os.path.join(ROOT, 'dist')
C = json.load(open(ROOT + '/content.json', encoding='utf-8'))
site = C['site']
HERO = C['imgs'].get('grill1', 'img/grill1.webp')
GID = {g['id']: C['imgs'].get(g['s'], g['s']) for g in C['gal']}

shell = open(ROOT + '/src/shell.html', encoding='utf-8').read()
tmp = ROOT + '/.build-shell.html'
open(tmp, 'w', encoding='utf-8').write(shell.replace('/*STATE*/', json.dumps(C, ensure_ascii=False).replace('<', '\\u003c')))

def fix(h):
    h = h.replace('href="#/home"', 'href="./"')
    h = re.sub(r'href="#/([a-z0-9-]+)"', r'href="\1/"', h)
    h = re.sub(r'<button class="zi" data-k="([^"]+)"[^>]*>(.*?)</button>',
               lambda m: '<a class="zi" href="%s">%s</a>' % (GID.get(m.group(1), ''), m.group(2)), h, flags=re.S)
    h = h.replace('class="img"><img ', 'class="img"><img fetchpriority="high" ')
    return h

def esc(s):
    return s.replace('&', '&amp;').replace('"', '&quot;')

async def prerender():
    rows = []
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1280, 'height': 900})
        await pg.goto('file://' + tmp)
        await pg.wait_for_selector('h1')
        for i in [x['id'] for x in C['pages']] + ['404']:
            await pg.evaluate("i=>{location.hash='#/'+(i==='404'?'x-404':i);route()}", i)
            d = await pg.evaluate("""()=>({app:$('#app').innerHTML,hd:document.querySelector('header').outerHTML,
              ab:document.querySelector('.ab').outerHTML,ft:$('#ft').innerHTML,title:document.title,
              desc:document.querySelector('meta[name=description]').content,ld:JSON.parse($('#ld0').textContent)})""")
            rows.append((i, d))
        await b.close()
    return rows

def main():
    shutil.rmtree(OUT, ignore_errors=True)
    os.makedirs(OUT)
    for f in ('style.css', 'site.js'):
        shutil.copy(f'{ROOT}/src/{f}', f'{OUT}/{f}')
    shutil.copytree(ROOT + '/img', OUT + '/img')
    shutil.copy(ROOT + '/content.json', OUT + '/content.json')
    os.makedirs(OUT + '/admin')
    shutil.copy(ROOT + '/admin/index.html', OUT + '/admin/index.html')
    shutil.copy(ROOT + '/auth.json', OUT + '/admin/auth.json')
    open(OUT + '/.nojekyll', 'w').close()
    if os.path.exists(ROOT + '/CNAME'):
        shutil.copy(ROOT + '/CNAME', OUT + '/CNAME')
    today = datetime.date.today().isoformat()
    urls = []
    for i, d in asyncio.run(prerender()):
        pgd = next((x for x in C['pages'] if x['id'] == i), None)
        url = DOM + '/' + ('' if i == 'home' else (i + '/'))
        ld = dict(d['ld'])
        ld.update({'@context': 'https://schema.org', '@id': DOM + '/#business', 'url': DOM + '/', 'image': DOM + '/' + HERO})
        gj = [ld]
        if i not in ('home', '404'):
            mid = {'Locations': ('Service Locations', 'locations/'), 'Blog': ('Blog', 'blog/'), 'Resources': ('Resources', 'resources/')}.get(pgd['g'])
            it = [{'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': DOM + '/'}]
            if mid:
                it.append({'@type': 'ListItem', 'position': 2, 'name': mid[0], 'item': DOM + '/' + mid[1]})
            it.append({'@type': 'ListItem', 'position': len(it) + 1, 'name': pgd['t'], 'item': url})
            gj.append({'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': it})
        if i in ('home', 'faq'):
            gj.append({'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [
                {'@type': 'Question', 'name': q[0], 'acceptedAnswer': {'@type': 'Answer', 'text': re.sub(r'\[([^\]]+)\]\([^)]*\)', r'\1', q[1])}} for q in C['faq']]})
        t, ds = esc(d['title']), esc(d['desc'])
        robots = 'noindex, follow' if i == '404' else 'index, follow, max-image-preview:large'
        ldj = ''.join('<script type="application/ld+json">' + json.dumps(x, ensure_ascii=False).replace('<', '\\u003c') + '</script>' for x in gj)
        head = (f'<!doctype html>\n<html lang="en-IN"><head><meta charset="utf-8"><base href="{BASE}">'
                '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
                f'<title>{t}</title><meta name="description" content="{ds}"><meta name="robots" content="{robots}">'
                f'<link rel="canonical" href="{url}"><meta name="theme-color" content="#0b6e63">'
                f'<meta property="og:type" content="website"><meta property="og:site_name" content="{esc(site["name"])}">'
                f'<meta property="og:title" content="{t}"><meta property="og:description" content="{ds}"><meta property="og:url" content="{url}">'
                f'<meta property="og:image" content="{DOM}/{HERO}"><meta property="og:locale" content="en_IN"><meta name="twitter:card" content="summary_large_image">'
                '<meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes">'
                '<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Ctext y=%27.9em%27 font-size=%2790%27%3E%F0%9F%9B%A1%3C/text%3E%3C/svg%3E">'
                '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
                '<link rel="stylesheet" href="style.css">'
                '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@600;800&family=Hind:wght@400;500;600&display=swap">'
                + (f'<link rel="preload" as="image" href="{HERO}" fetchpriority="high">' if i == 'home' else '')
                + ldj + '</head>')
        body = (f'<body data-wa="{site["wa"]}" data-em="{esc(site["email"])}" data-n="{esc(site["name"])}">{fix(d["hd"])}<main id="app">{fix(d["app"])}</main>'
                f'<footer id="ft">{fix(d["ft"])}</footer>{fix(d["ab"])}<script defer src="site.js"></script></body></html>')
        body = re.sub(r'<script id="ld0".*?</script>', '', body)
        out = OUT + ('/index.html' if i == 'home' else '/404.html' if i == '404' else f'/{i}/index.html')
        os.makedirs(os.path.dirname(out), exist_ok=True)
        open(out, 'w', encoding='utf-8').write(head + body)
        if i != '404':
            urls.append(url)
    open(OUT + '/sitemap.xml', 'w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        ''.join(f'<url><loc>{u}</loc><lastmod>{today}</lastmod><priority>{"1.0" if u == DOM + "/" else "0.7"}</priority></url>\n' for u in urls) + '</urlset>\n')
    open(OUT + '/robots.txt', 'w').write(f'User-agent: *\nAllow: /\nSitemap: {DOM}/sitemap.xml\n')
    os.remove(tmp)
    print('built', len(urls), 'pages ->', OUT, '| domain', DOM, '| base', BASE)

main()
