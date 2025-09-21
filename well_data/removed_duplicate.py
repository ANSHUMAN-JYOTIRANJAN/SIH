import pandas as pd

# Load your cleaned CSV
df = pd.read_csv("2019_cleaned.csv")

# Find duplicates based on well_id
duplicates = df[df.duplicated(subset=["well_id"], keep=False)]

if not duplicates.empty:
    print("Duplicate well_id values found:")
    print(duplicates.sort_values("well_id"))
else:
    print("No duplicate well_id values found.")

# Save only unique well_ids
df_no_duplicates = df.drop_duplicates(subset=["well_id"], keep="first")

# Export cleaned version
df_no_duplicates.to_csv("2019_no_duplicates.csv", index=False)

print("✅ Cleaned file saved as 2019_no_duplicates.csv")
