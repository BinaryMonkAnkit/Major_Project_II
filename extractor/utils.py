from django.db import connection
import os
import shutil
from django.conf import settings

def create_dynamic_table(table_name, columns):
    """Create a dynamic table based on the user-specified columns."""
    if not table_name.isidentifier():
        raise ValueError("Invalid table name")

    column_definitions = ", ".join([f"{col_name} TEXT" for col_name in columns])
    create_table_sql = f"CREATE TABLE IF NOT EXISTS {table_name} (id SERIAL PRIMARY KEY, {column_definitions});"
    
    with connection.cursor() as cursor:
        cursor.execute(create_table_sql)

def insert_data_into_table(table_name, columns, data):
    """Insert extracted data into the dynamic table."""
    placeholders = ", ".join(["%s"] * len(columns))
    insert_sql = f"INSERT INTO {table_name} ({', '.join(columns)}) VALUES ({placeholders});"
    
    with connection.cursor() as cursor:
        for row in zip(*data):  # Transpose columns into rows
            cursor.execute(insert_sql, row)


def delete_session_cache(session_id):
    """Delete cached files associated with a session."""
    session_cache_dir = os.path.join(settings.MEDIA_ROOT, "cache", session_id)

    if os.path.exists(session_cache_dir):
        shutil.rmtree(session_cache_dir)  # Delete entire session folder
