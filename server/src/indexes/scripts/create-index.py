import sys
args = sys.argv

OPENAI_API_KEY = args[1]
# index_name = args[2]

import os
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

from llama_index import GPTSimpleVectorIndex, SimpleDirectoryReader
documents = SimpleDirectoryReader('assets/temp').load_data()
index = GPTSimpleVectorIndex.from_documents(documents)

# we can save various index and switch between them
index.save_to_disk('assets/indexes/index.json')
# index.save_to_disk('assets/indexes/' + index_name + '.json')
