import sys
args = sys.argv

OPENAI_API_KEY = args[1]
prompt = args[2]
index_name = args[3]

import os
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

from llama_index import StorageContext, load_index_from_storage

storage_context = StorageContext.from_defaults(persist_dir=f'./storage/{index_name}')

index = load_index_from_storage(storage_context, index_id=index_name)
query_engine = index.as_query_engine()

print(query_engine.query(prompt))
