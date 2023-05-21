import sys
args = sys.argv

OPENAI_API_KEY = args[1]
prompt = args[2]

import os
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

from llama_index import GPTSimpleVectorIndex

index = GPTSimpleVectorIndex.load_from_disk('assets/indexes/index.json')
print(index.query(prompt))
