#!/bin/bash
python generate-sql-script-to-create-dummy-users.py && \
python generate-sql-script-to-insert-data-into-movies-genres-and-movie-genres.py &&  \
python generate-sql-script-to-insert-data-into-ratings.py