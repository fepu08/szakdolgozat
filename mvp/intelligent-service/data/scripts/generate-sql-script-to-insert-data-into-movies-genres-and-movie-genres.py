import csv
from pathlib import Path

# Define paths
script_location = Path(__file__).absolute().parent
movies_file_path = script_location / "../ml-latest-small/movies.csv"
output_directory = script_location / "generated-sql-scripts"

# Ensure the output directory exists
output_directory.mkdir(exist_ok=True)

# Output SQL file path
sql_file_path = output_directory / "3-insert-movies-genres.sql"

# Function SQL
function_sql = """
CREATE OR REPLACE FUNCTION add_genre_to_movie(p_movie_id INT, p_genre_name TEXT)
RETURNS VOID AS $$
DECLARE
    genreId INT;
BEGIN
    SELECT genre_id INTO genreId FROM genres WHERE name = p_genre_name;

    IF NOT EXISTS (
        SELECT 1 FROM movie_genres WHERE movie_id = p_movie_id AND genre_id = genreId
    ) THEN
        INSERT INTO movie_genres (movie_id, genre_id) VALUES (p_movie_id, genreId);
    END IF;
END;
$$ LANGUAGE plpgsql;


"""

# Extract unique genres and prepare movies to genres mapping
unique_genres = set()
movies = []

with open(movies_file_path, newline="", encoding="utf-8") as csvfile:
    movies_reader = csv.DictReader(csvfile)
    for row in movies_reader:
        movie_id = row["movieId"]
        title = row["title"].replace("'", "''")  # Handle single quotes in titles
        releaseYear = row["releaseYear"]
        genres = (
            row["genres"].split("|") if row["genres"] != "(no genres listed)" else []
        )

        unique_genres.update(genres)
        movies.append((movie_id, title, releaseYear, genres))

# Write to the SQL file
with open(sql_file_path, "w", encoding="utf-8") as sqlfile:
    sqlfile.write(function_sql)
    sqlfile.write("-- Insert genres\n")
    for genre in unique_genres:
        sqlfile.write(f"INSERT INTO genres (name) VALUES ('{genre}');\n")

    # Insert movies and associate genres using the function
    for movie_id, title, releaseYear, genres in movies:
        sqlfile.write(
            f"INSERT INTO movies (movie_id, title, release_year) VALUES ({movie_id}, '{title}', {releaseYear}); \n"
        )

        # For each genre, link movie to genres using the function
        for genre in genres:
            sqlfile.write(f"SELECT add_genre_to_movie({movie_id}, '{genre}');\n")

print(f"SQL script generated at: {sql_file_path}")
