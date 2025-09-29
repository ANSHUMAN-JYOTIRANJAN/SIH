import pandas as pd

# Load CSV file
df = pd.read_csv("2023_new.csv")

# Drop the 'U(ppb)' column
if 'u_ppb' in df.columns:
    df = df.drop(columns=['u_ppb'])

# Save the cleaned CSV
df.to_csv("2023_cleaned.csv", index=False)

print("✅ 'U(ppb)' column removed and cleaned dataset saved.")
