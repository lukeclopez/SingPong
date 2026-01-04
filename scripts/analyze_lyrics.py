import csv
import ast
import json
from collections import Counter
import re

source_file = 'source_data/billboard_top_100_1946_2022_lyrics .csv'
output_file = 'src/data/wordsets/Billboard Top 100.json'

stop_words = set([
    'the', 'a', 'an', 'and', 'or', 'but', 'if', 'because', 'as', 'what',
    'when', 'where', 'how', 'who', 'whom', 'which', 'that', 'it', 'he', 'she',
    'they', 'them', 'their', 'his', 'her', 'its', 'my', 'your', 'our', 'us',
    'me', 'him', 'i', 'you', 'we', 'be', 'is', 'am', 'are', 'was', 'were',
    'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'done',
    'will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might',
    'must', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'up',
    'down', 'about', 'into', 'over', 'after', 'im', 'dont', 'cant', 'its',
    'thats', 'youre', 'ill', 'ive', 'wont', 'theres', 'didnt', 'aint',
    'got', 'gonna', 'wanna', 'yeah', 'oh', 'la', 'na', 'ooh', 'ah', 'hey',
    'baby', 'know', 'just', 'now', 'go', 'get', 'got', 'let', 'make', 'see',
    'come', 'back', 'take', 'say', 'tell', 'want', 'need', 'like', 'one',
    'time', 'way', 'day', 'night', 'life', 'love', 'heart', 'girl', 'man',
    'boy', 'woman', 'world', 'look', 'feel', 'right', 'left', 'good', 'bad',
    'never', 'ever', 'always', 'really', 'too', 'very', 'so', 'much', 'many',
    'more', 'some', 'any', 'no', 'not', 'yes', 'this', 'that', 'these', 'those',
    'here', 'there', 'where', 'why', 'when', 'how', 'all', 'any', 'both', 'each',
    'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only',
    'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just',
    'don', 'should', 'now', 'd', 'll', 'm', 're', 've', 'y', 'ain', 'aren', 'couldn',
    'didn', 'doesn', 'hadn', 'hasn', 'haven', 'isn', 'ma', 'mightn', 'mustn',
    'needn', 'shan', 'shouldn', 'wasn', 'weren', 'won', 'wouldn', 'chorus',
    'verse', 'intro', 'outro', 'instrumental', 'repeat', 'x2', 'x3', 'x4'
])

# Additional common words to exclude to make the game more interesting
# (or maybe keep them? 'Love', 'Heart', 'Girl' are in the General English set)
# The General English set HAS 'Yeah', 'Feel', 'Girl', 'Heart', 'Take', 'Life', 'Back', 'Never'.
# So I should probably NOT filter out "love", "heart", "girl", etc.
# I will reduce the stop word list to just grammatical words.

stop_words_minimal = set([
    'the', 'a', 'an', 'and', 'or', 'but', 'if', 'because', 'as', 
    'what', 'when', 'where', 'how', 'who', 'whom', 'which', 'that', 
    'it', 'he', 'she', 'they', 'them', 'their', 'his', 'her', 'its', 
    'my', 'your', 'our', 'us', 'me', 'him', 'i', 'you', 'we', 
    'be', 'is', 'am', 'are', 'was', 'were', 'been', 'being', 
    'have', 'has', 'had', 'do', 'does', 'did', 'done', 
    'will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might', 'must',
    'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'up', 'down', 
    'about', 'into', 'over', 'after', 'im', 'dont', 'cant', 'its', 'thats', 
    'youre', 'ill', 'ive', 'wont', 'theres', 'didnt', 'aint', 'got', 'gonna',
    'wanna', 'this', 'that', 'these', 'those', 'here', 'there', 'all', 'some',
    'no', 'not', 'yes', 'so', 'too', 'very', 'just', 'now'
])

word_counts = Counter()

print("Reading CSV...")
try:
    with open(source_file, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        header = next(reader)
        # Find 'Lyrics' index, usually last
        lyrics_idx = -1
        for i, h in enumerate(header):
            if h == 'Lyrics':
                lyrics_idx = i
                break
        
        if lyrics_idx == -1:
            # Fallback to 5th column (index 4) if header not found or weird
            lyrics_idx = 4

        for row in reader:
            if len(row) > lyrics_idx:
                lyrics_str = row[lyrics_idx]
                try:
                    # Parse string representation of list: "['word', ...]"
                    words = ast.literal_eval(lyrics_str)
                    if isinstance(words, list):
                        # Clean and count words
                        for w in words:
                            w_clean = w.lower().strip()
                            # Remove non-alpha characters if any
                            w_clean = re.sub(r'[^a-z]', '', w_clean)
                            if w_clean and w_clean not in stop_words_minimal:
                                # Capitalize for the game
                                w_cap = w_clean.capitalize()
                                word_counts[w_cap] += 1
                except (ValueError, SyntaxError):
                    continue

    print(f"Total unique words found: {len(word_counts)}")
    
    # Get top 200 words
    top_200 = [w for w, count in word_counts.most_common(200)]
    
    # Write to JSON
    with open(output_file, 'w') as f:
        json.dump(top_200, f, indent=2)
        
    print(f"Successfully wrote top 200 words to {output_file}")
    print("Top 10 words:", top_200[:10])

except Exception as e:
    print(f"Error: {e}")
