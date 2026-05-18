from pathlib import Path
from datetime import datetime, UTC
import json
import requests
import hashlib

RAW_DIR = Path("raw_data")

def hash_raw_response(raw_response: str) -> str:
    return hashlib.sha256(raw_response.encode("utf-8")).hexdigest()

def save_raw_feed(country, journal_name, feed_name, raw_hash, feed_date, feed_data):

    output_dir = RAW_DIR / country / journal_name / feed_name
    output_dir.mkdir(parents=True, exist_ok=True)

    output_file = output_dir / f"{feed_date}_{raw_hash}.json"

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(feed_data, f, ensure_ascii=False, indent=2)

    return output_file


def collect_feeds(rss_spaces):

    for country, journals in rss_spaces.items():
        for journal_name, journal_data in journals.items():

            if not journal_data.get("enabled", True):
                continue

            for feed in journal_data.get("feeds", []):

                if not feed.get("enabled", True):
                    continue

                feed_name = feed["name"]
                url = feed["url"]
                feed_date = datetime.now(UTC).strftime("%Y-%m-%dT%H-%M-%SZ")
                
                response = requests.get(url, timeout=10)
                response.raise_for_status()

                raw_response = response.text

                raw_hash = hash_raw_response(raw_response)

                feed_data = {
                    "date" : feed_date,
                    "country": country,
                    "journal": journal_name,
                    "feed": feed_name,
                    "url": url,
                    "raw_hash": raw_hash,
                    "raw_response": raw_response
                }

                saved_path = save_raw_feed(
                    country,
                    journal_name,
                    feed_name,
                    raw_hash,
                    feed_date,
                    feed_data
                )
                print(f"Saved: {saved_path}")


with open("rss_spaces.json", "r", encoding="utf-8") as f:
    rss_spaces = json.load(f)

    collect_feeds(
        rss_spaces
    )