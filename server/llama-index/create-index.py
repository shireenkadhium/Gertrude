import sys
args = sys.argv

OPENAI_API_KEY = args[1]
index_name = args[2]

import os
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

from llama_index import VectorStoreIndex, SimpleDirectoryReader

documents = SimpleDirectoryReader('assets/temp').load_data()

index = VectorStoreIndex.from_documents(documents)
index.set_index_id(index_name)
index.storage_context.persist(persist_dir=f'./storage/{index_name}')
