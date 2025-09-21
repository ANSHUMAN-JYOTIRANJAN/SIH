import pandas as pd

# Load CSV
df = pd.read_csv("2023_cleaned.csv")

# Swap the values of 'well_id' and 'sno'
df[['well_id', 'sno']] = df[['sno', 'well_id']]

# Save fixed CSV
df.to_csv("2023_fixed.csv", index=False)

print("✅ Swapped values: now 'well_id' has well IDs and 'sno' has serial numbers.")
