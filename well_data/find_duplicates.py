import csv

def find_duplicate_well_ids(csv_file_path):
    """
    Finds and prints all rows with duplicate 'well_id' values in a CSV file.

    Args:
        csv_file_path (str): The path to the input CSV file.
    """
    try:
        # A dictionary to store the 'well_id' and the row number where it was first seen.
        seen_well_ids = {}
        # A list to store the duplicate rows for printing.
        duplicate_rows = []
        
        with open(csv_file_path, 'r', encoding='utf-8') as csv_file:
            # Use DictReader to get each row as a dictionary
            csv_reader = csv.DictReader(csv_file)
            
            # Check if 'well_id' exists in the headers
            if 'well_id' not in csv_reader.fieldnames:
                print("Error: The column 'well_id' was not found in the CSV file headers.")
                return

            for row_num, row in enumerate(csv_reader, 1):
                well_id = row.get('well_id')
                if well_id in seen_well_ids:
                    # If the well_id is already in our dictionary, it's a duplicate.
                    # Add both the original row and the duplicate row to the list.
                    duplicate_rows.append({
                        "row_number": seen_well_ids[well_id],
                        "data": "Original row: " + str(seen_well_ids[well_id])
                    })
                    duplicate_rows.append({
                        "row_number": row_num,
                        "data": "Duplicate row: " + str(row)
                    })
                else:
                    # If we haven't seen this well_id before, store it with the current row number.
                    seen_well_ids[well_id] = row_num

        if duplicate_rows:
            print(f"Found {len(duplicate_rows)} duplicate entries:")
            for entry in duplicate_rows:
                print(f"Row {entry['row_number']}: {entry['data']}")
        else:
            print("No duplicate 'well_id' entries found.")

    except FileNotFoundError:
        print(f"Error: The file '{csv_file_path}' was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

# Call the function with your CSV file name
find_duplicate_well_ids('2020_no_duplicates.csv')
