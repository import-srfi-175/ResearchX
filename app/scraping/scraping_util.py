import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

def fetch_arxiv_papers(query, max_results=20, delay=3):
    papers = []
    for start in range(0, max_results, 10):
        # Query the ArXiv API
        url = f'http://export.arxiv.org/api/query?search_query={query}&start={start}&max_results=10'
        response = requests.get(url)
        
        # Parse the XML with BeautifulSoup
        soup = BeautifulSoup(response.content, 'xml')
        
        # Loop through each entry in the XML and extract details
        for entry in soup.find_all('entry'):
            title = entry.title.text
            summary = entry.summary.text
            authors = [author.find('name').text for author in entry.find_all('author')]
            pdf_link = entry.find('link', {'type': 'application/pdf'})['href']
            

            papers.append({
                "title": title,
                "summary": summary,
                "authors": authors,
                "pdf_link": pdf_link
            })
        

        time.sleep(delay)
    
    return papers


# query = "artificial intelligence"
# df = fetch_arxiv_papers(query)
# print(df.head())
