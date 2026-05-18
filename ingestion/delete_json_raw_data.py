from pathlib import Path

def clean_raw_json_files(raw_dir="raw_data"):
    raw_path = Path(raw_dir)

    for file in raw_path.rglob("*.json"):
        file.unlink()

clean_raw_json_files()