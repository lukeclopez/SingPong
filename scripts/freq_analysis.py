import re
from collections import Counter
from pypdf import PdfReader
import pandas as pd

def extract_and_count_words(pdf_path, stop_words=None):
    """
    Reads a PDF, extracts text, cleans it, and returns a frequency DataFrame.
    """
    if stop_words is None:
        stop_words = set()
    else:
        stop_words = set(w.lower() for w in stop_words)

    try:
        # Load the PDF
        reader = PdfReader(pdf_path)
        full_text = ""

        print(f"Processing '{pdf_path}'...")
        
        # Extract text from each page
        for page in reader.pages:
            text = page.extract_text()
            if text:
                full_text += text + " "

        # 1. Normalize to lower case
        full_text = full_text.lower()

        # 2. Use Regex to find words (removes punctuation)
        # \b\w+\b matches word characters between word boundaries
        # We also filter out numbers (optional)
        words = re.findall(r'\b[a-z]+\b', full_text)

        # 3. Filter out stopwords and single characters (optional)
        filtered_words = [
            word for word in words 
            if word not in stop_words and len(word) > 1
        ]

        # 4. Count frequencies
        word_counts = Counter(filtered_words)

        # 5. Convert to Pandas DataFrame for display
        df = pd.DataFrame(word_counts.items(), columns=['Word', 'Frequency'])
        
        # Sort by frequency (highest first)
        df = df.sort_values(by='Frequency', ascending=False).reset_index(drop=True)

        return df

    except Exception as e:
        print(f"An error occurred: {e}")
        return None

# --- CONFIGURATION ---

# 1. File Path
file_path = './source_data/sjjyls_SW.pdf' 

# 2. Configurable Stopwords (Swahili examples based on your file)
# Add or remove words here to filter them out of the results.
custom_stopwords = [
    "na", "ya", "wa", "kwa", "ni", "za", "la", "cha", "korasi",
    "cr", "zab", "am", "ak", "ap", "ehova", "yoh", "zaburi", "an",
    "isa", "mt", "mathayo", "pet", "az", "aw", "ufu", "kor", "met", "flp",
    "efe", "rom", "waroma", "kum", "in", "aa", "yak", "on", "ebr", "tim",
    "matendo", "uw", "ay", "waebrania"
]

# --- EXECUTION ---

if __name__ == "__main__":
    # Run the analysis
    result_df = extract_and_count_words(file_path, custom_stopwords)
    count = 100

    if result_df is not None:
        print(f"\n--- Top {count} Most Frequent Words ---")
        print(result_df.head(count))

        # Option: Export to CSV
        output_csv = "word_frequency_results.csv"
        result_df.to_csv(output_csv, index=False)
        print(f"\nFull results saved to '{output_csv}'")