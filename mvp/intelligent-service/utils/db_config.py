import os


def get_db_config():
    """
    Retrieves database configuration as environment variables or uses default values.

    Returns: A dictionary with the following keys and types:
                    "host": str
                    "port": int
                    "user": str
                    "password": str
                    "db_name": str
    """
    host = os.environ.get("DB_HOST", "localhost")
    port = int(os.environ.get("DB_PORT", 5432))
    user = os.environ.get("DB_USER", "postgres")
    password = os.environ.get("DB_PASSWORD", "password")
    db_name = os.environ.get("DATABASE", "recsys")

    return {
        "host": host,
        "port": port,
        "user": user,
        "password": password,
        "db_name": db_name,
    }
