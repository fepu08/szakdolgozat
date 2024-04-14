import csv
from pathlib import Path
import re

# Define paths
script_location = Path(__file__).absolute().parent
movies_file_path = script_location / "../ml-latest-small/movies.csv"

with open(movies_file_path, "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    data = list(reader)

with open(movies_file_path, "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["movieId", "title", "releaseYear", "genres"])

    for i, row in enumerate(data):
        # Skip header
        if i == 0:
            continue

        if row:
            match = re.match(r"(.*) \((\d{4})\)", row[1])
            if match:
                title, year = match.groups()
                new_row = [row[0], title, year] + row[2:]
                writer.writerow(new_row)
