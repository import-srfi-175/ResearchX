from .mashuputil import RAGPipeline
from config import settings
import google.generativeai as genai
rag_pipeline = RAGPipeline()
genai.configure(api_key=settings.gemini_api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

def prompt_maker(query , context):
    base_prompt = """Answer the query based on the context. Context:- {context}, \n Query:- {query}"""
    base_prompt = base_prompt.format(context = context , query=query)
    return base_prompt

def respond(query, pdf_file: str):
    rag_pipeline = RAGPipeline(model_name_or_path="all-mpnet-base-v2", device="cpu", num_sentence_chunk_size=10)
    embedded_chunks = rag_pipeline.process_pdf(pdf_path=pdf_file)
    rag_pipeline.save_embeddings_to_faiss_with_metadata(embedded_chunks, "faiss_index.index", "metadata.json")
    rag_pipeline.load_faiss_and_metadata("faiss_index.index", "metadata.json")
    results = rag_pipeline.search_in_faiss(query=query, k=5)
    
    prompt = prompt_maker(query = query , context=results)
    
    response = model.generate_content(prompt)
    return response
    

