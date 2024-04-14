from bcrypt import hashpw, gensalt
from pathlib import Path

# Define paths
script_location = Path(__file__).absolute().parent
output_directory = script_location / "generated-sql-scripts"

# Ensure the output directory exists
output_directory.mkdir(exist_ok=True)

# Output SQL file path
num_of_users = 610
sql_file_path = output_directory / f"2-insert-{num_of_users}-dummy-users.sql"

sql_inserts = []

print("Generating script, it can take several minutes because of hashing...")
for i in range(num_of_users):
    email = f"user{i}@example.com"
    password = f"password{i}"
    hashed_password = hashpw(password.encode("utf-8"), gensalt()).decode("utf-8")
    name = f"User {i}"
    sql_inserts.append(
        f"INSERT INTO users (email, password, name) VALUES ('{email}', '{hashed_password}', '{name}');"
    )

# Save the SQL statements to a file
with open(sql_file_path, "w") as file:
    file.write("\n".join(sql_inserts))


print(f"SQL script generated at: {sql_file_path}")
