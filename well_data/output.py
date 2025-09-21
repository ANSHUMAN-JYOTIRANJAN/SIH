import pandas as pd

# Load your 2021 JSON file
# Replace '2021_data.json' with the actual file path of your 2021 data
df = pd.read_json('2021_cleaned.json')

# Step 1: Standardize column names
# Create a dictionary to map inconsistent column names to the desired format
column_map = {
    'Well ID': 'Well ID',
    'S.No': 'S.No',
    'STATE': 'STATE',
    'DISTRICT': 'DISTRICT',
    'BLOCK': 'BLOCK',
    'LOCATION': 'LOCATION',
    'LATITUDE': 'LATITUDE',
    'LONGITUDE': 'LONGITUDE',
    'Year': 'Year',
    'pH': 'pH',
    'EC': 'EC',
    'CO3': 'CO3',
    'HCO3': 'HCO3',
    'Cl': 'Cl',
    'SO4': 'SO4',
    'NO3': 'NO3',
    'PO4': 'PO4',
    'TH': 'TH',
    'Ca': 'Ca',
    'Mg': 'Mg',
    'Na': 'Na',
    'K': 'K',
    'F': 'F',
    'SiO2': 'SiO2',
    'TDS': 'TDS',
    'U(ppb)': 'U(ppb)'
}

# Rename the columns using the dictionary
df = df.rename(columns=column_map)

# Step 2: Reorder columns to match the desired structure
# Create a list of the desired column order
desired_order = [
    'Well ID', 'S.No', 'STATE', 'DISTRICT', 'BLOCK', 'LOCATION', 'LATITUDE', 'LONGITUDE', 'Year',
    'pH', 'EC', 'CO3', 'HCO3', 'Cl', 'SO4', 'NO3', 'PO4', 'TH', 'Ca', 'Mg', 'Na', 'K', 'F',
    'SiO2', 'TDS', 'U(ppb)'
]

# Reindex the DataFrame to match the desired column order
df = df.reindex(columns=desired_order)

# Save the new, standardized DataFrame to a new CSV file
# The 'index=False' prevents pandas from writing the DataFrame index to the file
output_file = '2021_standardized.csv'
df.to_csv(output_file, index=False)

print(f"Standardized data saved to {output_file}")