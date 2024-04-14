import csv
from pathlib import Path

# Define paths
script_location = Path(__file__).absolute().parent
ratings_file_path = script_location / "../ml-latest-small/ratings.csv"
output_directory = script_location / "generated-sql-scripts"

# Ensure the output directory exists
output_directory.mkdir(exist_ok=True)

# Output SQL file path
sql_file_path = output_directory / "4-insert-ratings.sql"

# Function SQL
function_sql = """
CREATE OR REPLACE FUNCTION insert_rating_if_movie_exists(_user_id INT, _movie_id INT, _rating NUMERIC, _timestamp BIGINT)
RETURNS VOID AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM movies WHERE movie_id = _movie_id) THEN
        INSERT INTO ratings (user_id, movie_id, rating, timestamp)
        VALUES (_user_id, _movie_id, _rating, to_timestamp(_timestamp));
    END IF;
END;
$$ LANGUAGE plpgsql;

"""

# Read ratings from CSV and prepare SQL statements
ratings = []

with open(ratings_file_path, newline="", encoding="utf-8") as csvfile:
    ratings_reader = csv.DictReader(csvfile)
    for row in ratings_reader:
        userId = row["userId"]
        movieId = row["movieId"]
        rating = row["rating"]
        timestamp = row["timestamp"]
        ratings.append((userId, movieId, rating, timestamp))

# Write to the SQL file
with open(sql_file_path, "w", encoding="utf-8") as sqlfile:
    sqlfile.write(function_sql)
    sqlfile.write("-- Insert genres\n")

    for userId, movieId, rating, timestamp in ratings:
        # Use the PostgreSQL function for a safe insert
        sqlfile.write(
            f"SELECT insert_rating_if_movie_exists({userId}, {movieId}, {rating}, {timestamp});\n"
        )

print(f"SQL script generated at: {sql_file_path}")
