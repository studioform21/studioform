#!/usr/bin/env python3
import json
import os
import re
import sys
import xml.etree.ElementTree as ET
from urllib.parse import urlparse

try:
    from bs4 import BeautifulSoup
except ImportError:
    print("Error: beautifulsoup4 required.")
    sys.exit(1)

def audit_html(file_path):
    report = []
    score = 100
    
    if not os.path.exists(file_path):
        return {"error": f"File not found: {file_path}"}
        
    with open(file_path, "r", encoding="utf-8") as f:
        html = f.read()
        
    soup = BeautifulSoup(html, "html.parser")
    
    # 1. Title Tag
    title_tag = soup.find("title")
    title = title_tag.get_text().strip() if title_tag else None
    if not title:
        report.append(("- Critical: Title tag is missing.", "Critical"))
        score -= 20
    else:
        title_len = len(title)
        if title_len < 50 or title_len > 60:
            report.append((f"- Info: Title length ({title_len} chars) is outside recommended 50-60 character range. Current: '{title}'", "Info"))
            score -= 5
            
    # 2. Meta Description
    desc_tag = soup.find("meta", attrs={"name": "description"})
    desc = desc_tag.get("content", "").strip() if desc_tag else None
    if not desc:
        report.append(("- Critical: Meta description is missing.", "Critical"))
        score -= 20
    else:
        desc_len = len(desc)
        if desc_len < 150 or desc_len > 160:
            report.append((f"- Info: Meta description length ({desc_len} chars) is outside recommended 150-160 character range. Current: '{desc}'", "Info"))
            score -= 5
            
    # 3. Canonical Tag
    canonical_tag = soup.find("link", rel="canonical")
    canonical = canonical_tag.get("href", "").strip() if canonical_tag else None
    if not canonical:
        report.append(("- High: Canonical tag is missing. This can lead to duplicate content issues.", "High"))
        score -= 15
        
    # 4. Heading Tags (H1, H2, etc.)
    h1s = soup.find_all("h1")
    if len(h1s) == 0:
        report.append(("- High: H1 heading is missing. There should be exactly one H1.", "High"))
        score -= 15
    elif len(h1s) > 1:
        report.append((f"- Medium: Multiple H1 tags found ({len(h1s)}). There should be exactly one H1.", "Medium"))
        score -= 10
        
    h2s = soup.find_all("h2")
    h3s = soup.find_all("h3")
    
    # 5. Schema Markup
    schemas = soup.find_all("script", type="application/ld+json")
    schema_types = []
    for s in schemas:
        try:
            data = json.loads(s.string)
            if isinstance(data, dict):
                schema_types.append(data.get("@type"))
            elif isinstance(data, list):
                for item in data:
                    if isinstance(item, dict):
                        schema_types.append(item.get("@type"))
        except Exception:
            report.append(("- High: Invalid JSON-LD syntax in schema script tag.", "High"))
            score -= 10
            
    if not schema_types:
        report.append(("- Medium: No structured data schema detected (JSON-LD preferred).", "Medium"))
        score -= 10
    else:
        report.append((f"- Good: Detected schema types: {', '.join(filter(None, schema_types))}", "Good"))
        
    # 6. Images Alt Text
    images = soup.find_all("img")
    missing_alt = 0
    for img in images:
        if not img.get("alt"):
            missing_alt += 1
    if missing_alt > 0:
        report.append((f"- Medium: {missing_alt} out of {len(images)} images are missing alt text.", "Medium"))
        score -= min(missing_alt * 2, 10)
        
    return {
        "score": max(0, score),
        "title": title,
        "description": desc,
        "canonical": canonical,
        "h1_count": len(h1s),
        "h2_count": len(h2s),
        "h3_count": len(h3s),
        "schema_types": schema_types,
        "images_count": len(images),
        "missing_alt": missing_alt,
        "report": report
    }

def audit_sitemap(file_path):
    report = []
    score = 100
    
    if not os.path.exists(file_path):
        return {"error": f"File not found: {file_path}"}
        
    try:
        tree = ET.parse(file_path)
        root = tree.getroot()
    except ET.ParseError as e:
        return {"error": f"Invalid XML format in sitemap: {str(e)}"}
        
    # Find all namespaces
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = root.findall(".//sm:url", ns)
    
    if not urls:
        report.append(("- Critical: No URLs found in sitemap.", "Critical"))
        score -= 50
        return {"score": 0, "url_count": 0, "report": report}
        
    deprecated_tags = 0
    http_urls = 0
    for url in urls:
        loc = url.find("sm:loc", ns)
        priority = url.find("sm:priority", ns)
        changefreq = url.find("sm:changefreq", ns)
        
        if priority is not None or changefreq is not None:
            deprecated_tags += 1
            
        if loc is not None and loc.text:
            parsed = urlparse(loc.text)
            if parsed.scheme == "http":
                http_urls += 1
                
    if deprecated_tags > 0:
        report.append((f"- Info: Found {deprecated_tags} instances of deprecated tags (<changefreq> or <priority>). Google ignores these; they can be safely removed to reduce sitemap size.", "Info"))
        score -= 5
        
    if http_urls > 0:
        report.append((f"- High: Found {http_urls} non-HTTPS URLs in the sitemap. Sitemaps should only reference HTTPS versions.", "High"))
        score -= 15
        
    return {
        "score": max(0, score),
        "url_count": len(urls),
        "deprecated_tags": deprecated_tags,
        "http_urls": http_urls,
        "report": report
    }

def audit_robots(file_path):
    report = []
    score = 100
    
    if not os.path.exists(file_path):
        return {"error": f"File not found: {file_path}"}
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    sitemaps = re.findall(r"sitemap:\s*(.*)", content, re.IGNORECASE)
    if not sitemaps:
        report.append(("- High: No Sitemap directive found in robots.txt.", "High"))
        score -= 20
    else:
        report.append((f"- Good: Sitemap reference found: {', '.join(sitemaps)}", "Good"))
        
    return {
        "score": max(0, score),
        "sitemaps": sitemaps,
        "report": report
    }

def audit_manifest(file_path):
    report = []
    score = 100
    
    if not os.path.exists(file_path):
        return {"error": f"File not found: {file_path}"}
        
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        return {"error": f"Invalid JSON in manifest.json: {str(e)}"}
        
    required_keys = ["name", "short_name", "icons", "start_url"]
    for key in required_keys:
        if key not in data:
            report.append((f"- High: Missing required manifest key '{key}'.", "High"))
            score -= 15
            
    return {
        "score": max(0, score),
        "name": data.get("name"),
        "short_name": data.get("short_name"),
        "icons_count": len(data.get("icons", [])),
        "report": report
    }

def audit_rss(file_path):
    report = []
    score = 100
    
    if not os.path.exists(file_path):
        return {"error": f"File not found: {file_path}"}
        
    try:
        tree = ET.parse(file_path)
        root = tree.getroot()
    except ET.ParseError as e:
        return {"error": f"Invalid XML format in rss feed: {str(e)}"}
        
    channel = root.find("channel")
    if channel is None:
        report.append(("- Critical: Missing <channel> tag in RSS feed.", "Critical"))
        score -= 50
        return {"score": 0, "report": report}
        
    required = ["title", "link", "description"]
    for r in required:
        if channel.find(r) is None:
            report.append((f"- High: Missing channel element <{r}>.", "High"))
            score -= 15
            
    items = channel.findall("item")
    if not items:
        report.append(("- Medium: RSS feed has no items/posts listed.", "Medium"))
        score -= 10
        
    return {
        "score": max(0, score),
        "items_count": len(items),
        "report": report
    }

def main():
    root_dir = "C:/Users/Sarthak/Downloads/Emergent/app"
    
    html_res = audit_html(os.path.join(root_dir, "frontend/public/index.html"))
    sitemap_res = audit_sitemap(os.path.join(root_dir, "frontend/public/sitemap.xml"))
    robots_res = audit_robots(os.path.join(root_dir, "frontend/public/robots.txt"))
    manifest_res = audit_manifest(os.path.join(root_dir, "frontend/public/manifest.json"))
    rss_res = audit_rss(os.path.join(root_dir, "frontend/public/rss.xml"))
    
    report_md = []
    report_md.append("# Workspace SEO Audit Report\n")
    report_md.append("This report lists findings from the automated audit of the workspace's SEO-critical files.\n")
    
    # Summary Table
    report_md.append("## Executive Summary\n")
    report_md.append("| File | Health Score | Status | Key Metrics |")
    report_md.append("|---|---|---|---|")
    
    def get_status(score):
        if score >= 90: return "✅ Excellent"
        if score >= 70: return "⚠️ Warning"
        return "❌ Critical"
        
    report_md.append(f"| `index.html` | {html_res.get('score', 0)}/100 | {get_status(html_res.get('score', 0))} | Title, Description, Schema |")
    report_md.append(f"| `sitemap.xml` | {sitemap_res.get('score', 0)}/100 | {get_status(sitemap_res.get('score', 0))} | {sitemap_res.get('url_count', 0)} URLs |")
    report_md.append(f"| `robots.txt` | {robots_res.get('score', 0)}/100 | {get_status(robots_res.get('score', 0))} | Sitemap path registered |")
    report_md.append(f"| `manifest.json` | {manifest_res.get('score', 0)}/100 | {get_status(manifest_res.get('score', 0))} | App manifest metadata |")
    report_md.append(f"| `rss.xml` | {rss_res.get('score', 0)}/100 | {get_status(rss_res.get('score', 0))} | {rss_res.get('items_count', 0)} Items |")
    report_md.append("\n---\n")
    
    # Detailed sections
    report_md.append("## Detailed File Findings\n")
    
    # index.html
    report_md.append("### 1. `index.html` (Frontend Template)")
    if "error" in html_res:
        report_md.append(f"Error: {html_res['error']}")
    else:
        report_md.append(f"- **Title**: `{html_res['title']}`")
        report_md.append(f"- **Description**: `{html_res['description']}`")
        report_md.append(f"- **H1 Tags Found**: {html_res['h1_count']}")
        report_md.append(f"- **Canonical URL**: `{html_res['canonical']}`")
        for rep, _ in html_res["report"]:
            report_md.append(rep)
    report_md.append("")
    
    # sitemap.xml
    report_md.append("### 2. `sitemap.xml`")
    if "error" in sitemap_res:
        report_md.append(f"Error: {sitemap_res['error']}")
    else:
        report_md.append(f"- **URL Count**: {sitemap_res['url_count']}")
        for rep, _ in sitemap_res["report"]:
            report_md.append(rep)
    report_md.append("")
    
    # robots.txt
    report_md.append("### 3. `robots.txt`")
    if "error" in robots_res:
        report_md.append(f"Error: {robots_res['error']}")
    else:
        for rep, _ in robots_res["report"]:
            report_md.append(rep)
    report_md.append("")
    
    # manifest.json
    report_md.append("### 4. `manifest.json`")
    if "error" in manifest_res:
        report_md.append(f"Error: {manifest_res['error']}")
    else:
        report_md.append(f"- **App Name**: `{manifest_res['name']}`")
        report_md.append(f"- **Short Name**: `{manifest_res['short_name']}`")
        report_md.append(f"- **Icons Defined**: {manifest_res['icons_count']}")
        for rep, _ in manifest_res["report"]:
            report_md.append(rep)
    report_md.append("")
    
    # rss.xml
    report_md.append("### 5. `rss.xml`")
    if "error" in rss_res:
        report_md.append(f"Error: {rss_res['error']}")
    else:
        report_md.append(f"- **Items Found**: {rss_res['items_count']}")
        for rep, _ in rss_res["report"]:
            report_md.append(rep)
    report_md.append("")
    
    report_path = os.path.join(root_dir, "scratch/WORKSPACE-SEO-REPORT.md")
    with open(report_path, "w", encoding="utf-8") as f:
        f.write("\n".join(report_md))
        
    print(f"Audit completed. Report saved to: {report_path}")

if __name__ == "__main__":
    main()
