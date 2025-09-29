import pandas as pd

# Load 2023 dataset
df = pd.read_csv("2023_cleaned.csv")

# Rename columns to match 2022 schema
df = df.rename(columns={
    "S. No.": "sno",
    "State": "state",
    "District": "district",
    "Location": "location",
    "Longitude": "longitude",
    "Latitude": "latitude",
    "Year": "year",
    "pH": "ph",
    "EC (µS/cm at": "ec",
    "CO3 (mg/L)": "co3",
    "HCO3": "hco3",
    "Cl (mg/L)": "cl",
    "SO4": "so4",
    "NO3": "no3",
    "PO4": "po4",
    "Total Hardness": "th",
    "Ca (mg/L)": "ca",
    "Mg (mg/L)": "mg",
    "Na (mg/L)": "na",
    "K (mg/L)": "k",
    "F (mg/L)": "f",
    "Fe (ppm)": "fe",
    "As (ppb)": "as",
    "U (ppb)": "u_ppb"
})

# Add missing columns (block, sio2, tds, well_id)
df["block"] = None
df["sio2"] = None
df["tds"] = None

# Generate numeric well_id = year * 100000 + sno
df["well_id"] = df["year"] * 100000 + df["sno"]

# Reorder columns to match your 2022 schema
final_columns = [
    "well_id","sno","state","district","block","location",
    "latitude","longitude","year","ph","ec","co3","hco3",
    "cl","so4","no3","po4","th","ca","mg","na","k","f",
    "sio2","tds","fe","as","u_ppb"
]

df = df[final_columns]

# Save cleaned file
df.to_csv("2023_standardized.csv", index=False)

print("✅ 2023 dataset converted to standard schema!")
print(df.head())
