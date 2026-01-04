import pandas as pd
import json

# Read the CSV
df = pd.read_csv('word_frequency_results.csv')

# Get the top 200 words (or all if less than 200)
words = df['Word'].head(200).tolist()

# Save as JSON
with open('src/data/wordsets/Theocratic Swahili.json', 'w') as f:
    json.dump(words, f, indent=2)

print(f"Created 'src/data/wordsets/Theocratic Swahili.json' with {len(words)} words.")
