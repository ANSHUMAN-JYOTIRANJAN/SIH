import pandas as pd

# Load CSV file
df = pd.read_csv("2022_no_duplicates.csv")

# Convert all column names to lowercase for consistency
df.columns = df.columns.str.lower()

# Define the list of invalid values that should be replaced with 0
invalid_values = ["ND", "nd", "Nd", "N.D.", "N.A.", "na", "Na", "Traces", "traces", "TRACE","BDL","bdl","Bdl","NIL","Nil","nil","Leaked","LEAKED","leaked","<1","<5","leak","Leak","LEAK","sample leaked","SAMPLE LEAKED","Sample Leaked","Sample leaked","mple not received"]

# Replace invalid values with 0 in the entire dataframe
df = df.replace(invalid_values, 0)

# Convert numeric-like columns to proper numbers (non-numeric stays text)
for col in df.columns:
    df[col] = pd.to_numeric(df[col], errors="ignore")

# Save cleaned file
df.to_csv("2022_cleaned.csv", index=False)

print("✅ Cleaned file saved as 2020_cleaned.csv (ND/N.A./Traces replaced with 0).")
