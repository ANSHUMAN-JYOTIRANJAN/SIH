import pandas as pd

# Load JSON file for year 2019
df = pd.read_json("2021_cleaned.json")

# Rename headers to match Supabase table
df = df.rename(columns={
    "Well_ID": "well_id",
    "S. No.": "sno",
    "State": "state",
    "District": "district",
    "Block": "block",
    "Village": "village",
    "Latitude": "latitude",
    "Longitude": "longitude",
    "Year": "year",
    "pH": "ph",
    "EC in μS/cm": "ec",
    "CO3": "co3",
    "HCO3": "hco3",
    "Cl": "cl",
    "SO4": "so4",
    "NO3": "no3",
    "PO4": "po4",
    "TH": "th",
    "Ca": "ca",
    "Mg": "mg",
    "Na": "na",
    "K": "k",
    "F": "f",
    "SiO2": "sio2",
    "TDS": "tds"
})

# Save cleaned CSV for 2019
df.to_csv("2021_cleaned.csv", index=False)

print("2020 JSON file converted successfully → 2020_clean.csv")
